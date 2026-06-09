"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function StatusModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [kenteken, setKenteken] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/status?kenteken=${kenteken}`);
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[32px] p-10 airbnb-shadow animate-in zoom-in duration-200">
        <h2 className="text-3xl font-black text-[#222222] mb-2 tracking-tight">Status Check</h2>
        <p className="text-[#717171] mb-8 font-medium">Controleer de activatie van je vignet.</p>
        
        <div className="space-y-6">
          <input 
            value={kenteken}
            onChange={(e) => setKenteken(e.target.value.toUpperCase())}
            placeholder="XX-ZZ-99"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-black tracking-widest focus:border-[#ff385c] outline-none transition-all"
          />
          
          <button 
            onClick={checkStatus}
            disabled={loading}
            className="w-full bg-[#222222] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Search size={20} /> CHECK STATUS</>}
          </button>

          {status && (
            <div className={`mt-8 p-6 rounded-2xl border ${status.status === 'voltooid' ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
              <p className={`font-bold ${status.status === 'voltooid' ? 'text-green-700' : 'text-gray-600'}`}>
                {status.message}
              </p>
            </div>
          )}
        </div>

        <button onClick={onClose} className="mt-8 text-[#717171] font-bold text-sm hover:text-[#222222] transition-colors w-full uppercase tracking-widest">
          Sluiten
        </button>
      </div>
    </div>
  );
}
