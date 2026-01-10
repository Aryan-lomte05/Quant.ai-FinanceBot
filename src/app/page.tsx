"use client";

import { useEffect, useState, useRef } from "react";
import { HeroSection } from "@/components/metamask-ui/HeroSection";
import { Logo3D } from "@/components/shared/Logo3D";
import { OpeningAnimation } from "@/components/animations/OpeningAnimation";
import { RotatingCard } from "@/components/animations/RotatingCard";
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

  // Refs for each section's scroll-zoom
  const financesSectionRef = useRef<HTMLDivElement>(null);
  const analyticsSectionRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);

  // MetaMask scroll zoom for Finances section
  const { scrollYProgress: financesProgress } = useScroll({
    target: financesSectionRef,
    offset: ["start end", "end start"]
  });

  // Text: 0.5 → 1.0 (reduced to prevent overflow)
  const financesTextScale = useSpring(
    useTransform(financesProgress, [0, 0.4, 0.8, 1], [0.5, 0.75, 0.95, 1.0]),
    { stiffness: 100, damping: 30 }
  );
  const financesTextOpacity = useTransform(financesProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  // Cards: 0.95 → 1.0 (subtle zoom)
  const financesCardScale = useSpring(
    useTransform(financesProgress, [0, 0.5, 1], [0.95, 0.98, 1.0]),
    { stiffness: 100, damping: 30 }
  );

  // MetaMask scroll zoom for Analytics section
  const { scrollYProgress: analyticsProgress } = useScroll({
    target: analyticsSectionRef,
    offset: ["start end", "end start"]
  });

  const analyticsCardScale = useSpring(
    useTransform(analyticsProgress, [0, 0.5, 1], [0.95, 0.98, 1.0]),
    { stiffness: 100, damping: 30 }
  );

  // MetaMask scroll zoom for Features section  
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresSectionRef,
    offset: ["start end", "end start"]
  });

  const featuresTextScale = useSpring(
    useTransform(featuresProgress, [0, 0.4, 0.8, 1], [0.5, 0.75, 0.95, 1.0]),
    { stiffness: 100, damping: 30 }
  );
  const featuresTextOpacity = useTransform(featuresProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  const featuresCardScale = useSpring(
    useTransform(featuresProgress, [0, 0.5, 1], [0.95, 0.98, 1.0]),
    { stiffness: 100, damping: 30 }
  );

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
    <>
      {/* Opening Purple Animation - Shows once per session */}
      <OpeningAnimation duration={1800} />

      {/* Fullscreen 3D Logo Canvas - Always On Top (MetaMask Style) */}
      <Logo3D />

      <div className="space-y-0">
        {/* SECTION 1: Hero - Cream Background */}
        <section className="mm-section-cream mm-section-spacing relative">
          {/* Logo Target - Center Right */}
          <div data-logo-target="hero" className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none z-10" />

          <HeroSection />
        </section>

        {/* SECTION 2: Your Finances - Mint Green Background with ZOOM */}
        <section ref={financesSectionRef} className="mm-section-mint mm-section-spacing perspective-container overflow-hidden relative">
          {/* Logo Target - CENTER (like MetaMask Fox) */}
          <div data-logo-target="card" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-20" />

          <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto relative">
            {/* Headline with Zoom Animation */}
            <motion.div
              style={{
                scale: financesTextScale,
                opacity: financesTextOpacity
              }}
              className="mb-16 relative z-10"
            >
              <h2 className="mm-section-heading text-center lg:text-left max-w-2xl">
                YOUR FINANCES
                <br />
                UNDER CONTROL
              </h2>
            </motion.div>

            {/* EXACT MetaMask 2-Column Grid */}
            <div className="metamask-exact-grid">

              {/* LEFT COLUMN - Purple Cards Stack */}
              <div className="mm-left-column">
                {/* Purple Card 1: Total Balance */}
                <div className="mm-card-purple-top mm-card-hover cursor-pointer rounded-3xl p-8" style={{ backgroundColor: '#3C154E' }}>
                  <div className="flex flex-col h-full justify-between mm-card-main-content">
                    <div>
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                        <Wallet className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Total Balance</h3>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">
                        <NumericFormat
                          value={dashboardData.currentBalance}
                          displayType="text"
                          thousandSeparator=","
                          prefix="₹"
                          renderText={(value) => <span>{value}</span>}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-emerald-300 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% this month</span>
                      </div>
                    </div>
                  </div>

                  {/* Hidden details - appears on hover */}
                  <div className="mm-card-details">
                    <div className="grid grid-cols-2 gap-3 text-white/90 text-sm">
                      <div>
                        <div className="text-white/60 text-xs">Available</div>
                        <div className="font-semibold">₹38,200</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs">Pending</div>
                        <div className="font-semibold">₹4,140</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purple Card 2: Financial Score */}
                <div className="mm-card-purple-bottom mm-card-hover cursor-pointer rounded-3xl p-6 bg-gradient-to-br from-purple-700 to-purple-900">
                  <div className="flex items-center justify-between h-full mm-card-main-content">
                    <div>
                      <Sparkles className="w-10 h-10 text-white mb-2" />
                      <h3 className="text-lg font-bold text-white">Financial Score</h3>
                    </div>
                    <div className="text-5xl font-bold text-white">{dashboardData.financialScore}</div>
                  </div>

                  {/* Hidden details */}
                  <div className="mm-card-details">
                    <div className="text-white/90 text-xs">
                      <div className="flex justify-between">
                        <span>Payment History</span>
                        <span className="text-emerald-300">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Teal + Orange Stack */}
              <div className="mm-right-column">
                {/* Teal Card: Monthly Savings (Tall) */}
                <div className="mm-card-teal-tall mm-card-hover cursor-pointer rounded-3xl p-8" style={{ background: '#0D4F4F' }}>
                  <div className="flex flex-col h-full justify-between mm-card-main-content">
                    <div>
                      <div className="text-6xl mb-4">💰</div>
                      <h3 className="text-2xl font-bold text-white mb-3">Monthly Savings</h3>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">
                        <NumericFormat
                          value={dashboardData.monthSaved}
                          displayType="text"
                          thousandSeparator=","
                          prefix="₹"
                          renderText={(value) => <span>{value}</span>}
                        />
                      </div>
                      <div className="text-3xl font-bold text-white">{dashboardData.savingsRate}%</div>
                      <div className="text-sm text-white/80">Savings Rate</div>
                    </div>
                  </div>

                  {/* Hidden details */}
                  <div className="mm-card-details">
                    <div className="text-white/90 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Investments</span>
                        <span className="font-semibold">₹15k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deposits</span>
                        <span className="font-semibold">₹6k</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orange Card: Month Spent (Wide) */}
                <div className="mm-card-orange-wide mm-card-hover cursor-pointer rounded-3xl p-6" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)' }}>
                  <div className="flex items-center justify-between h-full mm-card-main-content">
                    <div>
                      <div className="text-5xl mb-2">💸</div>
                      <h3 className="text-2xl font-bold text-white">Month Spent</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-white">
                        <NumericFormat
                          value={dashboardData.monthSpent}
                          displayType="text"
                          thousandSeparator=","
                          prefix="₹"
                          renderText={(value) => <span>{value}</span>}
                        />
                      </div>
                      <div className="text-sm text-white/80 mt-1">-8% from last month</div>
                    </div>
                  </div>

                  {/* Hidden details */}
                  <div className="mm-card-details">
                    <div className="text-white/90 text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/70">Top Category</span>
                      </div>
                      <div className="font-bold text-lg">Food & Dining</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: Analytics - Cream Background with ZOOM */}
        <section ref={analyticsSectionRef} className="mm-section-cream mm-section-spacing relative">
          {/* Logo Target - Bottom Right */}
          <div data-logo-target="analytics" className="absolute right-1/3 bottom-1/4 w-48 h-48 pointer-events-none z-10" />

          <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto">
            {/* Grid of Charts with Zoom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                style={{ scale: analyticsCardScale }}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d"
              >
                <SpendingSparkline data={spendingData} />
              </motion.div>

              <motion.div
                style={{ scale: analyticsCardScale }}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d"
              >
                <BudgetHealthGauge spent={dashboardData.monthSpent} budget={50000} />
              </motion.div>
            </div>

            <motion.div
              style={{ scale: analyticsCardScale }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <UpcomingBillsCarousel />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                style={{ scale: analyticsCardScale }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d"
              >
                <SpendingDonutChart />
              </motion.div>

              <motion.div
                style={{ scale: analyticsCardScale }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d"
              >
                <CashflowLineChart data={spendingData} />
              </motion.div>
            </div>

            <motion.div
              style={{ scale: analyticsCardScale }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <BudgetProgressBars />
            </motion.div>

            {[
              <EmergencyFundBarometer key="emergency" />,
              <SpendingInsights key="insights" />,
              <FinancialTimeMachine key="timemachine" />,
              <TaxOptimizerDashboard key="tax" />
            ].map((component, index) => (
              <motion.div
                key={index}
                style={{ scale: analyticsCardScale }}
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
        </section >

        {/* SECTION 4: Features - Orange Background with ZOOM */}
        <section ref={featuresSectionRef} className="mm-section-orange mm-section-spacing relative" >
          {/* Logo Target - Top Right Corner */}
          <div data-logo-target="features" className="absolute right-1/4 top-1/4 w-56 h-56 pointer-events-none z-10" />

          <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto">
            <motion.h2
              style={{
                scale: featuresTextScale,
                opacity: featuresTextOpacity
              }}
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
                  style={{ scale: featuresCardScale }}
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
        </section >

        {/* SECTION 5: CTA - Cream Background */}
        <section className="mm-section-cream mm-section-spacing relative" >
          {/* Logo Target - Center Left */}
          <div data-logo-target="cta" className="absolute left-1/3 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-10" />

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
        </section >
      </div >
    </>
  );
}
