/**
 * BudgetBandhu ML API Client
 * Connects frontend to Tanuj's FastAPI backend with all ML models
 * 
 * @author Tanuj
 * @date Jan 16, 2026
 */

import { apiClient, smartFetch } from './client';
import { mockData } from './mock-data';

// ===== API Configuration =====
const ML_API_BASE = process.env.NEXT_PUBLIC_ML_API_URL || 'http://localhost:8000';

// ===== Type Definitions =====

// User types
export interface User {
    id: string;
    name: string;
    email: string;
    income: number;
    currency: string;
    created_at: string;
}

export interface UserCreateData {
    name: string;
    email: string;
    password: string;
    income: number;
}

// Transaction types
export interface Transaction {
    id: string;
    user_id: string;
    date: string;
    amount: number;
    description: string;
    type: 'debit' | 'credit';
    category: string;
    category_confidence: number;
    is_anomaly: boolean;
    anomaly_severity: 'normal' | 'low' | 'medium' | 'high';
    notes?: string;
    created_at: string;
}

export interface TransactionUpload {
    date: string;
    amount: number;
    description: string;
    type?: 'debit' | 'credit';
    notes?: string;
}

export interface TransactionStats {
    total_transactions: number;
    total_anomalies: number;
    anomaly_rate: number;
    category_breakdown: Record<string, { total: number; count: number }>;
}

// Dashboard types
export interface DashboardData {
    user: {
        id: string;
        name: string;
        income: number;
    };
    stats: {
        current_balance: number;
        month_spent: number;
        month_saved: number;
        savings_rate: number;
        financial_score: number;
        total_transactions: number;
    };
    category_breakdown: Record<string, { total: number; count: number }>;
    anomalies: {
        count: number;
        rate: number;
    };
    insights: Insight[];
    forecast: {
        horizon: string;
        predicted_savings: number;
        confidence: number;
    } | null;
    budget_summary: {
        total_allocated: number;
        total_spent: number;
    } | null;
    goals_summary: {
        total: number;
        total_saved: number;
        total_target: number;
    };
}

export interface Insight {
    type: string;
    title: string;
    description: string;
    severity: 'info' | 'success' | 'warning' | 'error';
    icon: string;
}

// Budget types
export interface BudgetAllocation {
    category: string;
    allocated: number;
    spent: number;
}

export interface Budget {
    id: string;
    user_id: string;
    total_income: number;
    allocations: BudgetAllocation[];
    savings_target: number;
    current_savings: number;
}

export interface BudgetRecommendation {
    category: string;
    current_allocation: number;
    actual_spent: number;
    recommended: number;
    multiplier: number;
    change: 'increase' | 'decrease' | 'maintain';
    reason: string;
}

// Goal types
export interface Goal {
    id: string;
    user_id: string;
    name: string;
    icon: string;
    target: number;
    current: number;
    deadline: string;
    priority: 'low' | 'medium' | 'high';
    color: string;
    progress_percentage: number;
    remaining: number;
    on_track: boolean;
    eta_days: number | null;
    milestones: Array<{ amount: number; reached: boolean; date: string | null }>;
}

export interface GoalCreate {
    user_id: string;
    name: string;
    icon?: string;
    target: number;
    deadline: string;
    priority?: 'low' | 'medium' | 'high';
    color?: string;
}

// Gamification types
export interface LevelInfo {
    level: number;
    current_xp: number;
    xp_to_next_level: number;
    title: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlocked_at: string | null;
    trigger_description: string;
}

export interface Gamification {
    id: string;
    user_id: string;
    level_info: LevelInfo;
    total_xp: number;
    badges: Badge[];
    challenges_completed: number;
    streak_days: number;
}

// ===== API Functions =====

/**
 * ML API Client - connects to FastAPI backend
 */
