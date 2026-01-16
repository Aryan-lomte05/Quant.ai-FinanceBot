'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, Car, Home, Heart, Zap, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { mockData } from '@/lib/api/mock-data';

interface BudgetCategory {
    id: string;
    name: string;
    spent: number;
    budget: number;
    icon: any;
    color: string;
    gradient: string;
}

interface BudgetProgressBarsProps {
    allocations?: Array<{ category: string; spent: number; allocated: number }>;
}

export function BudgetProgressBars({ allocations = [] }: BudgetProgressBarsProps) {
    const getCategoryStyles = (category: string) => {
        switch (category) {
            case 'Shopping': return { icon: ShoppingBag, color: '#EC4899', gradient: 'from-pink-500 to-rose-600' };
            case 'Food & Dining': return { icon: Utensils, color: '#F59E0B', gradient: 'from-orange-500 to-amber-600' };
            case 'Transport': return { icon: Car, color: '#3B82F6', gradient: 'from-blue-500 to-cyan-600' };
            case 'Bills & Utilities': return { icon: Zap, color: '#10B981', gradient: 'from-emerald-500 to-green-600' };
            case 'Housing': return { icon: Home, color: '#8B5CF6', gradient: 'from-purple-500 to-violet-600' };
            case 'Healthcare': return { icon: Heart, color: '#EF4444', gradient: 'from-red-500 to-pink-600' };
            default: return { icon: TrendingUp, color: '#6B7280', gradient: 'from-gray-500 to-gray-600' };
        }
    };

    const budgets: BudgetCategory[] = (allocations.length > 0 ? allocations : mockData.budget.allocations)
        .slice(0, 6)
        .map((allocation, index) => {
            const styles = getCategoryStyles(allocation.category);
            return {
                id: String(index + 1),
                name: allocation.category,
                spent: allocation.spent || 0,
                budget: allocation.allocated || 1,
                icon: styles.icon,
                color: styles.color,
                gradient: styles.gradient
            };
        });

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
            initial={{ opacity: 0, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.01 }}
            className="relative rounded-3xl overflow-hidden p-6"
            style={{
                background: 'linear-gradient(145deg, #BFFF00 0%, #D4FF33 50%, #E8FF80 100%)',
                boxShadow: '0 20px 40px rgba(191, 255, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)'
            }}
        >
            {/* Floating decorative elements */}
            <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-10 -left-10 w-48 h-48 bg-green-400/30 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.7, type: 'spring' }}
                        className="w-12 h-12 rounded-2xl bg-gray-900/10 flex items-center justify-center shadow-lg"
                    >
                        <Target className="w-6 h-6 text-gray-900" />
                    </motion.div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Budget Progress</h3>
                        <p className="text-sm text-gray-700">Track spending across categories</p>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                    className="text-right px-4 py-2 rounded-xl bg-white/50"
                >
                    <p className="text-xs text-gray-600 mb-1">Overall Usage</p>
                    <div className="flex items-center gap-2">
                        <motion.span
                            className={`text-2xl font-black ${getStatusColor(overallPercentage)}`}
                            animate={overallPercentage >= 85 ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            {overallPercentage.toFixed(0)}%
                        </motion.span>
                        {overallPercentage >= 85 && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    </div>
                </motion.div>
            </div>

            {/* Overall Progress Summary */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Total Budget Usage</span>
                    <span className="text-sm font-bold text-gray-900">
                        ₹{totalSpent.toLocaleString('en-IN')} / ₹{totalBudget.toLocaleString('en-IN')}
                    </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${overallPercentage}%` }}
                        transition={{ duration: 1.5, delay: 0.9, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${getProgressColor(overallPercentage)} rounded-full relative overflow-hidden`}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Category Progress Bars */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgets.map((budget, index) => {
                    const Icon = budget.icon;
                    const percentage = (budget.spent / budget.budget) * 100;
                    const remaining = budget.budget - budget.spent;
                    const isPulse = shouldPulse(percentage);

                    return (
                        <motion.div
                            key={budget.id}
                            initial={{ opacity: 0, x: -20, rotateZ: -2 }}
                            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -3 }}
                            className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${budget.gradient} flex items-center justify-center shadow-lg`}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{budget.name}</p>
                                        <p className="text-xs text-gray-500">₹{remaining.toLocaleString('en-IN')} left</p>
                                    </div>
                                </div>
                                <motion.div
                                    className={`text-lg font-bold ${getStatusColor(percentage)}`}
                                    animate={isPulse ? { scale: [1, 1.1, 1] } : {}}
                                    transition={isPulse ? { repeat: Infinity, duration: 1.5 } : {}}
                                >
                                    {percentage.toFixed(0)}%
                                </motion.div>
                            </div>

                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                                    transition={{ duration: 1.2, delay: 1.2 + index * 0.1 }}
                                    className={`h-full bg-gradient-to-r ${getProgressColor(percentage)} rounded-full relative overflow-hidden`}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 2 }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
