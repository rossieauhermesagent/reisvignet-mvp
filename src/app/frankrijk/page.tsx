import { MapPin, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export const metadata = {
  title: 'Milieusticker Frankrijk (Crit\'Air) Aanvragen | Reisvignet.nl',
  description: 'Vraag je officiële Franse milieusticker (Crit\'Air) direct aan in het Nederlands. Snel, betrouwbaar en volledig geautomatiseerd.',
};

export default function FrankrijkPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#222222] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none italic">
            Milieusticker <br /> <span className="text-[#ff385c]">Frankrijk.</span>
          </h1>
          <p className="text-xl text-neutral-400 font-medium max-w-xl">
            Ga je met de auto naar Parijs, Lyon of een andere milieuzone? Zorg dat je de Crit&apos;Air sticker op tijd in huis hebt.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-black mb-6 tracking-tight">Wat is een Crit&apos;Air sticker?</h2>
            <p className="text-[#717171] leading-relaxed mb-4">
              In veel Franse steden is een milieusticker verplicht. De sticker geeft aan hoe vervuilend je voertuig is. Zonder sticker riskeren reizigers een boete die kan oplopen tot €135.
            </p>
            <ul className="space-y-4">
              {[
                "Verplicht in Parijs, Lyon, Bordeaux en meer",
                "Geldig voor de gehele levensduur van je auto",
                "Direct gekoppeld aan je kenteken",
                "Voorkom hoge boetes onderweg"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-[#222222]">
                  <CheckCircle className="text-[#ff385c]" size={18} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-[40px] p-10 flex flex-col justify-center border border-gray-100">
             <div className="text-sm font-black text-[#ff385c] mb-2 uppercase tracking-widest italic">Kosten</div>
             <div className="text-5xl font-black text-[#222222] mb-6 italic">€19,95</div>
             <a href="/" className="bg-[#222222] text-white py-4 rounded-2xl font-black text-center hover:bg-black transition-all active:scale-95 shadow-xl">
                START AANVRAAG
             </a>
          </div>
        </div>

        <div className="prose prose-neutral max-w-none">
          <h2 className="text-3xl font-black mb-6 tracking-tight">Hoe werkt de aanvraag?</h2>
          <p className="text-[#717171] leading-relaxed mb-6">
            Bij Reisvignet.nl hebben we het proces versimpeld. Je voert je kenteken in, wij halen alle technische gegevens direct op bij de RDW en vertalen dit naar de juiste Franse milieuklasse. Je hoeft geen ingewikkelde Franse formulieren in te vullen of papieren te scannen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Kenteken Check", desc: "Wij halen je autogegevens op." },
              { title: "Betaling", desc: "Veilig via iDEAL of Creditcard." },
              { title: "Verwerking", desc: "Wij regelen de officiële stukken." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="bg-[#ff385c] text-white w-8 h-8 rounded-full flex items-center justify-center font-black mb-4">{i+1}</div>
                <h4 className="font-black text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-[#717171] font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
