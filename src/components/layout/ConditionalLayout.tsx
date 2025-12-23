'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { MockToggle } from '@/components/shared/MockToggle';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current page is auth-related
    const isAuthPage = pathname?.startsWith('/auth');

    // If auth page, render without sidebar/header
    if (isAuthPage) {
        return <>{children}</>;
    }

    // Regular app layout with sidebar
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden lg:flex" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-20 lg:pb-6">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <MobileNav className="lg:hidden" />

            {/* Developer Mock Toggle */}
            <MockToggle />
        </div>
    );
}
