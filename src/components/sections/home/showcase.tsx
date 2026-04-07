"use client";

import { GlowCard } from "@/components/ui/spotlight-card";
import Image from "next/link";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    name: "Arma-V 900",
    category: "Industrial Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop", // Robotic arm
    description: "6-axis robotic arm with sub-millimeter precision for automotive assembly.",
  },
  {
    name: "Nexus Core AI",
    category: "Compute Engine",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop", // Chip/circuit
    description: "Quantum-ready processor built specifically for real-time edge robotics processing.",
  },
  {
    name: "Sentinel Drone",
    category: "Autonomous Vehicles",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop", // Drone
    description: "AI-powered drone for spatial mapping and hazardous environment inspection.",
  }
];

export default function ShowcaseSection() {
  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Flagship Innovations.</h2>
            <p className="text-white/60 max-w-md">Our cutting-edge hardware currently deployed in Fortune 500 manufacturing facilities.</p>
          </div>
          <button className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors w-fit flex items-center gap-2 group">
            View All Products
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/10 h-[500px]">
              {/* Using standard img tag for simplicity and to avoid Next.js external image config issues for this demo */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 blur-[2px] group-hover:blur-0 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-xs font-bold tracking-widest text-[#00f0ff] uppercase mb-2">
                  {product.category}
                </div>
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
