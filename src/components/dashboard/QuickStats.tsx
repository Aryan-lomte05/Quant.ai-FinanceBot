'use client';

import { motion, Variants } from 'framer-motion';
import { TrendingUp, TrendingDown, PiggyBank, Wallet, Percent, Zap } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

interface QuickStatsProps {
    monthSpent: number;
    monthSaved: number;
    savingsRate: number;
}

export function QuickStats({ monthSpent, monthSaved, savingsRate }: QuickStatsProps) {
    const stats = [
        {
            id: 1,
            label: 'Month Spent',
            value: monthSpent,
            icon: Wallet,
            trend: 'down',
            trendValue: 8,
            color: 'from-red-500 to-orange-500',
            bgColor: 'bg-red-50',
            iconColor: 'text-red-600',
            lightColor: 'text-red-700',
        },
        {
            id: 2,
            label: 'Month Saved',
            value: monthSaved,
            icon: PiggyBank,
            trend: 'up',
            trendValue: 15,
            color: 'from-emerald-500 to-green-600',
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            lightColor: 'text-emerald-700',
        },
        {
            id: 3,
            label: 'Savings Rate',
            value: savingsRate,
            icon: Percent,
            trend: 'up',
            trendValue: 5,
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            lightColor: 'text-blue-700',
            isPercentage: true,
        },
    ];

    // Staggered animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

                return (
                    <motion.div
                        key={stat.id}
                        variants={itemVariants}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            transition: { type: 'spring', stiffness: 300 } as const
                        }}
                        className="relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6 group"
                    >
                        {/* Gradient Overlay on Hover */}
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Header with Icon */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {stat.label}
                                    </p>

                                    {/* Animated Value */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.15, type: 'spring' as const }}
                                        className="text-3xl font-bold text-gray-900"
                                    >
                                        {stat.isPercentage ? (
                                            <span>{stat.value}%</span>
                                        ) : (
                                            <NumericFormat
                                                value={stat.value}
                                                displayType="text"
                                                thousandSeparator=","
                                                prefix="₹"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Icon with Pulse Animation */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        delay: 0.4 + index * 0.15,
                                        type: 'spring' as const,
                                        stiffness: 200,
                                    }}
                                    whileHover={{
                                        rotate: [0, -10, 10, -10, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                    className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                                >
                                    <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                                </motion.div>
                            </div>

                            {/* Trend Indicator with Animation */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.15 }}
                                className="flex items-center gap-3"
                            >
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${stat.trend === 'up'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    <TrendIcon className="w-3.5 h-3.5" />
                                    <span className="text-xs font-bold">
                                        {stat.trend === 'up' ? '+' : '-'}{stat.trendValue}%
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">vs last month</span>
                            </motion.div>

                            {/* Progress Bar (for visual appeal) */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    delay: 0.6 + index * 0.15,
                                    duration: 0.8,
                                    ease: 'easeOut'
                                }}
                                className="mt-4 h-1.5 bg-gray-200 rounded-full overflow-hidden"
                                style={{ transformOrigin: 'left' }}
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: stat.isPercentage
                                            ? `${stat.value}%`
                                            : `${Math.min((stat.value / 100000) * 100, 100)}%`
                                    }}
                                    transition={{
                                        delay: 0.8 + index * 0.15,
                                        duration: 1,
                                        ease: 'easeOut'
                                    }}
                                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative overflow-hidden`}
                                >
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                            </motion.div>

                            {/* Sparkle Icon (appears on hover) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileHover={{ opacity: 1, scale: 1 }}
                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
