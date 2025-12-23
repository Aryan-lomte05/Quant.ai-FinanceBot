"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { SuggestedQueries } from '@/components/chat/SuggestedQueries';
import { VoiceRecorder } from '@/components/chat/VoiceRecorder';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ChatMessage } from '@/lib/types/chat';
import { Send, Sparkles, Camera, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Mock AI Responses
const getAIResponse = (userMessage: string): ChatMessage => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('food') || lowerMsg.includes('budget')) {
        return {
            id: `msg_${Date.now()}`,
            role: 'assistant',
            content: `Your **food budget** for this month is **₹8,000**. You've spent **₹6,540** so far, leaving you with **₹1,460** remaining. That's **81.8%** of your budget used! 🍔

You're doing great! Try to keep spending under ₹500/week for the rest of the month.`,
            timestamp: new Date().toISOString(),
            type: 'text',
            metadata: {
                actions: [
                    { label: 'View Transactions', action: 'view_food_transactions', icon: '📊' },
                    { label: 'Adjust Budget', action: 'adjust_budget', icon: '⚙️' },
                ],
            },
        };
    }

    if (lowerMsg.includes('afford') || lowerMsg.includes('laptop') || lowerMsg.includes('15')) {
        return {
            id: `msg_${Date.now()}`,
            role: 'assistant',
            content: `Based on your current balance of **₹42,340** and upcoming bills of **₹8,500**, yes you can afford a ₹15,000 laptop! 💻

However, I recommend waiting **2 weeks** for your next salary to maintain your **emergency fund target**. This way you'll have a comfortable buffer.

**Alternative:** Save ₹2,000/week for 7 weeks = laptop + no financial stress! 😊`,
            timestamp: new Date().toISOString(),
            type: 'insight',
            metadata: {
                insight: {
                    category: 'Affordability Analysis',
                    severity: 'success',
                },
                actions: [
                    { label: 'Create Savings Goal', action: 'create_goal', icon: '🎯' },
                    { label: 'View Cashflow', action: 'view_cashflow', icon: '📈' },
                ],
            },
        };
    }

    if (lowerMsg.includes('forecast') || lowerMsg.includes('savings') || lowerMsg.includes('predict')) {
        return {
            id: `msg_${Date.now()}`,
            role: 'assistant',
            content: `📊 **LSTM Savings Forecast** (Next 90 Days):

**7-day forecast:** ₹22,450 (+₹1,100)
**30-day forecast:** ₹28,900 (+₹7,550)  
**90-day forecast:** ₹45,600 (+₹24,250) 🚀

You're on track to **exceed** your quarterly goal by **₹15,000**! Keep up the momentum! 🔥

**Pro tip:** If you reduce food spending by 15%, you'll hit ₹50K in 90 days!`,
            timestamp: new Date().toISOString(),
            type: 'text',
            metadata: {
                actions: [
                    { label: 'View Detailed Chart', action: 'view_forecast_chart', icon: '📈' },
                    { label: 'Set Reminder', action: 'set_reminder', icon: '⏰' },
                ],
            },
        };
    }

    if (lowerMsg.includes('analyze') || lowerMsg.includes('spending')) {
        return {
            id: `msg_${Date.now()}`,
            role: 'assistant',
            content: `🔍 **Spending Analysis (This Month):**

**Top Categories:**
1. 🍔 Food & Dining: ₹6,540 (23%)
2. 🚗 Transport: ₹2,890 (10%)
3. 🛍️ Shopping: ₹5,420 (19%)

**Insights:**
- You spend **40% more on weekends** vs weekdays
- Swiggy orders increased **3x this week** 📈
- You're **15% below** average for similar earners

**Recommendation:** Set a ₹500/week limit on food delivery to save ₹2,000/month!`,
            timestamp: new Date().toISOString(),
            type: 'text',
            metadata: {
                actions: [
                    { label: 'View Full Report', action: 'view_report', icon: '📄' },
                    { label: 'Set Spending Limit', action: 'set_limit', icon: '🚫' },
                ],
            },
        };
    }

    // Default response
    return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `I'm your AI financial assistant powered by **Phi-3.5**! 🤖

I can help you with:
- Budget tracking & recommendations
- Spending analysis & insights
- Savings forecasts (LSTM ML model)
- Affordability checks
- Goal setting & tracking
- Anomaly detection

What would you like to know about your finances?`,
        timestamp: new Date().toISOString(),
        type: 'text',
    };
};

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: `Hey **Aryan**! 👋 I'm your AI financial buddy powered by **Phi-3.5**.

I've analyzed your spending and have some insights. What would you like to know?`,
            timestamp: new Date().toISOString(),
            type: 'text',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || isTyping) return;

        // Add user message
        const userMessage: ChatMessage = {
            id: `msg_${Date.now()}`,
            role: 'user',
            content: messageText,
            timestamp: new Date().toISOString(),
            type: 'text',
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const aiResponse = getAIResponse(messageText);
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    const handleAction = (action: string) => {
        console.log('Action triggered:', action);
        // Handle action buttons (future: navigate to pages, open modals, etc.)
    };

    const handleVoiceTranscript = (transcript: string) => {
        setInput(transcript);
        // Auto-send after voice input
        setTimeout(() => handleSend(transcript), 500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-4 glass p-4 rounded-2xl border-2 border-white/50">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-lavender-500 to-skyBlue-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">AI Bandhu</h1>
                        <p className="text-sm text-gray-600">Your financial assistant • Powered by Phi-3.5</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
                {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} onAction={handleAction} />
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="mt-4 space-y-4">
                {/* Suggested Queries (show only when no messages or at start) */}
                {messages.length <= 1 && !isTyping && (
                    <SuggestedQueries onSelect={handleSend} disabled={isTyping} />
                )}

                {/* Input Box */}
                <div className="glass p-4 rounded-2xl border-2 border-white/50">
                    <div className="flex gap-3 items-end">
                        {/* Attachments (future feature) */}
                        <Button variant="ghost" size="icon" className="hover:bg-mint-50 flex-shrink-0">
                            <Camera className="w-5 h-5 text-gray-600" />
                        </Button>

                        {/* Text Input */}
                        <div className="flex-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything about your finances..."
                                disabled={isTyping}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent disabled:opacity-50"
                            />
                        </div>

                        {/* Voice Input */}
                        <VoiceRecorder onTranscript={handleVoiceTranscript} disabled={isTyping} />

                        {/* Send Button */}
                        <Button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isTyping}
                            className="bg-gradient-to-r from-mint-500 to-skyBlue-500 hover:from-mint-600 hover:to-skyBlue-600 text-white flex-shrink-0"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Footer Info */}
                <p className="text-xs text-center text-gray-500">
                    AI responses are powered by Phi-3.5 and may not always be accurate. Always verify important financial decisions.
                </p>
            </div>
        </div>
    );
}
