'use client';

import React, { useEffect } from 'react';
import { X, Clock, Calendar, Bookmark, Share2, Play, ExternalLink } from 'lucide-react';
import { Article, SITE_METADATA } from '@/lib/data';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onShare: (title: string) => void;
  onPlayVideoById: (videoId: string) => void;
}

export default function ArticleModal({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onShare,
  onPlayVideoById,
}: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white text-[#09090b] rounded-2xl overflow-hidden border border-[#e4e4e7] shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e4e7] bg-[#fafafa]">
          <span className="px-3 py-1 bg-white border border-[#e4e4e7] rounded-lg text-xs font-semibold text-[#09090b]">
            {article.category}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg transition-colors border cursor-pointer ${
                isBookmarked
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:text-black'
              }`}
              title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ الدليل'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShare(article.title)}
              className="p-2 bg-white text-zinc-600 border border-zinc-200 hover:text-black rounded-lg transition-colors cursor-pointer"
              title="مشاركة الدليل"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-right">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-[#52525b]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090b] leading-tight">
            {article.title}
          </h1>

          {/* Author Strip */}
          <div className="flex items-center gap-3 py-3 border-y border-[#e4e4e7]">
            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
              {article.author.initials}
            </div>
            <div>
              <div className="font-bold text-sm text-[#09090b]">{article.author.name}</div>
              <div className="text-xs text-[#52525b]">{article.author.role}</div>
            </div>
          </div>

          {/* YouTube Video Traffic Bridge Banner */}
          {article.relatedVideoId && (
            <div className="p-4 rounded-xl bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-zinc-800 shadow-md">
              <div className="flex items-center gap-3 text-right">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 fill-white text-white mr-[-1px]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">فلوج وثائقي لهذه الرحلة متوفر الآن!</div>
                  <div className="text-[11px] text-zinc-400">شاهد الأماكن والأسعار بالصوت والصورة على يوتيوب</div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onPlayVideoById(article.relatedVideoId);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>مشاهدة الفلوج</span>
                </button>
              </div>
            </div>
          )}

          {/* Article Text */}
          <div className="space-y-4 text-base text-[#27272a] leading-relaxed whitespace-pre-line font-normal">
            {article.content}
          </div>

          {/* Keywords Tag Cloud for SEO */}
          {article.seoKeywords && article.seoKeywords.length > 0 && (
            <div className="pt-4 border-t border-[#e4e4e7]">
              <span className="text-xs font-bold text-zinc-500 block mb-2">الكلمات الدلالية ومحاور البحث:</span>
              <div className="flex flex-wrap gap-1.5">
                {article.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#f4f4f5] text-zinc-600 px-2.5 py-1 rounded-md border border-[#e4e4e7]"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
