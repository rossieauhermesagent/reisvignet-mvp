"use client";

import { useState } from "react";
import { Camera, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

interface BadgeFormProps {
  onComplete: (data: { iban: string; bin: string }) => void;
  loading: boolean;
}

export default function TolbadgeForm({ onComplete, loading }: BadgeFormProps) {
  const [iban, setIban] = useState("");
  const [bin, setBin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (iban.length < 10) {
      alert("Voer een geldig IBAN nummer in.");
      return;
    }
    onComplete({ iban, bin });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-black text-[#222222] uppercase tracking-wider mb-2">
            IBAN Rekeningnummer
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              required
              placeholder="NL01 BANK 0123 4567 89"
              value={iban}
              onChange={(e) => setIban(e.target.value.toUpperCase())}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#ff385c] outline-none transition-all font-bold"
            />
          </div>
          <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
            Nodig voor de automatische incasso van tolkosten door de provider.
          </p>
        </div>

        <div>
          <label className="block text-sm font-black text-[#222222] uppercase tracking-wider mb-2">
            Chassisnummer (VIN) — Optioneel
          </label>
          <input
            type="text"
            placeholder="Laatste 7 tekens van je VIN"
            value={bin}
            onChange={(e) => setBin(e.target.value.toUpperCase())}
            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#ff385c] outline-none transition-all font-bold"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
        <ShieldCheck className="text-blue-600 shrink-0" size={24} />
        <p className="text-sm text-blue-900 font-medium leading-relaxed">
          Je gegevens worden veilig verwerkt. De tolbadge wordt binnen 48 uur verzonden en werkt direct in Frankrijk, Italië en Spanje.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#222222] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#ff385c] transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? "BEZIG..." : (
          <>
            BEVESTIG EN GA NAAR BETALEN <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
}
