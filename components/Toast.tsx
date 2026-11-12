'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#09090b] text-white rounded-xl shadow-2xl border border-zinc-700 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
      {type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
      <span className="text-sm font-medium text-zinc-100 flex-1 leading-snug">{message}</span>
      <button
        onClick={onClose}
        className="p-1 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
        aria-label="إغلاق التنبيه"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

