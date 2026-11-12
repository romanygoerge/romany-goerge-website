'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedVideos from '@/components/FeaturedVideos';
import ArticlesSection from '@/components/ArticlesSection';
import ToolsHub from '@/components/ToolsHub';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import FloatingChannelBar from '@/components/FloatingChannelBar';
import Toast from '@/components/Toast';
import { ResourceTool } from '@/lib/data';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'warning'>('success');

  // Show toast helper
  const showToast = (msg: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Scroll section spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'videos', 'articles', 'tools', 'about', 'faq', 'newsletter'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Bookmarks
  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('تمت إزالة الدليل من قائمتك المحفوظة', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('تم حفظ الدليل في قائمتك للرجوع إليه أثناء سفرك!', 'success');
        return [...prev, id];
      }
    });
  };

  // Handle Tool Download
  const handleDownloadTool = (tool: ResourceTool) => {
    showToast(`بدأ تحميل: ${tool.title} بنجاح!`, 'success');
  };

  // Handle Newsletter Subscribe
  const handleSubscribe = (email: string) => {
    showToast(`أهلاً بك يا بطل! تم اشتراك ${email} في نشرة المسافر الأسبوعية.`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col selection:bg-[#09090b] selection:text-white">
      {/* Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Featured Full Travel Vlogs & Category Tabs (No Shorts) */}
        <FeaturedVideos />

        {/* 3. Deep-Dive Destination Guides & Articles */}
        <ArticlesSection
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* 4. Free Traveler Tools & Packing Checklists */}
        <ToolsHub onDownload={handleDownloadTool} />

        {/* 5. Creator Story & Channel Mission */}
        <AboutSection />

        {/* 6. Travel FAQ Section (Google Rich Snippets SEO) */}
        <FaqSection />

        {/* 7. Newsletter Community Section */}
        <NewsletterSection onSubscribe={handleSubscribe} />
      </main>

      {/* Footer */}
      <Footer onSubscribe={handleSubscribe} />

      {/* Floating Sticky Channel Subscribe Bar */}
      <FloatingChannelBar />

      {/* Toast Feedback */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
