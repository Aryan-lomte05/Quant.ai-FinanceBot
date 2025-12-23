"use client";

import { useEffect, useState } from "react";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { SpendingSparkline } from "@/components/dashboard/SpendingSparkline";
import { BudgetHealthGauge } from "@/components/dashboard/BudgetHealthGauge";
import { UpcomingBillsCarousel } from "@/components/dashboard/UpcomingBillsCarousel";
import { SpendingDonutChart } from "@/components/dashboard/SpendingDonutChart";
import { CashflowLineChart } from "@/components/dashboard/CashflowLineChart";
import { BudgetProgressBars } from "@/components/dashboard/BudgetProgressBars";
import { mockData } from "@/lib/api/mock-data";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { EmergencyFundBarometer } from "@/components/dashboard/EmergencyFundBarometer";
import { SpendingInsights } from "@/components/dashboard/SpendingInsights";
import { FinancialTimeMachine } from "@/components/dashboard/FinancialTimeMachine";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(mockData.dashboardSummary);
  const [spendingData, setSpendingData] = useState<Array<{ date: string; amount: number }>>([]);

  useEffect(() => {
    const generateSpendingTrend = () => {
      const data = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
          amount: Math.floor(Math.random() * 2000) + 500,
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

      {/* Two Column Layout: Sparkline + Budget Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingSparkline data={spendingData} />
        <BudgetHealthGauge spent={dashboardData.monthSpent} budget={50000} />
      </div>

      {/* Upcoming Bills Carousel */}
      <UpcomingBillsCarousel />

      {/* Spending Donut Chart */}
      <SpendingDonutChart />

      {/* NEW: Cashflow Line Chart - Feature #7 */}
      <CashflowLineChart />
      {/* NEW: Budget Progress Bars - Feature #8 */}
      <BudgetProgressBars />
      {/* NEW: Emergency Fund Barometer - Feature #9 */}
      <EmergencyFundBarometer />
      {/* NEW: Spending Insights - Feature #10 */}
      <SpendingInsights />
      {/* NEW: Financial Time Machine - Feature #11 */}
      <FinancialTimeMachine />



    </div>
  );
}
