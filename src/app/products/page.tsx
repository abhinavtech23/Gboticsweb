"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import Footer from "@/components/navigation/footer";
import { ArrowUpRight, Filter } from "lucide-react";

const allProducts = [
  {
    id: 1,
    name: "Arma-V 900",
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop",
    description: "6-axis robotic arm with sub-millimeter precision for automotive assembly.",
    color: "cyan" as const
  },
  {
    id: 2,
    name: "Nexus Core AI",
    category: "AI",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    description: "Quantum-ready processor built specifically for real-time edge robotics processing.",
    color: "blue" as const
  },
  {
    id: 3,
    name: "Sentinel Drone",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop",
    description: "AI-powered drone for spatial mapping and hazardous environment inspection.",
    color: "purple" as const
  },
  {
    id: 4,
    name: "OpticFlow Vision",
    category: "AI",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2832&auto=format&fit=crop",
    description: "Real-time computer vision system capable of identifying microscopic defects at 120fps.",
    color: "blue" as const
  },
  {
    id: 5,
    name: "TITAN Chassis",
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2670&auto=format&fit=crop",
    description: "Heavy-duty autonomous mobile robot base capable of moving 2-ton payloads.",
    color: "cyan" as const
  },
  {
    id: 6,
    name: "Synapse OS",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    description: "Centralized factory automation software that controls up to 10,000 nodes simultaneously.",
    color: "purple" as const
  }
];

const categories = ["All", "AI", "Robotics", "Industrial"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <>
      <div className="pt-32 pb-20 bg-[#0a0a0f] min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">Hardware.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-blue-600">Reimagined.</span></h1>
              <p className="text-white/60 text-lg">Browse our catalog of industry-defining robotics, AI processors, and automation software.</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              <div className="flex items-center mr-4 text-white/40">
                <Filter size={16} className="mr-2" />
                <span className="text-sm font-medium uppercase tracking-wider">Filter</span>
              </div>
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category 
                      ? "bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <GlowCard 
                key={product.id}
                glowColor={product.color}
                customSize={true}
                className="h-[450px] p-0 overflow-hidden group border border-white/5"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-1/2 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[#0d1117]/80 to-[#0d1117]"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-end p-8 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent">
                  <div className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold tracking-widest text-white/70 uppercase mb-4 w-fit">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-medium text-[#00f0ff] group-hover:text-white transition-colors w-fit">
                    View Specifications
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
