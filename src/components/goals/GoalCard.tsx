"use client";

import { motion } from "framer-motion";
import { CheckCircle, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface GoalCardProps {
    goal: {
        id: string;
        name: string;
        icon: string;
        target: number;
        current: number;
        deadline: string;
        priority: string;
        color: string;
        milestones?: Array<{
            amount: number;
            reached: boolean;
            date: string | null;
        }>;
    };
    onAddMoney?: (goalId: string, amount: number) => void;
}

export function GoalCard({ goal, onAddMoney }: GoalCardProps) {
    const percentage = (goal.current / goal.target) * 100;
    const isComplete = percentage >= 100;

    const handleQuickAdd = (amount: number) => {
        if (onAddMoney && !isComplete) {
            onAddMoney(goal.id, amount);
        }
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl border-2 transition-all ${isComplete
            ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300 shadow-lg'
            : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
            }`}>
            {/* Complete Badge */}
            {isComplete && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                    className="absolute top-4 right-4 z-10"
                >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                </motion.div>
            )}

            <div className="p-6">
                {/* Category Icon & Name */}
                <div className="flex items-start gap-3 mb-4">
                    <div className="text-4xl">
                        {goal.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{goal.name}</h3>
                        <p className="text-sm text-gray-500">
                            Target: {new Date(goal.deadline).toLocaleDateString('en-IN', {
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Progress</span>
                        <span className={`text-sm font-bold ${isComplete ? 'text-emerald-600' : 'text-gray-900'
                            }`}>
                            {percentage.toFixed(1)}%
                        </span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentage, 100)}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full rounded-full ${isComplete
                                ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                                : 'bg-gradient-to-r from-mint-500 to-skyBlue-500'
                                }`}
                        />
                    </div>
                </div>

                {/* Amount Display */}
                <div className="mb-4">
                    <div className="text-2xl font-black text-gray-900">
                        {formatCurrency(goal.current)}
                    </div>
                    <div className="text-sm text-gray-500">
                        of {formatCurrency(goal.target)}
                        <span className="mx-2">•</span>
                        <span className="text-gray-700 font-medium">
                            {formatCurrency(goal.target - goal.current)} remaining
                        </span>
                    </div>
                </div>

                {/* Quick Add Buttons - Only show if not complete */}
                {!isComplete && onAddMoney && (
                    <div className="grid grid-cols-3 gap-2">
                        {[1000, 5000, 10000].map(amount => (
                            <motion.button
                                key={amount}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuickAdd(amount)}
                                className="py-2.5 px-3 bg-gradient-to-r from-mint-100 to-skyBlue-100 hover:from-mint-200 hover:to-skyBlue-200 rounded-lg text-sm font-semibold text-gray-700 transition-all flex items-center justify-center gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                ₹{amount >= 1000 ? `${amount / 1000}k` : amount}
                            </motion.button>
                        ))}
                    </div>
                )}

                {/* Complete Message */}
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-3 px-4 bg-emerald-100 rounded-lg"
                    >
                        <p className="text-emerald-700 font-bold text-lg">
                            🎉 Goal Achieved!
                        </p>
                        <p className="text-emerald-600 text-sm mt-1">
                            Congratulations on reaching your milestone!
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
