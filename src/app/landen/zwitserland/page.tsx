import Link from 'next/link';

export default function ZwitserlandPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-left">
        <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold tracking-wider text-gray-500 uppercase mb-6">
          Zwitserland • E-vignet 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-8 leading-tight italic">
          E-vignet Zwitserland.<br />Direct geregeld.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-12">
          Vergeet de sticker op je voorruit. Voor 2026 kies je voor het digitale e-vignet. Direct gekoppeld aan je kenteken en binnen 5 minuten in je mailbox.
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Binnen 5 minuten</h3>
            <p className="text-gray-500 text-sm">Onze spoedservice zorgt voor directe registratie.</p>
          </div>
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Geen Sticker plakken</h3>
            <p className="text-gray-500 text-sm">Volledig digitaal gekoppeld aan je kenteken.</p>
          </div>
          <div className="border-l-2 border-black pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Veilig betalen</h3>
            <p className="text-gray-500 text-sm">Eenvoudig afrekenen met iDEAL of Creditcard.</p>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-black rounded-[32px] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Bestel je E-vignet online</h2>
            <p className="text-gray-400 mb-8 font-medium">Kies voor de meest moderne manier van reizen. Geen plakresten op je ruit en direct geldig op alle Zwitserse snelwegen.</p>
            <Link 
              href="/#kenteken-sectie" 
              className="inline-block bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all text-lg"
            >
              Koop E-vignet voor €49,95
            </Link>
          </div>
          {/* Subtle decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gray-900 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Info Content Section */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 italic">Waarom kiezen voor digitaal?</h2>
          <div className="prose prose-lg text-gray-600 font-medium">
            <p className="mb-6">
              Sinds kort biedt Zwitserland naast de klassieke plakvignet ook het e-vignet aan. Dit is niet alleen duurzamer, maar ook veel praktischer. Het vignet is niet meer gebonden aan een ruit, maar aan je voertuig. 
            </p>
            <ul className="space-y-4 mb-8 list-none p-0">
              <li className="flex items-start gap-3">
                <span className="text-black font-bold">✓</span>
                Geldig tot 31 januari van het volgende jaar.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black font-bold">✓</span>
                Geen risico op een boete van CHF 200.
              </li>
              <li className="flex items-start gap-3 text-black font-bold text-xs uppercase tracking-widest pt-4">
                Gotthardtunnel • San Bernardino • A1 • A2 • Alle nationale snelwegen.
              </li>
            </ul>
            <p>
              Bestel vandaag nog en ga ontspannen op weg naar de bergen. Wij regelen de registratie binnen enkele minuten.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
