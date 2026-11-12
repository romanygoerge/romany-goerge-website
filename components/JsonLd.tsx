import React from 'react';
import { SITE_METADATA, FAQ_ITEMS, SPOTLIGHT_VIDEO } from '@/lib/data';
import { SITE_URL, generateVideoJsonLd } from '@/lib/seo';

export default function JsonLd() {
  const baseUrl = SITE_URL;

  // WebSite & Person Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE_METADATA.creatorName} | ${SITE_METADATA.englishName} - فلوجات سفر ومغامرات في مصر`,
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

  // Channel Person / Creator Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_METADATA.creatorName,
    alternateName: SITE_METADATA.englishName,
    url: SITE_METADATA.channelUrl,
    image: SITE_METADATA.avatarUrl,
    description: SITE_METADATA.bio,
    sameAs: [
      SITE_METADATA.channelUrl,
      SITE_METADATA.socials.youtube,
    ],
    jobTitle: 'رحالة ومستكشف سياحي',
    knowsAbout: [
      'سياحة دهب',
      'فلوجات السفر في مصر',
      'شواطئ الإسكندرية',
      'شواطئ مرسى مطروح',
      'السياحة الثقافية في القاهرة',
      'المتحف المصري الكبير',
      'الدايفنج والأنشطة البحرية',
      'السفر الاقتصادي والميزانية',
    ],
  };

  // FAQ Schema for Rich Snippets
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