export const mlApi = {
    // ===== USER ENDPOINTS =====
    user: {
        register: async (data: UserCreateData): Promise<User> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        login: async (email: string, password: string): Promise<{ message: string; user: User }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getProfile: async (userId: string): Promise<User> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/user/${userId}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        updateIncome: async (userId: string, income: number): Promise<{ message: string }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/user/${userId}/income?income=${income}`, {
                method: 'PUT',
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
    },

    // ===== TRANSACTION ENDPOINTS =====
    transactions: {
        add: async (userId: string, transaction: TransactionUpload): Promise<{
            transaction_id: string;
            category: string;
            is_anomaly: boolean;
            anomaly_severity: string;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/transactions?user_id=${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        addBulk: async (userId: string, transactions: TransactionUpload[]): Promise<{
            inserted_count: number;
            categorization_stats: Record<string, number>;
            anomaly_stats: Record<string, number>;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/transactions/bulk`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, transactions }),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        uploadCsv: async (userId: string, file: File): Promise<{
            inserted_count: number;
            categorization_stats: Record<string, number>;
            anomaly_stats: Record<string, number>;
        }> => {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch(`${ML_API_BASE}/api/v1/transactions/upload-csv?user_id=${userId}`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getAll: async (userId: string, options?: {
            limit?: number;
            skip?: number;
            category?: string;
            anomaliesOnly?: boolean;
        }): Promise<Transaction[]> => {
            const params = new URLSearchParams();
            if (options?.limit) params.set('limit', options.limit.toString());
            if (options?.skip) params.set('skip', options.skip.toString());
            if (options?.category) params.set('category', options.category);
            if (options?.anomaliesOnly) params.set('anomalies_only', 'true');

            const res = await fetch(`${ML_API_BASE}/api/v1/transactions/${userId}?${params}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getStats: async (userId: string): Promise<TransactionStats> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/transactions/${userId}/stats`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getAnomalies: async (userId: string): Promise<Transaction[]> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/transactions/${userId}/anomalies`);
            return res.json();
        },
    },

    // ===== DASHBOARD ENDPOINT =====
    dashboard: {
        get: async (userId: string): Promise<DashboardData> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/dashboard/${userId}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getSpendingTrend: async (userId: string, days: number = 30): Promise<Array<{ date: string; amount: number }>> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/dashboard/${userId}/spending-trend?days=${days}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
    },

    // ===== BUDGET ENDPOINTS =====
    budget: {
        get: async (userId: string): Promise<Budget> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/budget/${userId}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        update: async (userId: string, budget: {
            total_income: number;
            allocations: Array<{ category: string; allocated: number; spent?: number }>;
        }): Promise<{ message: string; total_allocated: number }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/budget/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...budget, user_id: userId }),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getRecommendations: async (userId: string): Promise<{
            user_id: string;
            recommendations: BudgetRecommendation[];
            total_savings_potential: number;
            method: string;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/budget/${userId}/recommend`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        submitFeedback: async (userId: string, category: string, feedback: 'accepted' | 'rejected'): Promise<{ message: string }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/budget/${userId}/feedback?category=${category}&feedback=${feedback}`, {
                method: 'POST',
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        reset: async (userId: string): Promise<{ message: string; allocations: BudgetAllocation[] }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/budget/${userId}/reset`, {
                method: 'POST',
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
    },

    // ===== GOALS ENDPOINTS =====
    goals: {
        getAll: async (userId: string): Promise<Goal[]> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/goals/${userId}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        create: async (goal: GoalCreate): Promise<{ goal_id: string; name: string; target: number }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/goals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(goal),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        contribute: async (goalId: string, amount: number): Promise<{
            new_current: number;
            progress_percentage: number;
            milestones_reached: number[];
            is_complete: boolean;
            xp_earned: number;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/goals/${goalId}/contribute`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getEta: async (goalId: string): Promise<{
            eta_days: number | null;
            days_until_deadline: number;
            on_track: boolean | null;
            message: string;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/goals/${goalId}/eta`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        delete: async (goalId: string): Promise<{ message: string }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/goals/${goalId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
    },

    // ===== GAMIFICATION ENDPOINTS =====
    gamification: {
        get: async (userId: string): Promise<Gamification> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/gamification/${userId}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        addXp: async (userId: string, amount: number, reason: string): Promise<{
            new_total_xp: number;
            level_info: LevelInfo;
            leveled_up: boolean;
            new_level: number | null;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/gamification/${userId}/xp?amount=${amount}&reason=${reason}`, {
                method: 'POST',
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        checkBadges: async (userId: string): Promise<{
            checked: number;
            newly_unlocked: Array<{ id: string; name: string; icon: string }>;
            xp_earned: number;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/gamification/${userId}/check-badges`, {
                method: 'POST',
            });
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        getLeaderboard: async (userId: string, limit: number = 10): Promise<{
            leaderboard: Array<{
                rank: number;
                user_id: string;
                name: string;
                total_xp: number;
                level: number;
                is_current_user: boolean;
            }>;
            user_rank: { rank: number; total_xp: number; level: number } | null;
        }> => {
            const res = await fetch(`${ML_API_BASE}/api/v1/gamification/leaderboard/${userId}?limit=${limit}`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },
    },

    // ===== HEALTH CHECK =====
    health: async (): Promise<{
        status: string;
        version: string;
        database: string;
        agent_available: boolean;
        ml_components: Record<string, string>;
    }> => {
        const res = await fetch(`${ML_API_BASE}/health`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
};


