'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Logo3DModel({ targetPosition, targetScale }: { targetPosition: THREE.Vector3; targetScale: number }) {
    const { scene } = useGLTF('/logo.glb');
    const meshRef = useRef<THREE.Group>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const currentPosition = useRef(new THREE.Vector3(0, 0, 0));
    const currentScale = useRef(1);
    const idleRotation = useRef(0);

    // Track mouse position globally
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animation frame loop with CONTINUOUS animations
    useFrame((state) => {
        if (!meshRef.current) return;

        // Smooth position transition (MetaMask "jumping" effect)
        currentPosition.current.lerp(targetPosition, 0.1);
        meshRef.current.position.copy(currentPosition.current);

        // Smooth scale transition with gentle pulsing
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02; // Gentle pulse
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale * pulseScale, 0.1);
        meshRef.current.scale.setScalar(currentScale.current);

        // Mouse tracking rotation (±0.5 Y, ±0.3 X like MetaMask)
        const targetRotationY = mouseRef.current.x * 0.5;
        const targetRotationX = mouseRef.current.y * 0.3;

        targetRotationRef.current.y = THREE.MathUtils.lerp(
            targetRotationRef.current.y,
            targetRotationY,
            0.05
        );

        targetRotationRef.current.x = THREE.MathUtils.lerp(
            targetRotationRef.current.x,
            targetRotationX,
            0.05
        );

        // Add continuous idle rotation on Y-axis
        idleRotation.current += 0.001; // Very slow continuous rotation

        meshRef.current.rotation.y = targetRotationRef.current.y + idleRotation.current;
        meshRef.current.rotation.x = targetRotationRef.current.x;

        // Gentle floating effect (up and down)
        const floatOffset = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        meshRef.current.position.y += floatOffset;
    });

    return <primitive ref={meshRef} object={scene} />;
}

// Loading component
function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#8B5CF6" wireframe />
        </mesh>
    );
}

export function Logo3D() {
    const [mounted, setMounted] = useState(false);
    const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));
    const [targetScale, setTargetScale] = useState(1.5);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);

        // Preload with progress tracking
        const loadModel = async () => {
            try {
                await useGLTF.preload('/logo.glb');
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading 3D model:', error);
                setIsLoading(false);
            }
        };
        loadModel();

        // MetaMask anchor-based positioning system with MULTIPLE targets
        const updateLogoPosition = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Find all logo targets
            const heroTarget = document.querySelector('[data-logo-target="hero"]') as HTMLElement;
            const cardTarget = document.querySelector('[data-logo-target="card"]') as HTMLElement;
            const analyticsTarget = document.querySelector('[data-logo-target="analytics"]') as HTMLElement;
            const featuresTarget = document.querySelector('[data-logo-target="features"]') as HTMLElement;
            const ctaTarget = document.querySelector('[data-logo-target="cta"]') as HTMLElement;

            // ALWAYS have a fallback - use hero if nothing else
            let activeTarget: HTMLElement = heroTarget || document.body;
            let scale: number = 1.0;

            if (!heroTarget) {
                // If no targets found, keep logo visible in center
                setTargetPosition(new THREE.Vector3(0, 0, 0));
                setTargetScale(1.0);
                return;
            }

            // Calculate scroll thresholds for each section
            const heroBottom = heroTarget.offsetTop + heroTarget.offsetHeight;
            const cardBottom = cardTarget ? cardTarget.offsetTop + cardTarget.offsetHeight : heroBottom;
            const analyticsBottom = analyticsTarget ? analyticsTarget.offsetTop + analyticsTarget.offsetHeight : cardBottom;
            const featuresBottom = featuresTarget ? featuresTarget.offsetTop + featuresTarget.offsetHeight : analyticsBottom;

            // Determine active target based on scroll position
            if (scrollY < heroBottom - viewportHeight / 2) {
                activeTarget = heroTarget;
                scale = 1.5;
            } else if (cardTarget && scrollY < cardBottom - viewportHeight / 2) {
                activeTarget = cardTarget;
                scale = 1.0;
            } else if (analyticsTarget && scrollY < analyticsBottom - viewportHeight / 2) {
                activeTarget = analyticsTarget;
                scale = 0.7;
            } else if (featuresTarget && scrollY < featuresBottom - viewportHeight / 2) {
                activeTarget = featuresTarget;
                scale = 0.9;
            } else if (ctaTarget) {
                activeTarget = ctaTarget;
                scale = 0.5;
            } else {
                // Fallback - keep visible even at bottom of page
                activeTarget = heroTarget;
                scale = 0.8;
            }

            // Convert DOM position to 3D world coordinates
            const rect = activeTarget.getBoundingClientRect();

            // Ensure logo stays visible even if target is off-screen
            const clampedTop = Math.max(0, Math.min(rect.top + rect.height / 2, viewportHeight));
            const clampedLeft = Math.max(0, Math.min(rect.left + rect.width / 2, window.innerWidth));

            const x = (clampedLeft / window.innerWidth) * 2 - 1;
            const y = -(clampedTop / viewportHeight) * 2 + 1;

            setTargetPosition(new THREE.Vector3(x * 3, y * 2, 0));
            setTargetScale(scale);
        };

        // Update on scroll and resize
        updateLogoPosition();
        window.addEventListener('scroll', updateLogoPosition);
        window.addEventListener('resize', updateLogoPosition);

        // Initial update after mount
        const timer = setTimeout(updateLogoPosition, 100);

        return () => {
            window.removeEventListener('scroll', updateLogoPosition);
            window.removeEventListener('resize', updateLogoPosition);
            clearTimeout(timer);
        };
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Loading indicator */}
            {isLoading && (
                <div className="fixed top-24 right-8 z-[101] bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-mm-purple border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-gray-600">Loading 3D logo...</span>
                    </div>
                </div>
            )}

            <div
                className="fixed top-0 left-0 w-screen h-screen z-[99]"
                style={{ pointerEvents: 'none' }}
            >
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance"
                    }}
                    style={{ background: 'transparent' }}
                >
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                    {/* MetaMask-style Lighting */}
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.2} />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#10B981" />
                    <spotLight
                        position={[0, 10, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={1}
                    />

                    <Environment preset="city" />

                    <Suspense fallback={<LoadingFallback />}>
                        <Logo3DModel targetPosition={targetPosition} targetScale={targetScale} />
                    </Suspense>
                </Canvas>
            </div>
        </>
    );
}

// Lazy preload - only load when needed
if (typeof window !== 'undefined') {
    useGLTF.preload('/logo.glb');
}
