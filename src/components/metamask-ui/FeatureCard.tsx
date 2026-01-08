'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
    emoji: string;
    title: string;
    description: string;
    value?: string | number;
    colorClass?: 'mm-card-orange' | 'mm-card-green' | 'mm-card-blue' | 'mm-card-purple' | 'white';
    onClick?: () => void;
    children?: ReactNode;
}

export function FeatureCard({
    emoji,
    title,
    description,
    value,
    colorClass = 'white',
    onClick,
    children,
}: FeatureCardProps) {
    const isWhiteCard = colorClass === 'white';

    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 }
            }}
            onClick={onClick}
            className={`
                ${isWhiteCard ? 'mm-card' : `mm-card-colored ${colorClass}`}
                ${onClick ? 'cursor-pointer' : ''}
                text-center
            `}
        >
            {/* Emoji Icon */}
            <div className="text-6xl mb-4">
                {emoji}
            </div>

            {/* Title */}
            <h3 className={`text-xl font-bold mb-2 ${isWhiteCard ? 'text-mm-purple' : ''}`}>
                {title}
            </h3>

            {/* Description */}
            <p className={`text-sm mb-4 ${isWhiteCard ? 'text-gray-600' : 'opacity-90'}`}>
                {description}
            </p>

            {/* Value (if provided) */}
            {value && (
                <div className={`text-3xl font-bold mb-2 ${isWhiteCard ? 'text-mm-black' : ''}`}>
                    {value}
                </div>
            )}

            {/* Children (custom content) */}
            {children}
        </motion.div>
    );
}
