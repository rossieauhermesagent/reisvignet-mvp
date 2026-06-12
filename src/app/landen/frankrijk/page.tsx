import Link from 'next/link';

export default function FrankrijkPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-left">
        <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold tracking-wider text-gray-500 uppercase mb-6">
          Frankrijk • Crit'Air Milieusticker
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-8 leading-tight italic">
          Milieusticker Frankrijk.<br />Zonder gedoe.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-12">
          Ga je met de auto naar Parijs, Lyon of de Franse Alpen? Een milieusticker (Crit&apos;Air) is verplicht in bijna elke grote stad. Wij regelen de aanvraag volledig in het Nederlands.
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Binnen 24u verwerkt</h3>
            <p className="text-gray-500 text-sm">Directe verwerking door ons Nederlandse team.</p>
          </div>
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">100% Officieel</h3>
            <p className="text-gray-500 text-sm">Gegarandeerde acceptatie in alle Franse milieuzones.</p>
          </div>
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Geen Frans nodig</h3>
            <p className="text-gray-500 text-sm">Eenvoudig formulier zonder ingewikkelde Franse termen.</p>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-black rounded-[32px] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Bestel direct je sticker</h2>
            <p className="text-gray-400 mb-8 font-medium">Je ontvangt binnen 24 uur een digitaal bewijs en de fysieke sticker volgt per post naar je huisadres.</p>
            <Link 
              href="/#kenteken-sectie" 
              className="inline-block bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all text-lg"
            >
              Start aanvraag voor €19,95
            </Link>
            <p className="mt-4 text-xs text-gray-500 font-medium tracking-tight">Inclusief BTW en verzendkosten binnen NL & BE.</p>
          </div>
          {/* Subtle decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gray-900 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Info Content Section */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 italic">Waarom een Crit'Air sticker?</h2>
          <div className="prose prose-lg text-gray-600 font-medium">
            <p className="mb-6">
              In Frankrijk zijn steeds meer steden aangeduid als 'Zone à Faibles Émissions' (ZFE). In deze zones is een milieusticker verplicht op je voorruit. Zonder sticker riskeer je een boete van minimaal €68.
            </p>
            <ul className="space-y-4 mb-8 list-none p-0">
              <li className="flex items-start gap-3">
                <span className="text-black font-bold">✓</span>
                Geldig voor de gehele levensduur van je auto.
              </li>
              <li className="flex items-start gap-4 uppercase font-bold text-xs tracking-widest text-black pt-4">
                Parijs • Lyon • Marseille • Nice • Montpellier • Straatsburg • En meer.
              </li>
            </ul>
            <p>
              Voor de aanvraag hebben we alleen je kenteken en een kopie van je kentekenbewijs nodig. Wij zorgen voor de rest en jij gaat zorgeloos op reis.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
