"use client";

import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface QuickStatsProps {
    monthSpent: number;
    monthSaved: number;
    savingsRate: number;
}

export function QuickStats({ monthSpent, monthSaved, savingsRate }: QuickStatsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const stats = [
        {
            label: "This Month Spent",
            value: formatCurrency(monthSpent),
            icon: ArrowDownCircle,
            color: "coral",
            bgColor: "bg-coral-50",
            textColor: "text-coral-600",
        },
        {
            label: "This Month Saved",
            value: formatCurrency(monthSaved),
            icon: ArrowUpCircle,
            color: "mint",
            bgColor: "bg-mint-50",
            textColor: "text-mint-600",
        },
        {
            label: "Savings Rate",
            value: `${(savingsRate * 100).toFixed(1)}%`,
            icon: Wallet,
            color: "skyBlue",
            bgColor: "bg-skyBlue-50",
            textColor: "text-skyBlue-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-5 rounded-xl border-2 border-white/50 hover:shadow-lg transition-shadow duration-200"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-2">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                            <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
