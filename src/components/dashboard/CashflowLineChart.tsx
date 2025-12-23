'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Brush } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

interface CashflowData {
    date: string;
    income: number;
    expenses: number;
    netFlow: number;
}

export function CashflowLineChart() {
    const [selectedRange, setSelectedRange] = useState<[number, number]>([0, 29]);

    // Generate 90 days of cashflow data
    const generateCashflowData = (): CashflowData[] => {
        const data: CashflowData[] = [];
        for (let i = 89; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            const income = Math.floor(Math.random() * 15000) + 5000;
            const expenses = Math.floor(Math.random() * 12000) + 3000;
            const netFlow = income - expenses;

            data.push({
                date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
                income,
                expenses,
                netFlow,
            });
        }
        return data;
    };

    const [allData] = useState(generateCashflowData());
    const displayData = allData.slice(selectedRange[0], selectedRange[1] + 1);

    // Calculate totals for selected range
    const totalIncome = displayData.reduce((sum, d) => sum + d.income, 0);
    const totalExpenses = displayData.reduce((sum, d) => sum + d.expenses, 0);
    const netCashflow = totalIncome - totalExpenses;
    const isPositive = netCashflow >= 0;

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="backdrop-blur-xl bg-white/95 border-2 border-gray-200 rounded-xl p-4 shadow-2xl"
                >
                    <p className="text-xs text-gray-600 mb-3 font-medium">{data.date}</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-emerald-600 font-medium">Income</span>
                            <span className="text-sm font-bold text-emerald-700">
                                ₹{data.income.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-red-600 font-medium">Expenses</span>
                            <span className="text-sm font-bold text-red-700">
                                ₹{data.expenses.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm text-gray-700 font-semibold">Net Flow</span>
                                <span className={`text-sm font-bold ${data.netFlow >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {data.netFlow >= 0 ? '+' : ''}₹{data.netFlow.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Cashflow Trends</h3>
                    <p className="text-sm text-gray-500">Income vs Expenses over time</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                        Last {displayData.length} days
                    </span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Total Income */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-700 font-medium">Total Income</p>
                        </div>
                    </div>
                    <p className="text-2xl font-black text-emerald-800">
                        ₹{totalIncome.toLocaleString('en-IN')}
                    </p>
                </motion.div>

                {/* Total Expenses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-lg">
                            <TrendingDown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-red-700 font-medium">Total Expenses</p>
                        </div>
                    </div>
                    <p className="text-2xl font-black text-red-800">
                        ₹{totalExpenses.toLocaleString('en-IN')}
                    </p>
                </motion.div>

                {/* Net Cashflow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className={`p-4 bg-gradient-to-br ${isPositive ? 'from-blue-50 to-cyan-50 border-blue-200' : 'from-orange-50 to-red-50 border-orange-200'
                        } rounded-xl border`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl ${isPositive ? 'bg-blue-500' : 'bg-orange-500'} flex items-center justify-center shadow-lg`}>
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className={`text-xs ${isPositive ? 'text-blue-700' : 'text-orange-700'} font-medium`}>
                                Net Cashflow
                            </p>
                        </div>
                    </div>
                    <p className={`text-2xl font-black ${isPositive ? 'text-blue-800' : 'text-orange-800'}`}>
                        {isPositive ? '+' : ''}₹{netCashflow.toLocaleString('en-IN')}
                    </p>
                </motion.div>
            </div>

            {/* Main Chart */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="h-80 mb-4"
            >
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={displayData}>
                        <defs>
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            tickLine={false}
                            axisLine={{ stroke: '#E5E7EB' }}
                        />

                        <YAxis
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            tickLine={false}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9CA3AF', strokeWidth: 2 }} />

                        {/* Income Area */}
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#10B981"
                            strokeWidth={3}
                            fill="url(#incomeGradient)"
                            animationDuration={1500}
                        />

                        {/* Expenses Area */}
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#EF4444"
                            strokeWidth={3}
                            fill="url(#expensesGradient)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Draggable Time Selector */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="h-24 bg-gray-50 rounded-xl p-3 border border-gray-200"
            >
                <p className="text-xs text-gray-600 font-medium mb-2">
                    Drag to adjust time range (Showing {displayData.length} of {allData.length} days)
                </p>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={allData}>
                        <Line
                            type="monotone"
                            dataKey="netFlow"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Brush
                            dataKey="date"
                            height={40}
                            stroke="#3B82F6"
                            fill="#EFF6FF"
                            travellerWidth={10}
                            onChange={(e: any) => {
                                if (e.startIndex !== undefined && e.endIndex !== undefined) {
                                    setSelectedRange([e.startIndex, e.endIndex]);
                                }
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex items-center justify-center gap-6 mt-4"
            >
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-700 font-medium">Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span className="text-sm text-gray-700 font-medium">Expenses</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
