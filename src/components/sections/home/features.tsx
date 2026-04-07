"use client";

import { Cpu, Bot, Waypoints } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const features = [
  {
    title: "AI Solutions",
    description: "Advanced neural networks and machine learning models designed to optimize complex industrial processes in real-time.",
    icon: <Cpu size={32} className="text-[#00f0ff]" />,
    color: "cyan" as const,
  },
  {
    title: "Robotics Systems",
    description: "High-precision, autonomous robotic arms and chassis built for manufacturing, logistics, and hazardous environments.",
    icon: <Bot size={32} className="text-blue-400" />,
    color: "blue" as const,
  },
  {
    title: "Automation Tech",
    description: "Seamlessly integrate physical machines with intelligent software to create fully automated, zero-downtime workflows.",
    icon: <Waypoints size={32} className="text-purple-400" />,
    color: "purple" as const,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#00f0ff] uppercase mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Intelligence meets <br/> physical engineering.</h3>
          <p className="text-white/60 max-w-2xl text-lg">
            We don't just build machines. We build ecosystems where artificial intelligence and robotics work in perfect synchrony to solve the unsolvable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <GlowCard 
              key={index} 
              glowColor={feature.color}
              className="h-full flex flex-col items-start p-8 bg-[#0d1117]/80 hover:bg-[#0d1117] transition-colors border border-white/5"
              customSize={true} // Allow flexible sizing
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)]">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
              <p className="text-white/60 leading-relaxed flex-grow">
                {feature.description}
              </p>
              
              <button className="mt-8 text-sm font-medium text-white/50 hover:text-white uppercase tracking-widest flex items-center gap-2 group transition-colors">
                Learn more
                <span className="w-6 h-[1px] bg-white/30 group-hover:bg-white group-hover:w-10 transition-all duration-300"></span>
              </button>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
