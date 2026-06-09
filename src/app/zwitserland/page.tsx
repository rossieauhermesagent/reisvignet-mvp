import { MapPin, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: 'E-vignet Zwitserland 2026 Aanvragen | Reisvignet.nl',
  description: 'Bestel je digitale vignet voor Zwitserland direct online. Geen sticker meer nodig, gekoppeld aan je kenteken. Binnen 5 minuten geregeld.',
};

export default function ZwitserlandPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#008489] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none italic">
            E-vignet <br /> <span className="text-white/80">Zwitserland.</span>
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-xl">
            Sinds 2024 is het digitale vignet de standaard in Zwitserland. Geen gedoe met stickers krabben, maar direct gekoppeld aan je kenteken.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-black mb-6 tracking-tight">Waarom een E-vignet?</h2>
            <p className="text-[#717171] leading-relaxed mb-4">
              Het traditionele vignet voor de Zwitserse Autobahn wordt steeds vaker vervangen door de digitale variant. Het is sneller, veiliger en milieuvriendelijker.
            </p>
            <ul className="space-y-4">
              {[
                "Directe activatie na betaling",
                "Gekoppeld aan je kenteken (geen sticker)",
                "Geldig voor alle Zwitserse snelwegen",
                "Ideaal voor vakantie of doorreis"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-[#222222]">
                  <CheckCircle className="text-[#008489]" size={18} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-[40px] p-10 flex flex-col justify-center border border-gray-100">
             <div className="text-sm font-black text-[#008489] mb-2 uppercase tracking-widest italic">Kosten</div>
             <div className="text-5xl font-black text-[#222222] mb-6 italic">€49,95</div>
             <a href="/" className="bg-[#008489] text-white py-4 rounded-2xl font-black text-center hover:bg-[#006e72] transition-all active:scale-95 shadow-xl">
                DIRECT ACTIVEREN
             </a>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none text-left">
          <h2 className="text-3xl font-black mb-6 tracking-tight italic">Veelgestelde vragen</h2>
          <div className="space-y-8 mt-10">
            <div>
              <h4 className="font-black text-lg mb-2">Hoe lang is het vignet geldig?</h4>
              <p className="text-[#717171] leading-relaxed font-medium">
                Het Zwitserse jaarvignet is altijd geldig van 1 december van het voorgaande jaar tot en met 31 januari van het volgende jaar.
              </p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-2">Is een sticker nog verplicht?</h4>
              <p className="text-[#717171] leading-relaxed font-medium">
                Nee, met het E-vignet is een fysieke sticker op de ruit niet meer nodig. De controle vindt plaats op basis van je kenteken.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
