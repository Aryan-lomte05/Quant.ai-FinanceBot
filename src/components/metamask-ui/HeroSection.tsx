'use client';

import { Animated3DWallet } from '@/components/3d/WalletModel';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden py-20 md:py-32">
            {/* Background Geometric Shapes */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
                    <path d="M250 150 L350 400 L150 400 Z" fill="#E17726" />
                    <path d="M750 200 L900 500 L600 500 Z" fill="#3C154E" />
                    <path d="M100 700 L200 900 L0 900 Z" fill="#00E676" />
                    <path d="M850 750 L950 900 L750 900 Z" fill="#B794F6" />
                </svg>
            </div>

            <div className="mm-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mm-heading-mega mb-6">
                            YOUR WEALTH
                            <br />
                            IN CONTROL
                        </h1>

                        <p className="mm-body-lg text-gray-700 mb-8 max-w-lg">
                            Take charge of your financial future with AI-powered insights,
                            smart budgeting, and personalized recommendations. Your personal
                            finance companion for a better tomorrow.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/auth/signup" className="mm-btn mm-btn-primary group">
                                GET STARTED
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link href="#features" className="mm-btn mm-btn-secondary">
                                LEARN MORE
                            </Link>
                        </div>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-300"
                        >
                            <div>
                                <div className="text-3xl font-bold text-mm-purple">10K+</div>
                                <div className="text-sm text-gray-600">Active Users</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-mm-purple">₹500Cr+</div>
                                <div className="text-sm text-gray-600">Money Managed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-mm-purple">4.9★</div>
                                <div className="text-sm text-gray-600">User Rating</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: 3D Wallet */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative h-[500px] lg:h-[600px]"
                    >
                        <Animated3DWallet />

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: 'spring' }}
                            className="absolute top-10 right-10 bg-white rounded-2xl p-4 shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-mm-green" />
                                <div>
                                    <div className="text-xs text-gray-500">Financial Score</div>
                                    <div className="text-2xl font-bold text-mm-purple">782</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
