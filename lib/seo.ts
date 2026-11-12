import type { Metadata } from 'next';
import { Video, CategoryInfo, SITE_METADATA } from '@/lib/data';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://romanygeorge.com';

/**
 * Converts a duration string like "18:40" or "1:15:30" into total seconds.
 */
export function parseDurationToSeconds(duration: string): number {
  if (!duration) return 0;
  const parts = duration.split(':').map((p) => parseInt(p, 10));
  if (parts.some((n) => isNaN(n))) return 0;

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return parts[0] || 0;
}

/**
 * Converts a duration string like "18:40" into ISO 8601 duration format (e.g. "PT18M40S").
 */
export function parseDurationToIso(duration: string): string {
  const totalSeconds = parseDurationToSeconds(duration);
  if (totalSeconds <= 0) return 'PT10M';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = 'PT';
  if (hours > 0) result += `${hours}H`;
  if (minutes > 0) result += `${minutes}M`;
  if (seconds > 0 || (hours === 0 && minutes === 0)) result += `${seconds}S`;

  return result;
}

/**
 * Generates an SEO friendly slug from a text string.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates Schema.org VideoObject JSON-LD.
 * Strictly adheres to Google Search Central Video guidelines.
 */
export function generateVideoJsonLd(video: Video, baseUrl = SITE_URL) {
  const videoUrl = `${baseUrl}/videos/${video.slug}`;
  const isoDuration = video.isoDuration || parseDurationToIso(video.duration);
  const uploadDate = video.uploadDate || '2026-06-01T08:00:00+02:00';

  const thumbnails = [
    `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg`,
    video.thumbnail,
  ].filter(Boolean);

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.seoDescription || video.description,
    thumbnailUrl: Array.from(new Set(thumbnails)),
    uploadDate: uploadDate,
    duration: isoDuration,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    inLanguage: 'ar',
    isFamilyFriendly: true,
    keywords: (video.seoKeywords || []).join(', '),
    url: videoUrl,
    publisher: {
      '@type': 'Person',
      name: SITE_METADATA.creatorName,
      alternateName: SITE_METADATA.englishName,
      url: SITE_METADATA.channelUrl,
      image: SITE_METADATA.avatarUrl,
      logo: {
        '@type': 'ImageObject',
        url: SITE_METADATA.avatarUrl,
      },
    },
    author: {
      '@type': 'Person',
      name: SITE_METADATA.creatorName,
      url: SITE_METADATA.channelUrl,
    },
  };

  // If key moments/chapters exist, include hasPart / Clip structure for Google Video Seek
  if (video.chapters && video.chapters.length > 0) {
    schema.hasPart = video.chapters.map((ch, idx, arr) => {
      const startSec = parseDurationToSeconds(ch.time);
      const nextChapter = arr[idx + 1];
      const endSec = nextChapter ? parseDurationToSeconds(nextChapter.time) : video.durationSeconds;

      return {
        '@type': 'Clip',
        name: ch.title,
        startOffset: startSec,
        endOffset: endSec,
        url: `${videoUrl}#t=${startSec}`,
      };
    });
  }

  return schema;
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD.
 */
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates Schema.org CollectionPage & ItemList JSON-LD for category pages.
 */
export function generateCategoryJsonLd(category: CategoryInfo, videos: Video[], baseUrl = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    headline: category.h1,
    description: category.description,
    url: `${baseUrl}/categories/${category.key}`,
    inLanguage: 'ar',
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: videos.length,
      itemListElement: videos.map((video, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: video.title,
        url: `${baseUrl}/videos/${video.slug}`,
        image: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
      })),
    },
  };
}

/**
 * Generates WebSite + Person JSON-LD for the channel/homepage.
 */
export function generateChannelPersonJsonLd(baseUrl = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_METADATA.creatorName} | ${SITE_METADATA.englishName} - فلوجات سفر واستكشاف ومغامرات في مصر`,
    alternateName: ['Romany Goerge', 'روماني جورج', 'قناة روماني جورج يوتيوب', 'Romany Goerge Travel'],
    url: baseUrl,
    description: SITE_METADATA.bio,
    inLanguage: 'ar',
    publisher: {
      '@type': 'Person',
      name: SITE_METADATA.creatorName,
      alternateName: SITE_METADATA.englishName,
      url: SITE_METADATA.channelUrl,
      image: SITE_METADATA.avatarUrl,
      sameAs: [
        SITE_METADATA.channelUrl,
        SITE_METADATA.socials.youtube,
      ],
      jobTitle: 'صانع محتوى سياحي ومستكشف مصري',
      description: SITE_METADATA.bio,
    },
  };
}

/**
 * Generates Next.js Metadata object for a specific video.
 */
export function generateVideoMetadata(video: Video, baseUrl = SITE_URL): Metadata {
  const title = video.seoTitle || `${video.title} | فلوج روماني جورج (Romany Goerge)`;
  const description = video.seoDescription || video.description;
  const canonicalUrl = `${baseUrl}/videos/${video.slug}`;
  const ogImage = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return {
    title,
    description,
    keywords: video.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'video.other',
      locale: 'ar_EG',
      siteName: 'روماني جورج - Romany Goerge',
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
      videos: [
        {
          url: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
          width: 1280,
          height: 720,
          type: 'text/html',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@RomanyGoerge25',
    },
  };
}

/**
 * Generates Next.js Metadata object for a category page.
 */
export function generateCategoryMetadata(category: CategoryInfo, baseUrl = SITE_URL): Metadata {
  const canonicalUrl = `${baseUrl}/categories/${category.key}`;
  const ogImage = `https://i.ytimg.com/vi/HBQn5QBOYpU/maxresdefault.jpg`;

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: canonicalUrl,
      type: 'website',
      locale: 'ar_EG',
      siteName: 'روماني جورج - Romany Goerge',
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.metaTitle,
      description: category.metaDescription,
      images: [ogImage],
    },
  };
}
