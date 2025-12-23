// src/lib/constants/colors.ts

export const colors = {
    // Primary Colors (Hero actions, main elements)
    primary: {
        mint: '#10B981',        // Main CTA, success states
        mintLight: '#34D399',   // Hover states
        mintDark: '#059669',    // Active states
        mintBg: '#D1FAE5',      // Background tints
    },

    secondary: {
        skyBlue: '#3B82F6',     // Info, trust elements
        skyBlueLight: '#60A5FA',
        skyBlueDark: '#2563EB',
        skyBlueBg: '#DBEAFE',
    },

    accent: {
        coral: '#F59E0B',       // Alerts, important actions
        coralLight: '#FBBF24',
        coralDark: '#D97706',
        coralBg: '#FEF3C7',

        lavender: '#A78BFA',    // Premium features
        lavenderLight: '#C4B5FD',
        lavenderDark: '#8B5CF6',
        lavenderBg: '#EDE9FE',
    },

    // Semantic Colors
    semantic: {
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
    },

    // Neutrals (Text, backgrounds)
    neutral: {
        white: '#FFFFFF',
        gray50: '#F9FAFB',      // Lightest bg
        gray100: '#F3F4F6',     // Cards bg
        gray200: '#E5E7EB',     // Borders
        gray300: '#D1D5DB',     // Disabled states
        gray400: '#9CA3AF',     // Placeholder text
        gray500: '#6B7280',     // Secondary text
        gray600: '#4B5563',     // Body text
        gray700: '#374151',     // Headings
        gray800: '#1F2937',     // Dark text
        gray900: '#111827',     // Darkest
    },

    // Category Colors (For transaction categories)
    categories: {
        food: '#F59E0B',        // Coral
        transport: '#3B82F6',   // Sky Blue
        shopping: '#A78BFA',    // Lavender
        bills: '#10B981',       // Mint
        entertainment: '#EC4899', // Pink
        groceries: '#84CC16',   // Lime
        healthcare: '#EF4444',  // Red
        education: '#8B5CF6',   // Purple
        emi: '#6366F1',        // Indigo
        insurance: '#14B8A6',   // Teal
        investments: '#10B981', // Mint
        travel: '#06B6D4',     // Cyan
        personal: '#F97316',   // Orange
        gifts: '#EC4899',      // Pink
        others: '#6B7280',     // Gray
    },

    // Gradients
    gradients: {
        primary: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
        premium: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)',
        success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        danger: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
    },
} as const;

export type ColorPalette = typeof colors;
