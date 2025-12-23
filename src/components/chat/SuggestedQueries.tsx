"use client";

const queries = [
    "What's my food budget?",
    "Can I afford this?",
    "Show savings forecast",
    "Analyze spending"
];

interface SuggestedQueriesProps {
    onSelect: (query: string) => void;
}

export function SuggestedQueries({ onSelect }: SuggestedQueriesProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {queries.map((query) => (
                <button
                    key={query}
                    onClick={() => onSelect(query)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                    {query}
                </button>
            ))}
        </div>
    );
}
