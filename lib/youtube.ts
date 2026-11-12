import { Video, CategoryKey, getAllVideos } from '@/lib/data';
import { generateSlug } from '@/lib/seo';

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
 * 100% Automated YouTube Channel Synchronizer.
 * Connects directly to the live channel RSS feed, detects new long-form videos,
 * filters out YouTube Shorts, and generates complete SEO metadata without any API keys!
 */
export async function getLiveOrCachedVideos(): Promise<Video[]> {
  const curated = getAllVideos();
  const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCROky7p4-JubAKwQRIDSrHQ';

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const res = await fetch(feedUrl, { next: { revalidate: 1800 } });
    if (!res.ok) {
      return curated;
    }

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    const newlyDiscovered: Video[] = [];

    for (const entry of entries) {
      const match = entry[1];
      const videoId = match.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = match.match(/<title>([^<]+)<\/title>/)?.[1];
      const published = match.match(/<published>([^<]+)<\/published>/)?.[1];
      const mediaDesc = match.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || '';

      if (!videoId || !title) continue;

      // If this video is already in our curated dataset, skip
      if (curated.some((c) => c.youtubeId === videoId || c.id === videoId)) {
        continue;
      }

      // Detect if it's a long video or a short:
      // YouTube returns a 303 redirect to /watch?v=... for long videos when requested on /shorts/...
      try {
        const checkRes = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
          method: 'HEAD',
          redirect: 'manual',
        });
        const isLong = checkRes.status === 303 || checkRes.status === 302 || checkRes.status === 301;

        if (isLong) {
          const category = inferCategory(title, mediaDesc);
          const slug = generateSlug(title) || `video-${videoId}`;
          const keywords = extractKeywords(title, mediaDesc);

          const newVideo: Video = {
            id: videoId,
            slug: slug,
            title: title,
            seoTitle: `${title} | فلوج روماني جورج`,
            description:
              mediaDesc.trim() ||
              `شاهد فلوج ${title} مع الرحالة وصانع المحتوى روماني جورج واستكشف أسرار وتفاصيل هذه التجربة السفرية بأقل ميزانية.`,
            seoDescription: (mediaDesc || title).slice(0, 160),
            primaryKeyword: keywords[0] || 'فلوج سفر',
            secondaryKeywords: keywords.slice(1),
            category: category.key,
            categoryLabel: category.label,
            duration: '15:00',
            durationSeconds: 900,
            isoDuration: 'PT15M',
            views: 'جديد',
            publishedAt: new Date(published || Date.now()).toLocaleDateString('ar-EG', {
              year: 'numeric',
              month: 'long',
            }),
            uploadDate: published || new Date().toISOString(),
            thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            youtubeId: videoId,
            seoKeywords: keywords,
            budgetTips: [
              'احرص دائماً على مراجعة الأسعار مع السكان المحليين لضمان أفضل تجربة بأوفر تكلفة.',
              'اشترك في القناة ليصلك كل جديد من فلوجات وأسرار السفر الاقتصادي في مصر.',
            ],
          };

          newlyDiscovered.push(newVideo);
        }
      } catch (checkErr) {
        console.warn(`Could not verify video ${videoId}:`, checkErr);
      }
    }

    if (newlyDiscovered.length > 0) {
      return [...newlyDiscovered, ...curated];
    }
    return curated;
  } catch (error) {
    console.error('Error fetching live YouTube RSS feed:', error);
    return curated;
  }
}
