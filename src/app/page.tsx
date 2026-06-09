"use client";

import KentekenCheck from "@/components/KentekenCheck";
import EuropeMapSelector from "@/components/EuropeMapSelector";
import { ShieldCheck, Truck, Clock, ArrowRight, Star, MapPin } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const scrollToProducts = (countryId: string) => {
    setSelectedCountry(countryId);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#FCFCFC] selection:bg-[#ff385c]/10">
      {/* ... (rest of the top bar and nav remains the same) ... */}
      
      {/* Hero Experience */}
      <div className="relative pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* ... (inline badges and titles) ... */}
          
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start text-left">
            <KentekenCheck />
            <EuropeMapSelector onSelect={scrollToProducts} />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      {/* ... (features stay the same) ... */}

      {/* High-End Product Selection */}
      <div id="products-section" className="bg-[#222222] py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
              {selectedCountry ? (
                <>Jouw vignet voor <br /> <span className="text-[#ff385c]">{selectedCountry === 'CH' ? 'Zwitserland' : selectedCountry === 'FR' ? 'Frankrijk' : 'Oostenrijk'}</span></>
              ) : (
                <>Kies je <br /> <span className="text-[#717171]">bestemming.</span></>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* France Card */}
            <div className={`group bg-neutral-900 border ${selectedCountry === 'FR' ? 'border-[#ff385c] ring-2 ring-[#ff385c]/20' : 'border-neutral-800'} p-12 rounded-[48px] hover:border-[#ff385c] transition-all relative overflow-hidden text-left shadow-2xl`}>
              {selectedCountry === 'FR' && <div className="absolute top-8 right-8 bg-[#ff385c] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Geselecteerd</div>}
              <div className="relative z-10">
                <div className="text-white opacity-40 font-bold mb-4 tracking-widest text-xs uppercase italic">Beschikbaar</div>
                <h3 className="text-4xl font-black text-white mb-4">Frankrijk <br /> <span className="text-[#ff385c]">Crit&apos;Air.</span></h3>
                <p className="text-neutral-400 mb-10 text-lg font-medium leading-relaxed max-w-xs">De enige officiële manier om de milieuzones te betreden.</p>
                <div className="flex items-center gap-8">
                   <div>
                     <span className="text-neutral-500 text-xs font-bold uppercase block mb-1">Prijs</span>
                     <span className="text-3xl font-black text-white italic">€19,95</span>
                   </div>
                   <button className="flex-1 bg-white text-black py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#ff385c] group-hover:text-white transition-all active:scale-95">
                      BESTEL NU <ArrowRight size={20} />
                   </button>
                </div>
              </div>
            </div>

            {/* Swiss Card */}
            <div className={`group bg-white border ${selectedCountry === 'CH' ? 'border-[#008489] ring-2 ring-[#008489]/20' : 'border-gray-100'} p-12 rounded-[48px] hover:border-[#008489] transition-all relative overflow-hidden text-left airbnb-shadow`}>
              {selectedCountry === 'CH' && <div className="absolute top-8 right-8 bg-[#008489] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Geselecteerd</div>}
               <div className="relative z-10">
                <div className="text-[#008489] font-bold mb-4 tracking-widest text-xs uppercase italic">Direct actief</div>
                <h3 className="text-4xl font-black text-[#222222] mb-4">Zwitserland <br /> <span className="text-[#008489]">E-vignet.</span></h3>
                <p className="text-[#717171] mb-10 text-lg font-medium leading-relaxed max-w-xs">Gekoppeld aan je kenteken. Geen sticker op de ruit nodig.</p>
                <div className="flex items-center gap-8">
                   <div>
                     <span className="text-[#717171] text-xs font-bold uppercase block mb-1">Prijs</span>
                     <span className="text-3xl font-black text-[#222222] italic font-serif">€49,95</span>
                   </div>
                   <button className="flex-1 bg-222222 text-white py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#008489] transition-all active:scale-95">
                      DIRECT ACTIVEREN <ArrowRight size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-20 text-center border-t border-gray-100 max-w-4xl mx-auto px-6">
        <div className="text-[#222222] font-black text-xl mb-4">REISVIGNET<span className="text-[#ff385c]">.NL</span></div>
        <p className="text-[#717171] text-sm font-medium leading-relaxed mb-6 italic">
          Onderdeel van de Rossieau Agent Network. Wij maken reizen door Europa eenvoudiger door techniek te combineren met officieel reisadvies.
        </p>
        <div className="flex justify-center gap-6 text-[#222222] font-bold text-sm uppercase tracking-widest">
           <a href="#" className="hover:text-[#ff385c]">Privacy</a>
           <a href="#" className="hover:text-[#ff385c]">Voorwaarden</a>
           <a href="#" className="hover:text-[#ff385c]">Contact</a>
        </div>
      </footer>
    </main>
  );
}
