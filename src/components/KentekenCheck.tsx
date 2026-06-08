"use client";

import { useState } from "react";
import { Search, Car, Loader2, CheckCircle2 } from "lucide-react";

export default function KentekenCheck() {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<any>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate) return;
    setLoading(true);
    setError("");
    setVehicle(null);

    try {
      const res = await fetch(`/api/rdw?plate=${plate}`);
      const data = await res.json();
      if (res.ok) setVehicle(data);
      else setError(data.error || "Controleer je kenteken");
    } catch (err) {
      setError("Fout bij ophalen gegevens");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white p-4 rounded-[32px] airbnb-shadow border border-gray-100 mb-8 transition-all hover:scale-[1.01]">
        <form onSubmit={handleCheck} className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-blue-600 h-8 w-1 rounded-full opacity-20" />
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              placeholder="KENTEKEN INVOEREN..."
              className="w-full pl-10 pr-6 py-5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-0 focus:border-[#ff385c]/30 text-2xl font-black text-[#222222] tracking-tighter transition-all"
              maxLength={10}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-[#ff385c] hover:bg-[#e31c5f] text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-md shadow-[#ff385c]/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
            Check Voertuig
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium text-sm animate-in fade-in zoom-in-95 fill-mode-both">
          {error}
        </div>
      )}

      {vehicle && (
        <div className="bg-[#008489]/5 border border-[#008489]/20 p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#008489] text-white p-2 rounded-full"><CheckCircle2 size={20} /></div>
              <h3 className="font-bold text-xl text-[#222222]">Klaar voor aanvraag</h3>
            </div>
            <div className="bg-white px-4 py-1.5 rounded-full border border-[#008489]/20 font-mono font-bold text-[#008489]">
              {vehicle.kenteken}
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="text-[#717171] text-xs uppercase font-bold tracking-widest">Merk</p>
              <p className="text-lg font-semibold text-[#222222]">{vehicle.merk}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#717171] text-xs uppercase font-bold tracking-widest">Model</p>
              <p className="text-lg font-semibold text-[#222222] italic">{vehicle.handelsbenaming}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#717171] text-xs uppercase font-bold tracking-widest">Brandstof</p>
              <p className="text-lg font-semibold text-[#222222] capitalize">{vehicle.brandstof.toLowerCase()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#717171] text-xs uppercase font-bold tracking-widest">Bouwjaar</p>
              <p className="text-lg font-semibold text-[#222222]">{vehicle.bouwjaar}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
