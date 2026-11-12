'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, Share2, Eye, Clock, Sparkles } from 'lucide-react';
import YoutubeIcon from '@/components/YoutubeIcon';
import { Video, SITE_METADATA } from '@/lib/data';

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
  onShare: (title: string) => void;
}

export default function VideoModal({ video, onClose, onShare }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#09090b] text-white rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              {video.categoryLabel}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {video.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SITE_METADATA.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              title="اشتراك في القناة"
            >
              <YoutubeIcon className="w-3.5 h-3.5 fill-white" />
              <span>اشتراك</span>
            </a>
            <button
              onClick={() => onShare(video.title)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="مشاركة الفلوج"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">مشاركة</span>
            </button>
            <a
              href={`https://youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="فتح على تطبيق يوتيوب"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">يوتيوب</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Details Bottom */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 text-right">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1 text-zinc-200 font-medium">
              <Eye className="w-4 h-4 text-zinc-400" />
              {video.views}
            </span>
            <span>{video.publishedAt}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {video.title}
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {video.description}
          </p>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">
              قناة <strong className="text-white">روماني جورج ({SITE_METADATA.channelHandle})</strong>
            </span>
            <a
              href={`https://youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
            >
              <span>اترك تعليقك على يوتيوب</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
