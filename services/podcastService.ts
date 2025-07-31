import { PodcastResult, PodcastType } from '@/types';

export async function fetchPodcastsFromDB(): Promise<PodcastResult[]> {
  const res = await fetch('/api/itunes', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch podcasts from DB');
  return res.json();
}

export async function searchPodcastsFromItunes(term: string): Promise<PodcastResult[]> {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=podcast&limit=12`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to search podcasts on iTunes');
  const { results } = await res.json();
  return results as PodcastResult[];
}

export function mapItunesPodcasts(results: PodcastResult[]): PodcastType[] {
  return results.map(r => ({
    trackId: r.trackId,
    trackName: r.trackName,
    artistName: r.artistName,
    artworkUrl600: r.artworkUrl600 ?? '',
    previewUrl: r.previewUrl,
    collectionName:  r.collectionName,
    artistId: r.artistId ?? null,
    collectionId: r.collectionId,
    releaseDate: r.releaseDate,
    trackTimeMillis: r.trackTimeMillis ?? 0,
    primaryGenreName: r.primaryGenreName ?? '',
    isStreamable: r.isStreamable ?? false,
  }));
}

export async function savePodcastsToDB(results: PodcastResult[]): Promise<void> {
  await fetch('/api/itunes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results),
  });
}
