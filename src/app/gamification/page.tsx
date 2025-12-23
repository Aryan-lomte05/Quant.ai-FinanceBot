"use client";

import { useState } from 'react';
import { useGamificationStore } from '@/lib/store/useGamificationStore';
import { LevelProgressBar } from '@/components/gamification/LevelProgressBar';
import { BadgeGrid } from '@/components/gamification/BadgeGrid';
import { ChallengeCard } from '@/components/gamification/ChallengeCard';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { BadgeUnlockModal } from '@/components/gamification/BadgeUnlockModal';
import { AchievementUnlockModal } from '@/components/gamification/AchievementUnlockModal';
import { Badge } from '@/lib/constants/achievements';
import { Trophy, Target, Award, Users } from 'lucide-react';

export default function GamificationPage() {
    const { level, badges, challenges, recentUnlocks, addXP, updateChallengeProgress, clearRecentUnlocks } = useGamificationStore();
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
    const [activeTab, setActiveTab] = useState<'challenges' | 'badges' | 'leaderboard'>('challenges');

    // Get current unlock from recent unlocks
    const currentUnlock = recentUnlocks[0] || null;

    const handleCompleteChallenge = (challengeId: string) => {
        const challenge = challenges.find(c => c.id === challengeId);
        if (challenge && !challenge.completed) {
            updateChallengeProgress(challengeId, challenge.target);
            addXP(challenge.xp, `Completed ${challenge.title}`);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements & Rewards</h1>
                <p className="text-gray-600">Level up, unlock badges, and compete with friends</p>
            </div>

            {/* Level Progress */}
            <LevelProgressBar level={level} />

            {/* Tabs */}
            <div className="glass p-2 rounded-xl border-2 border-white/50 inline-flex gap-2">
                {[
                    { id: 'challenges', label: 'Challenges', icon: Target },
                    { id: 'badges', label: 'Badges', icon: Award },
                    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-mint-500 to-skyBlue-500 text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'challenges' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Weekly Challenges</h2>
                        <span className="text-sm text-gray-600">
                            {challenges.filter(c => c.completed).length} / {challenges.length} completed
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {challenges.map((challenge) => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                onComplete={() => handleCompleteChallenge(challenge.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'badges' && (
                <BadgeGrid badges={badges} onBadgeClick={setSelectedBadge} />
            )}

            {activeTab === 'leaderboard' && <Leaderboard />}

            {/* Badge Detail Modal (Your existing modal for viewing badge details) */}
            <BadgeUnlockModal
                badge={selectedBadge}
                onClose={() => setSelectedBadge(null)}
            />

            {/* Achievement Unlock Modal (NEW - Auto-triggers with confetti) */}
            <AchievementUnlockModal
                badge={currentUnlock}
                isOpen={!!currentUnlock}
                onClose={clearRecentUnlocks}
            />
        </div>
    );
}
