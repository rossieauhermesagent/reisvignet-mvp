"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";

const countries = [
  { id: 'CH', name: 'Zwitserland', path: 'M140 180 L160 170 L180 180 L180 200 L160 210 L140 200 Z', color: 'bg-red-500' },
  { id: 'FR', name: 'Frankrijk', path: 'M80 160 L120 150 L140 180 L120 220 L80 210 L70 180 Z', color: 'bg-blue-500' },
  { id: 'AT', name: 'Oostenrijk', path: 'M185 185 L220 180 L230 195 L220 205 L185 200 Z', color: 'bg-red-600' },
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
          <p className="text-[#717171] font-medium">Selecteer je bestemming op de kaart</p>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full bg-blue-50/30 rounded-3xl overflow-hidden border border-blue-100/50">
        <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
          {/* Abstract Europe Background */}
          <path 
            d="M50 50 L350 50 L380 250 L20 250 Z" 
            fill="none" 
            stroke="#008489" 
            strokeWidth="0.5" 
            strokeDasharray="4 4" 
            className="opacity-10"
          />
          
          {countries.map((country) => (
            <g 
              key={country.id} 
              onClick={() => handleSelect(country.id)}
              className="cursor-pointer group"
            >
              <path
                d={country.path}
                className={`transition-all duration-500 ease-out fill-current ${
                  selected === country.id 
                    ? 'text-[#ff385c] filter drop-shadow-[0_0_15px_rgba(255,56,92,0.5)] scale-105 transform translate-x-[-2%] translate-y-[-2%]' 
                    : 'text-gray-200 hover:text-[#008489]/30'
                }`}
              />
              <text 
                x={country.id === 'FR' ? 95 : country.id === 'CH' ? 150 : 195} 
                y={country.id === 'FR' ? 190 : country.id === 'CH' ? 195 : 195}
                className={`text-[8px] font-bold pointer-events-none transition-opacity duration-300 ${
                  selected === country.id ? 'fill-white' : 'fill-[#717171] opacity-0 group-hover:opacity-100'
                }`}
              >
                {country.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Selected Country Badge */}
        {selected && (
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#ff385c]/20 flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-[#ff385c] text-white p-1.5 rounded-full"><Check size={16} strokeWidth={3} /></div>
              <span className="font-bold text-[#222222] text-lg">
                Geselecteerd: {countries.find(c => c.id === selected)?.name}
              </span>
            </div>
            <button 
              className="text-[#ff385c] font-bold text-sm hover:underline"
              onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            >
              Wijzigen
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {countries.map((country) => (
          <button
            key={country.id}
            onClick={() => handleSelect(country.id)}
            className={`p-4 rounded-2xl border-2 transition-all text-left group ${
              selected === country.id 
                ? 'border-[#ff385c] bg-[#ff385c]/5' 
                : 'border-gray-100 bg-gray-50 hover:border-[#008489]/20 hover:bg-white'
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${
              selected === country.id ? 'text-[#ff385c]' : 'text-[#717171]'
            }`}>
              {country.id}
            </p>
            <p className="font-bold text-[#222222]">{country.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
