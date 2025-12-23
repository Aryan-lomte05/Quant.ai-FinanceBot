'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, TrendingDown, Wallet, ArrowUpRight, CreditCard, PiggyBank } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

interface BalanceCardProps {
    balance: number;
    trend: 'up' | 'down';
    trendPercentage: number;
}

export function BalanceCard({ balance, trend, trendPercentage }: BalanceCardProps) {
    const [showBalance, setShowBalance] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 rounded-3xl shadow-2xl border border-white/20 p-8 text-white"
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 80 + 40,
                            height: Math.random() * 80 + 40,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 12, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Main Balance Section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <p className="text-white/80 text-sm mb-2 font-medium">Total Balance</p>

                        <div className="flex items-center gap-3 mb-3">
                            <AnimatePresence mode="wait">
                                {showBalance ? (
                                    <motion.div
                                        key="visible"
                                        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.3 }}
                                        className="text-5xl font-bold"
                                    >
                                        <NumericFormat
                                            value={balance}
                                            displayType="text"
                                            thousandSeparator=","
                                            prefix="₹"
                                            renderText={(value) => <span>{value}</span>}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="hidden"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-5xl font-bold tracking-wider"
                                    >
                                        ₹●●●,●●●
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowBalance(!showBalance)}
                                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center shadow-lg"
                            >
                                <AnimatePresence mode="wait">
                                    {showBalance ? (
                                        <motion.div
                                            key="eye-off"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <EyeOff className="w-5 h-5" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="eye"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Eye className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>

                        {/* Trend Indicator */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2"
                        >
                            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${trend === 'up'
                                ? 'bg-green-400/20 text-green-100'
                                : 'bg-red-400/20 text-red-100'
                                }`}>
                                {trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                <span className="text-sm font-semibold">
                                    {trend === 'up' ? '+' : '-'}{trendPercentage}%
                                </span>
                            </div>
                            <span className="text-white/70 text-sm">vs last month</span>
                        </motion.div>
                    </div>

                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl"
                    >
                        <Wallet className="w-10 h-10" />
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-3"
                >
                    {[
                        { label: 'Add Money', icon: ArrowUpRight, color: 'from-green-400 to-emerald-500' },
                        { label: 'Transfer', icon: TrendingUp, color: 'from-blue-400 to-cyan-500' },
                        { label: 'Pay Bills', icon: CreditCard, color: 'from-purple-400 to-pink-500' },
                    ].map((action, idx) => {
                        const Icon = action.icon;
                        return (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center gap-2 text-sm font-medium"
                            >
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="hidden sm:inline">{action.label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    );
}
