'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { ShoppingBag, Utensils, Car, Home, Heart, Zap, TrendingUp } from 'lucide-react';

interface SpendingCategory {
    name: string;
    value: number;
    color: string;
    icon: any;
    percentage: number;
    [key: string]: any;
}

export function SpendingDonutChart() {
    const PieComponent = Pie as any;
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    // Mock spending data by category
    const totalSpending = 42500;
    const data: SpendingCategory[] = [
        {
            name: 'Shopping',
            value: 12500,
            color: '#EC4899',
            icon: ShoppingBag,
            percentage: (12500 / totalSpending) * 100,
        },
        {
            name: 'Food & Dining',
            value: 8500,
            color: '#F59E0B',
            icon: Utensils,
            percentage: (8500 / totalSpending) * 100,
        },
        {
            name: 'Transportation',
            value: 6200,
            color: '#3B82F6',
            icon: Car,
            percentage: (6200 / totalSpending) * 100,
        },
        {
            name: 'Bills & Utilities',
            value: 7800,
            color: '#10B981',
            icon: Zap,
            percentage: (7800 / totalSpending) * 100,
        },
        {
            name: 'Housing',
            value: 5000,
            color: '#8B5CF6',
            icon: Home,
            percentage: (5000 / totalSpending) * 100,
        },
        {
            name: 'Healthcare',
            value: 2500,
            color: '#EF4444',
            icon: Heart,
            percentage: (2500 / totalSpending) * 100,
        },
    ];

    // Custom active shape that "explodes" outward
    const renderActiveShape = (props: any) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

        return (
            <g>
                {/* Exploded segment */}
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 15} // Explode outward by 15px
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    className="drop-shadow-2xl"
                />
                {/* Inner white border */}
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius - 2}
                    outerRadius={innerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill="#fff"
                />
            </g>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 p-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Spending Breakdown</h3>
                    <p className="text-sm text-gray-500">By category this month</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">
                        ₹{totalSpending.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            {/* Chart Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Donut Chart */}
                <div className="relative">
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <PieComponent
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={(_: any, index: number) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(undefined)}
                                animationDuration={800}
                                animationBegin={0}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        className="cursor-pointer transition-all duration-300"
                                        style={{
                                            filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                                        }}
                                    />
                                ))}
                            </PieComponent>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, type: 'spring' }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="text-center">
                            {activeIndex !== undefined ? (
                                <>
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-4xl font-black"
                                        style={{ color: data[activeIndex as number].color }}
                                    >
                                        {data[activeIndex].percentage.toFixed(0)}%
                                    </motion.div>
                                    <p className="text-xs text-gray-600 font-medium mt-1">
                                        {data[activeIndex as number].name}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="text-3xl font-black text-gray-900">100%</div>
                                    <p className="text-xs text-gray-500 mt-1">Hover to explore</p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Category List */}
                <div className="space-y-3">
                    {data.map((category, index) => {
                        const Icon = category.icon;
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(undefined)}
                                whileHover={{ x: 5 }}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${isActive
                                    ? 'bg-white border-gray-300 shadow-lg scale-105'
                                    : 'bg-gray-50 border-transparent hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform"
                                            style={{
                                                backgroundColor: category.color + '20',
                                                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                            }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: category.color }} />
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{category.name}</p>
                                            <p className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</p>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="text-right">
                                        <p
                                            className="text-lg font-bold"
                                            style={{ color: isActive ? category.color : '#111827' }}
                                        >
                                            ₹{category.value.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${category.percentage}%` }}
                                        transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                                        className="h-full rounded-full relative overflow-hidden"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                            animate={{
                                                x: ['-100%', '200%'],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                ease: 'linear',
                                                repeatDelay: 1,
                                            }}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Insight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">Spending Insight</h4>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold" style={{ color: data[0].color }}>
                                {data[0].name}
                            </span>{' '}
                            is your highest expense category at{' '}
                            <span className="font-bold">₹{data[0].value.toLocaleString('en-IN')}</span>.
                            Consider setting a budget limit to track better! 💡
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
