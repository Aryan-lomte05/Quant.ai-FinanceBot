"use client";

import { useState } from "react";
import { GoalCard } from "@/components/goals/GoalCard";
import { mockData } from "@/lib/api/mock-data";
import { Target, Trophy, TrendingUp, Plus, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export default function GoalsPage() {
    const goals = mockData.goals;
    const totalTarget = goals.reduce((acc, g) => acc + g.target, 0);
    const totalCurrent = goals.reduce((acc, g) => acc + g.current, 0);
    const overallProgress = (totalCurrent / totalTarget) * 100;

    return (
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
                        <GoalCard goal={goal as any} />
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
    );
}
