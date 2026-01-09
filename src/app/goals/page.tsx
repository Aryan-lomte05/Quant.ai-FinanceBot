"use client";

import { useState, useRef } from "react";
import { GoalCard } from "@/components/goals/GoalCard";
import { mockData } from "@/lib/api/mock-data";
import { Target, Trophy, TrendingUp, Plus, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { useConfetti } from "@/lib/hooks/useConfetti";
import { useFireworks } from "@/lib/hooks/useFireworks";
import { useBalloons } from "@/lib/hooks/useBalloons";
import { FireworksEffect } from "@/components/animations/FireworksEffect";
import { useXPTriggers } from "@/lib/hooks/useXPTriggers";
import { Balloons } from "@/components/animations/Balloons";

export interface Goal {
    id: string;
    name: string;
    icon: string;
    target: number;
    current: number;
    deadline: string;
    priority: string;
    color: string;
    milestones: Array<{
        amount: number;
        reached: boolean;
        date: string | null;
    }>;
}

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>(mockData.goals as unknown as Goal[]);
    const { fireCelebration, fireConfetti } = useConfetti();
    const { isActive: fireworksActive, launch: launchFireworks } = useFireworks();
    const { isActive: balloonsActive, launch: launchBalloons } = useBalloons();
    const { onGoalContribution, onGoalCompleted } = useXPTriggers();

    const totalTarget = goals.reduce((acc, g) => acc + g.target, 0);
    const totalCurrent = goals.reduce((acc, g) => acc + g.current, 0);
    const overallProgress = (totalCurrent / totalTarget) * 100;

    // Scroll animations
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });

    const textScale = useSpring(
        useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.5, 0.75, 0.95, 1.0]),
        { stiffness: 100, damping: 30 }
    );
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

    const cardScale = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.98, 1.0]),
        { stiffness: 100, damping: 30 }
    );

    const checkMilestones = (goal: Goal, oldCurrent: number, newCurrent: number) => {
        const milestones = [25, 50, 75];
        for (const milestone of milestones) {
            const oldPercentage = (oldCurrent / goal.target) * 100;
            const newPercentage = (newCurrent / goal.target) * 100;
            if (oldPercentage < milestone && newPercentage >= milestone) {
                return milestone;
            }
        }
        return null;
    };

    const handleAddMoney = (goalId: string, amount: number) => {
        setGoals(prev => {
            const updated = prev.map(goal => {
                if (goal.id === goalId) {
                    const oldCurrent = goal.current;
                    const newCurrent = goal.current + amount;
                    const oldPercentage = (goal.current / goal.target) * 100;
                    const newPercentage = (newCurrent / goal.target) * 100;

                    onGoalContribution(amount);

                    const milestoneReached = checkMilestones(goal, oldCurrent, newCurrent);
                    if (milestoneReached) {
                        setTimeout(() => launchBalloons(5000), 200);
                    }

                    if (newPercentage >= 100 && oldPercentage < 100) {
                        setTimeout(() => onGoalCompleted(), 500);
                        setTimeout(() => fireCelebration(), 300);

                        const allComplete = prev.every(g =>
                            g.id === goalId ? newCurrent >= goal.target : g.current >= g.target
                        );

                        if (allComplete) {
                            setTimeout(() => launchFireworks(8000), 1200);
                        }
                    } else if (!milestoneReached) {
                        fireConfetti({
                            particleCount: 50,
                            spread: 50,
                            origin: { x: 0.5, y: 0.7 },
                        });
                    }

                    return { ...goal, current: Math.min(newCurrent, goal.target) };
                }
                return goal;
            });

            return updated;
        });
    };

    return (
        <>
            <div className="space-y-0">
                {/* SECTION 1: Hero - Mint Background */}
                <section ref={heroRef} className="mm-section-mint mm-section-spacing relative perspective-container overflow-hidden">
                    <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto">
                        {/* Massive Headline */}
                        <motion.div
                            style={{
                                scale: textScale,
                                opacity: textOpacity
                            }}
                            className="mb-16"
                        >
                            <h1 className="mm-section-heading text-center">
                                DREAM BIG
                                <br />
                                SAVE SMART
                            </h1>
                            <p className="text-center text-xl text-gray-700 mt-6 max-w-2xl mx-auto">
                                Turning your financial dreams into achievable milestones
                            </p>
                        </motion.div>

                        {/* Overall Progress Card */}
                        <motion.div
                            style={{ scale: cardScale }}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mm-card-colored mm-card-green card-3d"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="relative w-40 h-40 shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            className="text-white/20"
                                        />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={440}
                                            strokeDashoffset={440 - (440 * overallProgress) / 100}
                                            className="text-white transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-black">{overallProgress.toFixed(0)}%</span>
                                        <span className="text-sm opacity-90">Overall</span>
                                    </div>
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm opacity-90 font-semibold uppercase mb-2">Total Saved</p>
                                        <h2 className="text-4xl font-black">
                                            {formatCurrency(totalCurrent)}
                                        </h2>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-90 font-semibold uppercase mb-2">Goal Distance</p>
                                        <h2 className="text-4xl font-black opacity-70">
                                            {formatCurrency(totalTarget - totalCurrent)}
                                        </h2>
                                    </div>
                                    <div className="sm:col-span-2 flex items-center gap-2 bg-white/20 px-4 py-3 rounded-xl">
                                        <TrendingUp className="w-5 h-5" />
                                        <span className="font-semibold">On track to hit <strong>Emergency Fund</strong> by July 2024!</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: Goals Grid - Cream Background */}
                <section className="mm-section-cream mm-section-spacing">
                    <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-mm-black mb-8">Active Milestones</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {goals.map((goal, index) => (
                                <motion.div
                                    key={goal.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <GoalCard
                                        goal={goal}
                                        onAddMoney={handleAddMoney}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 3: AI Coach - Orange Background */}
                <section className="mm-section-orange mm-section-spacing">
                    <div className="mm-container px-8 py-16 w-full max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mm-card card-3d text-center"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mm-purple/10 rounded-full text-sm font-bold text-mm-purple mb-6">
                                <Sparkles className="w-4 h-4" />
                                AI WEALTH COACH
                            </div>
                            <h3 className="text-4xl font-black text-mm-black mb-4">Smart Goal Insights</h3>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Increasing your monthly contribution to <strong>Europe Trip</strong> by just
                                ₹500 would allow you to book flights 2 months earlier than scheduled.
                                Consider using your expected tax refund for the <strong>MacBook Pro</strong> goal.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <button className="mm-btn mm-btn-primary">Full Analysis</button>
                                <button className="mm-btn mm-btn-secondary">Dismiss</button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 4: CTA - Mint Background */}
                <section className="mm-section-mint mm-section-spacing">
                    <div className="mm-container px-8 py-16 w-full max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black text-mm-black mb-6 leading-tight">
                                Create Your
                                <br />
                                Next Goal
                            </h2>
                            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                Start saving for what matters most to you
                            </p>
                            <button className="mm-btn mm-btn-primary text-lg px-12 py-6">
                                <Plus className="w-6 h-6" />
                                New Savings Goal
                            </button>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Animations */}
            <FireworksEffect isActive={fireworksActive} duration={8000} />
            <Balloons isActive={balloonsActive} duration={5000} count={15} />
        </>
    );
}
