'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface SpendingSparklineProps {
    data: Array<{ date: string; amount: number }>;
}

export function SpendingSparkline({ data }: SpendingSparklineProps) {
    // Calculate trend
    const firstValue = data[0]?.amount || 0;
    const lastValue = data[data.length - 1]?.amount || 0;
    const percentChange = ((lastValue - firstValue) / firstValue) * 100;
    const isPositive = percentChange >= 0;

    // Calculate stats
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const average = Math.round(total / data.length);
    const max = Math.max(...data.map(d => d.amount));
    const min = Math.min(...data.map(d => d.amount));

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-xl px-4 py-2 shadow-xl"
                >
                    <p className="text-xs text-gray-600 mb-1">{payload[0].payload.date}</p>
                    <p className="text-lg font-bold text-gray-900">
                        ₹{payload[0].value.toLocaleString('en-IN')}
                    </p>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Spending Trend</h3>
                            <p className="text-xs text-gray-500">Last 30 days</p>
                        </div>
                    </div>

                    {/* Average Spending */}
                    <div className="flex items-center gap-4 mt-3">
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Daily Average</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{average.toLocaleString('en-IN')}
                            </p>
                        </div>

                        {/* Trend Badge */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8, type: 'spring' }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${isPositive
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}
                        >
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="text-sm font-bold">
                                {Math.abs(percentChange).toFixed(1)}%
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Min/Max Stats */}
                <div className="text-right">
                    <div className="mb-2">
                        <p className="text-xs text-gray-500">Highest</p>
                        <p className="text-sm font-bold text-red-600">
                            ₹{max.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Lowest</p>
                        <p className="text-sm font-bold text-emerald-600">
                            ₹{min.toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sparkline Chart */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="h-32 -mx-2"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#EC4899" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <Tooltip content={<CustomTooltip />} cursor={false} />

                        {/* Line */}
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="url(#sparklineGradient)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 6,
                                fill: '#8B5CF6',
                                stroke: '#fff',
                                strokeWidth: 2,
                            }}
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Bottom Progress Bar */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden"
                style={{ transformOrigin: 'left' }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((average / max) * 100, 100)}%` }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full relative overflow-hidden"
                >
                    {/* Shimmer */}
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
            </motion.div>

            {/* Caption */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="text-xs text-gray-500 mt-3 text-center"
            >
                {isPositive
                    ? '📈 Spending increased compared to last period'
                    : '📉 Great! You reduced spending compared to last period'
                }
            </motion.p>
        </motion.div>
    );
}
