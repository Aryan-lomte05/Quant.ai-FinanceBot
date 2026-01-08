"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "@/components/metamask-ui/HeroSection";
import { SpendingSparkline } from "@/components/dashboard/SpendingSparkline";
import { BudgetHealthGauge } from "@/components/dashboard/BudgetHealthGauge";
import { UpcomingBillsCarousel } from "@/components/dashboard/UpcomingBillsCarousel";
import { SpendingDonutChart } from "@/components/dashboard/SpendingDonutChart";
import { CashflowLineChart } from "@/components/dashboard/CashflowLineChart";
import { BudgetProgressBars } from "@/components/dashboard/BudgetProgressBars";
import { EmergencyFundBarometer } from "@/components/dashboard/EmergencyFundBarometer";
import { SpendingInsights } from "@/components/dashboard/SpendingInsights";
import { FinancialTimeMachine } from "@/components/dashboard/FinancialTimeMachine";
import { TaxOptimizerDashboard } from "@/components/dashboard/TaxOptimizerDashboard";
import { mockData } from "@/lib/api/mock-data";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Wallet, Target, Sparkles, PiggyBank, Shield } from "lucide-react";
import { NumericFormat } from "react-number-format";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(mockData.dashboardSummary);
  const [spendingData, setSpendingData] = useState<Array<{ date: string; amount: number }>>([]);

  const { scrollY } = useScroll();

  // Parallax for different layers
  const yCards = useTransform(scrollY, [0, 1000], [0, -1300]);
  const yCardsSmooth = useSpring(yCards, { stiffness: 100, damping: 30 });

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
    <div className="space-y-0">
      {/* SECTION 1: Hero - Cream Background */}
      <section className="mm-section-cream mm-section-spacing">
        <HeroSection />
      </section>

      {/* SECTION 2: Your Finances - Mint Green Background */}
      <section className="mm-section-mint mm-section-spacing perspective-container overflow-hidden">
        <div className="mm-container relative px-4">
          {/* Section Headline - Above Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <h2 className="mm-section-heading text-center">
              YOUR FINANCES
              <br />
              UNDER CONTROL
            </h2>
          </motion.div>

          {/* Asymmetric Card Grid */}
          <div className="mm-asymmetric-grid">
            {/* Card 1: Top Left - Total Balance */}
            <motion.div
              initial={{ opacity: 0, x: -80, y: -60 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mm-grid-item-1 z-10"
            >
              <div className="mm-card mm-card-medium card-3d h-full">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-16 h-16 bg-mm-purple/10 rounded-2xl flex items-center justify-center mb-6">
                      <Wallet className="w-8 h-8 text-mm-purple" />
                    </div>
                    <h3 className="text-2xl font-bold text-mm-black mb-2">Total Balance</h3>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-mm-purple mb-3">
                      <NumericFormat
                        value={dashboardData.currentBalance}
                        displayType="text"
                        thousandSeparator=","
                        prefix="₹"
                        renderText={(value) => <span>{value}</span>}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-mm-green">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-semibold">+12% this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Right Side - Monthly Spent (Tall) */}
            <motion.div
              initial={{ opacity: 0, x: 80, y: 60 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mm-grid-item-2 z-10"
            >
              <div className="mm-card-colored mm-card-orange mm-card-tall card-3d h-full">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="text-7xl mb-6">💸</div>
                    <h3 className="text-3xl font-bold mb-3">Month Spent</h3>
                  </div>
                  <div>
                    <div className="text-6xl font-bold mb-4">
                      <NumericFormat
                        value={dashboardData.monthSpent}
                        displayType="text"
                        thousandSeparator=","
                        prefix="₹"
                        renderText={(value) => <span>{value}</span>}
                      />
                    </div>
                    <div className="text-xl opacity-90">
                      -8% from last month
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Bottom Left - Savings (Wide) */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 80 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mm-grid-item-3 z-10"
            >
              <div className="mm-card-colored mm-card-green mm-card-wide card-3d h-full">
                <div className="flex items-center justify-between h-full">
                  <div>
                    <div className="text-8xl mb-4">💰</div>
                    <h3 className="text-3xl font-bold mb-2">Monthly Savings</h3>
                    <div className="text-5xl font-bold">
                      <NumericFormat
                        value={dashboardData.monthSaved}
                        displayType="text"
                        thousandSeparator=","
                        prefix="₹"
                        renderText={(value) => <span>{value}</span>}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl font-bold">{dashboardData.savingsRate}%</div>
                    <div className="text-xl mt-2">Savings Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Bottom Right - Financial Score */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 80 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mm-grid-item-4 z-10"
            >
              <div className="mm-card mm-card-small card-3d h-full bg-gradient-to-br from-mm-purple to-mm-lavender text-white">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <Sparkles className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Financial Score</h3>
                  </div>
                  <div>
                    <div className="text-7xl font-bold">{dashboardData.financialScore}</div>
                    <div className="text-lg mt-2 opacity-90">Excellent!</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Analytics & Charts - Cream Background */}
      <section className="mm-section-cream py-24">
        <div className="mm-container px-4">
          {/* Spending & Budget Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d"
            >
              <SpendingSparkline data={spendingData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d"
            >
              <BudgetHealthGauge spent={dashboardData.monthSpent} budget={50000} />
            </motion.div>
          </div>

          {/* Upcoming Bills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <UpcomingBillsCarousel />
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d"
            >
              <SpendingDonutChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d"
            >
              <CashflowLineChart data={spendingData} />
            </motion.div>
          </div>

          {/* Budget Progress */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <BudgetProgressBars />
          </motion.div>

          {/* Additional Widgets */}
          {[
            <EmergencyFundBarometer key="emergency" />,
            <SpendingInsights key="insights" />,
            <FinancialTimeMachine key="timemachine" />,
            <TaxOptimizerDashboard key="tax" />
          ].map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mb-12 last:mb-0"
            >
              {component}
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Features - Orange Background */}
      <section className="mm-section-orange mm-section-spacing">
        <div className="mm-container px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mm-section-heading mb-32 text-center"
          >
            EVERYTHING YOU NEED
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-12 h-12" />, title: "Smart Goals", desc: "Set and track financial goals with AI insights" },
              { icon: <Shield className="w-12 h-12" />, title: "Budget Shield", desc: "Stay protected from overspending" },
              { icon: <PiggyBank className="w-12 h-12" />, title: "Auto-Save", desc: "Intelligent savings recommendations" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mm-card card-3d"
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 text-mm-purple">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-mm-black mb-3">{feature.title}</h3>
                <p className="text-gray-700 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA - Cream Background */}
      <section className="mm-section-cream mm-section-spacing">
        <div className="mm-container text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mm-mega-heading mb-12">
              START YOUR
              <br />
              JOURNEY TODAY
            </h2>
            <button className="mm-btn mm-btn-primary text-xl px-12 py-6">
              GET STARTED
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
