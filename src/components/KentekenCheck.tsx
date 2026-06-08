"use client";

import { useState } from "react";
import { Search, Car, Loader2 } from "lucide-react";

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

      if (res.ok) {
        setVehicle(data);
      } else {
        setError(data.error || "Bekijk of het kenteken klopt");
      }
    } catch (err) {
      setError("Kon gegevens niet ophalen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-2 rounded-2xl stripe-shadow border border-white/20 backdrop-blur-xl">
      <form onSubmit={handleCheck} className="flex items-center bg-[#F6F9FC] rounded-xl p-1 border border-[#E5EDF5]">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="XX-123-X"
          className="flex-1 bg-transparent px-6 py-4 text-2xl font-bold uppercase placeholder:text-[#AAB7C4] text-[#061B31] outline-none kenteken-font"
          maxLength={10}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#533AFD] hover:bg-[#4434D4] text-white font-bold px-8 py-4 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          <span>Check</span>
        </button>
      </form>

      {error && (
        <div className="px-6 py-3 text-red-500 text-sm font-medium animate-in fade-in duration-300">
          {error}
        </div>
      )}

      {vehicle && (
        <div className="mt-2 p-6 border-t border-[#F6F9FC] animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-center gap-3 mb-4 text-[#533AFD]">
            <Car size={20} />
            <h3 className="font-semibold text-[#061B31]">Voertuig geïdentificeerd</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-1">Merk</p>
              <p className="font-medium text-[#061B31]">{vehicle.merk}</p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-1">Model</p>
              <p className="font-medium text-[#061B31]">{vehicle.handelsbenaming}</p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-1">Brandstof</p>
              <p className="font-medium text-[#061B31] tracking-tight">{vehicle.brandstof}</p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold mb-1">Bouwjaar</p>
              <p className="font-medium text-[#061B31]">{vehicle.bouwjaar}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
