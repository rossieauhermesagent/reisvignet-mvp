"use client";

export default function Footer() {
  return (
    <footer className="py-20 text-center border-t border-gray-100 max-w-4xl mx-auto px-6">
      <div className="text-[#222222] font-black text-xl mb-4">REISVIGNET<span className="text-[#ff385c]">.NL</span></div>
      <p className="text-[#717171] text-sm font-medium leading-relaxed mb-6 italic">
        Onderdeel van de Rossieau Agent Network. Wij maken reizen door Europa eenvoudiger door techniek te combineren met officieel reisadvies.
      </p>
      <div className="flex justify-center gap-6 text-[#222222] font-bold text-sm uppercase tracking-widest">
         <a href="/privacy" className="hover:text-[#ff385c]">Privacy</a>
         <a href="/voorwaarden" className="hover:text-[#ff385c]">Voorwaarden</a>
         <a href="mailto:info@reisvignet.nl" className="hover:text-[#ff385c]">Contact</a>
      </div>
    </footer>
  );
}
