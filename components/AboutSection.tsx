'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Mountain, Waves, DollarSign, Sparkles, ExternalLink } from 'lucide-react';
import YoutubeIcon from '@/components/YoutubeIcon';
import { SITE_METADATA } from '@/lib/data';

export default function AboutSection() {
  const milestones = [
    {
      year: "2025",
      title: "انطلاق القناة",
      desc: "تأسيس قناة يوتيوب للتوثيق الواقعي للمغامرات والرحلات في مصر.",
    },
    {
      year: "صيف 2026",
      title: "جولات الإسكندرية",
      desc: "استكشاف شواطئ الزمن الجميل وأرخص فسح على البحر الأبيض المتوسط.",
    },
    {
      year: "خريف 2026",
      title: "سلسلة فلوجات دهب",
      desc: "تجارب الغطس (دايفنج)، الكياك، بيتش باجي، وسهرات وادي النجوم.",
    },
    {
      year: "المستقبل",
      title: "استكشاف أوسع",
      desc: "رحلات لسيوة، الوادي الجديد، النوبة، وتجارب سفر دولية ملهمة بأقل التكاليف.",
    },
  ];

  const pillars = [
    {
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      title: "السفر بأقل ميزانية",
      desc: "أشاركك كل التفاصيل المالية الحقيقية: أسعار المواصلات، الأكل، والإقامة لتسافر وتنبسط دون إهدار أموالك.",
    },
    {
      icon: <Waves className="w-5 h-5 text-sky-600" />,
      title: "تجارب حقيقية وغير مدفوعة",
      desc: "لا توجد إعلانات مضللة؛ أنزل بنفسي وأجرب الأنشطة والمطاعم والشواطئ وأقول لك رأيي بكل صدق وأمانة.",
    },
    {
      icon: <Mountain className="w-5 h-5 text-amber-600" />,
      title: "مغامرات من الشوارع لقمم الجبال",
      desc: "من الأزقة الشعبية القديمة إلى أعماق البحر وسفوح الجبال الشاهقة، نعيش متعة الاكتشاف ونكسر الروتين.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-20" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Creator Profile Card & Highlights */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-md bg-white border border-[#e4e4e7] rounded-3xl p-6 sm:p-8 shadow-lg text-center space-y-5">
            {/* Avatar with luxury framing */}
            <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden ring-4 ring-zinc-800 shadow-md">
              <Image
                src={SITE_METADATA.avatarUrl}
                alt={SITE_METADATA.creatorName}
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-[#09090b]">
                {SITE_METADATA.creatorName}
              </h3>
              <p className="text-xs font-bold text-red-600 tracking-wider">
                {SITE_METADATA.channelHandle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
              رحالة وصانع محتوى فلوجات سفر. هدفي أوريك جمال مصر والبلاد التانية بعيون مختلفة، وأثبت لك إن المغامرة مش محتاجة ملايين، محتاجة بس قرار وفضول حقيقي.
            </p>

            <div className="pt-4 border-t border-[#e4e4e7] grid grid-cols-2 gap-3 text-right">
              <div className="bg-[#fafafa] p-3 rounded-xl border border-[#e4e4e7]">
                <span className="text-[11px] text-zinc-400 block">التخصص</span>
                <span className="text-xs font-bold text-[#09090b]">فلوجات السفر والمغامرة</span>
              </div>
              <div className="bg-[#fafafa] p-3 rounded-xl border border-[#e4e4e7]">
                <span className="text-[11px] text-zinc-400 block">القناة</span>
                <span className="text-xs font-bold text-[#09090b]">يوتيوب رسمي</span>
              </div>
            </div>

            <a
              href={SITE_METADATA.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <YoutubeIcon className="w-4 h-4 fill-white" />
              <span>انضم للمشتركين على يوتيوب</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Right Column: Mission, Story & Milestones */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-right">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4f4f5] text-[#09090b] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#e4e4e7]">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>رسالتي وقصة القناة</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090b] tracking-tight leading-snug">
              السفر مش رفاهية.. السفر حياة وتجديد لطاقتك وروحك
            </h2>

            <p className="text-sm sm:text-base text-[#52525b] leading-relaxed">
              بدأت القناة عشان أشارك الناس الأماكن اللي بروحها بكل عفويتها وتفاصيلها الحقيقية. من تجربة الدايفنج لأول مرة في مياه دهب الصافية، لصيد اللحظات الهادية على شواطئ إسكندرية، لحد التخييم وسهرات الجبل تحت النجوم.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e4e4e7] p-4 rounded-2xl space-y-2 hover:border-zinc-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h4 className="text-sm font-bold text-[#09090b]">{pillar.title}</h4>
                <p className="text-xs text-[#52525b] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Milestones Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-[#09090b] uppercase tracking-wider">
              مسار الرحلة والمحطات
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {milestones.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-white border border-[#e4e4e7] rounded-xl text-right"
                >
                  <span className="px-2 py-1 rounded bg-[#09090b] text-white text-xs font-mono font-bold shrink-0">
                    {item.year}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-[#09090b]">{item.title}</h5>
                    <p className="text-[11px] text-[#52525b] mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
