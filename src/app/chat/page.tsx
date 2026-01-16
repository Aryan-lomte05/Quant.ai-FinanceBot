"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { SuggestedQueries } from '@/components/chat/SuggestedQueries';
import { VoiceRecorder } from '@/components/chat/VoiceRecorder';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { FinanceAdvisor3D } from '@/components/chat/FinanceAdvisor3D';
import { ChatMessage } from '@/lib/types/chat';
import { Send, Mic, Camera, TrendingUp, PiggyBank, Target, AlertCircle } from 'lucide-react';

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

// Quick Action Items
const quickActions = [
    { id: 'budget', label: 'Check my budget', icon: PiggyBank },
    { id: 'invest', label: 'Investment Tips', icon: TrendingUp, emergency: false },
    { id: 'goals', label: 'My Savings Goals', icon: Target },
];

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
    const [isSpeaking, setIsSpeaking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

            // Trigger speaking animation when AI responds
            setIsSpeaking(true);
            setTimeout(() => setIsSpeaking(false), 3000); // Speak for 3 seconds
        }, 1500 + Math.random() * 1000);
    };

    const handleAction = (action: string) => {
        console.log('Action triggered:', action);
    };

    const handleVoiceTranscript = (transcript: string) => {
        setInput(transcript);
        setTimeout(() => handleSend(transcript), 500);
    };

    const handleQuickAction = (actionId: string) => {
        const actionMessages: Record<string, string> = {
            budget: "What's my current budget status?",
            invest: "Give me some investment tips",
            goals: "Show me my savings goals",
        };
        handleSend(actionMessages[actionId] || actionId);
    };

    return (
        <div className="chat-page-bg">
            <div className="chat-split-layout">
                {/* Left Side - Chat Area */}
                <div className="chat-area">
                    {/* Messages Container */}
                    <div className="chat-messages-container">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}
                            >
                                <div dangerouslySetInnerHTML={{
                                    __html: message.content
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\n/g, '<br/>')
                                }} />

                                {/* Language indicator for assistant */}
                                {message.role === 'assistant' && (
                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                                        <span className="text-xs text-white/50">English</span>
                                        <button className="text-xs text-white/50 hover:text-white/80 transition-colors">
                                            🔊
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="chat-bubble-assistant">
                                <TypingIndicator />
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="chat-quick-actions">
                        {quickActions.map((action) => (
                            <button
                                key={action.id}
                                onClick={() => handleQuickAction(action.id)}
                                className={`chat-quick-action-btn ${action.emergency ? 'emergency' : ''}`}
                                disabled={isTyping}
                            >
                                <action.icon className="w-4 h-4" />
                                {action.label}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="chat-input-area">
                        <div className="chat-input-box">
                            <button className="chat-input-btn voice">
                                <Camera className="w-5 h-5" />
                            </button>

                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about your finances..."
                                disabled={isTyping}
                                className="chat-input-field"
                            />

                            <VoiceRecorder onTranscript={handleVoiceTranscript} disabled={isTyping} />

                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="chat-input-btn send"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="chat-disclaimer">
                            ⚠️ AI responses are powered by Phi-3.5 and may not always be accurate.
                        </p>
                    </div>
                </div>

                {/* Right Side - Finance Advisor 3D Panel */}
                <div className="chat-advisor-panel">
                    {/* Language Toggle */}
                    <div className="chat-language-toggle">
                        <button className="language-btn active">EN</button>
                        <button className="language-btn">हि</button>
                    </div>

                    {/* 3D Finance Advisor */}
                    <div className="flex-1 relative">
                        <FinanceAdvisor3D isThinking={isTyping} isSpeaking={isSpeaking} />
                    </div>

                    {/* Status Indicator */}
                    <div className="advisor-status">
                        <div className={`advisor-status-dot ${isTyping ? 'thinking' : ''} ${isSpeaking ? 'speaking' : ''}`} />
                        <span className="advisor-status-text">
                            {isTyping ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Ready'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
