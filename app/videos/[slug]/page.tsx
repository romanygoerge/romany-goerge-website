import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Clock,
  MapPin,
  Eye,
  Compass,
  CheckCircle2,
  ExternalLink,
  Tag,
  ListOrdered,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';
import {
  getAllVideos,
  getVideoBySlugOrId,
  SITE_METADATA,
  Video,
} from '@/lib/data';
import { getLiveOrCachedVideos } from '@/lib/youtube';
import {
  generateVideoMetadata,
  generateVideoJsonLd,
  generateBreadcrumbJsonLd,
  SITE_URL,
} from '@/lib/seo';
import YoutubeIcon from '@/components/YoutubeIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = getAllVideos();
  return all.map((video) => ({
    slug: video.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let video = getVideoBySlugOrId(slug);

  if (!video) {
    const liveVideos = await getLiveOrCachedVideos();
    video = liveVideos.find((v) => v.slug === slug || v.id === slug || v.youtubeId === slug);
  }

  if (!video) {
    return {
      title: 'فيديو غير موجود | روماني جورج',
      description: 'عفواً، الفيديو الذي تبحث عنه غير متاح أو تم نقله.',
    };
  }

  return generateVideoMetadata(video);
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  let video = getVideoBySlugOrId(slug);

  if (!video) {
    const liveVideos = await getLiveOrCachedVideos();
    video = liveVideos.find((v) => v.slug === slug || v.id === slug || v.youtubeId === slug);
  }

  if (!video) {
    notFound();
  }

  // Canonical redirection if accessed by legacy YouTube ID or old URL
  if (slug !== video.slug) {
    redirect(`/videos/${video.slug}`);
  }

  const allVideos = await getLiveOrCachedVideos();
  // Related long-form videos (prefer same category, fallback to others)
  const relatedVideos = allVideos
    .filter((v) => v.slug !== video.slug)
    .sort((a, b) => (a.category === video.category ? -1 : 1))
    .slice(0, 3);

  // Generate Schemas
  const videoSchema = generateVideoJsonLd(video, SITE_URL);
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: 'الرئيسية', url: SITE_URL },
    { name: 'فلوجات السفر', url: `${SITE_URL}#videos` },
    { name: video.categoryLabel, url: `${SITE_URL}/categories/${video.category}` },
    { name: video.title, url: `${SITE_URL}/videos/${video.slug}` },
  ]);

  // Optional FAQ schema for this video's destination
  const faqSchema =
    video.faq && video.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: video.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col text-[#09090b]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header activeSection="videos" />

      <main className="w-full pt-24 pb-16 flex-1 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation with Semantic Microdata */}
        <nav
          aria-label="مسار التصفح"
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 py-2"
        >
          <Link href="/" className="hover:text-black transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/#videos" className="hover:text-black transition-colors">
            فلوجات السفر
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${video.category}`}
            className="hover:text-black transition-colors text-red-600 font-medium"
          >
            {video.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-zinc-800 font-bold truncate max-w-[200px] sm:max-w-md">
            {video.title}
          </span>
        </nav>

        {/* Primary Video Player (Main Content of Page) */}
        <article className="space-y-8">
          <div className="bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Metadata & Actions Bar */}
          <div className="bg-white border border-[#e4e4e7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-right">
            {/* Badges and Category Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#f4f4f5]">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/categories/${video.category}`}
                  className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200 transition-colors flex items-center gap-1.5"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>{video.categoryLabel}</span>
                </Link>

                {video.location && (
                  <span className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{video.location}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1" title="مدة الفلوج الكامل">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{video.duration} دقيقة</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{video.views}</span>
                </span>
                <span>•</span>
                <span>{video.publishedAt}</span>
              </div>
            </div>

            {/* Main H1 Title */}
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
                    <span className="text-xs text-red-500 font-mono">
                      ● {SITE_METADATA.channelHandle}
                    </span>
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
                  title="فتح الفيديو على يوتيوب وكتابة تعليق"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Full Written Description & Travel Context */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-[#09090b]">خلاصة الفلوج وتفاصيل الرحلة:</h2>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed whitespace-pre-line">
                {video.description}
              </p>
            </div>

            {/* Locations Visited */}
            {video.locationsVisited && video.locationsVisited.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-bold text-zinc-900 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>الأماكن والمعالم التي تمت زيارتها في هذا الفلوج:</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.locationsVisited.map((loc, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-zinc-100 text-zinc-800 text-xs font-medium rounded-lg border border-zinc-200"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Activities & Experiences */}
            {video.activities && video.activities.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-bold text-zinc-900 mb-2 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>الأنشطة والتجارب الميدانية:</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {video.activities.map((act, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-medium rounded-lg border border-amber-200"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Moments & Chapters (Seek Action for Video SEO) */}
            {video.chapters && video.chapters.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#fafafa] border border-[#e4e4e7] space-y-3">
                <h3 className="text-sm font-bold text-[#09090b] flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-zinc-600" />
                  <span>لحظات ومحطات الفلوج الأساسية (Key Moments):</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                  {video.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-zinc-200/80"
                    >
                      <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        {ch.time}
                      </span>
                      <span className="font-medium text-zinc-800">{ch.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Budget & Travel Takeaways Box */}
            {video.budgetTips && video.budgetTips.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>نصائح روماني جورج لتوفير الميزانية في هذه الوجهة:</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-900 list-disc list-inside leading-relaxed">
                  {video.budgetTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Destination Specific FAQ */}
            {video.faq && video.faq.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-[#09090b] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>أسئلة شائعة حول هذه الرحلة:</span>
                </h3>
                <div className="space-y-2.5">
                  {video.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-right space-y-1.5"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                        س: {item.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        ج: {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords Tag Cloud for SEO & Internal Discoverability */}
            <div className="pt-4 border-t border-[#f4f4f5]">
              <span className="text-xs font-bold text-zinc-400 block mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-zinc-400" />
                <span>كلمات البحث المفتاحية المتعلقة بهذا الفيديو:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {video.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1 rounded-lg border border-zinc-200"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Long-Form Videos */}
        <section className="mt-14 space-y-6 text-right">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#09090b]">
              فلوجات ومغامرات سفر أخرى قد تعجبك
            </h2>
            <Link
              href="/#videos"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <span>مشاهدة كل الفلوجات ({allVideos.length})</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedVideos.map((rVid) => (
              <Link
                key={rVid.slug}
                href={`/videos/${rVid.slug}`}
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

