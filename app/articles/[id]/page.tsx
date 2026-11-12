import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Clock, Calendar, ArrowRight, Bookmark, Share2, Compass, Play, Download, ExternalLink } from 'lucide-react';
import { ARTICLES, VIDEOS, SPOTLIGHT_VIDEO, SITE_METADATA } from '@/lib/data';
import YoutubeIcon from '@/components/YoutubeIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id || a.slug === id);

  if (!article) {
    return {
      title: 'المقال غير موجود | روماني جورج',
    };
  }

  const title = `${article.title} | دليل سفر وميزانية - روماني جورج`;
  const description = article.excerpt;
  const url = `https://romanygeorge.com/articles/${article.id}`;
  const relatedVid = [SPOTLIGHT_VIDEO, ...VIDEOS].find((v) => v.id === article.relatedVideoId);
  const image = relatedVid ? relatedVid.thumbnail : `https://i.ytimg.com/vi/${SPOTLIGHT_VIDEO.youtubeId}/maxresdefault.jpg`;

  return {
    title,
    description,
    keywords: article.seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: image,
          width: 1280,
          height: 720,
          alt: article.title,
        },
      ],
      siteName: 'Romany Goerge Travel',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id || a.slug === id);

  if (!article) {
    notFound();
  }

  const allVideos = [SPOTLIGHT_VIDEO, ...VIDEOS];
  const relatedVideo = allVideos.find((v) => v.id === article.relatedVideoId);
  const otherArticles = ARTICLES.filter((a) => a.id !== article.id);

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: '2026-06-01T08:00:00+02:00',
    dateModified: '2026-11-10T12:00:00+02:00',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://romanygeorge.com/articles/${article.id}`,
    },
    author: {
      '@type': 'Person',
      name: SITE_METADATA.creatorName,
      url: SITE_METADATA.channelUrl,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_METADATA.creatorName,
      logo: {
        '@type': 'ImageObject',
        url: SITE_METADATA.avatarUrl,
      },
    },
    image: relatedVideo ? relatedVideo.thumbnail : SITE_METADATA.avatarUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://romanygeorge.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'أدلة الوجهات',
        item: 'https://romanygeorge.com#articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://romanygeorge.com/articles/${article.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col text-[#09090b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header activeSection="articles" />

      <main className="w-full pt-24 pb-16 flex-1 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 py-2">
          <Link href="/" className="hover:text-black transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/#articles" className="hover:text-black transition-colors">
            أدلة الوجهات
          </Link>
          <span>/</span>
          <span className="text-zinc-800 font-bold truncate max-w-[200px] sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Container Card */}
        <article className="bg-white border border-[#e4e4e7] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 text-right">
          {/* Top category & meta */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 bg-amber-50 text-amber-800 text-xs font-bold rounded-xl border border-amber-200">
                {article.category}
              </span>

              <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
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
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#09090b] leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          </div>

          {/* Author Box */}
          <div className="flex items-center justify-between py-4 border-y border-[#f4f4f5]">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-zinc-800">
                <Image
                  src={SITE_METADATA.avatarUrl}
                  alt={SITE_METADATA.creatorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-[#09090b] block">
                  {article.author.name}
                </span>
                <span className="text-xs text-zinc-500">
                  {article.author.role} • {SITE_METADATA.channelHandle}
                </span>
              </div>
            </div>

            <a
              href={SITE_METADATA.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <YoutubeIcon className="w-3.5 h-3.5 fill-white" />
              <span>اشتراك بالقناة</span>
            </a>
          </div>

          {/* Related Video Card & Embed Player if available */}
          {relatedVideo && (
            <div className="rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-md">
              <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 fill-red-600 text-red-600" />
                  <span>الفلوج المصور لهذه الرحلة متوفر للمشاهدة:</span>
                </span>
                <Link
                  href={`/videos/${relatedVideo.id}`}
                  className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                >
                  <span>صفحة الفلوج الكاملة</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${relatedVideo.youtubeId}?rel=0`}
                  title={relatedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Article Main Text */}
          <div className="space-y-6 text-base sm:text-lg text-zinc-800 leading-relaxed font-normal whitespace-pre-line">
            {article.content}
          </div>

          {/* Download Checklist CTA Banner */}
          <div className="p-6 rounded-2xl bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-zinc-800">
            <div className="text-right space-y-1">
              <h3 className="text-base font-bold text-white">هل تخطط لرحلتك القادمة؟</h3>
              <p className="text-xs text-zinc-400">
                حمل قائمة تجهيز شنطة السفر التفاعلية (Checklist) المجانية وتجنب نسيان أي غرض مهم.
              </p>
            </div>
            <Link
              href="/#tools"
              className="shrink-0 px-5 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>تحميل القائمة مجاناً</span>
            </Link>
          </div>

          {/* SEO Tag Cloud */}
          <div className="pt-4 border-t border-[#f4f4f5]">
            <span className="text-xs font-bold text-zinc-400 block mb-2">محاور الدليل والكلمات المفتاحية:</span>
            <div className="flex flex-wrap gap-1.5">
              {article.seoKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1 rounded-lg border border-zinc-200"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Other Travel Guides */}
        <section className="mt-14 space-y-6 text-right">
          <h2 className="text-xl sm:text-2xl font-bold text-[#09090b]">
            أدلة وخطط سفر أخرى
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map((oArt) => (
              <Link
                key={oArt.id}
                href={`/articles/${oArt.id}`}
                className="p-5 bg-white rounded-2xl border border-[#e4e4e7] hover:border-zinc-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
                    {oArt.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#09090b] group-hover:text-red-600 transition-colors">
                    {oArt.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {oArt.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-red-600">
                  <span>قراءة الدليل الكامل</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
