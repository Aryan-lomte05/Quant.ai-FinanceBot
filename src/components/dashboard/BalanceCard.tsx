"use client";

import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BalanceCardProps {
    balance: number;
    trend?: "up" | "down";
    trendPercentage?: number;
}

export function BalanceCard({ balance, trend = "up", trendPercentage = 0 }: BalanceCardProps) {
    return (
        <div className="glass p-6 rounded-2xl border-2 border-white/50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Current Balance</h3>
                {trendPercentage > 0 && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-mint-600" : "text-coral-600"}`}>
                        {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {trendPercentage}%
                    </div>
                )}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatCurrency(balance)}
            </div>
            <p className="text-sm text-gray-600">Available to spend</p>
        </div>
    );
}
