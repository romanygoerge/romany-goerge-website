'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Bookmark, Clock, ArrowLeft, Play, MapPin } from 'lucide-react';
import { ARTICLES, Article } from '@/lib/data';

interface ArticlesSectionProps {
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export default function ArticlesSection({
  bookmarks,
  onToggleBookmark,
}: ArticlesSectionProps) {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-14 sm:py-20" id="articles">
      <div className="flex flex-col space-y-10">
        {/* Section Title & Counter */}
        <div className="flex items-end justify-between text-right">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#09090b] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>أدلة السفر والاستكشاف المكتوبة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090b] tracking-tight">
              أدلة وجهات مصر: خطط وميزانيات واقعية
            </h2>
            <p className="text-sm sm:text-base text-[#52525b]">
              مقالات تفصيلية تشرح لك خطوة بخطوة كيف تسافر وتستمتع بأفضل الأماكن بأقل تكلفة ممكنة.
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#09090b]">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>تجارب حية من الميدان</span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article) => {
            const isBookmarked = bookmarks.includes(article.id);
            return (
              <article
                key={article.id}
                className="flex flex-col bg-white border border-[#e4e4e7] rounded-2xl p-6 hover:border-zinc-400 hover:shadow-lg transition-all duration-300 justify-between group text-right"
              >
                <div className="space-y-4">
                  {/* Badges and bookmark */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#f4f4f5] text-[#09090b] text-xs font-semibold rounded-lg border border-[#e4e4e7]">
                      {article.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      aria-label="حفظ الدليل في المفضلة"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-[#09090b] bg-zinc-100'
                          : 'text-[#52525b] hover:text-[#09090b] hover:bg-zinc-50'
                      }`}
                      title={isBookmarked ? 'محفوظ' : 'حفظ في المفضلة'}
                    >
                      <Bookmark
                        className="w-4 h-4"
                        fill={isBookmarked ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#52525b] text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                    </div>

                    <Link href={`/articles/${article.id}`}>
                      <h3 className="text-base sm:text-lg font-bold text-[#09090b] leading-snug group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#52525b] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-6 flex items-center justify-between border-t border-[#e4e4e7]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[11px]">
                      {article.author.initials}
                    </div>
                    <span className="text-xs font-bold text-[#09090b]">
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/articles/${article.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 group-hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <span>فتح الدليل</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
