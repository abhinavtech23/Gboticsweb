export default function WhyGboticsSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
       {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for scale.<br/>Engineered for trust.</h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              We don't experiment on your factory floor. Every GBOTICS system undergoes millions of hours of simulated training before ever touching physical hardware.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-black text-[#00f0ff] mb-2">99.9%</div>
                <div className="text-sm text-white/50 font-medium uppercase tracking-wider">Uptime Reliability</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[#00f0ff] mb-2">&lt;2ms</div>
                <div className="text-sm text-white/50 font-medium uppercase tracking-wider">Network Latency</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[#00f0ff] mb-2">5B+</div>
                <div className="text-sm text-white/50 font-medium uppercase tracking-wider">Simulated Scenarios</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[#00f0ff] mb-2">120+</div>
                <div className="text-sm text-white/50 font-medium uppercase tracking-wider">Global Patents</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
               {/* Decorative tech circle */}
               <div className="absolute inset-0 border border-[#00f0ff]/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
               <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
               <div className="absolute inset-12 bg-[#0d1117] border border-[#00f0ff]/30 rounded-full flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                 <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[#00f0ff] to-blue-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Billion Dollar Tech</h3>
                 <p className="text-sm text-white/50">Trusted by the world's most advanced manufacturing facilities.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
