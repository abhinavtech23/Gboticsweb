import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { default as SmoothScroller } from "@/components/core/smooth-scroller";
import Navbar from "@/components/navigation/navbar";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GBOTICS | Engineering the Future with AI & Robotics",
  description: "Premium robotics, AI solutions, and advanced automation machines. Feel the future with GBOTICS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${jakarta.variable} ${outfit.variable}`}>
      <body className={`font-sans bg-[#0a0a0f] text-white antialiased selection:bg-[#00f0ff] selection:text-black overflow-x-hidden min-h-screen flex flex-col`}>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <EtheralShadow
            color="rgba(0, 240, 255, 0.08)"
            animation={{ scale: 100, speed: 60 }}
            noise={{ opacity: 0.5, scale: 1.2 }}
            sizing="fill"
          />
        </div>
        <SmoothScroller>
          <Navbar />
          <main className="flex-1 flex flex-col w-full relative z-10">
             {children}
          </main>
        </SmoothScroller>
      </body>
    </html>
  );
}
