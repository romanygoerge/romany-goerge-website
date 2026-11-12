import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Compass,
  ArrowRight,
  Play,
  MapPin,
  Clock,
  Eye,
  FileText,
  FolderOpen,
} from 'lucide-react';
import {
  CATEGORIES,
  getCategoryInfo,
  getVideosByCategory,
  ARTICLES,
  CategoryKey,
} from '@/lib/data';
import {
  generateCategoryMetadata,
  generateCategoryJsonLd,
  generateBreadcrumbJsonLd,
  SITE_URL,
} from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.key,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const catInfo = getCategoryInfo(category);

  if (!catInfo) {
    return {
      title: 'تصنيف غير موجود | روماني جورج',
      description: 'التصنيف المطلوب غير متوفر حالياً.',
    };
  }

  return generateCategoryMetadata(catInfo);
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const catInfo = getCategoryInfo(category);

  if (!catInfo) {
    notFound();
  }

  const categoryVideos = getVideosByCategory(category as CategoryKey);
  const otherCategories = CATEGORIES.filter((c) => c.key !== category);

  // Related articles if available
  const relatedArticles = ARTICLES.filter(
    (art) =>
      (category === 'dahab' && art.id.includes('dahab')) ||
      (category === 'coastal' && (art.id.includes('alex') || art.id.includes('matrouh'))) ||
      (category === 'guides' && (art.id.includes('years') || art.id.includes('guide')))
  );

  // JSON-LD Schemas
  const categorySchema = generateCategoryJsonLd(catInfo, categoryVideos, SITE_URL);
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: 'الرئيسية', url: SITE_URL },
    { name: 'التصنيفات السياحية', url: `${SITE_URL}#videos` },
    { name: catInfo.title, url: `${SITE_URL}/categories/${catInfo.key}` },
  ]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col text-[#09090b]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header activeSection="videos" />

      <main className="w-full pt-24 pb-16 flex-1 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="مسار التصفح"
          className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 py-2"
        >
          <Link href="/" className="hover:text-black transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/#videos" className="hover:text-black transition-colors">
            فلوجات السفر
          </Link>
          <span>/</span>
          <span className="text-zinc-800 font-bold">{catInfo.title}</span>
        </nav>

        {/* Category Hero Banner */}
        <section className="bg-white border border-[#e4e4e7] rounded-3xl p-6 sm:p-10 mb-12 shadow-xs text-right space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
            <FolderOpen className="w-4 h-4" />
            <span>تصنيف فلوجات سياحية ({categoryVideos.length} فيديو كامل)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#09090b] tracking-tight leading-tight">
            {catInfo.h1}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-3xl leading-relaxed">
            {catInfo.description}
          </p>

          {/* Keywords tags */}
          <div className="pt-2 flex flex-wrap gap-2">
            {catInfo.seoKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg border border-zinc-200"
              >
                #{kw}
              </span>
            ))}
          </div>
        </section>

        {/* Videos Grid */}
        <section className="space-y-6 text-right mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-[#09090b] flex items-center gap-2">
              <Compass className="w-5 h-5 text-red-600" />
              <span>فلوجات قسم {catInfo.title}</span>
            </h2>
            <span className="text-xs text-zinc-500 font-medium">
              مرتبة حسب الأحدث والأكثر مشاهدة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryVideos.map((video) => (
              <Link
                key={video.slug}
                href={`/videos/${video.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-[#e4e4e7] overflow-hidden hover:border-zinc-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

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
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-right">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="font-semibold text-red-600">{video.categoryLabel}</span>
                      <span>{video.publishedAt}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#09090b] group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{video.views}</span>
                    </span>
                    <span className="font-bold text-red-600 group-hover:translate-x-[-4px] transition-transform inline-flex items-center gap-1">
                      <span>مشاهدة الفلوج</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Destination Articles (if any) */}
        {relatedArticles.length > 0 && (
          <section className="space-y-6 text-right mb-16 pt-8 border-t border-zinc-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#09090b] flex items-center gap-2">
              <FileText className="w-5 h-5 text-zinc-700" />
              <span>أدلة ومقالات سياحية ذات صلة</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="p-5 bg-white border border-[#e4e4e7] rounded-2xl hover:border-zinc-400 hover:shadow-md transition-all text-right space-y-2 block"
                >
                  <span className="text-xs font-bold text-red-600">{article.category}</span>
                  <h3 className="text-base font-bold text-[#09090b] hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-zinc-400 block pt-1">
                    {article.readTime} • {article.publishedAt}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Explore Other Categories (Internal Linking Engine) */}
        <section className="bg-white border border-[#e4e4e7] rounded-3xl p-6 sm:p-8 shadow-xs text-right space-y-4">
          <h2 className="text-lg font-bold text-[#09090b]">استكشف باقي تصنيفات فلوجات السفر:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.key}
                href={`/categories/${cat.key}`}
                className="p-4 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 transition-all text-right space-y-1 group"
              >
                <h3 className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-1">{cat.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

