"use client";

import { Boxes } from "@/components/ui/background-boxes";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";
import Footer from "@/components/navigation/footer";
import { Zap, Brain, Shield, Crosshair, Users, Globe, ArrowUpRight } from "lucide-react";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Inception",
    date: "2018",
    content: "GBOTICS founded by a team of ex-NASA and MIT robotics engineers with a vision to democratize industrial automation.",
    category: "Milestone",
    icon: Lightbulb,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "First Prototype",
    date: "2019",
    content: "Successfully developed the Arma-I, our first 6-axis robotic arm prototype, hitting sub-millimeter precision metrics in lab tests.",
    category: "Product",
    icon: Wrench,
    relatedIds: [1, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 3,
    title: "Series A & Expansion",
    date: "2021",
    content: "Raised $50M Series A led by top tier deep-tech VCs. Expanded the team to 100+ engineers and moved into our new SF headquarters.",
    category: "Milestone",
    icon: TrendingUp,
    relatedIds: [2, 4],
    status: "completed",
    energy: 95,
  },
  {
    id: 4,
    title: "Synapse OS Launch",
    date: "2023",
    content: "Released Synapse OS, our proprietary industrial software suite that integrates AI compute with localized robotic fleets.",
    category: "Product",
    icon: Laptop,
    relatedIds: [3, 5],
    status: "completed",
    energy: 90,
  },
  {
    id: 5,
    title: "Global Deployment",
    date: "2024",
    content: "Achieved 1,000+ active robotic deployments across Fortune 500 manufacturing facilities spanning 3 continents.",
    category: "Milestone",
    icon: Globe,
    relatedIds: [4, 6],
    status: "completed",
    energy: 100,
  },
  {
    id: 6,
    title: "Quantum AI Integration",
    date: "2026",
    content: "Next-gen roadmap: Integrating quantum-assisted neural networks directly into edge-compute controllers for zero-latency decision making.",
    category: "Future",
    icon: Cpu,
    relatedIds: [5],
    status: "in-progress",
    energy: 60,
  },
];

// Reusable icons for the timeline, need to be imported at the top. Let's adjust imports.
import { Lightbulb, Wrench, TrendingUp, Laptop, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      {/* Hero / Story Section with Background Boxes */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Boxes />
          <div className="absolute inset-0 bg-[#0a0a0f] [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold tracking-widest text-[#00f0ff] uppercase mb-8">
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl">
            We build the machines<br/>that build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-blue-500">future.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            GBOTICS was founded on a singular premise: human potential is limitless, but physical labor shouldn't be. We design intelligent systems that safely automate the dangerous, the tedious, and the precise.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="p-10 rounded-3xl bg-[#0d1117] border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 block text-9xl font-black group-hover:scale-110 transition-transform duration-700 pointer-events-none">M</div>
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-transparent border border-[#00f0ff]/30 flex items-center justify-center mb-8">
                 <Crosshair className="text-[#00f0ff]" size={24}/>
               </div>
               <h3 className="text-3xl font-bold mb-4">The Mission</h3>
               <p className="text-white/60 leading-relaxed text-lg">
                 To accelerate the transition to fully autonomous, zero-downtime industrial ecosystems by creating the world's most reliable and intelligent robotic hardware.
               </p>
            </div>
            
            <div className="p-10 rounded-3xl bg-[#0d1117] border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 block text-9xl font-black group-hover:scale-110 transition-transform duration-700 pointer-events-none">V</div>
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 flex items-center justify-center mb-8">
                 <Globe className="text-blue-500" size={24}/>
               </div>
               <h3 className="text-3xl font-bold mb-4">The Vision</h3>
               <p className="text-white/60 leading-relaxed text-lg">
                 A world where smart machines handle physical creation and maintenance, freeing humanity to focus on design, engineering, and innovation.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-black relative z-10">
        <div className="container mx-auto px-6 text-center mb-4">
          <h2 className="text-4xl font-bold">The Journey</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Click nodes to explore our company milestones and connected achievements.</p>
        </div>
        <div className="scale-75 md:scale-100 origin-top">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-32 bg-[#0a0a0f] relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Leadership.</h2>
              <p className="text-white/60 max-w-md">The minds driving the autonomous revolution.</p>
            </div>
            <button className="text-sm font-medium text-[#00f0ff] flex items-center gap-2 hover:text-white transition-colors">
               Join the team <ArrowUpRight size={16}/>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Elena Rostova",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
              },
              {
                name: "Marcus Chen",
                role: "VP of Hardware Engineering",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
              },
              {
                name: "Sarah Jenkins",
                role: "Head of Artificial Intelligence",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
              }
            ].map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-[#00f0ff]/20 opacity-0 group-hover:opacity-100 mix-blend-color z-10 transition-opacity duration-500"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <h4 className="text-xl font-bold mb-1 group-hover:text-[#00f0ff] transition-colors">{member.name}</h4>
                <p className="text-white/50 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
