"use client";

import { useState } from "react";
import { TransactionList } from "@/components/transactions/TransactionList";
import { ReceiptScanner } from "@/components/transactions/ReceiptScanner";
import { VoiceInput } from "@/components/transactions/VoiceInput";
import { mockData } from "@/lib/api/mock-data";
import { Search, Plus, FileText, Mic, Download } from "lucide-react";
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
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="mm-heading-lg">Transactions</h1>
                    <p className="text-gray-600 mt-2">Track and manage your recent spending</p>
                </div>
                <button className="mm-btn mm-btn-primary">
                    <Plus className="w-5 h-5" />
                    Add Transaction
                </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mm-card flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-mm-orange/10 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-mm-orange" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-mm-black">Scan Receipt</h3>
                            <p className="text-sm text-gray-500">Auto-detect amount & category</p>
                        </div>
                    </div>
                    <ReceiptScanner />
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="mm-card flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-mm-purple/10 rounded-xl flex items-center justify-center">
                            <Mic className="w-6 h-6 text-mm-purple" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-mm-black">Voice Log</h3>
                            <p className="text-sm text-gray-500">"Spent ₹200 on Coffee"</p>
                        </div>
                    </div>
                    <VoiceInput />
                </motion.div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    className="pl-12 h-14 rounded-xl bg-white border-gray-200 text-base"
                    placeholder="Search by merchant or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Transaction List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mm-card"
            >
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-semibold text-gray-600">
                        {filteredTransactions.length} transactions
                    </span>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors text-mm-purple font-medium">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
                <TransactionList transactions={filteredTransactions as any} />
            </motion.div>
        </div>
    );
}
