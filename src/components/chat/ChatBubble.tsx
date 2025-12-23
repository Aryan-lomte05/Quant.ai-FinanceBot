"use client";

interface ChatBubbleProps {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${isUser
                        ? 'bg-mint-500 text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none'
                    }`}
            >
                <p className="text-sm">{content}</p>
            </div>
        </div>
    );
}
