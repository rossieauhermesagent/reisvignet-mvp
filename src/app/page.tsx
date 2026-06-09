"use client";

import KentekenCheck from "@/components/KentekenCheck";
import EuropeMapSelector from "@/components/EuropeMapSelector";
import { ShieldCheck, Clock, ArrowRight, Star } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [kenteken, setKenteken] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleKentekenFound = (plate: string) => {
    setKenteken(plate);
  };

  const startCheckout = async (productId: string) => {
    if (!kenteken) {
      alert("Voer eerst je kenteken in voor de check.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, kenteken }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Server fout");
      }
      
      if (data.sessionId) {
        window.location.href = data.sessionId;
      }
    } catch (err: any) {
      alert("Checkout fout: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollToProducts = (countryId: string) => {
    setSelectedCountry(countryId);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Experience */}
      <div className="relative pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#ff385c]/5 text-[#ff385c] px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff385c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff385c]"></span>
            </span>
            Klaar voor de zomer van 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#222222] mb-8 leading-[0.95]">
            Jouw reis, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff385c] to-[#e31c5f]">geregeld.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-16 text-[#717171] max-w-2xl mx-auto font-medium leading-normal tracking-tight">
            Geen vreemde talen, geen gedoe. Direct je vignetten en milieustickers op basis van je kenteken.
          </p>
          
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start text-left">
            <KentekenCheck onVehicleFound={(v) => handleKentekenFound(v.kenteken)} />
            <EuropeMapSelector onSelect={scrollToProducts} />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="bg-[#008489] w-12 h-1 text-white mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-[#222222] mb-8 tracking-tighter leading-tight italic">
            Waarom kiezen voor <br /> Reisvignet.nl?
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 group">
              <div className="bg-white p-4 rounded-3xl airbnb-shadow group-hover:scale-110 transition-transform"><ShieldCheck className="text-[#008489]" size={28} /></div>
              <div>
                <h4 className="font-bold text-xl text-[#222222]">100% Officieel</h4>
                <p className="text-[#717171] leading-relaxed">Wij zijn geautoriseerd tussenpersoon voor alle Europese vignet-diensten.</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="bg-white p-4 rounded-3xl airbnb-shadow group-hover:scale-110 transition-transform"><Clock className="text-[#008489]" size={28} /></div>
              <div>
                <h4 className="font-bold text-xl text-[#222222]">Razendsnelle Verwerking</h4>
                <p className="text-[#717171] leading-relaxed">Ons systeem koppelt direct aan de officiële databases voor directe uitgifte.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-tr from-gray-100 to-gray-50 rounded-[64px] border border-gray-100 p-8 flex items-center justify-center overflow-hidden">
             <div className="text-[120px] font-black opacity-[0.03] absolute rotate-12 -right-8">EUROPE</div>
             <div className="relative z-10 text-center">
                <div className="text-7xl font-black text-[#222222] mb-2 leading-none">NL / FR</div>
                <div className="text-[#ff385c] font-black tracking-[1em] text-sm ml-4 uppercase">Connected</div>
             </div>
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl airbnb-shadow max-w-[240px] border border-gray-50">
            <p className="text-[#717171] text-sm font-medium mb-2 italic">{"\"Heerlijk om in het Nederlands alles te kunnen regelen. Top service!\""}</p>
            <div className="flex gap-1 text-[#ff385c]"><Star size={12} className="fill-current"/><Star size={12} className="fill-current"/><Star size={12} className="fill-current"/><Star size={12} className="fill-current"/><Star size={12} className="fill-current"/></div>
          </div>
        </div>
      </div>

      {/* High-End Product Selection */}
      <div id="products-section" className="bg-[#222222] py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-left">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none">
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
                   <button 
                     onClick={() => startCheckout('frankrijk-sticker')}
                     disabled={loading}
                     className="flex-1 bg-white text-black py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#ff385c] group-hover:text-white transition-all active:scale-95 disabled:opacity-50"
                   >
                      {loading ? 'Laden...' : <>BESTEL NU <ArrowRight size={20} /></>}
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
                   <button 
                     onClick={() => startCheckout('zwitserland-vignet')}
                     disabled={loading}
                     className="flex-1 bg-[#222222] text-white py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#008489] transition-all active:scale-95 disabled:opacity-50"
                   >
                      {loading ? 'Laden...' : <>DIRECT ACTIVEREN <ArrowRight size={20} /></>}
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
