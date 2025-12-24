"use client";

import { useState } from "react";
import { GoalCard } from "@/components/goals/GoalCard";
import { mockData } from "@/lib/api/mock-data";
import { Target, Trophy, TrendingUp, Plus, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { useConfetti } from "@/lib/hooks/useConfetti";
import { useFireworks } from "@/lib/hooks/useFireworks";
import { useBalloons } from "@/lib/hooks/useBalloons"; // NEW
import { FireworksEffect } from "@/components/animations/FireworksEffect";
import { Balloons } from "@/components/animations/Balloons"; // NEW

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
    const { isActive: balloonsActive, launch: launchBalloons } = useBalloons(); // NEW

    const totalTarget = goals.reduce((acc, g) => acc + g.target, 0);
    const totalCurrent = goals.reduce((acc, g) => acc + g.current, 0);
    const overallProgress = (totalCurrent / totalTarget) * 100;

    // Helper to check if milestone was just reached
    const checkMilestones = (goal: Goal, oldCurrent: number, newCurrent: number) => {
        const milestones = [25, 50, 75]; // 25%, 50%, 75% milestones

        for (const milestone of milestones) {
            const milestoneAmount = (goal.target * milestone) / 100;
            const oldPercentage = (oldCurrent / goal.target) * 100;
            const newPercentage = (newCurrent / goal.target) * 100;

            // Check if we just crossed this milestone
            if (oldPercentage < milestone && newPercentage >= milestone) {
                return milestone;
            }
        }
        return null;
    };

    // Handle adding money to goals
    const handleAddMoney = (goalId: string, amount: number) => {
        setGoals(prev => {
            const updated = prev.map(goal => {
                if (goal.id === goalId) {
                    const oldCurrent = goal.current;
                    const newCurrent = goal.current + amount;
                    const oldPercentage = (goal.current / goal.target) * 100;
                    const newPercentage = (newCurrent / goal.target) * 100;

                    // NEW: Check for milestone achievements
                    const milestoneReached = checkMilestones(goal, oldCurrent, newCurrent);
                    if (milestoneReached) {
                        // Milestone reached! Launch balloons 🎈
                        setTimeout(() => launchBalloons(5000), 200);
                    }

                    // Check if goal just completed
                    if (newPercentage >= 100 && oldPercentage < 100) {
                        // Goal completed! Fire celebration confetti
                        setTimeout(() => fireCelebration(), 300);

                        // Check if ALL goals are now complete
                        const allComplete = prev.every(g =>
                            g.id === goalId ? newCurrent >= goal.target : g.current >= g.target
                        );

                        if (allComplete) {
                            // ALL GOALS COMPLETE! Launch epic fireworks! 🎆
                            setTimeout(() => launchFireworks(8000), 1200);
                        }
                    } else if (!milestoneReached) {
                        // Regular contribution - small confetti (only if no milestone)
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
            <div className="space-y-6 max-w-5xl mx-auto pb-10">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
                        <p className="text-gray-600 mt-1">Turning dreams into milestones</p>
                    </div>
                    <Button className="gap-2 bg-gradient-to-r from-lavender-600 to-skyBlue-600 hover:from-lavender-700 hover:to-skyBlue-700 text-white shadow-lg shadow-lavender-200">
                        <Plus className="w-4 h-4" />
                        New Savings Goal
                    </Button>
                </div>

                {/* Overall Progress Dashboard */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Trophy className="w-48 h-48" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-gray-100"
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
                                    className="text-mint-500 transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-900">{overallProgress.toFixed(0)}%</span>
                                <span className="text-xs text-gray-500 font-medium">Overall</span>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 font-medium">Total Saved</p>
                                <h2 className="text-3xl font-bold text-gray-900 text-mint-600">
                                    {formatCurrency(totalCurrent)}
                                </h2>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 font-medium">Goal Distance</p>
                                <h2 className="text-3xl font-bold text-gray-900 text-gray-400">
                                    {formatCurrency(totalTarget - totalCurrent)}
                                </h2>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="flex items-center gap-2 text-sm text-skyBlue-600 bg-skyBlue-50 px-4 py-2 rounded-xl border border-skyBlue-100">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>You are on track to hit your <strong>Emergency Fund</strong> goal by July 2024!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Goals Grid */}
                <h2 className="text-xl font-bold text-gray-900 px-1">Active Milestones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal, index) => (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GoalCard
                                goal={goal}
                                onAddMoney={handleAddMoney}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Smart Advice Section */}
                <div className="glass p-6 rounded-2xl border-2 border-white/50 bg-skyBlue-50/30">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-skyBlue-500" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-bold text-gray-900">AI Wealth Coach</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Increasing your monthly contribution to <strong>Europe Trip</strong> by just
                                ₹500 would allow you to book flights 2 months earlier than scheduled.
                                Consider using your expected tax refund for the <strong>MacBook Pro</strong> goal.
                            </p>
                            <div className="flex items-center gap-3 pt-1">
                                <Button size="sm" variant="outline" className="text-xs h-8">Full Analysis</Button>
                                <Button size="sm" variant="ghost" className="text-xs h-8 text-skyBlue-600">Dismiss</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <FireworksEffect isActive={fireworksActive} duration={8000} />
            <Balloons isActive={balloonsActive} duration={5000} count={15} /> {/* NEW */}
        </>
    );
}
