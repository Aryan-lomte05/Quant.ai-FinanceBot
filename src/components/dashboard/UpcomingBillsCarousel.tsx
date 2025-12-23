'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, Zap, Wifi, Phone, Home, CreditCard, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface Bill {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    category: 'electricity' | 'internet' | 'phone' | 'rent' | 'other';
    status: 'upcoming' | 'due-soon' | 'overdue';
    daysUntilDue: number;
}

const mockBills: Bill[] = [
    {
        id: '1',
        name: 'Electricity Bill',
        amount: 2450,
        dueDate: 'Dec 28, 2025',
        category: 'electricity',
        status: 'due-soon',
        daysUntilDue: 4,
    },
    {
        id: '2',
        name: 'Internet - Airtel Fiber',
        amount: 999,
        dueDate: 'Dec 30, 2025',
        category: 'internet',
        status: 'upcoming',
        daysUntilDue: 6,
    },
    {
        id: '3',
        name: 'Mobile Recharge',
        amount: 599,
        dueDate: 'Jan 5, 2026',
        category: 'phone',
        status: 'upcoming',
        daysUntilDue: 12,
    },
    {
        id: '4',
        name: 'House Rent',
        amount: 15000,
        dueDate: 'Jan 1, 2026',
        category: 'rent',
        status: 'upcoming',
        daysUntilDue: 8,
    },
    {
        id: '5',
        name: 'Credit Card Payment',
        amount: 8750,
        dueDate: 'Dec 26, 2025',
        category: 'other',
        status: 'due-soon',
        daysUntilDue: 2,
    },
];

const categoryIcons = {
    electricity: Zap,
    internet: Wifi,
    phone: Phone,
    rent: Home,
    other: CreditCard,
};

const categoryColors = {
    electricity: { bg: 'bg-yellow-100', icon: 'text-yellow-600', gradient: 'from-yellow-400 to-orange-500' },
    internet: { bg: 'bg-blue-100', icon: 'text-blue-600', gradient: 'from-blue-400 to-cyan-500' },
    phone: { bg: 'bg-purple-100', icon: 'text-purple-600', gradient: 'from-purple-400 to-pink-500' },
    rent: { bg: 'bg-green-100', icon: 'text-green-600', gradient: 'from-green-400 to-emerald-500' },
    other: { bg: 'bg-gray-100', icon: 'text-gray-600', gradient: 'from-gray-400 to-gray-600' },
};

export function UpcomingBillsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextBill = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % mockBills.length);
    };

    const prevBill = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + mockBills.length) % mockBills.length);
    };

    const currentBill = mockBills[currentIndex];
    const Icon = categoryIcons[currentBill.category];
    const colors = categoryColors[currentBill.category];

    const getStatusBadge = (status: Bill['status'], days: number) => {
        if (status === 'overdue') {
            return { text: 'Overdue', color: 'bg-red-100 text-red-700', icon: '🚨' };
        } else if (status === 'due-soon') {
            return { text: `Due in ${days} days`, color: 'bg-orange-100 text-orange-700', icon: '⚠️' };
        } else {
            return { text: `${days} days left`, color: 'bg-blue-100 text-blue-700', icon: '📅' };
        }
    };

    const statusBadge = getStatusBadge(currentBill.status, currentBill.daysUntilDue);

    // Swipe variants
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
        }),
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Upcoming Bills</h3>
                        <p className="text-xs text-gray-500">{mockBills.length} bills pending</p>
                    </div>
                </div>

                {/* Total Amount */}
                <div className="text-right">
                    <p className="text-xs text-gray-500">Total Due</p>
                    <p className="text-xl font-bold text-gray-900">
                        ₹{mockBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Bill Card with Swipe Animation */}
                <div className="relative h-64 mb-4 overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                            }}
                            className="absolute inset-0"
                        >
                            {/* Bill Card */}
                            <div className={`h-full rounded-2xl bg-gradient-to-br ${colors.gradient} p-6 text-white shadow-2xl relative overflow-hidden`}>
                                {/* Decorative circles */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    {/* Top Section */}
                                    <div>
                                        <div className="flex items-start justify-between mb-4">
                                            {/* Category Icon */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.2, type: 'spring' }}
                                                className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl"
                                            >
                                                <Icon className="w-8 h-8" />
                                            </motion.div>

                                            {/* Status Badge */}
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className={`px-3 py-1.5 rounded-full ${statusBadge.color} text-xs font-bold flex items-center gap-1`}
                                            >
                                                <span>{statusBadge.icon}</span>
                                                {statusBadge.text}
                                            </motion.div>
                                        </div>

                                        {/* Bill Name */}
                                        <motion.h4
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-2xl font-bold mb-2"
                                        >
                                            {currentBill.name}
                                        </motion.h4>

                                        {/* Due Date */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex items-center gap-2 text-white/90 text-sm"
                                        >
                                            <Clock className="w-4 h-4" />
                                            Due: {currentBill.dueDate}
                                        </motion.div>
                                    </div>

                                    {/* Bottom Section - Amount */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <p className="text-sm text-white/80 mb-1">Amount Due</p>
                                        <div className="flex items-end gap-2">
                                            <span className="text-5xl font-black">
                                                ₹{currentBill.amount.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mb-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevBill}
                        className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center shadow-lg"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </motion.button>

                    {/* Dots Indicator */}
                    <div className="flex items-center gap-2">
                        {mockBills.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className="group"
                            >
                                <motion.div
                                    className={`h-2 rounded-full transition-all ${idx === currentIndex
                                            ? 'w-8 bg-gradient-to-r from-pink-500 to-rose-600'
                                            : 'w-2 bg-gray-300 group-hover:bg-gray-400'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                />
                            </button>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextBill}
                        className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center shadow-lg"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </motion.button>
                </div>

                {/* Pay Now Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                    Pay Now
                </motion.button>
            </div>
        </motion.div>
    );
}
