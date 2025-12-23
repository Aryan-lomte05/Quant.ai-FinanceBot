"use client";

import { useState } from "react";
import { TransactionList } from "@/components/transactions/TransactionList";
import { ReceiptScanner } from "@/components/transactions/ReceiptScanner";
import { VoiceInput } from "@/components/transactions/VoiceInput";
import { mockData } from "@/lib/api/mock-data";
import { Search, Filter, Plus, FileText, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState([...mockData.transactions]);

    const filteredTransactions = transactions.filter(txn =>
        txn.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                    <p className="text-gray-600 mt-1">Track and manage your recent spending</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Transaction
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl border border-white/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-mint-100 rounded-lg flex items-center justify-center text-mint-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Scan Receipt</h3>
                            <p className="text-xs text-gray-500">Auto-detect amount & category</p>
                        </div>
                    </div>
                    <ReceiptScanner />
                </div>
                <div className="glass p-4 rounded-xl border border-white/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-skyBlue-100 rounded-lg flex items-center justify-center text-skyBlue-600">
                            <Mic className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Voice Log</h3>
                            <p className="text-xs text-gray-500">"Spent ₹200 on Coffee"</p>
                        </div>
                    </div>
                    <VoiceInput />
                </div>
            </div>

            {/* Search and Filters */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    className="pl-10 h-12 rounded-xl bg-white border-gray-200"
                    placeholder="Search by merchant or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Transaction List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-sm font-medium text-gray-600">
                        Showing {filteredTransactions.length} transactions
                    </span>
                    <button className="text-sm text-mint-600 font-semibold hover:underline">
                        Export CSV
                    </button>
                </div>
                <div className="p-2">
                    <TransactionList transactions={filteredTransactions as any} />
                </div>
            </motion.div>
        </div>
    );
}
