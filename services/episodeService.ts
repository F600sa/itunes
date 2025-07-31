import { Episode } from '@/types';

export async function fetchEpisodesFromItunes(collectionId: number): Promise<Episode[]> {
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${collectionId}&entity=podcastEpisode&limit=10`
  );
  if (!res.ok) throw new Error('Failed to fetch episodes from iTunes');
  const data = await res.json();
  const raw = (data.results as Episode[]).slice(1);

  return raw.map(ep => ({
    episodeId:        String(ep.trackId!),
    trackId:          ep.trackId,
    collectionId:     ep.collectionId,
    title:            ep.trackName,
    podcastName:      ep.collectionName,
    description:      ep.description ?? ep.shortDescription ?? '',
    releaseDate:      ep.releaseDate,
    audioUrl:         ep.episodeUrl || ep.previewUrl || '',
    artworkUrl600:    ep.artworkUrl600 ?? '',
    trackViewUrl:     ep.trackViewUrl,
    trackName:        ep.trackName,
    episodeUrl:       ep.episodeUrl,
    shortDescription: ep.shortDescription,
    previewUrl:       ep.previewUrl,
    collectionName:   ep.collectionName,
  }));
}

export async function fetchEpisodesFromDB(): Promise<Episode[]> {
  const res = await fetch('/api/episodes', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch episodes from DB');
  return res.json();
}

export async function saveEpisodesToDB(episodes: Episode[]): Promise<void> {
  await fetch('/api/episodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(episodes),
  });
}
