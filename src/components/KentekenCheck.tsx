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
        setError(data.error || "Er is iets misgegaan");
      }
    } catch (err) {
      setError("Kon gegevens niet ophalen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Check je voertuig</h2>
      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder="XX-123-X"
            className="w-full px-4 py-3 bg-yellow-400 text-black font-bold text-center text-xl rounded-md border-2 border-black placeholder:text-gray-700 outline-none uppercase"
            maxLength={10}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>
      )}

      {vehicle && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3 mb-3 text-blue-600">
            <Car size={24} />
            <h3 className="font-bold text-lg">Voertuig gevonden</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Merk</p>
              <p className="font-semibold">{vehicle.merk}</p>
            </div>
            <div>
              <p className="text-gray-500">Model</p>
              <p className="font-semibold">{vehicle.handelsbenaming}</p>
            </div>
            <div>
              <p className="text-gray-500">Brandstof</p>
              <p className="font-semibold">{vehicle.brandstof}</p>
            </div>
            <div>
              <p className="text-gray-500">Bouwjaar</p>
              <p className="font-semibold">{vehicle.bouwjaar}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
