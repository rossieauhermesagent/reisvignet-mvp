"use client";

import KentekenCheck from "@/components/KentekenCheck";
import EuropeMapSelector from "@/components/EuropeMapSelector";
import { ShieldCheck, Truck, Clock, ArrowRight, Star, MapPin } from "lucide-react";
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
      const { sessionId, error } = await res.json();
      if (error) throw new Error(error);

      // We gebruiken de Stripe redirect via de sessionId
      // Hiervoor moet de Stripe Client SDK ingeladen zijn, maar voor nu doen we een directe URL redirect
      // als de API de session URL teruggeeft (zoals best-practice in Next.js)
      window.location.href = sessionId; // We passen de API zo aan dat hij de URL teruggeeft
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
    <main className="min-h-screen bg-[#FCFCFC] selection:bg-[#ff385c]/10">
      {/* ... (rest of Nav) ... */}

      {/* Hero Experience */}
      <div className="relative pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* ... */}
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start text-left">
            <KentekenCheck onVehicleFound={(v) => handleKentekenFound(v.kenteken)} />
            <EuropeMapSelector onSelect={scrollToProducts} />
          </div>
        </div>
      </div>

      {/* ... (Features) ... */}

      {/* High-End Product Selection */}
      <div id="products-section" className="bg-[#222222] py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* ... Header ... */}

          <div className="grid md:grid-cols-2 gap-10">
            {/* France Card */}
            <div className={`group bg-neutral-900 border ${selectedCountry === 'FR' ? 'border-[#ff385c] ring-2 ring-[#ff385c]/20' : 'border-neutral-800'} p-12 rounded-[48px] hover:border-[#ff385c] transition-all relative overflow-hidden text-left shadow-2xl`}>
              {/* ... Content ... */}
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
               {/* ... Content ... */}
                   <button 
                     onClick={() => startCheckout('zwitserland-vignet')}
                     disabled={loading}
                     className="flex-1 bg-222222 text-white py-5 rounded-[20px] font-black flex items-center justify-center gap-2 group-hover:bg-[#008489] transition-all active:scale-95 disabled:opacity-50"
                   >
                      {loading ? 'Laden...' : <>DIRECT ACTIVEREN <ArrowRight size={20} /></>}
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
