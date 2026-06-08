"use client";

import KentekenCheck from "@/components/KentekenCheck";
import { ShieldCheck, Truck, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-[#533AFD] font-extrabold text-2xl tracking-tighter">
          REISVIGNET<span className="text-[#061B31]">.NL</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#64748B]">
          <a href="#" className="hover:text-[#061B31] transition-colors">Frankrijk</a>
          <a href="#" className="hover:text-[#061B31] transition-colors">Zwitserland</a>
          <a href="#" className="hover:text-[#061B31] transition-colors">Hulp & Contact</a>
        </div>
        <button className="bg-[#533AFD]/10 text-[#533AFD] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#533AFD]/20 transition-colors">
          Status Aanvraag
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 px-4">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#533AFD] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#EA2261] blur-[120px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#061B31] mb-6 leading-[1.1]">
            Zorgeloos op reis met het <br />
            <span className="text-[#533AFD]">juiste vignet.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-[#64748B] max-w-2xl mx-auto font-light leading-relaxed">
            Voorkom boetes in milieuzones en op snelwegen. Binnen 2 minuten geregeld met iDEAL en je kenteken.
          </p>
          <KentekenCheck />
        </div>
      </div>

      {/* Trust Items */}
      <div className="bg-[#F6F9FC] py-12 border-y border-[#E5EDF5]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg stripe-shadow"><ShieldCheck className="text-[#533AFD]" /></div>
            <div>
              <h4 className="font-bold text-[#061B31]">Directe aanvraag</h4>
              <p className="text-sm text-[#64748B]">Geen gedoe met logins of Franse formulieren.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg stripe-shadow"><Clock className="text-[#533AFD]" /></div>
            <div>
              <h4 className="font-bold text-[#061B31]">Snel resultaat</h4>
              <p className="text-sm text-[#64748B]">E-vignetten vaak al binnen het uur in je mailbox.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg stripe-shadow"><Truck className="text-[#533AFD]" /></div>
            <div>
              <h4 className="font-bold text-[#061B31]">Post-verzending</h4>
              <p className="text-sm text-[#64748B]">Stickers veilig per post vanuit Frankrijk verstuurd.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#061B31] mb-2 text-left">Beschikbare vignetten</h2>
            <p className="text-[#64748B] font-medium text-left">Selecteer je bestemming of doorreisland.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="group bg-white p-10 rounded-3xl stripe-shadow border border-[#E5EDF5] hover:border-[#533AFD] transition-all cursor-pointer relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <img src="https://flagcdn.com/w160/fr.png" alt="FR" className="w-24 grayscale" />
            </div>
            <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold w-fit mb-6">MILIEUZONES</div>
            <h3 className="text-3xl font-bold text-[#061B31] mb-3">Frankrijk Crit&apos;Air</h3>
            <p className="text-[#64748B] mb-8 leading-relaxed max-w-sm">
              Verplicht voor steden als Parijs, Lyon en vliegvelden. Geldig zolang je auto rijdt.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-sm text-[#64748B] block font-medium">Vanaf</span>
                <span className="text-3xl font-bold text-[#061B31]">€19,45</span>
              </div>
              <div className="bg-[#533AFD] text-white p-3 rounded-full group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-[#061B31] p-10 rounded-3xl stripe-shadow transition-all cursor-pointer relative overflow-hidden text-left">
             <div className="absolute top-0 right-0 p-8 opacity-10">
              <img src="https://flagcdn.com/w160/ch.png" alt="CH" className="w-24 grayscale invert" />
            </div>
            <div className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold w-fit mb-6 uppercase tracking-wider">Snelwegvignet</div>
            <h3 className="text-3xl font-bold text-white mb-3">Zwitserland E-vignet</h3>
            <p className="text-white/60 mb-8 leading-relaxed max-w-sm">
              Sinds 2024 volledig digitaal. Direct gekoppeld aan je kenteken, geen sticker nodig.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-sm text-white/50 block font-medium">Vanaf</span>
                <span className="text-3xl font-bold text-white">€49,95</span>
              </div>
              <div className="bg-white text-[#061B31] p-3 rounded-full group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#F6F9FC] py-12 text-center border-t border-[#E5EDF5]">
        <p className="text-[#64748B] text-sm">&copy; 2026 Reisvignet.nl - Geen officiële overheidsinstantie maar een onafhankelijke tussenpersoon.</p>
      </footer>
    </main>
  );
}
