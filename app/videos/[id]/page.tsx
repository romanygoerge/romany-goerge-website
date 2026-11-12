import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Clock, MapPin, Eye, Share2, Compass, CheckCircle2, ExternalLink } from 'lucide-react';
import { VIDEOS, SPOTLIGHT_VIDEO, SITE_METADATA, Video } from '@/lib/data';
import YoutubeIcon from '@/components/YoutubeIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const all = [SPOTLIGHT_VIDEO, ...VIDEOS];
  return all.map((video) => ({
    id: video.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const all = [SPOTLIGHT_VIDEO, ...VIDEOS];
  const video = all.find((v) => v.id === id);

  if (!video) {
    return {
      title: 'فيديو غير موجود | روماني جورج',
    };
  }

  const title = `${video.title} | فلوج روماني جورج (Romany Goerge)`;
  const description = video.description;
  const url = `https://romanygeorge.com/videos/${video.id}`;
  const image = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return {
    title,
    description,
    keywords: video.seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'video.other',
      images: [
        {
          url: image,
          width: 1280,
          height: 720,
          alt: video.title,
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

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const all = [SPOTLIGHT_VIDEO, ...VIDEOS];
  const video = all.find((v) => v.id === id);

  if (!video) {
    notFound();
  }

  // Related long-form videos
  const relatedVideos = all.filter((v) => v.id !== video.id).slice(0, 3);

  // Video Schema JSON-LD
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
    ],
    uploadDate: '2026-06-01T08:00:00+02:00',
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    publisher: {
      '@type': 'Person',
      name: SITE_METADATA.creatorName,
      url: SITE_METADATA.channelUrl,
      logo: {
        '@type': 'ImageObject',
        url: SITE_METADATA.avatarUrl,
      },
    },
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
        name: 'فلوجات السفر',
        item: 'https://romanygeorge.com#videos',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: video.title,
        item: `https://romanygeorge.com/videos/${video.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col text-[#09090b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header activeSection="videos" />

      <main className="w-full pt-24 pb-16 flex-1 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 py-2">
          <Link href="/" className="hover:text-black transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/#videos" className="hover:text-black transition-colors">
            فلوجات السفر
          </Link>
          <span>/</span>
          <span className="text-zinc-800 font-bold truncate max-w-[200px] sm:max-w-md">
            {video.title}
          </span>
        </nav>

        {/* Video Player Card */}
        <div className="bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
          <div className="relative aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video Metadata & Actions Bar */}
        <div className="mt-8 bg-white border border-[#e4e4e7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-right">
          {/* Tags and badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#f4f4f5]">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-200">
                {video.categoryLabel}
              </span>
              {video.location && (
                <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {video.location}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {video.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {video.views}
              </span>
              <span>•</span>
              <span>{video.publishedAt}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090b] leading-tight">
            {video.title}
          </h1>

          {/* YouTube Conversion Channel Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-zinc-800">
            <div className="flex items-center gap-3.5 text-right w-full sm:w-auto">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-red-600 shrink-0">
                <Image
                  src={SITE_METADATA.avatarUrl}
                  alt={SITE_METADATA.creatorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{SITE_METADATA.creatorName}</span>
                  <span className="text-xs text-red-500 font-mono">● {SITE_METADATA.channelHandle}</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  اشترك الآن لتصلك فلوجات ومغامرات السفر الجديدة فور نشرها
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <a
                href={SITE_METADATA.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95"
              >
                <YoutubeIcon className="w-4 h-4 fill-white" />
                <span>اشترك في القناة مجاناً</span>
              </a>

              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-colors"
                title="فتح على تطبيق يوتيوب والتعليق"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Full Description & Context */}
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-[#09090b]">عن هذا الفلوج والتجربة:</h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed whitespace-pre-line">
              {video.description}
            </p>
          </div>

          {/* Key Travel Takeaways Box */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>نصائح روماني جورج لهذه الوجهة:</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc list-inside leading-relaxed">
              <li>احرص على حجز مواصلاتك مبكراً لتفادي زيادة الأسعار في المواسم والعطلات الرسمية.</li>
              <li>اسأل السكان المحليين وأهل المنطقة دائماً عن أرخص المطاعم وأماكن الأنشطة بعيداً عن السماسرة.</li>
              <li>وثق لحظاتك واستمتع بجمال الطبيعة وتجنب قضاء كل وقتك على الشاشات!</li>
            </ul>
          </div>

          {/* Keywords Tag Cloud for SEO */}
          <div className="pt-4 border-t border-[#f4f4f5]">
            <span className="text-xs font-bold text-zinc-400 block mb-2">كلمات البحث المتعلقة بالفيديو:</span>
            <div className="flex flex-wrap gap-1.5">
              {video.seoKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1 rounded-lg border border-zinc-200"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Long-Form Videos */}
        <section className="mt-14 space-y-6 text-right">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#09090b]">
              فلوجات ومغامرات سفر أخرى
            </h2>
            <Link
              href="/#videos"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <span>مشاهدة كل الفلوجات ({all.length})</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedVideos.map((rVid) => (
              <Link
                key={rVid.id}
                href={`/videos/${rVid.id}`}
                className="group flex flex-col bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden hover:border-zinc-400 hover:shadow-md transition-all"
              >
                <div className="relative aspect-video w-full bg-zinc-900">
                  <Image
                    src={`https://i.ytimg.com/vi/${rVid.youtubeId}/hqdefault.jpg`}
                    alt={rVid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[11px] rounded font-semibold">
                    {rVid.duration}
                  </span>
                </div>
                <div className="p-4 space-y-1.5 text-right">
                  <span className="text-[11px] text-zinc-400">{rVid.categoryLabel}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#09090b] line-clamp-2 group-hover:text-red-600 transition-colors">
                    {rVid.title}
                  </h3>
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
