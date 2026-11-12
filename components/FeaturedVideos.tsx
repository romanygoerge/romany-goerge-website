'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, TrendingUp, ArrowLeft, Compass, Bell, ExternalLink, MapPin } from 'lucide-react';
import { VIDEOS, Video, SITE_METADATA } from '@/lib/data';
import YoutubeIcon from '@/components/YoutubeIcon';

export default function FeaturedVideos() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'الكل (جميع الفلوجات)' },
    { id: 'dahab', label: 'دهب والبحر الأحمر' },
    { id: 'coastal', label: 'الإسكندرية ومطروح' },
    { id: 'cairo', label: 'القاهرة والمعالم' },
    { id: 'adventures', label: 'مغامرات وأنشطة' },
    { id: 'guides', label: 'أدلة السفر والميزانية' },
  ];

  const filteredVideos = activeCategory === 'all'
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === activeCategory);

  return (
    <section className="w-full bg-white border-y border-[#e4e4e7] py-16 sm:py-20 my-10" id="videos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col space-y-10">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 text-[#09090b] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-red-600" />
              <span>مكتبة الفلوجات الكاملة (بدون شورتس)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090b] tracking-tight">
              فلوجات السفر والمغامرة في مصر ({VIDEOS.length} فلوج كامل)
            </h2>
            <p className="text-sm sm:text-base text-[#52525b]">
              فيديوهات وثائقية طويلة تصحبك خطوة بخطوة في قلب التجربة: أسعار، أنشطة، وأماكن حقيقية.
            </p>
            {activeCategory !== 'all' && (
              <div className="pt-1">
                <Link
                  href={`/categories/${activeCategory}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-4"
                >
                  <span>عرض صفحة تصنيف {filterTabs.find((t) => t.id === activeCategory)?.label} كاملة بالأدلة والمقالات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex items-center gap-1.5 bg-[#f4f4f5] p-1.5 rounded-xl border border-[#e4e4e7] overflow-x-auto self-start md:self-auto shrink-0 max-w-full">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#09090b] text-white shadow-xs'
                      : 'text-[#52525b] hover:text-[#09090b] hover:bg-zinc-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => (
            <Link
              key={video.slug}
              href={`/videos/${video.slug}`}
              className="group flex flex-col bg-[#fafafa] rounded-2xl border border-[#e4e4e7] overflow-hidden hover:border-zinc-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <Image
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Duration & Location tag */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-xs rounded-md font-semibold flex items-center gap-1">
                    <Play className="w-3 h-3 fill-white" />
                    <span>{video.duration}</span>
                  </span>
                </div>

                {video.location && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md text-white text-[11px] rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{video.location}</span>
                    </span>
                  </div>
                )}

                {/* Hover Play Badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white text-[#09090b] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-[#09090b] text-[#09090b] mr-[-2px]" />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-1 text-right justify-between space-y-4 bg-white">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#52525b]">
                    <span className="text-[#09090b] flex items-center gap-1 font-semibold">
                      <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
                      {video.views}
                    </span>
                    <span>{video.publishedAt}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#09090b] leading-snug group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52525b] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f4f4f5] flex items-center justify-between">
                  <span className="text-xs text-[#52525b] bg-[#f4f4f5] px-2 py-0.5 rounded-md">
                    {video.categoryLabel}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-red-600 group-hover:text-red-700 transition-colors">
                    <span>فتح صفحة الفلوج</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* High-Converting YouTube Conversion Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-zinc-800">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <YoutubeIcon className="w-8 h-8 fill-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>انضم لرحلتنا على يوتيوب</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-mono">
                  {SITE_METADATA.channelHandle}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                اشترك الآن وفعّل زر الجرس لتصلك أحدث فلوجات الاستكشاف وأسرار السفر في مصر فور نشرها مباشرة!
              </p>
            </div>
          </div>

          <a
            href={SITE_METADATA.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>اشترك مجاناً على يوتيوب</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </section>
  );
}
