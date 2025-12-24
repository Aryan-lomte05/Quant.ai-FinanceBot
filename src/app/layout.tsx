import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster } from "@/components/ui/toaster";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"; // ADD THIS
import { ParallaxBackground } from "@/components/shared/ParallaxBackground"; // ADD THIS
import { FloatingElements } from "@/components/shared/FloatingElements"; // ADD THIS

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
        <SmoothScrollProvider> {/* ADD THIS - WRAP EVERYTHING */}
          <ParallaxBackground /> {/* ADD THIS */}
          <FloatingElements /> {/* ADD THIS */}

          <ConditionalLayout>{children}</ConditionalLayout>

          {/* React Hot Toast */}
          <HotToaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#374151',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          {/* Shadcn Toast */}
          <Toaster />

          <ScrollToTop />
        </SmoothScrollProvider> {/* ADD THIS - CLOSE WRAPPER */}
      </body>
    </html>
  );
}
