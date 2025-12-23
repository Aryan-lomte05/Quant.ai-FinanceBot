"use client";

import { useState } from "react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { SuggestedQueries } from "@/components/chat/SuggestedQueries";
import { VoiceRecorder } from "@/components/chat/VoiceRecorder";
import { mockData } from "@/lib/api/mock-data";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([...mockData.chatHistory] as ChatMessage[]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, {
            id: `msg_${Date.now()}`,
            role: 'user',
            content: input,
            timestamp: new Date().toISOString(),
        }]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900">AI Bandhu</h1>
                <p className="text-gray-600">Your financial assistant powered by Phi-3.5</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 space-y-4">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
                ))}
            </div>

            <div className="space-y-3">
                <SuggestedQueries onSelect={(query) => setInput(query)} />

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about your finances..."
                        className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-500"
                    />
                    <VoiceRecorder />
                    <Button onClick={handleSend} className="bg-mint-500 hover:bg-mint-600">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
