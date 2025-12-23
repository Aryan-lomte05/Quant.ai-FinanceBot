'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Calendar } from 'lucide-react';

export function EmergencyFundBarometer() {
    // Emergency fund data
    const currentAmount = 125000;
    const targetAmount = 200000;
    const monthlyExpenses = 40000;
    const monthsCovered = currentAmount / monthlyExpenses;
    const percentage = (currentAmount / targetAmount) * 100;
    const recommendedMonths = 6;

    // Status calculation
    const getStatus = () => {
        if (monthsCovered >= 6) {
            return {
                level: 'Excellent',
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-50',
                thermometerColor: '#10B981',
                icon: CheckCircle,
                message: 'Your emergency fund is well-established! 🎉',
            };
        } else if (monthsCovered >= 4) {
            return {
                level: 'Good',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                thermometerColor: '#3B82F6',
                icon: TrendingUp,
                message: 'Good progress! Keep building your fund. 👍',
            };
        } else if (monthsCovered >= 2) {
            return {
                level: 'Fair',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                thermometerColor: '#F59E0B',
                icon: AlertTriangle,
                message: 'Getting there! Aim for at least 6 months. ⚠️',
            };
        } else {
            return {
                level: 'Critical',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                thermometerColor: '#EF4444',
                icon: AlertTriangle,
                message: 'Priority! Build your emergency fund now. 🚨',
            };
        }
    };

    const status = getStatus();
    const StatusIcon = status.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Emergency Fund</h3>
                        <p className="text-xs text-gray-500">Your financial safety net</p>
                    </div>
                </div>

                {/* Status Badge */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bgColor}`}
                >
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    <span className={`font-bold ${status.color}`}>{status.level}</span>
                </motion.div>
            </div>

            {/* Main Content - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thermometer Visualization */}
                <div className="flex items-center justify-center">
                    <div className="relative">
                        {/* Thermometer Container */}
                        <div className="relative w-24 h-80 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                            {/* Filled portion with animation */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.min(percentage, 100)}%` }}
                                transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
                                className="absolute bottom-0 left-0 right-0 rounded-full overflow-hidden"
                                style={{ backgroundColor: status.thermometerColor }}
                            >
                                {/* Liquid wave effect */}
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: 'easeInOut',
                                    }}
                                />

                                {/* Bubbles */}
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-3 h-3 bg-white/30 rounded-full"
                                        style={{
                                            left: `${20 + i * 15}%`,
                                            bottom: `${i * 20}%`,
                                        }}
                                        animate={{
                                            y: [0, -280],
                                            opacity: [0, 1, 0],
                                            scale: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 4 + i,
                                            delay: i * 0.5,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                ))}
                            </motion.div>

                            {/* Graduation marks */}
                            {[0, 25, 50, 75, 100].map((mark) => (
                                <div
                                    key={mark}
                                    className="absolute right-0 w-full flex items-center justify-end pr-1"
                                    style={{ bottom: `${mark}%` }}
                                >
                                    <div className="w-3 h-0.5 bg-gray-400" />
                                    <span className="ml-2 text-xs text-gray-500 font-medium">{mark}%</span>
                                </div>
                            ))}
                        </div>

                        {/* Bulb at bottom */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: 'spring' }}
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
                            style={{ backgroundColor: status.thermometerColor }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                }}
                                className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center"
                            >
                                <DollarSign className="w-6 h-6 text-white" />
                            </motion.div>
                        </motion.div>

                        {/* Current percentage label */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 }}
                            className="absolute left-full ml-4 top-1/2 -translate-y-1/2"
                        >
                            <div className={`text-4xl font-black ${status.color}`}>
                                {percentage.toFixed(0)}%
                            </div>
                            <p className="text-xs text-gray-600 font-medium">of target</p>
                        </motion.div>
                    </div>
                </div>

                {/* Stats and Info */}
                <div className="space-y-4">
                    {/* Current Amount */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
                    >
                        <p className="text-xs text-emerald-700 font-medium mb-1">Current Balance</p>
                        <p className="text-3xl font-black text-emerald-800">
                            ₹{currentAmount.toLocaleString('en-IN')}
                        </p>
                    </motion.div>

                    {/* Target Amount */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-gray-600 font-medium">Target Amount</p>
                            <p className="text-lg font-bold text-gray-900">
                                ₹{targetAmount.toLocaleString('en-IN')}
                            </p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 2, delay: 0.9 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: status.thermometerColor }}
                            />
                        </div>
                    </motion.div>

                    {/* Months Covered */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className={`w-5 h-5 ${status.color}`} />
                            <p className="text-xs text-gray-700 font-medium">Coverage Period</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-4xl font-black ${status.color}`}>
                                {monthsCovered.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-600">months</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                            <span>Recommended: {recommendedMonths} months</span>
                            {monthsCovered >= recommendedMonths ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                            )}
                        </div>
                    </motion.div>

                    {/* Monthly Expenses Reference */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="p-4 bg-purple-50 rounded-xl border border-purple-200"
                    >
                        <p className="text-xs text-purple-700 font-medium mb-1">Monthly Expenses</p>
                        <p className="text-xl font-bold text-purple-800">
                            ₹{monthlyExpenses.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Based on your average spending</p>
                    </motion.div>

                    {/* Action needed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className={`p-4 rounded-xl border-2 ${status.bgColor}`}
                        style={{ borderColor: status.thermometerColor + '40' }}
                    >
                        <div className="flex items-start gap-3">
                            <StatusIcon className={`w-5 h-5 ${status.color} flex-shrink-0 mt-0.5`} />
                            <div>
                                <h4 className={`font-bold ${status.color} mb-1`}>Status Update</h4>
                                <p className="text-sm text-gray-700">{status.message}</p>
                                {monthsCovered < recommendedMonths && (
                                    <p className="text-xs text-gray-600 mt-2">
                                        💡 Save ₹{((recommendedMonths * monthlyExpenses - currentAmount) / 12).toFixed(0)}/month
                                        to reach your 6-month goal in a year!
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
