import { CheckCircle, Globe, Zap, Shield } from "lucide-react";

export const metadata = {
  title: 'Vignet Tsjechië 2026 Aanvragen (Elektronická dálniční známka) | Reisvignet.nl',
  description: 'Bestel je digitale vignet voor Tsjechië direct online. 10 dagen, 30 dagen of een jaar geldig. Geen sticker nodig, directe activatie op kenteken.',
};

export default function TsjechiePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#111111] text-white py-16 px-6 border-b-8 border-[#D7141A]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-8 bg-white flex flex-col">
              <div className="h-1/2 bg-white flex">
                <div className="w-1/2 bg-[#11457E]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
              </div>
              <div className="h-1/2 bg-[#D7141A]"></div>
            </div>
            <span className="font-bold tracking-widest text-sm uppercase opacity-60 italic">Digitale Tol Tsjechië</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none italic">
            Vignet <br /> <span className="text-[#11457E]">Tsjechië.</span>
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-xl">
            Sinds 2021 is het papieren vignet in Tsjechië verleden tijd. Regel je digitale tolvignet (edalnice) nu binnen 2 minuten.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="text-left">
            <h2 className="text-3xl font-black mb-6 tracking-tight italic text-[#11457E]">Direct op weg naar Praag?</h2>
            <p className="text-[#717171] leading-relaxed mb-6 font-medium">
              Het Tsjechische vignet is volledig digitaal. Wij koppelen je kenteken direct aan de centrale database van het Tsjechische ministerie van Verkeer. Geen wachttijd, geen fysieke sticker.
            </p>
            <div className="space-y-4">
              {[
                "10 Dagen, 30 dagen of 1 jaar geldig",
                "Altijd inclusief officiële bevestiging",
                "Geen risico op hoge boetes",
                "Directe activatie voor spoedreizen"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-[#222222]">
                  <CheckCircle className="text-[#11457E]" size={20} /> {text}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-[40px] p-10 flex flex-col justify-center border border-gray-100 shadow-inner">
             <div className="text-sm font-black text-[#11457E] mb-2 uppercase tracking-widest italic">Vanaf</div>
             <div className="text-5xl font-black text-[#222222] mb-6 italic">€16,50</div>
             <a href="/" className="bg-[#11457E] text-white py-4 rounded-2xl font-black text-center hover:bg-[#0d345e] transition-all active:scale-95 shadow-xl uppercase tracking-widest">
                START CHECK
             </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            {[
              { icon: <Zap className="text-[#11457E]" />, t: "Direct Actief", d: "Zodra de betaling is afgerond, is je kenteken geregistreerd." },
              { icon: <Shield className="text-[#11457E]" />, t: "100% Veilig", d: "Wij werken direct met de officiële API van edalnice.cz." },
              { icon: <Globe className="text-[#11457E]" />, t: "Geen NL-Extra", d: "Alles in begrijpelijk Nederlands zonder extra papierwerk." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-50 bg-white airbnb-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="font-black text-lg mb-2 italic">{feature.t}</h4>
                <p className="text-sm text-[#717171] font-medium leading-relaxed">{feature.d}</p>
              </div>
            ))}
          </div>
      </div>
    </main>
  );
}
