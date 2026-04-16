"use client";

import { TextSplit } from "@/components/ui/split-text";
import { motion } from "framer-motion";

export default function TextSplitDemoSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#00f0ff] uppercase mb-4">
              Interactive Typography
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Our proprietary split-text engine allows for fluid, physically-simulated interactions with every glyph.
            </p>
          </motion.div>

          <div className="p-20 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative group cursor-default">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[3rem]" />
            
            <TextSplit
              className="text-4xl md:text-6xl font-medium text-zinc-900 dark:text-zinc-50 relative z-10"
              maxMove={150}
              falloff={0.1}
            >
              Cut through the silence
            </TextSplit>
          </div>
          
          <div className="mt-12 text-white/20 text-xs font-mono uppercase tracking-widest">
            Hover over the text to interact
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00f0ff]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
