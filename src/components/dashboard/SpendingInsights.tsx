'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, Target, Zap, ShoppingBag, Coffee, Star } from 'lucide-react';
import { mockData } from '@/lib/api/mock-data';

interface Insight {
    id: string;
    type: 'warning' | 'tip' | 'achievement' | 'trend';
    title: string;
    message: string;
    action?: string;
    icon: any;
    color: string;
    bgColor: string;
    gradient: string;
    value?: string;
}

export function SpendingInsights() {
    const getInsightStyles = (type: string) => {
        switch (type) {
            case 'spending_spike':
            case 'warning':
                return {
                    type: 'warning',
                    icon: AlertCircle,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50',
                    gradient: 'from-orange-400 to-red-500'
                };
            case 'achievement':
                return {
                    type: 'achievement',
                    icon: Star,
                    color: 'text-emerald-600',
                    bgColor: 'bg-emerald-50',
                    gradient: 'from-emerald-400 to-green-500'
                };
            case 'forecast':
            case 'trend':
                return {
                    type: 'trend',
                    icon: TrendingUp,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    gradient: 'from-blue-400 to-cyan-500'
                };
            default: // tip
                return {
                    type: 'tip',
                    icon: Lightbulb,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                    gradient: 'from-purple-400 to-pink-500'
                };
        }
    };

    const insights: Insight[] = mockData.insights.map(i => {
        const styles = getInsightStyles(i.type);
        return {
            id: i.id,
            type: styles.type as any,
            title: i.title,
            message: i.description,
            action: 'View Details',
            icon: styles.icon,
            color: styles.color,
            bgColor: styles.bgColor,
            gradient: styles.gradient,
            value: ''
        };
    });

    const getIconStyles = (type: string) => {
        switch (type) {
            case 'warning':
                return { animation: 'animate-pulse' };
            case 'achievement':
                return { animation: 'animate-bounce' };
            default:
                return {};
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Smart Insights</h3>
                        <p className="text-sm text-gray-500">AI-powered spending analysis</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl border border-violet-200">
                    <div className="w-2 h-2 bg-violet-600 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-violet-700">{insights.length} Active</span>
                </div>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;

                    return (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group relative overflow-hidden rounded-xl border-2 border-transparent hover:border-gray-200 transition-all cursor-pointer"
                        >
                            {/* Card Background */}
                            <div className={`p-5 ${insight.bgColor} h-full flex flex-col`}>
                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                                />

                                {/* Header with Icon and Value */}
                                <div className="flex items-start justify-between mb-3 relative z-10">
                                    <motion.div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center shadow-lg`}
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                    >
                                        <Icon
                                            className="w-6 h-6 text-white"
                                            style={getIconStyles(insight.type)}
                                        />
                                    </motion.div>

                                    {/* Value Badge */}
                                    {insight.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                                            className="px-3 py-1 bg-white rounded-full shadow-md"
                                        >
                                            <span className={`text-sm font-bold ${insight.color}`}>
                                                {insight.value}
                                            </span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Title */}
                                <h4 className={`font-bold text-gray-900 mb-2 text-base ${insight.color}`}>
                                    {insight.title}
                                </h4>

                                {/* Message */}
                                <p className="text-sm text-gray-700 mb-4 flex-grow leading-relaxed">
                                    {insight.message}
                                </p>

                                {/* Action Button */}
                                {insight.action && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${insight.gradient} text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all relative z-10`}
                                    >
                                        {insight.action}
                                    </motion.button>
                                )}

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} rounded-bl-full`} />
                                </div>
                            </div>

                            {/* Type Badge (Top Right Corner) */}
                            <div className="absolute top-3 right-3 z-20">
                                <div className={`w-2 h-2 rounded-full ${insight.type === 'warning' ? 'bg-orange-500 animate-pulse' :
                                    insight.type === 'achievement' ? 'bg-emerald-500' :
                                        insight.type === 'tip' ? 'bg-blue-500' :
                                            'bg-purple-500'
                                    }`} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">Weekly Summary</h4>
                        <p className="text-sm text-gray-700">
                            You've received <span className="font-bold text-violet-600">{insights.length} personalized insights</span> this week.
                            Acting on these could save you approximately <span className="font-bold text-emerald-600">₹5,300/month</span>! 💰
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Filter Tags (Optional Enhancement) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-4 flex items-center gap-2 flex-wrap"
            >
                <span className="text-xs text-gray-500 font-medium">Filter by:</span>
                {['All', 'Warnings', 'Tips', 'Achievements', 'Trends'].map((filter, idx) => (
                    <motion.button
                        key={filter}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + idx * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${idx === 0
                            ? 'bg-violet-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {filter}
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
}
