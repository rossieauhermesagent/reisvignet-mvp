import { CheckCircle, Info } from "lucide-react";

export const metadata = {
  title: 'Vignet Oostenrijk 2026 Online Kopen (1 dag, 10 dagen) | Reisvignet.nl',
  description: 'Bestel je digitale vignet voor Oostenrijk direct online. 1 dag, 10 dagen of 2 maanden geldig. Geen wachttijd, direct actief voor je reis.',
};

export default function OostenrijkPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#e31c5f] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none italic">
            Vignet <br /> <span className="text-white/80">Oostenrijk.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl leading-relaxed">
            Snel op weg naar de Alpen? Bestel je digitale vignet zonder de 18 dagen wachttijd van de ASFINAG. Bij ons direct actief.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-24 px-6 grid lg:grid-cols-[1fr,380px] gap-20">
        <div>
          <h2 className="text-4xl font-black mb-8 tracking-tighter italic">Digitale Vignet Opties 2026</h2>
          <div className="space-y-6">
            {[
              { t: "1 Dag Vignet", p: "€14,95", d: "Ideaal voor doorreizen naar Italië of Slovenië." },
              { t: "10 Dagen Vignet", p: "€19,95", d: "De meest gekozen optie voor een vakantie." },
              { t: "2 Maanden Vignet", p: "€39,95", d: "Voor wie langer in Oostenrijk verblijft." }
            ].map((v, i) => (
              <div key={i} className="group p-8 rounded-[32px] border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#e31c5f] transition-all hover:shadow-2xl flex justify-between items-center cursor-pointer">
                <div>
                  <h4 className="text-2xl font-black mb-1">{v.t}</h4>
                  <p className="text-[#717171] font-medium">{v.d}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#222222] italic">{v.p}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
             <h3 className="text-3xl font-black mb-6 italic tracking-tight">Geen wachttijd voor consumenten</h3>
             <p className="text-[#717171] leading-relaxed text-lg font-medium mb-6">
               Normaal gesproken geldt er bij de officiële Oostenrijkse instantie (ASFINAG) een wachttijd van 18 dagen vanwege het herroepingsrecht voor consumenten. Bij Reisvignet.nl hoef je niet te wachten. Wij verwerken je aanvraag direct als zakelijke service, waardoor je vignet **direct na aankoop geldig** is.
             </p>
             <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl flex gap-6 italic">
                <Info className="text-amber-600 shrink-0" size={32} />
                <p className="text-amber-900 font-medium">Let op: Voor de Arlbergtunnel, Brennerpas en Tauernautobahn is vaak nog een aparte Streckenmaut (Trajecttol) vereist.</p>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-32 p-10 bg-[#222222] rounded-[48px] text-white shadow-2xl">
            <h3 className="text-2xl font-black mb-4">Direct Regelen</h3>
            <p className="text-white/60 mb-8 font-medium">Voer je voertuiggegevens in en we gaan direct voor je aan de slag.</p>
            <a href="/" className="block w-full bg-[#e31c5f] text-center py-5 rounded-2xl font-black text-xl hover:bg-[#c2144d] transition-all active:scale-95 shadow-lg mb-4">
              BESTELLEN
            </a>
            <div className="text-center">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Veilig via iDEAL</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
