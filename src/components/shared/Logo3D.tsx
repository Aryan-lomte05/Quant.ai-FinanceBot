'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Logo3DModel({ targetPosition, targetScale }: { targetPosition: THREE.Vector3; targetScale: number }) {
    const { scene } = useGLTF('/logo.glb');
    const meshRef = useRef<THREE.Group>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const currentPosition = useRef(new THREE.Vector3(0, 0, 0));
    const currentScale = useRef(1);

    // Track mouse position globally
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animation frame loop
    useFrame(() => {
        if (!meshRef.current) return;

        // Smooth position transition (MetaMask "jumping" effect)
        currentPosition.current.lerp(targetPosition, 0.1);
        meshRef.current.position.copy(currentPosition.current);

        // Smooth scale transition
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
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

        meshRef.current.rotation.y = targetRotationRef.current.y;
        meshRef.current.rotation.x = targetRotationRef.current.x;
    });

    return <primitive ref={meshRef} object={scene} />;
}

export function Logo3D() {
    const [mounted, setMounted] = useState(false);
    const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));
    const [targetScale, setTargetScale] = useState(1.5);

    useEffect(() => {
        setMounted(true);

        // MetaMask anchor-based positioning system with MULTIPLE targets
        const updateLogoPosition = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            // Find all logo targets
            const heroTarget = document.querySelector('[data-logo-target="hero"]') as HTMLElement;
            const cardTarget = document.querySelector('[data-logo-target="card"]') as HTMLElement;
            const analyticsTarget = document.querySelector('[data-logo-target="analytics"]') as HTMLElement;
            const featuresTarget = document.querySelector('[data-logo-target="features"]') as HTMLElement;
            const ctaTarget = document.querySelector('[data-logo-target="cta"]') as HTMLElement;

            if (!heroTarget) return;

            // Determine which target is "active" based on scroll position
            let activeTarget: HTMLElement;
            let scale: number;

            // Calculate scroll thresholds for each section
            const heroBottom = heroTarget.offsetTop + heroTarget.offsetHeight;
            const cardBottom = cardTarget ? cardTarget.offsetTop + cardTarget.offsetHeight : heroBottom;
            const analyticsBottom = analyticsTarget ? analyticsTarget.offsetTop + analyticsTarget.offsetHeight : cardBottom;
            const featuresBottom = featuresTarget ? featuresTarget.offsetTop + featuresTarget.offsetHeight : analyticsBottom;

            if (scrollY < heroBottom - viewportHeight / 2) {
                // Hero section - large logo
                activeTarget = heroTarget;
                scale = 1.5;
            } else if (cardTarget && scrollY < cardBottom - viewportHeight / 2) {
                // Cards section - medium logo
                activeTarget = cardTarget;
                scale = 1.0;
            } else if (analyticsTarget && scrollY < analyticsBottom - viewportHeight / 2) {
                // Analytics section - smaller logo
                activeTarget = analyticsTarget;
                scale = 0.7;
            } else if (featuresTarget && scrollY < featuresBottom - viewportHeight / 2) {
                // Features section - medium logo
                activeTarget = featuresTarget;
                scale = 0.9;
            } else if (ctaTarget) {
                // CTA section - small logo
                activeTarget = ctaTarget;
                scale = 0.5;
            } else {
                activeTarget = heroTarget;
                scale = 1.5;
            }

            // Convert DOM position to 3D world coordinates
            const rect = activeTarget.getBoundingClientRect();
            const x = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
            const y = -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

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
            window.removeEventListener(' scroll', updateLogoPosition);
            window.removeEventListener('resize', updateLogoPosition);
            clearTimeout(timer);
        };
    }, []);

    if (!mounted) {
        return null;
    }

    return (
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

                <Suspense fallback={null}>
                    <Logo3DModel targetPosition={targetPosition} targetScale={targetScale} />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload('/logo.glb');
