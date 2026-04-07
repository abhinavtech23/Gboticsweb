"use client";

import { Home, PackageOpen, Info, Mail } from "lucide-react";
import { AnimatedDock } from "@/components/ui/animated-dock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

      <div className="hidden md:flex items-center gap-4 relative z-10">
         <button className="px-5 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-colors">
            Client Portal
         </button>
         <button className="px-5 py-2 text-sm font-medium bg-[#00f0ff] text-black rounded-full hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all">
            Contact Us
         </button>
      </div>
    </header>
  );
}
