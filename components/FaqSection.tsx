'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Compass } from 'lucide-react';
import YoutubeIcon from '@/components/YoutubeIcon';
import { FAQ_ITEMS, SITE_METADATA } from '@/lib/data';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-14 sm:py-20" id="faq">
      <div className="flex flex-col space-y-8 text-right">
        {/* Title */}
        <div className="space-y-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4f4f5] text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#e4e4e7]">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-800" />
            <span>الأسئلة الشائعة حول السفر والمحتوى</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090b] tracking-tight">
            كل ما تريد معرفته عن السفر مع روماني جورج
          </h2>

          <p className="text-sm sm:text-base text-[#52525b]">
            إجابات واضحة ومباشرة لأكثر الأسئلة التي تصلني عن تكلفة السفر لدهب، شواطئ الإسكندرية، ومتابعة الفلوجات.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#e4e4e7] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-right gap-4 cursor-pointer hover:bg-zinc-50/60 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-[#09090b] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#f4f4f5] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-zinc-200' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[#09090b]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#52525b] leading-relaxed border-t border-[#f4f4f5] animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Channel Prompt */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-amber-950 block">لديك سؤال آخر أو اقتراح لوجهة قادمة؟</span>
            <span className="text-xs text-amber-800">اترك تعليقك على أحدث فيديو في يوتيوب وأرد عليك شخصياً!</span>
          </div>
          <a
            href={SITE_METADATA.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <YoutubeIcon className="w-3.5 h-3.5 fill-white" />
            <span>الانتقال للقناة</span>
          </a>
        </div>
      </div>
    </section>
  );
}
