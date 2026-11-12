import React from 'react';
import { SITE_METADATA, VIDEOS, SPOTLIGHT_VIDEO, FAQ_ITEMS } from '@/lib/data';

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romanygeorge.com';

  // WebSite & Person Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'روماني جورج | Romany Goerge - فلوجات سفر ومغامرات في مصر',
    alternateName: ['Romany Goerge', 'روماني جورج', 'قناة روماني جورج يوتيوب'],
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

  // Video Objects for Google Video Search Indexing
  const allVideos = [SPOTLIGHT_VIDEO, ...VIDEOS];
  const videoSchemas = allVideos.map((video) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [
      video.thumbnail,
      `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
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
  }));

  // FAQ Schema for Google Search Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {videoSchemas.map((vSchema, idx) => (
        <script
          key={`video-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vSchema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

