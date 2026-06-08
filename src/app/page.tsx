import KentekenCheck from "@/components/KentekenCheck";
import { ShieldCheck, Truck, Clock } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Reisvignet.nl
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            Regel je milieustickers en vignetten binnen 2 minuten met iDEAL.
          </p>
          <KentekenCheck />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <ShieldCheck className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Officieel Geregeld</h3>
            <p className="text-gray-600">Wij handelen de aanvraag direct af bij de juiste instanties.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Clock className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Snel Geleverd</h3>
            <p className="text-gray-600">E-vignetten binnen 4 uur in je mail, stickers direct aangevraagd.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Truck className="text-blue-600" size={32} />
            </div>
            <h3 className="font-bold text-lg mb-2">Betaal met iDEAL</h3>
            <p className="text-gray-600">Veilig en vertrouwd betalen met je eigen bank-app of Stripe.</p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Kies je reisvignet</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all">
            <div className="bg-red-100 text-red-600 w-fit px-3 py-1 rounded-full text-sm font-bold mb-4">FRANKRIJK</div>
            <h3 className="text-2xl font-bold mb-2">Milieusticker (Crit&apos;Air)</h3>
            <p className="text-gray-600 mb-6 font-medium">Verplicht voor bijna alle steden en snelwegen in Frankrijk.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-bold">€19,95</span>
              <span className="text-gray-500">incl. alles</span>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Bestel nu</button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all">
            <div className="bg-green-100 text-green-600 w-fit px-3 py-1 rounded-full text-sm font-bold mb-4">ZWITSERLAND</div>
            <h3 className="text-2xl font-bold mb-2">E-vignet 2026</h3>
            <p className="text-gray-600 mb-6 font-medium">Direct gekoppeld aan je kenteken. Geen sticker meer plakken.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-bold">€49,95</span>
              <span className="text-gray-500">incl. alles</span>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Bestel nu</button>
          </div>
        </div>
      </div>
    </main>
  );
}
