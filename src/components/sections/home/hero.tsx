"use client";

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#00f0ff"
      />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 h-full">
        <div className="flex flex-col justify-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
            <span className="text-xs font-medium text-[#00f0ff] tracking-wide uppercase">Next-Gen Robotics</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
            <span className="block w-full">
              Engineering the
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-blue-600">
              Future Today.
            </span>
          </h1>
          
          <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
            GBOTICS pioneers artificial intelligence and advanced machine systems to automate, enhance, and elevate human capability across industrial sectors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[#00f0ff] transition-all duration-300 flex items-center justify-center gap-2 group">
              Explore Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative w-full h-[50vh] lg:h-[80vh] min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f] z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent z-10 pointer-events-none"></div>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
