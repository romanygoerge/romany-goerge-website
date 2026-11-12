import { Video, CategoryKey, getAllVideos } from '@/lib/data';
import { generateSlug, parseDurationToSeconds, parseDurationToIso } from '@/lib/seo';

interface YouTubeSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    maxres?: { url: string };
    standard?: { url: string };
    high?: { url: string };
    medium?: { url: string };
    default?: { url: string };
  };
  resourceId?: {
    videoId: string;
  };
}

interface YouTubeContentDetails {
  duration?: string; // ISO 8601 string e.g. "PT18M40S"
}

interface YouTubePlaylistItem {
  snippet: YouTubeSnippet;
  contentDetails?: YouTubeContentDetails;
}

/**
 * Automatically infers video category based on title and description keywords.
 */
function inferCategory(title: string, desc: string): { key: CategoryKey; label: string } {
  const combined = (title + ' ' + desc).toLowerCase();

  if (combined.includes('دهب') || combined.includes('dahab') || combined.includes('سيناء')) {
    return { key: 'dahab', label: 'فلوجات دهب والبحر الأحمر' };
  }
  if (
    combined.includes('إسكندرية') ||
    combined.includes('اسكندرية') ||
    combined.includes('مطروح') ||
    combined.includes('alexandria') ||
    combined.includes('شاطئ') ||
    combined.includes('مصيف')
  ) {
    return { key: 'coastal', label: 'الإسكندرية ومطروح' };
  }
  if (
    combined.includes('متحف') ||
    combined.includes('أهرامات') ||
    combined.includes('اهرامات') ||
    combined.includes('المعز') ||
    combined.includes('القاهرة') ||
    combined.includes('العائلة المقدسة')
  ) {
    return { key: 'cairo', label: 'القاهرة والمعالم' };
  }
  if (
    combined.includes('بينتبول') ||
    combined.includes('paintball') ||
    combined.includes('هاي روبس') ||
    combined.includes('مغامر') ||
    combined.includes('الفيوم') ||
    combined.includes('المقطم')
  ) {
    return { key: 'adventures', label: 'مغامرات وأنشطة' };
  }
  return { key: 'guides', label: 'أدلة السفر والميزانية' };
}

/**
 * Automatically extracts relevant SEO keywords from the video title and description.
 */
function extractKeywords(title: string, desc: string): string[] {
  const base = ['روماني جورج', 'Romany Goerge', 'فلوج سفر', 'سياحة في مصر'];
  const words = title.split(/[\s|،-]+/).filter((w) => w.length > 3 && !w.startsWith('http'));
  const set = new Set([...base, ...words.slice(0, 5)]);
  return Array.from(set);
}

/**
 * Reusable SEO Generation & Dynamic Retrieval System.
 * Fetches latest YouTube uploads, filters out Shorts, generates SEO slugs,
 * schemas, and metadata, cached with Next.js ISR revalidation.
 */
export async function getLiveOrCachedVideos(): Promise<Video[]> {
  const curated = getAllVideos();
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCROky7p4-JubAKwQRIDSrHQ';

  // If no API key is provided, return the curated database
  if (!apiKey) {
    return curated;
  }

  try {
    // 1. Get channel uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!channelRes.ok) {
      console.warn(`YouTube Channel API failed with status ${channelRes.status}, falling back to curated.`);
      return curated;
    }

    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return curated;
    }

    // 2. Fetch playlist items
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!playlistRes.ok) {
      return curated;
    }

    const playlistData = await playlistRes.json();
    const items: YouTubePlaylistItem[] = playlistData.items || [];

    // 3. Process items and merge with curated metadata
    const liveVideos: Video[] = [];

    for (const item of items) {
      const videoId = item.snippet.resourceId?.videoId;
      if (!videoId) continue;

      // Check if we already have curated high-fidelity information for this video
      const existing = curated.find((c) => c.youtubeId === videoId || c.id === videoId);
      if (existing) {
        liveVideos.push(existing);
        continue;
      }

      // If it's a new video not yet in curated list, generate automated SEO metadata
      const title = item.snippet.title;
      const description = item.snippet.description;

      // Filter out shorts (exclude if title contains #shorts or description indicates shorts)
      if (title.toLowerCase().includes('#shorts') || description.toLowerCase().includes('#shorts')) {
        continue;
      }

      const category = inferCategory(title, description);
      const slug = generateSlug(title) || `video-${videoId}`;
      const keywords = extractKeywords(title, description);
      const thumbnail =
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const newVideo: Video = {
        id: videoId,
        slug: slug,
        title: title,
        seoTitle: `${title} | فلوج روماني جورج`,
        description: description,
        seoDescription: description.slice(0, 160) + '...',
        primaryKeyword: keywords[0] || 'فلوج سفر',
        secondaryKeywords: keywords.slice(1),
        category: category.key,
        categoryLabel: category.label,
        duration: '15:00', // Default fallback if contentDetails duration is not populated
        durationSeconds: 900,
        isoDuration: 'PT15M',
        views: 'جديد',
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
        }),
        uploadDate: item.snippet.publishedAt,
        thumbnail: thumbnail,
        youtubeId: videoId,
        seoKeywords: keywords,
        budgetTips: [
          'احرص دائماً على مراجعة الأسعار مع السكان المحليين لضمان أفضل تجربة بأوفر تكلفة.',
          'اشترك في القناة ليصلك كل جديد من فلوجات وأسرار السفر الاقتصادي في مصر.',
        ],
      };

      liveVideos.push(newVideo);
    }

    // Return merged list, ensuring all curated videos are included even if unlisted
    const allIds = new Set(liveVideos.map((v) => v.youtubeId));
    for (const c of curated) {
      if (!allIds.has(c.youtubeId)) {
        liveVideos.push(c);
      }
    }

    return liveVideos;
  } catch (error) {
    console.error('Error in YouTube live generation:', error);
    return curated;
  }
}
