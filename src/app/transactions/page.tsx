"use client";

import { useState, useRef } from "react";
import { TransactionList } from "@/components/transactions/TransactionList";
import { ReceiptScanner } from "@/components/transactions/ReceiptScanner";
import { VoiceInput } from "@/components/transactions/VoiceInput";
import { mockData } from "@/lib/api/mock-data";
import { Search, Plus, FileText, Mic, Download, TrendingDown, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState([...mockData.transactions]);

    const filteredTransactions = transactions.filter(txn =>
        txn.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Scroll animations
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });

    const textScale = useSpring(
        useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.5, 0.75, 0.95, 1.0]),
        { stiffness: 100, damping: 30 }
    );
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

    const cardScale = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.98, 1.0]),
        { stiffness: 100, damping: 30 }
    );

    return (
        <div className="space-y-0">
            {/* SECTION 1: Hero - Cream Background */}
            <section ref={heroRef} className="mm-section-cream mm-section-spacing relative perspective-container overflow-hidden">
                <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto">
                    {/* Massive Headline */}
                    <motion.div
                        style={{
                            scale: textScale,
                            opacity: textOpacity
                        }}
                        className="mb-16"
                    >
                        <h1 className="mm-section-heading text-center">
                            YOUR MONEY
                            <br />
                            EVERY RUPEE TRACKED
                        </h1>
                        <p className="text-center text-xl text-gray-700 mt-6 max-w-2xl mx-auto">
                            Track and manage your recent spending with AI-powered insights
                        </p>
                    </motion.div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            style={{ scale: cardScale }}
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mm-card-colored mm-card-orange card-3d"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Scan Receipt</h3>
                                        <p className="opacity-90">Auto-detect amount & category</p>
                                    </div>
                                </div>
                                <ReceiptScanner />
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ scale: cardScale }}
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mm-card mm-card-medium card-3d bg-gradient-to-br from-mm-purple to-mm-lavender text-white"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <Mic className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Voice Log</h3>
                                        <p className="opacity-90">"Spent ₹200 on Coffee"</p>
                                    </div>
                                </div>
                                <VoiceInput />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Transactions List - Mint Background */}
            <section className="mm-section-mint mm-section-spacing">
                <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto">
                    {/* Search */}
                    <div className="relative mb-8">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                        <Input
                            className="pl-16 h-16 rounded-2xl bg-white border-gray-200 text-lg shadow-sm"
                            placeholder="Search by merchant or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Transaction List Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mm-card card-3d"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-mm-black">Recent Transactions</h3>
                                <p className="text-gray-600 mt-1">{filteredTransactions.length} transactions found</p>
                            </div>
                            <button className="mm-btn mm-btn-secondary flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export CSV
                            </button>
                        </div>
                        <TransactionList transactions={filteredTransactions as any} />
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: Add Transaction CTA - Orange Background */}
            <section className="mm-section-orange mm-section-spacing">
                <div className="mm-container px-8 py-16 w-full max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-mm-black mb-6 leading-tight">
                            Add Your
                            <br />
                            Transactions
                        </h2>
                        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                            Keep your financial records up to date with quick manual entry
                        </p>
                        <button className="mm-btn mm-btn-primary text-lg px-12 py-6">
                            <Plus className="w-6 h-6" />
                            Add Transaction
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
