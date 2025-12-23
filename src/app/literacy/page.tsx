"use client";

import { useState } from 'react';
import { courses } from '@/lib/constants/courses';
import { calculators } from '@/lib/constants/calculators';
import { CourseCard } from '@/components/literacy/CourseCard';
import { CalculatorCard } from '@/components/literacy/CalculatorCard';
import { ProgressTracker } from '@/components/literacy/ProgressTracker';
import { BookOpen, Calculator, Award, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function LiteracyPage() {
    const [activeTab, setActiveTab] = useState<'courses' | 'calculators'>('courses');
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    const filteredCalculators = calculators.filter(calc =>
        calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Literacy Hub</h1>
                <p className="text-gray-600">Master your money with bite-sized lessons and powerful tools</p>
            </div>

            {/* Progress Tracker */}
            <ProgressTracker />

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search courses and calculators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {activeTab === 'courses' && (
                    <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mint-500"
                    >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                )}
            </div>

            {/* Tabs */}
            <div className="glass p-2 rounded-xl border-2 border-white/50 inline-flex gap-2">
                {[
                    { id: 'courses', label: 'Courses', icon: BookOpen, count: courses.length },
                    { id: 'calculators', label: 'Calculators', icon: Calculator, count: calculators.length },
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
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'courses' && (
                <div>
                    {/* My Courses */}
                    {courses.some(c => c.enrolled) && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-mint-600" />
                                My Courses
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses
                                    .filter(c => c.enrolled)
                                    .map((course, index) => (
                                        <CourseCard key={course.id} course={course} index={index} />
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* All Courses */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {courses.some(c => c.enrolled) ? 'Explore More' : 'All Courses'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses
                                .filter(c => !c.enrolled)
                                .map((course, index) => (
                                    <CourseCard key={course.id} course={course} index={index} />
                                ))}
                        </div>
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                            <p className="text-gray-600">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'calculators' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCalculators.map((calculator, index) => (
                        <CalculatorCard key={calculator.id} calculator={calculator} index={index} />
                    ))}

                    {filteredCalculators.length === 0 && (
                        <div className="col-span-2 text-center py-12">
                            <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No calculators found</h3>
                            <p className="text-gray-600">Try adjusting your search</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
