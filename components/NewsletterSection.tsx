'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, CheckCircle2, Loader2, Compass } from 'lucide-react';

interface NewsletterSectionProps {
  onSubscribe: (email: string) => void;
}

export default function NewsletterSection({ onSubscribe }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      onSubscribe(email);
      setEmail('');
    }, 600);
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-20" id="newsletter">
      <div className="relative rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-zinc-800">
        {/* Subtle background ambient circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-950/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-950/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center space-y-6">
          {/* Compass Icon Halo */}
          <div className="w-16 h-16 rounded-2xl bg-white text-zinc-950 flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
            <Compass className="w-8 h-8 text-red-600" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            انضم لنادي{' '}
            <span className="underline decoration-red-600 decoration-4 underline-offset-8">
              المسافرين والمستكشفين
            </span>{' '}
            في مصر
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            أرسل لك كل أسبوع بريداً مركزاً بأحدث ترشيحات أماكن الخروج الاقتصادية، وأسرار التخييم والدايفنج، وروابط الفلوجات الحصرية قبل الجميع.
          </p>

          {/* Form */}
          {subscribed ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 rounded-2xl animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-right">
                <div className="font-bold text-sm">أهلاً بك في نادي المسافرين!</div>
                <div className="text-xs text-emerald-300">تم تسجيل بريدك بنجاح، وترقب نشرة السفر القادمة.</div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-inner mt-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني هنا..."
                className="w-full px-5 py-3 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none text-xs sm:text-sm text-right"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto shrink-0 px-7 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>جاري التسجيل...</span>
                  </>
                ) : (
                  <span>انضم مجاناً</span>
                )}
              </button>
            </form>
          )}

          {/* Privacy Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-zinc-400 text-xs pt-2">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              نحترم خصوصيتك 100%
            </span>
            <span className="hidden sm:inline">•</span>
            <span>بدون أي رسائل ترويجية مزعجة</span>
            <span className="hidden sm:inline">•</span>
            <span>إلغاء الاشتراك بنقرة واحدة في أي وقت</span>
          </div>
        </div>
      </div>
    </section>
  );
}
