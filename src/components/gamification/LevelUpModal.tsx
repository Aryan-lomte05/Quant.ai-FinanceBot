'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Star, Trophy } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/lib/hooks/useWindowSize';

interface LevelUpModalProps {
    newLevel: number;
    isOpen: boolean;
    onClose: () => void;
}

export function LevelUpModal({ newLevel, isOpen, onClose }: LevelUpModalProps) {
    const { width, height } = useWindowSize();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={300}
                        colors={['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6']}
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            transition={{ type: 'spring', duration: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative backdrop-blur-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl shadow-2xl p-8 max-w-md w-full text-white"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                >
                                    <Zap className="w-16 h-16" />
                                </motion.div>

                                <h2 className="text-4xl font-bold mb-2">LEVEL UP!</h2>
                                <div className="text-6xl font-black mb-4">{newLevel}</div>
                                <p className="text-lg opacity-90 mb-6">
                                    You're getting better at managing your finances!
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="w-full py-3 rounded-xl bg-white text-pink-600 font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Keep Going! 🔥
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
