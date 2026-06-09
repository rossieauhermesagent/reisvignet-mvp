import { CheckCircle, HelpCircle } from "lucide-react";

export const metadata = {
  title: 'Hulp & Veelgestelde Vragen | Reisvignet.nl',
  description: 'Vragen over je vignet, milieusticker of betaling? Vind alle antwoorden op onze hulp-pagina. Wij helpen je zorgeloos op weg.',
};

export default function HulpPage() {
  const faqs = [
    {
      q: "Hoe snel ontvang ik mijn vignet?",
      a: "De meeste digitale vignetten (Zwitserland, Oostenrijk, Slovenië) zijn binnen enkele minuten na betaling actief in de systemen van de betreffende overheid."
    },
    {
      q: "Moet ik nog een sticker op mijn ruit plakken?",
      a: "Voor digitale vignetten (E-vignetten) is geen fysieke sticker meer nodig. De controle vindt plaats op basis van cameraregistratie van je kenteken."
    },
    {
      q: "Wat als ik een typefout heb gemaakt in mijn kenteken?",
      a: "Neem direct contact met ons op. Zolang de aanvraag nog niet definitief is verwerkt bij de overheidsinstantie, kunnen we dit vaak nog kosteloos voor je aanpassen."
    },
    {
      q: "Is de milieusticker Frankrijk direct geldig?",
      a: "Zodra de aanvraag is verwerkt, ontvang je een digitaal bewijs dat direct geldig is. De fysieke sticker wordt per post nagestuurd door de Franse overheid."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#222222] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black mb-4 tracking-tighter italic">Hulp & <br /><span className="text-[#ff385c]">Service.</span></h1>
            <p className="text-white/60 font-medium">Vind snel een antwoord op je vragen.</p>
          </div>
          <HelpCircle size={80} className="text-white/10 hidden md:block" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-24 px-6">
        <div className="space-y-12">
          {faqs.map((faq, i) => (
            <div key={i} className="group border-b border-gray-100 pb-12">
              <h3 className="text-2xl font-black text-[#222222] mb-4 flex items-start gap-4 italic tracking-tight">
                <span className="text-[#ff385c]">Q.</span> {faq.q}
              </h3>
              <p className="text-[#717171] text-lg font-medium leading-relaxed pl-10 border-l-2 border-gray-50 group-hover:border-[#ff385c] transition-colors">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gray-50 rounded-[48px] p-12 text-center border border-gray-100">
           <h3 className="text-2xl font-black mb-4">Staat je vraag er niet tussen?</h3>
           <p className="text-[#717171] font-medium mb-8">Onze klantenservice staat 7 dagen per week voor je klaar.</p>
           <a href="mailto:info@reisvignet.nl" className="inline-block bg-[#ff385c] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#e31c5f] transition-all active:scale-95 shadow-lg">
             MAIL ONS DIRECT
           </a>
        </div>
      </div>
    </main>
  );
}
