"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";

const countries = [
  { 
    id: 'CH', 
    name: 'Zwitserland', 
    path: 'M255,178 L265,172 L275,178 L275,190 L265,198 L255,190 Z',
    iconUrl: 'https://flagcdn.com/w80/ch.png'
  },
  { 
    id: 'FR', 
    name: 'Frankrijk', 
    path: 'M180,140 L240,130 L260,180 L240,240 L180,230 L160,180 Z',
    iconUrl: 'https://flagcdn.com/w80/fr.png'
  },
  { 
    id: 'AT', 
    name: 'Oostenrijk', 
    path: 'M285,185 L330,175 L345,195 L330,215 L285,205 Z',
    iconUrl: 'https://flagcdn.com/w80/at.png'
  },
];

export default function EuropeMapSelector({ onSelect }: { onSelect: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="w-full bg-white p-8 rounded-[40px] airbnb-shadow border border-gray-100 mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#008489] text-white p-2 rounded-xl scale-110">
          <Globe size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#222222] tracking-tight">Bestemming</h2>
          <p className="text-[#717171] font-medium">Kies je land voor vertrek</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {countries.map((country) => (
          <button
            key={country.id}
            onClick={() => handleSelect(country.id)}
            className={`relative group p-6 rounded-[32px] border-2 transition-all duration-300 text-left overflow-hidden ${
              selected === country.id 
                ? 'border-[#ff385c] bg-[#ff385c]/5 ring-4 ring-[#ff385c]/10' 
                : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
            }`}
          >
            {/* Visual distinction: National Flag Background Overlay */}
            <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-[0.08] pointer-events-none group-hover:opacity-[0.12] transition-opacity">
               <img src={country.iconUrl} alt="" className="w-full h-full object-cover rounded-full rotate-12" />
            </div>

            <div className={`mb-4 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform group-hover:scale-110 ${
                selected === country.id ? 'bg-[#ff385c] text-white' : 'bg-white border border-gray-200 text-[#222222]'
            }`}>
                {country.id}
            </div>

            <div>
              <p className={`text-xs font-black uppercase tracking-widest mb-1 ${
                selected === country.id ? 'text-[#ff385c]' : 'text-[#717171]'
              }`}>
                {selected === country.id ? 'Geselecteerd' : 'Land'}
              </p>
              <p className="font-extrabold text-xl text-[#222222]">{country.name}</p>
            </div>

            {selected === country.id && (
                <div className="absolute top-4 right-4 bg-[#ff385c] text-white p-1 rounded-full animate-in zoom-in-50 duration-300">
                    <Check size={14} strokeWidth={4} />
                </div>
            )}
          </button>
        ))}
      </div>

      {selected && (
          <div className="mt-8 p-4 rounded-2xl bg-[#008489]/5 border border-[#008489]/10 flex items-center justify-between">
              <span className="text-[#008489] font-bold text-sm">
                Je vignet voor {countries.find(c => c.id === selected)?.name} wordt klaargezet.
              </span>
              <button 
                onClick={() => setSelected(null)}
                className="text-xs font-bold text-[#717171] hover:text-[#222222] underline"
              >
                Land wijzigen
              </button>
          </div>
      )}
    </div>
  );
}
