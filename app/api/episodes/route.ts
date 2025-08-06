import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { ITunesEpisode } from '@/types';

export async function POST(req: Request) {
  const body = await req.json();
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  try {
    const result = await prisma.episode.createMany({
      data: body.map((ep: ITunesEpisode) => ({
        episodeId: ep.episodeId,
        collectionId: ep.collectionId,
        collectionName: ep.collectionName,
        title: ep.title,
        description: ep.description ?? ep.shortDescription ?? '',
        releaseDate: new Date(ep.releaseDate),
        audioUrl: ep.episodeUrl || ep.previewUrl || null,
        artworkUrl600: ep.artworkUrl600,
        trackViewUrl: ep.trackViewUrl,
      })),
      skipDuplicates: true,
    });
    return NextResponse.json({ created: result.count });
  } catch (err) {
    console.error('Save episodes Error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await prisma.$connect();
    console.log('> DB connected successfully');
  } catch (e) {
    console.error('> Error connecting to DB:', e);
    return NextResponse.json({ error: 'DB connect error' }, { status: 500 });
  }
  try {
    const episodes = await prisma.episode.findMany({
      orderBy: { episodeId: 'asc' },
      take: 100,
    });

    const safe = episodes.map((ep) => ({
      ...ep,
      episodeId: ep.episodeId.toString(),
    }));

    return NextResponse.json(safe);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
