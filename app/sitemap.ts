import { MetadataRoute } from 'next';
import { getAllVideos, CATEGORIES, ARTICLES } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const allVideos = getAllVideos();

  // Category pages
  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.key}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Video pages (using clean SEO slugs)
  const videoEntries: MetadataRoute.Sitemap = allVideos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: new Date(video.uploadDate || lastModified),
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
    ...categoryEntries,
    ...videoEntries,
    ...articleEntries,
  ];
}
