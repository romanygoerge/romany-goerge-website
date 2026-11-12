'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle, Menu, X, ExternalLink, Compass } from 'lucide-react';
import { SITE_METADATA } from '@/lib/data';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#home', label: 'الرئيسية', id: 'home' },
    { href: '/#videos', label: 'فلوجات السفر', id: 'videos' },
    { href: '/#articles', label: 'أدلة الوجهات', id: 'articles' },
    { href: '/#tools', label: 'أدوات المسافر', id: 'tools' },
    { href: '/#about', label: 'عن روماني', id: 'about' },
    { href: '/#faq', label: 'الأسئلة الشائعة', id: 'faq' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#e4e4e7] shadow-xs'
          : 'bg-white/80 backdrop-blur-md border-b border-[#e4e4e7]/60'
      }`}
    >
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Creator Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-800 shadow-xs group-hover:scale-105 transition-transform">
            <Image
              src={SITE_METADATA.avatarUrl}
              alt="روماني جورج - Romany Goerge"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#09090b] flex items-center gap-1.5">
              <span>{SITE_METADATA.creatorName}</span>
              <span className="text-xs text-zinc-400 font-normal hidden sm:inline">({SITE_METADATA.englishName})</span>
            </span>
            <span className="text-[11px] text-[#52525b] font-medium tracking-wide">
              {SITE_METADATA.tagline}
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#f4f4f5] rounded-xl border border-[#e4e4e7]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs sm:text-sm transition-all rounded-lg ${
                  isActive
                    ? 'bg-white text-[#09090b] font-bold shadow-xs'
                    : 'text-[#52525b] hover:text-[#09090b] font-medium'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Left CTA & Subscribe */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={SITE_METADATA.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#09090b] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            title="اشترك في قناة روماني جورج على يوتيوب"
          >
            <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-white transition-colors">
              <span className="text-[10px] text-white group-hover:text-red-600 font-black">▶</span>
            </div>
            <span>اشترك بالقناة</span>
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors"
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e4e4e7] px-5 py-4 space-y-3 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium text-right transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#f4f4f5] text-[#09090b] font-bold'
                    : 'text-[#52525b] hover:bg-zinc-50 hover:text-[#09090b]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#e4e4e7]">
            <a
              href={SITE_METADATA.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold shadow-xs hover:bg-red-700 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              <span>اشترك في قناة يوتيوب الآن</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
