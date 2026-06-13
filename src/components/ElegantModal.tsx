"use client";

import { X, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function ElegantModal({ isOpen, onClose, title, message }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 text-center border border-gray-100">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-[#ff385c]/10 rounded-full flex items-center justify-center text-[#ff385c]">
            <AlertCircle size={32} />
          </div>
        </div>

        <h3 className="text-2xl font-black text-[#222222] mb-3 tracking-tight font-serif italic">
          {title}
        </h3>
        
        <p className="text-gray-500 font-medium leading-relaxed mb-8">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#222222] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#ff385c] transition-all active:scale-95 shadow-lg shadow-[#ff385c]/10"
        >
          BEGREPEN
        </button>
      </div>
    </div>
  );
}
