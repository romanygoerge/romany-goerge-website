'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ExternalLink, Compass } from 'lucide-react';
import YoutubeIcon from '@/components/YoutubeIcon';
import { SITE_METADATA } from '@/lib/data';

export default function FloatingChannelBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <aside
      aria-label="قناة روماني جورج على يوتيوب"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 p-2.5 sm:p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#e4e4e7] shadow-xl animate-in slide-in-from-bottom-5 duration-300 max-w-[90vw] sm:max-w-md"
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-600 shrink-0">
        <Image
          src={SITE_METADATA.avatarUrl}
          alt={SITE_METADATA.creatorName}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>

      <div className="text-right flex-1 min-w-0">
        <div className="text-xs font-extrabold text-[#09090b] truncate flex items-center gap-1">
          <span>{SITE_METADATA.creatorName}</span>
          <span className="text-[10px] text-red-600 font-bold">● يوتيوب</span>
        </div>
        <p className="text-[11px] text-[#52525b] truncate">
          فلوجات ومغامرات سفر حقيقية في مصر
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <a
          href={SITE_METADATA.subscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:scale-105 active:scale-95"
        >
          <YoutubeIcon className="w-3.5 h-3.5 fill-white" />
          <span>اشترك</span>
        </a>

        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors rounded-lg"
          aria-label="إخفاء الشريط"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
