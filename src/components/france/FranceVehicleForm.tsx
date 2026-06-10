"use client";

import { useState } from "react";
import { Camera, Upload, Check, Loader2 } from "lucide-react";

interface FranceVehicleFormProps {
  onComplete: (data: { vin: string; frontImage: string; backImage: string }) => void;
  loading?: boolean;
}

export default function FranceVehicleForm({ onComplete, loading }: FranceVehicleFormProps) {
  const [vin, setVin] = useState("");
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') setFrontImage(reader.result as string);
        else setBackImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isReady = vin.length >= 10 && frontImage && backImage;

  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 airbnb-shadow mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black mb-6 italic">Aanvullende gegevens Frankrijk</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#717171] mb-2 px-1">
            Chassisnummer (VIN)
          </label>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="17 TEKENS OP KENTEKENBEWIJS..."
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-0 focus:border-[#ff385c]/30 font-bold text-lg transition-all"
            maxLength={17}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#717171] mb-2 px-1">
              Voorzijde Kentekenbewijs
            </label>
            <label className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${frontImage ? 'border-[#008489] bg-[#008489]/5' : 'border-gray-200 hover:border-[#ff385c] bg-gray-50'}`}>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'front')} />
              {frontImage ? (
                <div className="flex items-center gap-2 text-[#008489] font-bold">
                  <Check size={20} /> Geüpload
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#717171] font-bold text-sm text-center">
                  <Camera size={24} /> Tik om foto te maken of uploaden
                </div>
              )}
            </label>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#717171] mb-2 px-1">
              Achterzijde Kentekenbewijs
            </label>
            <label className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${backImage ? 'border-[#008489] bg-[#008489]/5' : 'border-gray-200 hover:border-[#ff385c] bg-gray-50'}`}>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'back')} />
              {backImage ? (
                <div className="flex items-center gap-2 text-[#008489] font-bold">
                  <Check size={20} /> Geüpload
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#717171] font-bold text-sm text-center">
                  <Camera size={24} /> Tik om foto te maken of uploaden
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          onClick={() => isReady && onComplete({ vin, frontImage: frontImage!, backImage: backImage! })}
          disabled={!isReady || loading}
          className="w-full bg-[#ff385c] text-white py-5 rounded-[20px] font-black text-lg hover:bg-black transition-all active:scale-95 disabled:opacity-20 disabled:grayscale"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : 'GEGEVENS BEVESTIGEN'}
        </button>
      </div>
    </div>
  );
}
