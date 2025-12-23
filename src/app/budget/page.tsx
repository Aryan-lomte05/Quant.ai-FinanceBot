"use client";

import { useState } from "react";
import { CategoryAllocation } from "@/components/budget/CategoryAllocation";
import { ComparisonChart } from "@/components/budget/ComparisonChart";
import { BudgetSlider } from "@/components/budget/BudgetSlider";
import { mockData } from "@/lib/api/mock-data";
import { Target, TrendingDown, IndianRupee, PieChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export default function BudgetPage() {
    const budgetData = mockData.budget;
    const totalSpent = budgetData.allocations.reduce((acc, curr) => acc + curr.spent, 0);
    const totalAllocated = budgetData.allocations.reduce((acc, curr) => acc + curr.allocated, 0);
    const savingsRate = ((budgetData.totalIncome - totalSpent) / budgetData.totalIncome) * 100;
    const [adjustmentValue, setAdjustmentValue] = useState(2500);

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Budgeting</h1>
                    <p className="text-gray-600 mt-1">Manage your limits and optimize savings</p>
                </div>
                <Button className="gap-2 bg-gradient-to-r from-mint-600 to-skyBlue-600 hover:from-mint-700 hover:to-skyBlue-700">
                    <Target className="w-4 h-4" />
                    Reset Monthly Budget
                </Button>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-5 rounded-2xl border border-white/50 flex flex-col gap-3"
                >
                    <div className="w-10 h-10 bg-mint-100 rounded-xl flex items-center justify-center text-mint-600">
                        <IndianRupee className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Spent</p>
                        <h2 className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</h2>
                    </div>
                    <div className="text-xs text-gray-500">
                        Out of {formatCurrency(budgetData.totalIncome)} income
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-5 rounded-2xl border border-white/50 flex flex-col gap-3"
                >
                    <div className="w-10 h-10 bg-skyBlue-100 rounded-xl flex items-center justify-center text-skyBlue-600">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Safe to Spend</p>
                        <h2 className="text-2xl font-bold text-gray-900">{formatCurrency(totalAllocated - totalSpent)}</h2>
                    </div>
                    <div className="text-xs text-mint-600 font-semibold">
                        You're {((totalSpent / totalAllocated) * 100).toFixed(0)}% through your budget
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass p-5 rounded-2xl border border-white/50 flex flex-col gap-3"
                >
                    <div className="w-10 h-10 bg-lavender-100 rounded-xl flex items-center justify-center text-lavender-600">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Savings Rate</p>
                        <h2 className="text-2xl font-bold text-gray-900">{savingsRate.toFixed(1)}%</h2>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-mint-600 font-semibold">
                        <Sparkles className="w-3 h-3" />
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Budget vs Actual Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="w-5 h-5 text-mint-500" />
                        <h3 className="font-bold text-gray-900">Spending vs Budget</h3>
                    </div>
                    <ComparisonChart />
                </div>

                {/* Category Allocations */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-skyBlue-500" />
                            <h3 className="font-bold text-gray-900">Category Limits</h3>
                        </div>
                        <button className="text-sm text-skyBlue-600 font-semibold hover:underline">
                            Edit All
                        </button>
                    </div>
                    <CategoryAllocation allocations={budgetData.allocations as any} />
                </div>
            </div>

            {/* Smart Budget Adjustment Tool */}
            <div className="bg-gradient-to-r from-mint-500/10 to-skyBlue-500/10 p-8 rounded-3xl border border-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-32 h-32" />
                </div>
                <div className="max-w-xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-mint-600 shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        AI RECOMMENDED ADJUSTMENT
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Optimize your monthly savings</h2>
                    <p className="text-gray-600">
                        Based on your spending patterns, we suggest reducing "Food & Dining" by 10% and allocating it to your "Emergency Fund".
                    </p>
                    <div className="pt-4">
                        <BudgetSlider
                            label="Emergency Fund Adjustment"
                            value={adjustmentValue}
                            onChange={setAdjustmentValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
