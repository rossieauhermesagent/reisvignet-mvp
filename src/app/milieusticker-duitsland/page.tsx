import { CheckCircle } from "lucide-react";

export const metadata = {
  title: 'Milieusticker Duitsland (Umweltplakette) Kopen | Reisvignet.nl',
  description: 'Bestel je groene milieusticker voor Duitsland online. Verplicht voor veel Duitse steden. Makkelijk aanvragen op kenteken, snelle levering.',
};

export default function DuitslandPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#000000] text-white py-16 px-6 border-b-8 border-[#FFD700]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none italic">
            Milieusticker <br /> <span className="text-[#DD0000]">Duitsland.</span>
          </h1>
          <p className="text-xl text-white/60 font-medium">
            Ga je de Duitse "Umweltzone" in? Zorg voor een groene milieusticker om boetes te voorkomen.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-black mb-8 italic tracking-tight">Umweltplakette Aanvragen</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="text-[#717171] leading-relaxed space-y-6 font-medium">
             <p>De milieusticker voor Duitsland is verplicht als je met de auto, camper of vrachtwagen de centra van veel Duitse steden in wilt rijden. Deze steden zijn gemarkeerd als Umweltzone.</p>
             <p>Bij ons bestel je de sticker eenvoudig op basis van je Nederlandse kenteken. Wij controleren via de RDW of je voertuig in aanmerking komt voor de groene sticker (Euro 4 of hoger voor benzine, Euro 4 of hoger voor diesel).</p>
          </div>
          <div className="space-y-4">
             {[
               "Geldig in heel Duitsland",
               "Onbeperkt geldig voor je voertuig",
               "Gekoppeld aan je kentekenplaat",
               "Binnen 24 uur verwerkt"
             ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-[#222222]">
                  <CheckCircle className="text-[#008489]" size={20} /> {text}
                </div>
             ))}
          </div>
        </div>
        
        <div className="mt-20 bg-gray-50 border border-gray-100 rounded-[48px] p-12 text-center">
           <h3 className="text-2xl font-black mb-2">Snel online geregeld</h3>
           <p className="text-[#717171] font-medium mb-8">Voer je kenteken in en wij regelen de rest.</p>
           <div className="text-4xl font-black mb-10 italic">€17,50 <span className="text-sm font-normal not-italic text-gray-400">incl. verzending</span></div>
           <a href="/" className="inline-block bg-[#222222] text-white px-12 py-5 rounded-2xl font-black text-xl hover:rotate-1 transition-all active:scale-95 shadow-xl">
             KENTEKEN CHECKEN
           </a>
        </div>
      </div>
    </main>
  );
}
