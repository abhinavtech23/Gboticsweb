import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { default as SmoothScroller } from "@/components/core/smooth-scroller";
import Navbar from "@/components/navigation/navbar";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased selection:bg-[#00f0ff] selection:text-black overflow-x-hidden min-h-screen flex flex-col`}>
        <SmoothScroller>
          <Navbar />
          <main className="flex-1 flex flex-col w-full relative z-0">
             {children}
          </main>
        </SmoothScroller>
      </body>
    </html>
  );
}
