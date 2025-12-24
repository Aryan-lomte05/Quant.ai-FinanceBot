'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Smooth scroll to top on route change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    useEffect(() => {
        // Enable smooth scrolling globally
        document.documentElement.style.scrollBehavior = 'smooth';

        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return <>{children}</>;
}
