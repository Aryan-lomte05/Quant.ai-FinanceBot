'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, Car, Home, Heart, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

interface BudgetCategory {
    id: string;
    name: string;
    spent: number;
    budget: number;
    icon: any;
    color: string;
    gradient: string;
}

export function BudgetProgressBars() {
    const budgets: BudgetCategory[] = [
        {
            id: '1',
            name: 'Shopping',
            spent: 12500,
            budget: 15000,
            icon: ShoppingBag,
            color: '#EC4899',
            gradient: 'from-pink-500 to-rose-600',
        },
        {
            id: '2',
            name: 'Food & Dining',
            spent: 8500,
            budget: 10000,
            icon: Utensils,
            color: '#F59E0B',
            gradient: 'from-orange-500 to-amber-600',
        },
        {
            id: '3',
            name: 'Transportation',
            spent: 7200,
            budget: 8000,
            icon: Car,
            color: '#3B82F6',
            gradient: 'from-blue-500 to-cyan-600',
        },
        {
            id: '4',
            name: 'Bills & Utilities',
            spent: 5800,
            budget: 6000,
            icon: Zap,
            color: '#10B981',
            gradient: 'from-emerald-500 to-green-600',
        },
        {
            id: '5',
            name: 'Housing',
            spent: 4000,
            budget: 5000,
            icon: Home,
            color: '#8B5CF6',
            gradient: 'from-purple-500 to-violet-600',
        },
        {
            id: '6',
            name: 'Healthcare',
            spent: 1500,
            budget: 3000,
            icon: Heart,
            color: '#EF4444',
            gradient: 'from-red-500 to-pink-600',
        },
    ];

    const getStatusColor = (percentage: number) => {
        if (percentage < 70) return 'text-emerald-600';
        if (percentage < 85) return 'text-orange-600';
        return 'text-red-600';
    };

    const getProgressColor = (percentage: number) => {
        if (percentage < 70) return 'from-emerald-400 via-green-500 to-emerald-600';
        if (percentage < 85) return 'from-yellow-400 via-orange-500 to-amber-600';
        return 'from-red-400 via-rose-500 to-red-600';
    };

    const shouldPulse = (percentage: number) => percentage >= 85;

    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
    const overallPercentage = (totalSpent / totalBudget) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Budget Progress</h3>
                    <p className="text-sm text-gray-500">Track spending across categories</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Overall Usage</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getStatusColor(overallPercentage)}`}>
                            {overallPercentage.toFixed(0)}%
                        </span>
                        {overallPercentage >= 85 && (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                    </div>
                </div>
            </div>

            {/* Overall Progress Summary */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Total Budget Usage</span>
                    <span className="text-sm font-bold text-gray-900">
                        ₹{totalSpent.toLocaleString('en-IN')} / ₹{totalBudget.toLocaleString('en-IN')}
                    </span>
                </div>

                {/* Overall Progress Bar */}
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${overallPercentage}%` }}
                        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${getProgressColor(overallPercentage)} rounded-full relative overflow-hidden`}
                    >
                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: 'linear',
                                repeatDelay: 1,
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Category Progress Bars */}
            <div className="space-y-5">
                {budgets.map((budget, index) => {
                    const Icon = budget.icon;
                    const percentage = (budget.spent / budget.budget) * 100;
                    const remaining = budget.budget - budget.spent;
                    const isPulse = shouldPulse(percentage);

                    return (
                        <motion.div
                            key={budget.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="group"
                        >
                            {/* Header Row */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${budget.gradient} flex items-center justify-center shadow-lg`}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </motion.div>

                                    {/* Name and Amount */}
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{budget.name}</p>
                                        <p className="text-xs text-gray-500">
                                            ₹{budget.spent.toLocaleString('en-IN')} / ₹{budget.budget.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>

                                {/* Percentage */}
                                <div className="text-right">
                                    <motion.div
                                        className={`text-lg font-bold ${getStatusColor(percentage)}`}
                                        animate={isPulse ? { scale: [1, 1.1, 1] } : {}}
                                        transition={isPulse ? { repeat: Infinity, duration: 2 } : {}}
                                    >
                                        {percentage.toFixed(0)}%
                                    </motion.div>
                                    <p className="text-xs text-gray-500">
                                        ₹{remaining.toLocaleString('en-IN')} left
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                                    transition={{ duration: 1.5, delay: 1 + index * 0.1, ease: 'easeOut' }}
                                    className={`h-full bg-gradient-to-r ${getProgressColor(percentage)} rounded-full relative overflow-hidden ${isPulse ? 'animate-pulse' : ''
                                        }`}
                                >
                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                        animate={{
                                            x: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: 'linear',
                                            repeatDelay: 1.5,
                                        }}
                                    />

                                    {/* Pulse animation for warning state */}
                                    {isPulse && (
                                        <motion.div
                                            className="absolute inset-0 bg-white/20"
                                            animate={{
                                                opacity: [0, 0.5, 0],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* Overflow indicator (if over 100%) */}
                                {percentage > 100 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-red-600/20 border-2 border-red-600 rounded-full"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-bold text-red-700">OVER BUDGET!</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Warning Message for High Usage */}
                            {isPulse && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg"
                                >
                                    <div className="flex items-center gap-2 text-xs text-red-700">
                                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                        <span className="font-medium">
                                            Warning: You've used {percentage.toFixed(0)}% of your budget. Consider reducing spending!
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom Insight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Budget Tip</h4>
                        <p className="text-sm text-gray-700">
                            {overallPercentage >= 85 ? (
                                <>You're approaching your budget limit! Try to reduce spending in high-usage categories. 🚨</>
                            ) : overallPercentage >= 70 ? (
                                <>Good progress! Monitor your spending to stay within budget. 👍</>
                            ) : (
                                <>Excellent! You're well within your budget limits. Keep it up! 🎉</>
                            )}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
