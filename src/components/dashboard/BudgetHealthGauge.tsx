'use client';

import { motion } from 'framer-motion';
import { Gauge, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface BudgetHealthGaugeProps {
    spent: number;
    budget: number;
}

export function BudgetHealthGauge({ spent, budget }: BudgetHealthGaugeProps) {
    const percentage = Math.min((spent / budget) * 100, 100);
    const remaining = Math.max(budget - spent, 0);
    const remainingPercentage = Math.max(100 - percentage, 0);

    // Determine health status and color
    const getHealthStatus = () => {
        if (percentage < 50) {
            return {
                status: 'Excellent',
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-50',
                icon: CheckCircle,
                message: 'You are well within budget! Keep it up! 🎉',
            };
        } else if (percentage < 75) {
            return {
                status: 'Good',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                icon: TrendingUp,
                message: 'Spending on track. Stay mindful! 👍',
            };
        } else if (percentage < 90) {
            return {
                status: 'Caution',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                icon: AlertTriangle,
                message: 'Approaching budget limit. Watch spending! ⚠️',
            };
        } else {
            return {
                status: 'Critical',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                icon: AlertTriangle,
                message: 'Budget nearly exhausted! Reduce spending! 🚨',
            };
        }
    };

    const health = getHealthStatus();
    const StatusIcon = health.icon;

    // Calculate needle rotation (-90° to 90°, where 0° is center/top)
    const needleRotation = (percentage / 100) * 180 - 90;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Gauge className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Budget Health</h3>
                        <p className="text-xs text-gray-500">This month's status</p>
                    </div>
                </div>

                {/* Status Badge */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${health.bgColor}`}
                >
                    <StatusIcon className={`w-5 h-5 ${health.color}`} />
                    <span className={`font-bold ${health.color}`}>{health.status}</span>
                </motion.div>
            </div>

            {/* Speedometer - CLEAN VERSION */}
            <div className="relative flex items-center justify-center mb-8 h-44">
                {/* Gauge Background Circle */}
                <svg width="280" height="160" viewBox="0 0 280 160" className="absolute">
                    {/* Background arc - light gray */}
                    <path
                        d="M 30 140 A 110 110 0 0 1 250 140"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="20"
                        strokeLinecap="round"
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="speedometerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="40%" stopColor="#3B82F6" />
                            <stop offset="70%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#EF4444" />
                        </linearGradient>
                    </defs>

                    {/* Animated gradient arc */}
                    <motion.path
                        d="M 30 140 A 110 110 0 0 1 250 140"
                        fill="none"
                        stroke="url(#speedometerGradient)"
                        strokeWidth="20"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    />

                    {/* Center pivot base */}
                    <circle cx="140" cy="140" r="10" fill="#1F2937" />

                    {/* Needle */}
                    <motion.g
                        initial={{ rotate: -90 }}
                        animate={{ rotate: needleRotation }}
                        transition={{
                            duration: 2,
                            delay: 1.8,
                            type: 'spring',
                            stiffness: 50,
                            damping: 12,
                        }}
                        style={{ transformOrigin: '140px 140px' }}
                    >
                        {/* Needle line */}
                        <line
                            x1="140"
                            y1="140"
                            x2="140"
                            y2="45"
                            stroke="#374151"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Needle tip circle */}
                        <circle cx="140" cy="45" r="6" fill="#EF4444" />
                    </motion.g>
                </svg>

                {/* Center percentage value */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2.5, type: 'spring' }}
                    className="absolute bottom-4 text-center"
                >
                    <div className={`text-5xl font-black ${health.color} leading-none mb-1`}>
                        {percentage.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Budget Used</div>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }}
                className="grid grid-cols-2 gap-4 mb-4"
            >
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total Budget</p>
                    <p className="text-xl font-bold text-gray-900">
                        ₹{budget.toLocaleString('en-IN')}
                    </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Spent</p>
                    <p className={`text-xl font-bold ${health.color}`}>
                        ₹{spent.toLocaleString('en-IN')}
                    </p>
                </div>
            </motion.div>

            {/* Remaining Amount Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className={`p-5 rounded-xl ${health.bgColor} border-2 border-${health.color.split('-')[1]}-200`}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Remaining</span>
                    <span className={`text-sm font-bold ${health.color}`}>
                        {remainingPercentage.toFixed(0)}%
                    </span>
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">
                    ₹{remaining.toLocaleString('en-IN')}
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-white/50 rounded-full overflow-hidden mb-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${remainingPercentage}%` }}
                        transition={{ duration: 1.5, delay: 3.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                    />
                </div>

                <p className="text-xs text-gray-600">{health.message}</p>
            </motion.div>
        </motion.div>
    );
}
