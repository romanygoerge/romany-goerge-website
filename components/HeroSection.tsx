'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Compass, MapPin, Clock, Eye, ArrowLeft } from 'lucide-react';
import { SPOTLIGHT_VIDEO, METRICS, SITE_METADATA } from '@/lib/data';
import YoutubeIcon from '@/components/YoutubeIcon';

export default function HeroSection() {
  return (
    <section id="home" className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-14 pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-48 left-10 w-[30rem] h-[30rem] bg-sky-100/60 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Right Column (Lead in RTL) */}
        <div className="lg:col-span-7 flex flex-col items-start text-right space-y-6 order-1">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#e4e4e7] rounded-full shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <span className="text-xs font-bold text-[#09090b] tracking-wide">
              فلوجات ومغامرات سفر كاملة في مصر
            </span>
          </div>

          {/* Big Display Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#09090b] tracking-tight leading-[1.2]">
            استكشف أسرار السفر في مصر{' '}
            <span className="text-[#09090b] underline decoration-amber-400 decoration-4 underline-offset-8">
              بأقل ميزانية..
            </span>{' '}
            وعِش متعة المغامرة بعيون تانية
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#52525b] max-w-2xl leading-relaxed">
            أنا <strong>روماني جورج</strong>، أشاركك فلوجات استكشاف حقيقية: من شواطئ دهب والدايفنج، لأرخص شواطئ إسكندرية وأجمل أماكن الخروج.. دليلك العملي لرحلات ممتعة بأوفر تكلفة وبدون فبركة.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
            <Link
              href={`/videos/${SPOTLIGHT_VIDEO.id}`}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#09090b] text-white text-sm font-bold shadow-md hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white mr-[-1px]" />
              </div>
              <span>شاهد أحدث فلوج لدهب</span>
            </Link>

            <a
              href={SITE_METADATA.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all duration-200 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
            >
              <YoutubeIcon className="w-4 h-4 fill-white" />
              <span>اشترك في القناة على يوتيوب</span>
            </a>

            <a
              href="#articles"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white border border-[#e4e4e7] text-[#09090b] text-sm font-medium hover:bg-[#f4f4f5] transition-all duration-200 shadow-xs"
            >
              <span>أدلة السفر والمقالات</span>
              <ArrowLeft className="w-4 h-4 text-zinc-400" />
            </a>
          </div>

          {/* Metrics Row */}
          <div className="pt-4 w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e4e4e7] p-3.5 rounded-xl flex flex-col justify-center shadow-xs text-right hover:border-zinc-400 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-[#09090b] tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs text-[#52525b] font-medium pt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Left Column (Spotlight Video Card) */}
        <div className="lg:col-span-5 order-2 flex flex-col items-center" id="featured-video">
          <Link
            href={`/videos/${SPOTLIGHT_VIDEO.id}`}
            className="cursor-pointer relative w-full group rounded-2xl p-1.5 bg-white border border-[#e4e4e7] shadow-lg hover:shadow-xl hover:border-zinc-400 transition-all duration-300 block"
          >
            {/* Video Thumbnail Container */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
              <Image
                src={SPOTLIGHT_VIDEO.thumbnail}
                alt={SPOTLIGHT_VIDEO.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
              {/* Scrim gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Category Pill and Duration Pill */}
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-xs rounded-lg font-semibold flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {SPOTLIGHT_VIDEO.categoryLabel}
                </span>
              </div>

              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 bg-red-600/90 text-white text-xs rounded-lg font-semibold tracking-wider flex items-center gap-1">
                  <Play className="w-3 h-3 fill-white" />
                  <span>{SPOTLIGHT_VIDEO.duration}</span>
                </span>
              </div>

              {/* Glowing Play Button Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white text-[#09090b] flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 fill-[#09090b] text-[#09090b] mr-[-2px]" />
                </div>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-4 sm:p-5 text-right space-y-2">
              <div className="flex items-center justify-between text-xs text-[#52525b]">
                <span className="flex items-center gap-1.5 text-[#09090b] font-semibold">
                  <Eye className="w-3.5 h-3.5 text-[#52525b]" />
                  {SPOTLIGHT_VIDEO.views}
                </span>
                <span>{SPOTLIGHT_VIDEO.publishedAt}</span>
              </div>

              <h3 className="text-lg font-bold text-[#09090b] leading-snug group-hover:text-red-600 transition-colors">
                {SPOTLIGHT_VIDEO.title}
              </h3>

              <p className="text-sm text-[#52525b] line-clamp-2 leading-relaxed">
                {SPOTLIGHT_VIDEO.description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
