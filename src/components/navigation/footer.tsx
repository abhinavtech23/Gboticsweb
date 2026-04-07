import Link from "next/link";
import { Globe, Briefcase, Code, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative neon line on top edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="w-8 h-8 rounded-sm bg-[#00f0ff] flex items-center justify-center">
                 <span className="font-black text-[#0a0a0f] text-lg tracking-tighter">G</span>
              </div>
              <span className="font-bold text-xl tracking-widest text-white">GBOTICS</span>
            </Link>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              Engineering the future with AI & Robotics. Advanced machines for an automated world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all">
                <Briefcase size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all">
                <Code size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Products</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Arma-V Series</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Nexus AI Cores</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Sentinel Drones</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Software Suite</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> About Us</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Careers <span className="ml-2 py-0.5 px-2 bg-[#00f0ff]/10 text-[#00f0ff] text-[10px] rounded-full">Hiring</span></a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Press</a></li>
              <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#00f0ff]"/> Investors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="text-white/50 text-sm hover:text-white transition-colors">hello@gbotics.ai</li>
              <li className="text-white/50 text-sm hover:text-white transition-colors">+1 (800) 555-0199</li>
              <li className="text-white/50 text-sm leading-relaxed">
                100 Innovation Orbit<br/>
                San Francisco, CA 94107
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} GBOTICS Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white transition-colors text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
