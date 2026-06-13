import Link from 'next/link';

export default function TolbadgeEuropaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-left">
        <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-xs font-bold tracking-wider text-blue-600 uppercase mb-6">
          Europa • Frankrijk, Spanje, Italië & Portugal
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-8 leading-tight italic">
          Nooit meer wachten.<br />De Tolbadge Europa.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-12">
          Rijd moeiteloos door de péage van Frankrijk, de telepass van Italië en de tolpoorten in Spanje en Portugal. Eén badge voor al je vakanties in Zuid-Europa.
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="border-l-2 border-blue-600 pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Automatische incasso</h3>
            <p className="text-gray-500 text-sm">Nooit meer gedoe met creditcards of kleingeld bij de tolpoort.</p>
          </div>
          <div className="border-l-2 border-blue-600 pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Snellere doorstroming</h3>
            <p className="text-gray-500 text-sm">Gebruik de gereserveerde 't' banen en rijd direct door.</p>
          </div>
          <div className="border-l-2 border-blue-600 pl-6 py-2">
            <h3 className="font-bold text-lg mb-2">Vandaag besteld</h3>
            <p className="text-gray-500 text-sm">Binnen 48 uur verzonden vanuit Nederland.</p>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-blue-600 rounded-[32px] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Vraag je Tolbadge aan</h2>
            <p className="text-blue-100 mb-8 font-medium italic">Eén eenmalige investering, jarenlang reisgemak. Werkt op alle tolwegen in FR, IT, ES & PT.</p>
            <Link 
              href="/#products-section" 
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:scale-105 transition-all text-lg uppercase tracking-tight"
            >
              Bestel Badge voor €24,95
            </Link>
          </div>
          {/* Subtle decoration */}
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Cross-sell Section op de Frankrijk pagina (Conceptueel, we voegen dit toe aan Frankrijk/page.tsx) */}
    </main>
  );
}
