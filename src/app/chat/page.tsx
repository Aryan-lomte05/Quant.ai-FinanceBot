"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { SuggestedQueries } from '@/components/chat/SuggestedQueries';
import { VoiceRecorder } from '@/components/chat/VoiceRecorder';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ChatMessage } from '@/lib/types/chat';
import { Send, Sparkles, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Mock AI Responses - keeping existing logic
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

    // Scroll animations for hero
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });

    const textScale = useSpring(
        useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.5, 0.75, 0.95, 1.0]),
        { stiffness: 100, damping: 30 }
    );
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || isTyping) return;

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

        setTimeout(() => {
            const aiResponse = getAIResponse(messageText);
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    const handleAction = (action: string) => {
        console.log('Action triggered:', action);
    };

    const handleVoiceTranscript = (transcript: string) => {
        setInput(transcript);
        setTimeout(() => handleSend(transcript), 500);
    };

    return (
        <div className="space-y-0">
            {/* SECTION 1: Hero - Mint Background */}
            <section ref={heroRef} className="mm-section-mint mm-section-spacing relative perspective-container overflow-hidden">
                <div className="mm-container px-8 py-16 w-full max-w-7xl mx-auto text-center">
                    <motion.div
                        style={{
                            scale: textScale,
                            opacity: textOpacity
                        }}
                        className="mb-8"
                    >
                        <h1 className="mm-section-heading text-center">
                            YOUR AI
                            <br />
                            FINANCE BUDDY
                        </h1>
                        <p className="text-xl text-gray-700 mt-6 max-w-2xl mx-auto">
                            Powered by Phi-3.5 • Real-time insights • Smart recommendations
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: Chat Interface - Cream Background */}
            <section className="mm-section-cream mm-section-spacing">
                <div className="mm-container px-8 py-16 w-full max-w-5xl mx-auto">
                    <div className="flex flex-col h-[600px] relative">
                        {/* Chat Header */}
                        <div className="mb-6 glass p-4 rounded-2xl border-2 border-white/50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-mm-purple to-mm-lavender rounded-full flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-mm-black">AI Bandhu</h2>
                                    <p className="text-sm text-gray-600">Your financial assistant • Powered by Phi-3.5</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 mm-card card-3d p-6 rounded-3xl">
                            {messages.map((message) => (
                                <ChatBubble key={message.id} message={message} onAction={handleAction} />
                            ))}

                            {isTyping && <TypingIndicator />}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="mt-6 space-y-4">
                            {/* Suggested Queries */}
                            {messages.length <= 1 && !isTyping && (
                                <SuggestedQueries onSelect={handleSend} disabled={isTyping} />
                            )}

                            {/* Input Box */}
                            <div className="glass p-4 rounded-2xl border-2 border-white/50">
                                <div className="flex gap-3 items-end">
                                    <Button variant="ghost" size="icon" className="hover:bg-mm-green/10 flex-shrink-0">
                                        <Camera className="w-5 h-5 text-gray-600" />
                                    </Button>

                                    <div className="flex-1">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ask me anything about your finances..."
                                            disabled={isTyping}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mm-green focus:border-transparent disabled:opacity-50"
                                        />
                                    </div>

                                    <VoiceRecorder onTranscript={handleVoiceTranscript} disabled={isTyping} />

                                    <Button
                                        onClick={() => handleSend()}
                                        disabled={!input.trim() || isTyping}
                                        className="mm-btn mm-btn-primary flex-shrink-0"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            <p className="text-xs text-center text-gray-500">
                                AI responses are powered by Phi-3.5 and may not always be accurate. Always verify important financial decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
