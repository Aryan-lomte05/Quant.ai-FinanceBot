'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, Calendar, ArrowRight, Zap, PiggyBank, Wallet } from 'lucide-react';
import { mockData } from '@/lib/api/mock-data';

interface TimeComparison {
    period: string;
    label: string;
    current: {
        income: number;
        expenses: number;
        savings: number;
        balance: number;
    };
    past: {
        income: number;
        expenses: number;
        savings: number;
        balance: number;
    };
}

export function FinancialTimeMachine() {
    const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

    const comparisons: Record<string, TimeComparison> = mockData.financialHistory as any;

    const data = comparisons[selectedPeriod];

    const calculateChange = (current: number, past: number) => {
        const change = current - past;
        const percentage = ((change / past) * 100).toFixed(1);
        return { change, percentage, isPositive: change >= 0 };
    };

    const metrics = [
        {
            name: 'Income',
            current: data.current.income,
            past: data.past.income,
            icon: TrendingUp,
            color: 'emerald',
            gradient: 'from-emerald-500 to-green-600',
            goodDirection: 'up',
        },
        {
            name: 'Expenses',
            current: data.current.expenses,
            past: data.past.expenses,
            icon: Wallet,
            color: 'red',
            gradient: 'from-red-500 to-rose-600',
            goodDirection: 'down',
        },
        {
            name: 'Savings',
            current: data.current.savings,
            past: data.past.savings,
            icon: PiggyBank,
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-600',
            goodDirection: 'up',
        },
        {
            name: 'Balance',
            current: data.current.balance,
            past: data.past.balance,
            icon: Zap,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-600',
            goodDirection: 'up',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg relative">
                        <Clock className="w-6 h-6 text-white" />
                        <motion.div
                            className="absolute inset-0 rounded-xl bg-white"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Financial Time Machine</h3>
                        <p className="text-sm text-gray-500">Compare your financial journey</p>
                    </div>
                </div>

                {/* Period Selector */}
                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                    {(['month', 'quarter', 'year'] as const).map((period) => (
                        <motion.button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedPeriod === period
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                : 'text-gray-600 hover:bg-white'
                                }`}
                        >
                            {period === 'month' ? '1M' : period === 'quarter' ? '3M' : '1Y'}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Time Comparison Label */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 mb-6"
            >
                <div className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
                    <span className="text-sm font-semibold text-indigo-700">
                        Current {data.period}
                    </span>
                </div>
                <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                </motion.div>
                <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
                    <span className="text-sm font-semibold text-gray-600">{data.label}</span>
                </div>
            </motion.div>

            {/* Metrics Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedPeriod}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                >
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        const change = calculateChange(metric.current, metric.past);
                        const isGood = metric.goodDirection === 'up' ? change.isPositive : !change.isPositive;

                        return (
                            <motion.div
                                key={metric.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ y: -3, scale: 1.02 }}
                                className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all group"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg`}
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                        >
                                            <Icon className="w-5 h-5 text-white" />
                                        </motion.div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                                        </div>
                                    </div>

                                    {/* Change Badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
                                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${isGood
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {change.isPositive ? (
                                            <TrendingUp className="w-3.5 h-3.5" />
                                        ) : (
                                            <TrendingDown className="w-3.5 h-3.5" />
                                        )}
                                        <span className="text-xs font-bold">{change.percentage}%</span>
                                    </motion.div>
                                </div>

                                {/* Values Comparison */}
                                <div className="space-y-3">
                                    {/* Current Value */}
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Current</p>
                                        <p className="text-2xl font-black text-gray-900">
                                            ₹{metric.current.toLocaleString('en-IN')}
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative">
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min((metric.current / Math.max(metric.current, metric.past)) * 100, 100)}%` }}
                                                transition={{ duration: 1, delay: 1 + index * 0.1 }}
                                                className={`h-full bg-gradient-to-r ${metric.gradient} rounded-full`}
                                            />
                                        </div>
                                    </div>

                                    {/* Past Value */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-500">Previous</p>
                                        <p className="text-sm font-bold text-gray-600">
                                            ₹{metric.past.toLocaleString('en-IN')}
                                        </p>
                                    </div>

                                    {/* Change Amount */}
                                    <div className={`pt-2 border-t border-gray-200`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600 font-medium">Change</span>
                                            <span className={`text-sm font-bold ${change.isPositive ? 'text-emerald-600' : 'text-red-600'
                                                }`}>
                                                {change.isPositive ? '+' : ''}₹{Math.abs(change.change).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Summary Insight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Time Travel Summary</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {calculateChange(data.current.balance, data.past.balance).isPositive ? (
                                <>
                                    <span className="font-semibold text-emerald-600">Great progress!</span> Your net worth increased by{' '}
                                    <span className="font-bold text-indigo-600">
                                        ₹{Math.abs(calculateChange(data.current.balance, data.past.balance).change).toLocaleString('en-IN')}
                                    </span>{' '}
                                    ({calculateChange(data.current.balance, data.past.balance).percentage}%) in the past {data.period.toLowerCase()}.
                                    Keep up the excellent work! 🚀
                                </>
                            ) : (
                                <>
                                    Your balance decreased by{' '}
                                    <span className="font-bold text-red-600">
                                        ₹{Math.abs(calculateChange(data.current.balance, data.past.balance).change).toLocaleString('en-IN')}
                                    </span>
                                    . Focus on increasing income and reducing expenses. 💪
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
