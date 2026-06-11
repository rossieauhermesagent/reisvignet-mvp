"use client";

import KentekenCheck from "@/components/KentekenCheck";
import EuropeMapSelector from "@/components/EuropeMapSelector";
import FranceVehicleForm from "@/components/france/FranceVehicleForm";
import { ShieldCheck, Clock, ArrowRight, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [kenteken, setKenteken] = useState<string>("");
  const [step, setStep] = useState<'kenteken' | 'special_fields' | 'checkout'>('kenteken');
  const [franceData, setFranceData] = useState<{ vin: string; frontImage: string; backImage: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleKentekenFound = (plate: string) => {
    setKenteken(plate);
    // Reset formulier als er een nieuw kenteken wordt ingevoerd
    if (step === 'special_fields') {
      setStep('kenteken');
    }
  };

  const startCheckout = async (productId: string, additionalData?: any) => {
    if (!kenteken) {
      const kentekenSection = document.getElementById('kenteken-section');
      if (kentekenSection) {
        kentekenSection.scrollIntoView({ behavior: 'smooth' });
        // Optional: you could add a temporary highlight or shakes here
      }
      alert("⚠️ Voer eerst je kenteken in om je vignet te kunnen bestellen.");
      return;
    }

    // Speciale check voor Frankrijk
    if (productId === 'frankrijk-sticker' && !additionalData) {
      setStep('special_fields');
      // Scroll naar het formulier zodra het verschijnt
      setTimeout(() => {
        const formElement = document.getElementById('france-form-container');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          kenteken,
          ...(additionalData || {})
        }),
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

  const handleFranceComplete = (data: { vin: string; frontImage: string; backImage: string }) => {
    setFranceData(data);
    startCheckout('frankrijk-sticker', data);
  };

  const scrollToProducts = (countryId: string) => {
    setSelectedCountry(countryId);
    // Reset formulier als er een ander land gekozen wordt
    if (step === 'special_fields' && countryId !== 'FR') {
      setStep('kenteken');
    }
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Experience */}
      <div id="kenteken-section" className="relative pt-20 pb-32 px-6">
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
          
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start text-left">
            <KentekenCheck onVehicleFound={(v) => handleKentekenFound(v.kenteken)} />
            <EuropeMapSelector onSelect={scrollToProducts} />
          </div>
        </div>
      </div>

      {/* Feature Section en Product Selection */}
      <div id="products-section" className="bg-[#222222] py-32 px-6">
        <div className=\"max-w-6xl mx-auto\">
          <div className=\"grid md:grid-cols-2 gap-10 mb-20\">
            {/* France Card */}
            <div className={`group bg-neutral-900 border ${selectedCountry === 'FR' ? 'border-[#ff385c] ring-2 ring-[#ff385c]/20' : 'border-neutral-800'} p-12 rounded-[48px] hover:border-[#ff385c] transition-all relative overflow-hidden text-left shadow-2xl`}>
              {selectedCountry === 'FR' && <div className=\"absolute top-8 right-8 bg-[#ff385c] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse\">Geselecteerd</div>}
              <div className=\"relative z-10\">
                <div className=\"text-white opacity-40 font-bold mb-4 tracking-widest text-xs uppercase italic\">Beschikbaar</div>
                <h3 className=\"text-4xl font-black text-white mb-4\">Frankrijk <br /> <span className=\"text-[#ff385c]\">Crit&apos;Air.</span></h3>
                <p className=\"text-neutral-400 mb-10 text-lg font-medium leading-relaxed max-w-xs\">De enige officiële manier om de milieuzones te betreden.</p>
                <div className=\"flex items-center gap-8\">
                   <div>
                     <span className=\"text-neutral-500 text-xs font-bold uppercase block mb-1\">Prijs</span>
                     <span className=\"text-3xl font-black text-white italic\">€19,95</span>
                   </div>
                   <button 
                     onClick={() => startCheckout('frankrijk-sticker')}
                     disabled={loading}
                     className=\"flex-1 bg-white text-black py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#ff385c] group-hover:text-white transition-all active:scale-95 disabled:opacity-50\"
                   >
                      {loading ? 'Laden...' : <>BESTEL NU <ArrowRight size={20} /></>}
                   </button>
                </div>
              </div>
            </div>

            {/* Swiss Card */}
            <div className={`group bg-white border ${selectedCountry === 'CH' ? 'border-[#008489] ring-2 ring-[#008489]/20' : 'border-gray-100'} p-12 rounded-[48px] hover:border-[#008489] transition-all relative overflow-hidden text-left airbnb-shadow`}>
              {selectedCountry === 'CH' && <div className=\"absolute top-8 right-8 bg-[#008489] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse\">Geselecteerd</div>}
               <div className=\"relative z-10\">
                <div className=\"text-[#008489] font-bold mb-4 tracking-widest text-xs uppercase italic\">Direct actief</div>
                <h3 className=\"text-4xl font-black text-[#222222] mb-4\">Zwitserland <br /> <span className=\"text-[#008489]\">E-vignet.</span></h3>
                <p className=\"text-[#717171] mb-10 text-lg font-medium leading-relaxed max-w-xs\">Gekoppeld aan je kenteken. Geen sticker op de ruit nodig.</p>
                <div className=\"flex items-center gap-8\">
                   <div>
                     <span className=\"text-[#717171] text-xs font-bold uppercase block mb-1\">Prijs</span>
                     <span className=\"text-3xl font-black text-[#222222] italic\">€49,95</span>
                   </div>
                   <button 
                     onClick={() => startCheckout('zwitserland-vignet')}
                     disabled={loading}
                     className=\"flex-1 bg-[#222222] text-white py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#008489] transition-all active:scale-95 disabled:opacity-50\"
                   >
                      {loading ? 'Laden...' : <>DIRECT ACTIVEREN <ArrowRight size={20} /></>}
                   </button>
                </div>
              </div>
            </div>
          </div>

          {step === 'special_fields' && (
            <div id="france-form-container" className="max-w-2xl mx-auto text-left bg-white p-8 rounded-[32px] shadow-2xl animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setStep('kenteken')}
                className="flex items-center gap-2 text-[#717171] font-bold mb-4 hover:text-[#222222] transition-colors"
              >
                <ArrowLeft size={18} /> Annuleren
              </button>
              <h2 className="text-2xl font-black text-[#222222] mb-6">Aanvullende gegevens Frankrijk</h2>
              <FranceVehicleForm onComplete={handleFranceComplete} loading={loading} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
