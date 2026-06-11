"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Clock, Package, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (sessionId) {
      // Optioneel: check status via API
      setStatus("success");
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-[#008489]/10 p-6 rounded-full animate-in zoom-in duration-500">
            <CheckCircle className="text-[#008489]" size={64} />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-[#222222] mb-6 tracking-tighter">
          Bedankt voor <br /> je bestelling!
        </h1>
        
        <p className="text-xl text-[#717171] mb-12 max-w-xl mx-auto leading-relaxed">
          Je betaling is succesvol verwerkt. We zijn direct begonnen met de verwerking van je vignetten.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left mb-16">
          <div className="bg-[#F7F7F7] p-8 rounded-[32px] border border-gray-100">
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Clock className="text-[#ff385c]" size={24} />
            </div>
            <h3 className="font-black text-xl text-[#222222] mb-2">Bevestiging onderweg</h3>
            <p className="text-[#717171] text-sm leading-relaxed">
              Je ontvangt binnen enkele minuten een bevestigingsmail met je bestelgegevens op het opgegeven e-mailadres.
            </p>
          </div>

          <div className="bg-[#F7F7F7] p-8 rounded-[32px] border border-gray-100">
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Package className="text-[#008489]" size={24} />
            </div>
            <h3 className="font-black text-xl text-[#222222] mb-2">Directe Verwerking</h3>
            <p className="text-[#717171] text-sm leading-relaxed">
              Digitale vignetten worden vaak al binnen 15-60 minuten geactiveerd. Je ontvangt hiervan een aparte mail.
            </p>
          </div>
        </div>

        <div className="bg-[#222222] text-white p-10 rounded-[48px] mb-12 text-left relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 italic">Wat nu?</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Je hoeft niets meer te doen. Zodra je vignet officieel is geregistreerd, sturen we je een definitieve bevestiging.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/" 
                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm hover:bg-[#ff385c] hover:text-white transition-all flex items-center gap-2"
              >
                Terug naar home <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <ShieldCheck className="absolute -right-8 -bottom-8 text-white/5" size={240} />
        </div>

        <p className="text-sm text-[#717171] font-medium flex items-center justify-center gap-2">
          <ShieldCheck size={16} /> 100% Veilige afhandeling door Reisvignet.nl
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff385c]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
