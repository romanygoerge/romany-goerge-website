import { MetadataRoute } from 'next';
import { VIDEOS, SPOTLIGHT_VIDEO, ARTICLES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://romanygeorge.com';
  const lastModified = new Date();

  const allVideos = [SPOTLIGHT_VIDEO, ...VIDEOS];

  // Video pages
  const videoEntries: MetadataRoute.Sitemap = allVideos.map((video) => ({
    url: `${baseUrl}/videos/${video.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Article pages
  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}#videos`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#articles`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}#tools`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}#about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}#faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...videoEntries,
    ...articleEntries,
  ];
}
