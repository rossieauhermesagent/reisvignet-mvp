"use client";

import KentekenCheck from "@/components/KentekenCheck";
import EuropeMapSelector from "@/components/EuropeMapSelector";
import FranceVehicleForm from "@/components/france/FranceVehicleForm";
import TolbadgeForm from "@/components/TolbadgeForm";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [kenteken, setKenteken] = useState<string>("");
  const [step, setStep] = useState<'kenteken' | 'special_fields'>('kenteken');
  const [loading, setLoading] = useState(false);

  const handleKentekenFound = (plate: string) => {
    setKenteken(plate);
    if (step === 'special_fields') setStep('kenteken');
  };

  const startCheckout = async (productId: string, additionalData?: any) => {
    if (!kenteken) {
      document.getElementById('kenteken-section')?.scrollIntoView({ behavior: 'smooth' });
      alert("⚠️ Voer eerst je kenteken in.");
      return;
    }

    if (productId === 'frankrijk-sticker' && !additionalData) {
      setStep('special_fields');
      setSelectedCountry('FR');
      return;
    }

    if (productId === 'tolbadge-europa' && !additionalData) {
      setStep('special_fields');
      setSelectedCountry('BADGE');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, kenteken, ...(additionalData || {}) }),
      });
      const data = await res.json();
      if (data.sessionId) window.location.href = data.sessionId;
    } catch (err: any) {
      alert("Fout: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="kenteken-section" className="relative pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#222222] mb-8 leading-[0.95]">
            Jouw reis, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff385c] to-[#e31c5f]">geregeld.</span>
          </h1>
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start text-left">
            <KentekenCheck onVehicleFound={(v: any) => handleKentekenFound(v.kenteken)} />
            <EuropeMapSelector onSelect={(id) => { setSelectedCountry(id); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }} />
          </div>
        </div>
      </div>

      <div id="products-section" className="bg-[#222222] py-32 px-6 text-center">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[40px] text-left relative overflow-hidden group">
              <h3 className="text-2xl font-black text-white mb-2">Frankrijk Crit'Air</h3>
              <p className="text-neutral-400 mb-6 text-sm leading-relaxed">Verplicht in alle grote Franse steden.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-black text-white italic">€19,95</span>
                <button onClick={() => startCheckout('frankrijk-sticker')} className="bg-[#ff385c] text-white px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-transform uppercase tracking-tighter">Bestel</button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-[40px] text-left relative overflow-hidden group shadow-xl">
              <h3 className="text-2xl font-black text-[#222222] mb-2">Zwitserland E-vignet</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">Digitale registratie, binnen 5 minuten actief.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-black text-[#222222] italic">€49,95</span>
                <button onClick={() => startCheckout('zwitserland-vignet')} className="bg-[#008489] text-white px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-transform uppercase tracking-tighter">Koop</button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-700 to-blue-900 border border-blue-600 p-8 rounded-[40px] text-left relative overflow-hidden group shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-2">Tolbadge Europa</h3>
              <p className="text-blue-100 mb-6 text-sm leading-relaxed">Doorrijden in FR, IT, ES & PT via de telepeage-poorten.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-black text-white italic">€24,95</span>
                <button onClick={() => startCheckout('tolbadge-europa')} className="bg-white text-blue-800 px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-transform uppercase tracking-tighter font-serif">Aanvragen</button>
              </div>
            </div>
          </div>

          {step === 'special_fields' && (
            <div id="badge-form-container" className="max-w-2xl mx-auto text-left bg-white p-10 rounded-[40px] shadow-2xl mt-12 overflow-hidden border-4 border-gray-50">
               <button onClick={() => setStep('kenteken')} className="text-gray-400 font-bold mb-6 flex items-center gap-2 hover:text-black transition-colors uppercase text-[10px] tracking-widest"><ArrowLeft size={14}/> Terug naar overzicht</button>
               {selectedCountry === 'FR' && (
                 <div>
                   <h2 className="text-3xl font-black text-[#222222] mb-6 tracking-tight">Gegevens Frankrijk</h2>
                   <FranceVehicleForm onComplete={(d) => startCheckout('frankrijk-sticker', d)} loading={loading} />
                 </div>
               )}
               {selectedCountry === 'BADGE' && (
                 <div>
                   <h2 className="text-3xl font-black text-[#222222] mb-6 tracking-tight italic">Tolbadge Aanvraag</h2>
                   <p className="text-gray-500 mb-8 font-medium">Koppel je bankrekening voor automatische tol-incasso.</p>
                   <TolbadgeForm onComplete={(d) => startCheckout('tolbadge-europa', d)} loading={loading} />
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
