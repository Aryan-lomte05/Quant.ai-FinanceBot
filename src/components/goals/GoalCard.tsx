"use client";

import { ProgressRing } from "./ProgressRing";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface Goal {
    id: string;
    name: string;
    icon: string;
    target: number;
    current: number;
    deadline: string;
    priority: 'high' | 'medium' | 'low';
    color: string;
}

interface GoalCardProps {
    goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
    const progress = (goal.current / goal.target) * 100;

    return (
        <div className="glass p-6 rounded-2xl border-2 border-white/50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{goal.icon}</span>
                    <div>
                        <h3 className="font-bold text-gray-900">{goal.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(goal.deadline)}
                        </div>
                    </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${goal.priority === 'high' ? 'bg-coral-100 text-coral-700' :
                        goal.priority === 'medium' ? 'bg-skyBlue-100 text-skyBlue-700' :
                            'bg-gray-100 text-gray-700'
                    }`}>
                    {goal.priority}
                </span>
            </div>

            <ProgressRing progress={progress} color={goal.color} />

            <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(goal.current)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Target</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(goal.target)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-semibold text-coral-600">{formatCurrency(goal.target - goal.current)}</span>
                </div>
            </div>
        </div>
    );
}
