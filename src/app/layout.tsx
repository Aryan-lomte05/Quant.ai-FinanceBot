import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { MockToggle } from "@/components/shared/MockToggle";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Bandhu - Your Financial Friend",
  description: "AI-powered personal finance management for students and first-time earners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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

          {/* Toaster Notifications */}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
