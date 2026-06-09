"use client";

import { MapPin, Star } from "lucide-react";
import { useState } from "react";
import StatusModal from "@/components/StatusModal";

export default function Navbar() {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  return (
    <>
      <StatusModal 
        isOpen={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)} 
      />

      {/* Dynamic Top Bar */}
      <div className="bg-[#222222] text-white text-[12px] py-2 px-6 flex justify-between items-center font-medium tracking-tight">
        <div className="flex gap-4">
          <span className="opacity-60 italic">Vignetten voor 2026 nu beschikbaar</span>
          <span className="hidden md:inline text-[#008489]">● iDEAL geactiveerd</span>
        </div>
        <div className="flex gap-2 items-center">
          <Star size={12} className="fill-[#ff385c] text-[#ff385c]" />
          <span>4.9/5 op Trustpilot</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-[#ff385c] w-8 h-8 rounded-lg flex items-center justify-center text-white rotate-3">
              <MapPin size={18} />
            </div>
            <div className="text-[#222222] font-black text-2xl tracking-tighter">
              REISVIGNET<span className="text-[#ff385c]">.NL</span>
            </div>
          </a>
          
          <div className="hidden lg:flex gap-10 text-[15px] font-semibold text-[#222222]">
            <a href="/frankrijk" className="hover:text-[#ff385c] transition-colors">Frankrijk</a>
            <a href="/zwitserland" className="hover:text-[#ff385c] transition-colors">Zwitserland</a>
            <a href="/oostenrijk" className="hover:text-[#ff385c] transition-colors">Oostenrijk</a>
            <a href="/hulp" className="hover:text-[#ff385c] transition-colors">Hulpvragen</a>
          </div>

          <button 
            onClick={() => setIsStatusModalOpen(true)}
            className="bg-white border-2 border-[#222222] text-[#222222] px-6 py-2.5 rounded-2xl text-sm font-black hover:bg-[#222222] hover:text-white transition-all active:scale-95 shadow-sm"
          >
            STATUS CHECK
          </button>
        </div>
      </nav>
    </>
  );
}
