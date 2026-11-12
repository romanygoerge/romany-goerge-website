import { getAllVideos, SITE_METADATA } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

export async function GET() {
  const baseUrl = SITE_URL;
  const videos = getAllVideos();

  const xmlEntries = videos
    .map((video) => {
      const pageUrl = `${baseUrl}/videos/${video.slug}`;
      const thumbnailLoc = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`;
      const playerLoc = `https://www.youtube-nocookie.com/embed/${video.youtubeId}`;
      const contentLoc = `https://www.youtube.com/watch?v=${video.youtubeId}`;
      const durationSeconds = video.durationSeconds || 900;
      const pubDate = video.uploadDate || '2026-06-01T08:00:00+02:00';

      const tags = (video.seoKeywords || [])
        .slice(0, 10)
        .map((tag) => `      <video:tag><![CDATA[${tag}]]></video:tag>`)
        .join('\n');

      return `  <url>
    <loc>${pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailLoc}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.seoDescription || video.description}]]></video:description>
      <video:content_loc>${contentLoc}</video:content_loc>
      <video:player_loc>${playerLoc}</video:player_loc>
      <video:duration>${durationSeconds}</video:duration>
      <video:publication_date>${pubDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:category><![CDATA[${video.categoryLabel}]]></video:category>
      <video:uploader info="${SITE_METADATA.channelUrl}"><![CDATA[${SITE_METADATA.creatorName}]]></video:uploader>
${tags}
    </video:video>
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${xmlEntries}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

