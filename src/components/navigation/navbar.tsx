"use client";

import { Home, PackageOpen, Info } from "lucide-react";
import { AnimatedDock } from "@/components/ui/animated-dock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LogIn, User, ShieldCheck } from "lucide-react";

interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        // Not logged in
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#00f0ff]/10 py-3" : "bg-transparent py-6"
      )}
    >
      <Link href="/" className="flex items-center gap-2 group mb-4 md:mb-0 relative z-10">
        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#00f0ff] to-blue-600 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
           <span className="font-black text-white text-lg tracking-tighter relative z-10">G</span>
        </div>
        <span className="font-bold text-xl tracking-widest text-white">GBOTICS</span>
      </Link>

      <div className="md:absolute left-1/2 md:-translate-x-1/2 md:bottom-auto bottom-6 fixed z-50 w-full md:w-auto px-4 md:px-0 pointer-events-auto">
        <AnimatedDock
          items={[
            {
              link: "/",
              Icon: <Home size={22} />,
            },
            {
              link: "/products",
              Icon: <PackageOpen size={22} />,
            },
            {
              link: "/about",
              Icon: <Info size={22} />,
            },
          ]}
        />
      </div>

      <div className="hidden md:flex items-center gap-3 relative z-10">
        {loading ? (
          <div className="w-24 h-10 bg-white/5 rounded-full animate-pulse" />
        ) : user ? (
          <>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-[#00f0ff] border border-[#00f0ff]/20 rounded-full hover:bg-[#00f0ff]/10 transition-all flex items-center gap-2"
              >
                <ShieldCheck size={15} />
                Admin Panel
              </Link>
            )}
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <User size={15} />
              {user.name || user.email.split('@')[0]}
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <LogIn size={15} />
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-medium bg-[#00f0ff] text-black rounded-full hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
