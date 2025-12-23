"use client";

import { User, Bell, Lock, Trash2 } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account and preferences</p>
            </div>

            <div className="space-y-4">
                {[
                    { icon: User, title: "Profile", desc: "Update your personal information" },
                    { icon: Bell, title: "Notifications", desc: "Manage notification preferences" },
                    { icon: Lock, title: "Privacy & Security", desc: "Control your data and security" },
                    { icon: Trash2, title: "Delete Account", desc: "Permanently delete your account", danger: true },
                ].map((item) => (
                    <div key={item.title} className="glass p-5 rounded-xl border-2 border-white/50 hover:shadow-lg transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${item.danger ? 'bg-red-100' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
                                <item.icon className={`w-6 h-6 ${item.danger ? 'text-red-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
