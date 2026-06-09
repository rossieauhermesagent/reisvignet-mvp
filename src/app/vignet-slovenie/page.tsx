import { CheckCircle } from "lucide-react";

export const metadata = {
  title: 'Vignet Slovenië 2026 Aanvragen (E-vignet) | Reisvignet.nl',
  description: 'Bestel je digitale vignet voor de Sloveense snelwegen (DARS). 7 dagen, 1 maand of een jaar geldig. Directe activatie en 100% officieel.',
};

export default function SloveniePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#005da4] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none italic">
            E-vignet <br /> <span className="text-white/80">Slovenië.</span>
          </h1>
          <p className="text-xl text-white/60 font-medium">
            Op weg naar de Sloveense kust of doorreizen naar Kroatië? Het E-vignet voor Slovenië is verplicht en eenvoudig online te regelen.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-black mb-8 italic tracking-tight">Sloveens Tolvignet (DARS)</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="text-[#717171] leading-relaxed space-y-6 font-medium text-left">
             <p>Sinds 2022 kent Slovenië alleen nog maar digitale vignetten. Deze zijn gekoppeld aan je kenteken en worden gecontroleerd door camera&apos;s langs de snelweg en bij de vignet-controleurs van DARS.</p>
             <p>Let op: Voor voertuigen boven de 3500kg (zoals zware campers) geldt een apart tolsysteem (DarsGo).</p>
          </div>
          <div className="space-y-4">
             {[
               "7 Dagen vignet beschikbaar",
               "1 Maand vignet voor langere reizen",
               "Directe geldigheid mogelijk",
               "Geen sticker op de ruit"
             ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-[#222222]">
                  <CheckCircle className="text-[#005da4]" size={20} /> {text}
                </div>
             ))}
          </div>
        </div>
        
        <div className="mt-20 bg-gray-50 border border-gray-100 rounded-[48px] p-12 text-center shadow-sm">
           <h3 className="text-2xl font-black mb-2">Regel het nu voor vertrek</h3>
           <p className="text-[#717171] font-medium mb-8">Selecteer je voertuigklasse en reisduur.</p>
           <a href="/" className="inline-block bg-[#005da4] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#004a82] transition-all active:scale-95 shadow-xl">
             VIGNET KIEZEN
           </a>
        </div>
      </div>
    </main>
  );
}
