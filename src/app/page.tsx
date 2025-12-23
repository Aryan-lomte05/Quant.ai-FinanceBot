"use client";

import { useEffect, useState } from "react";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { SpendingSparkline } from "@/components/dashboard/SpendingSparkline"; // NEW
import { mockData } from "@/lib/api/mock-data";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(mockData.dashboardSummary);
  const [spendingData, setSpendingData] = useState<Array<{ date: string; amount: number }>>([]);

  useEffect(() => {
    // Generate spending trend data from last 30 days
    const generateSpendingTrend = () => {
      const data = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
          amount: Math.floor(Math.random() * 2000) + 500, // Random spending
        });
      }
      return data;
    };

    setSpendingData(generateSpendingTrend());
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good evening, Aryan! 👋
          </h1>
          <p className="text-gray-600">
            Here's your financial snapshot for today
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mint-500 to-skyBlue-500 text-white rounded-xl">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Financial Score: 782</span>
          </div>
        </div>
      </motion.div>

      {/* Balance Card */}
      <BalanceCard
        balance={dashboardData.currentBalance}
        trend={dashboardData.trend.balance as "up" | "down"}
        trendPercentage={12}
      />

      {/* Quick Stats */}
      <QuickStats
        monthSpent={dashboardData.monthSpent}
        monthSaved={dashboardData.monthSaved}
        savingsRate={dashboardData.savingsRate}
      />

      {/* NEW: Spending Sparkline - Feature #3 */}
      <SpendingSparkline data={spendingData} />

      {/* Spending Chart */}
      <SpendingChart data={spendingData} />

      {/* AI Insights Preview (Coming Next) */}
      <div className="glass p-6 rounded-2xl border-2 border-white/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-lavender-100 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-lavender-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">AI Insights</h3>
            <p className="text-sm text-gray-600">Powered by Phi-3.5</p>
          </div>
        </div>
        <p className="text-gray-700">
          💡 You're on track to save <strong>₹45,600</strong> in the next 90 days!
          Consider allocating more to your Europe Trip goal.
        </p>
      </div>
    </div>
  );
}
