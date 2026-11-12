import { NextResponse } from 'next/server';
import { getLiveOrCachedVideos } from '@/lib/youtube';

export async function GET() {
  const videos = await getLiveOrCachedVideos();
  return NextResponse.json(videos, {
    headers: {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
