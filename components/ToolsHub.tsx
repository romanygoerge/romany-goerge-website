'use client';

import React, { useState } from 'react';
import { Download, Calculator, MapPin, Smartphone, Luggage, Loader2 } from 'lucide-react';
import { RESOURCE_TOOLS, ResourceTool } from '@/lib/data';

interface ToolsHubProps {
  onDownload: (tool: ResourceTool) => void;
}

export default function ToolsHub({ onDownload }: ToolsHubProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'backpack':
        return <Luggage className="w-7 h-7 text-[#09090b]" />;
      case 'calculator':
        return <Calculator className="w-7 h-7 text-[#09090b]" />;
      case 'map':
        return <MapPin className="w-7 h-7 text-[#09090b]" />;
      default:
        return <Smartphone className="w-7 h-7 text-[#09090b]" />;
    }
  };

  const handleDownloadClick = (tool: ResourceTool) => {
    setDownloadingId(tool.id);
    setTimeout(() => {
      setDownloadingId(null);
      onDownload(tool);
    }, 700);
  };

  return (
    <section className="w-full bg-white border-y border-[#e4e4e7] py-16 sm:py-20 my-10" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col space-y-10">
        {/* Section Header */}
        <div className="text-right space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#09090b] text-xs font-bold uppercase tracking-wider">
            <Luggage className="w-4 h-4 text-emerald-600" />
            <span>حقيبة أدوات المسافر الذكي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090b] tracking-tight">
            أدوات مجانية لرحلة سهلة واقتصادية
          </h2>
          <p className="text-sm sm:text-base text-[#52525b]">
            ملفات عمل وقوائم تجهيز صممتها واستخدمها في كل رحلاتي، متاحة للتحميل مجاناً لمساعدتك في التخطيط.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {RESOURCE_TOOLS.map((tool) => {
            const isDownloading = downloadingId === tool.id;

            return (
              <div
                key={tool.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#fafafa] border border-[#e4e4e7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-zinc-400 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 text-right">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#e4e4e7] text-zinc-900 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    {getToolIcon(tool.icon)}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-white text-[#09090b] text-xs font-semibold rounded border border-[#e4e4e7]">
                        {tool.type}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {tool.fileSize}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#09090b] group-hover:text-amber-600 transition-colors">
                      {tool.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed">
                      {tool.description}
                    </p>

                    <span className="text-xs text-zinc-400 inline-block pt-1 font-medium">
                      {tool.downloadCount}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadClick(tool)}
                  disabled={isDownloading}
                  className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#09090b] text-white hover:bg-zinc-800 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-xs active:scale-[0.98] cursor-pointer disabled:opacity-75"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري التجهيز...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>تحميل مجاناً</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
