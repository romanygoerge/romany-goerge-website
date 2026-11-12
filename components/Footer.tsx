'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SITE_METADATA } from '@/lib/data';

interface FooterProps {
  onSubscribe?: (email: string) => void;
}

export default function Footer({ onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    if (onSubscribe) onSubscribe(email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-white border-t border-[#e4e4e7] mt-16 text-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-[#e4e4e7]">
          {/* Col 1: Bio & Socials */}
          <div className="md:col-span-5 space-y-4 text-right">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-800">
                <Image
                  src={SITE_METADATA.avatarUrl}
                  alt={SITE_METADATA.creatorName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-[#09090b] block">
                  {SITE_METADATA.creatorName}
                </span>
                <span className="text-xs text-red-600 font-semibold">
                  {SITE_METADATA.channelHandle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#52525b] max-w-md leading-relaxed">
              رحالة ومستكشف سياحي مصري. أسعى لتوثيق أجمل الأماكن والفسح في مصر بعيون محبة للمغامرة، وتقديم نصائح واقعية تساعد كل شاب وعائلة على السفر بأقل ميزانية والاستمتاع بكل لحظة.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={SITE_METADATA.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="قناة روماني جورج على يوتيوب"
                className="px-4 py-2 rounded-xl bg-red-600 text-white flex items-center gap-2 text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>يوتيوب الرسمي</span>
              </a>

              <a
                href={SITE_METADATA.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="الاشتراك المباشر"
                className="px-3 py-2 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-xs font-bold text-[#09090b] hover:bg-zinc-200 transition-colors"
              >
                اشترك بالقناة
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4 text-right">
            <h4 className="text-base font-bold text-[#09090b]">أقسام المنصة</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#videos"
                  className="text-[#52525b] hover:text-red-600 transition-colors block"
                >
                  فلوجات دهب والإسكندرية
                </a>
              </li>
              <li>
                <a
                  href="#articles"
                  className="text-[#52525b] hover:text-red-600 transition-colors block"
                >
                  أدلة السفر والميزانيات
                </a>
              </li>
              <li>
                <a
                  href="#tools"
                  className="text-[#52525b] hover:text-red-600 transition-colors block"
                >
                  قوائم التجهيز وحاسبة الميزانية
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[#52525b] hover:text-red-600 transition-colors block"
                >
                  عن روماني جورج والرحلة
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-[#52525b] hover:text-red-600 transition-colors block"
                >
                  الأسئلة الشائعة للسفر
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Subscribe */}
          <div className="md:col-span-4 space-y-4 text-right">
            <h4 className="text-base font-bold text-[#09090b]">
              نشرة المسافر الأسبوعية
            </h4>
            <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
              احصل أسبوعياً على وجهات جديدة وترشيحات أماكن خروج وتخييم اقتصادية مجاناً.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-zinc-100 text-[#09090b] rounded-xl text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم تسجيل بريدك بنجاح! شكراً لك.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-center bg-[#f4f4f5] border border-[#e4e4e7] rounded-xl p-1 shadow-inner">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني..."
                    className="w-full px-4 py-2 bg-transparent text-[#09090b] placeholder:text-[#52525b] focus:outline-none text-xs text-right"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    اشترك
                  </button>
                </div>
                <span className="text-[11px] text-zinc-400">
                  لا نرسل رسائل مزعجة إطلاقاً، يمكنك الإلغاء في أي وقت.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right text-xs text-[#52525b]">
          <span>
            جميع الحقوق محفوظة © 2026 {SITE_METADATA.creatorName} ({SITE_METADATA.englishName}) | {SITE_METADATA.tagline}. صُمم لدعم السياحة والمغامرة في مصر.
          </span>

          <div className="flex items-center gap-4">
            <a href={SITE_METADATA.channelUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-bold">
              قناة يوتيوب @RomanyGoerge25
            </a>
            <span className="text-[#e4e4e7]">•</span>
            <a href="#about" className="hover:text-[#09090b] transition-colors">
              سياسة المحتوى
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
