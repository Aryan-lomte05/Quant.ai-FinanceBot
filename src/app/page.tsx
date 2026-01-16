"use client";

import { useEffect, useState, useRef } from "react";
import { HeroSection } from "@/components/metamask-ui/HeroSection";
import { Logo3D } from "@/components/shared/Logo3D";
import { OpeningAnimation } from "@/components/animations/OpeningAnimation";
import { RotatingCard } from "@/components/animations/RotatingCard";
import BounceDashboardCards from "@/components/animations/BounceDashboardCards";
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
import { useDashboard } from "@/lib/hooks/useMLApi";
import { useUserStore } from "@/lib/store/useUserStore";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Wallet, Target, Sparkles, PiggyBank, Shield, Loader2 } from "lucide-react";
import { NumericFormat } from "react-number-format";

// Demo user ID - replace with actual user from auth
const DEMO_USER_ID = "696a022c3c758e29b2ca8d50";

export default function DashboardPage() {
  // Get user from store or use demo
  const { userId } = useUserStore();
  const activeUserId = userId || DEMO_USER_ID;

  // Fetch real dashboard data from API
  const { data: apiData, loading, error, refetch } = useDashboard(activeUserId);

  // Use API data if available, fallback to mock
  const dashboardData = apiData ? {
    currentBalance: apiData.stats.current_balance,
    monthSpent: apiData.stats.month_spent,
    monthSaved: apiData.stats.month_saved,
    savingsRate: apiData.stats.savings_rate,
    budgetAdherence: 0.89, // Calculate from budget_summary
    financialScore: apiData.stats.financial_score,
    trend: {
      balance: '+12%',
      spending: '-8%',
      savings: '+15%',
    },
    category_breakdown: apiData.category_breakdown,
    insights: apiData.insights,
    forecast: apiData.forecast,
  } : mockData.dashboardSummary;

  const [spendingTrend, setSpendingTrend] = useState<Array<{ date: string; amount: number }>>([]);
  const [budget, setBudget] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    // Mock trend data for now if not available
    if (!spendingTrend.length) {
      setSpendingTrend(mockData.spendingTrend);
    }
  }, []);

  // Find Emergency Fund goal
  const emergencyFundGoal = goals.find(g => g.name.toLowerCase().includes('emergency') || g.priority === 'high');

  // Calculate budget progress
  const budgetAllocations = budget?.allocations || [];
  const totalBudget = budget?.total_income || 50000; // Fallback or use income

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
              <div className="flex items-center gap-4 mb-4">
                <h2 className="mm-section-heading text-center lg:text-left max-w-2xl">
                  YOUR FINANCES
                  <br />
                  UNDER CONTROL
                </h2>
                {/* Live Data Indicator */}
                {loading ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    LOADING...
                  </span>
                ) : apiData ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    LIVE DATA
                  </span>
                ) : null}
              </div>
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
        </section>

        {/* SECTION 3: Analytics - Orange Background with Scroll Transition */}
        <motion.section
          ref={analyticsSectionRef}
          className="mm-section-spacing relative overflow-hidden"
          style={{
            background: useTransform(
              analyticsProgress,
              [0, 0.3, 0.5],
              ['#FFF7ED', '#FFBC80', '#FFB07A']
            )
          }}
        >
          {/* Animated Background Gradient Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: useTransform(analyticsProgress, [0, 0.3], [0, 1]),
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,200,150,0.3) 0%, transparent 50%)'
            }}
          />

          {/* Logo Target - Bottom Right */}
          <div data-logo-target="analytics" className="absolute right-1/3 bottom-1/4 w-48 h-48 pointer-events-none z-10" />

          <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto relative z-10">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Your Financial Dashboard</h2>
              <p className="text-xl text-gray-700">Track, analyze, and optimize your spending</p>
            </motion.div>

            {/* 3-Column Dashboard Cards with Bounce Animation */}
            <BounceDashboardCards
              enableHover
              initialRotations={[-3, 0, 3]}
              initialTranslateX={[-20, 0, 20]}
              pushDistance={60}
            >
              <SpendingSparkline data={spendingTrend} />
              <BudgetHealthGauge spent={dashboardData.monthSpent} budget={totalBudget} />
              <UpcomingBillsCarousel />
            </BounceDashboardCards>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                style={{ scale: analyticsCardScale }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d"
              >
                <SpendingDonutChart data={dashboardData.category_breakdown} />
              </motion.div>

              <motion.div
                style={{ scale: analyticsCardScale }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d"
              >
                <CashflowLineChart data={spendingTrend} />
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
              <BudgetProgressBars allocations={budgetAllocations} />
            </motion.div>

            {/* Emergency Fund only */}
            <motion.div
              style={{ scale: analyticsCardScale }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <EmergencyFundBarometer goal={emergencyFundGoal} />
            </motion.div>
          </div>
        </motion.section>

        {/* NEW SECTION: Insights - Lavender Pink MetaMask Background with Stacking Animation */}
        <motion.section
          className="mm-section-spacing relative overflow-hidden py-20 -mt-8"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(180deg, #F5E6FA 0%, #EDD9F5 50%, #F5E6FA 100%)',
            borderRadius: '48px 48px 0 0',
            boxShadow: '0 -20px 60px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Animated Background Elements */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)'
            }}
          />

          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-violet-400/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-400/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="mm-container px-8 w-full max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h2
                className="text-4xl md:text-5xl font-black text-[#3D2F5B] mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                AI-Powered Insights
              </motion.h2>
              <motion.p
                className="text-xl text-[#5B4A7A]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Smart analysis to optimize your finances
              </motion.p>
            </motion.div>

            {/* Insights Grid with Stacking Card Animation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'center top' }}
              >
                <SpendingInsights insights={dashboardData?.insights} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'center top' }}
              >
                <FinancialTimeMachine forecast={dashboardData?.forecast} />
              </motion.div>
            </div>

            {/* Tax Optimizer - Full Width with Stacking Animation */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'center top' }}
              className="mt-12"
            >
              <TaxOptimizerDashboard />
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION 4: Features - Orange Background with ZOOM */}
        <section ref={featuresSectionRef} className="mm-section-orange mm-section-spacing relative">
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
        </section>

        {/* SECTION 5: CTA - Cream Background */}
        <section className="mm-section-cream mm-section-spacing relative">
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
        </section>
      </div>
    </>
  );
}
