import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { PodcastResult } from '@/types';

export async function POST(req: Request) {
  const body = await req.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  try {
    const created = await prisma.podcast.createMany({
      data: body.map((item: PodcastResult) => ({
        podcastId: item.trackId,
        artistId: item.artistId ?? null,
        collectionId: item.collectionId,
        artistName: item.artistName ?? null,
        trackName: item.trackName ?? '',
        collectionName: item.collectionName ?? '',
        previewUrl: item.previewUrl ?? null,
        artworkUrl600: item.artworkUrl600 ?? null,
        releaseDate: new Date(item.releaseDate),
        podcastTimeMillis: item.trackTimeMillis ?? 0,
        primaryGenreName: item.primaryGenreName ?? '',
        isStreamable: item.isStreamable ?? false,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ created: created.count });
  } catch (error) {
    console.error('Save Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function GET() {
  console.log('> ENV DATABASE_URL =', process.env.DATABASE_URL);
  try {
    await prisma.$connect();
    console.log('> DB connected successfully');
  } catch (e) {
    console.error('> Error connecting to DB:', e);
    return NextResponse.json({ error: 'DB connect error' }, { status: 500 });
  }
  try {
    const podcasts = await prisma.podcast.findMany({
      orderBy: { podcastId: 'asc' },
      take: 100,
    });

    return NextResponse.json(podcasts);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
