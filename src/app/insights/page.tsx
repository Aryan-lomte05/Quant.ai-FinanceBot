"use client";

import { TrendingUp, AlertCircle, Sparkles } from "lucide-react";

export default function InsightsPage() {
    const insights = [
        { icon: TrendingUp, title: "Spending Up 40%", desc: "Shopping increased this week", color: "coral" },
        { icon: AlertCircle, title: "Budget Alert", desc: "Food budget 90% used", color: "coral" },
        { icon: Sparkles, title: "Great Job!", desc: "Savings up 15% this month", color: "mint" },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Insights & Reports</h1>
                <p className="text-gray-600 mt-1">AI-powered financial analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.map((item) => (
                    <div key={item.title} className="glass p-6 rounded-2xl border-2 border-white/50">
                        <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
