'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import PodcastContainer from '@/containers/podcast-container/podcast-container';
import EpisodesContainer from '@/containers/episodes-container/episodes-container';
import { Episode, PodcastResult, PodcastType } from '@/types';

import {
  fetchPodcastsFromDB,
  searchPodcastsFromItunes,
  mapItunesPodcasts,
  savePodcastsToDB,
} from '@/services/podcastService';

import {
  fetchEpisodesFromDB,
  fetchEpisodesFromItunes,
  saveEpisodesToDB,
} from '@/services/episodeService';
import Loading from './loading';

export default function Home() {
  const term = useSearchParams().get('q') ?? '';
  const [tracks, setTracks] = useState<PodcastType[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadAll(q: string) {
    setLoading(true);
    try {
      // 1- Podcasts
      let rawPodcasts: PodcastResult[];
      if (!q.trim()) {
        rawPodcasts = await fetchPodcastsFromDB();
        if (rawPodcasts.length === 0) {
          rawPodcasts = await searchPodcastsFromItunes('podcast');
          savePodcastsToDB(rawPodcasts).catch(console.error);
        }
      } else {
        rawPodcasts = await searchPodcastsFromItunes(q);
        savePodcastsToDB(rawPodcasts).catch(console.error);
      }
      const mappedTracks = mapItunesPodcasts(rawPodcasts);

      // 2- Episodes
      let eps: Episode[];
      if (!mappedTracks.length) {
        eps = [];
      } else {
        // try to fetch episodes from DB first
        const dbEps = await fetchEpisodesFromDB();
        if (dbEps.length > 0 && !q.trim()) {
          eps = dbEps;
        } else {
          eps = await fetchEpisodesFromItunes(mappedTracks[0].collectionId);
          saveEpisodesToDB(eps).catch(console.error);
        }
      }
      setTracks(mappedTracks);
      setEpisodes(eps);
    } catch (e: unknown) {
      console.error('Error loading data:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll(term);
  }, [term]);


  return (
    <div className="space-y-4">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-64 ">
          <Loading />
        </div>
      ) : (
        <div className="pt-12 space-y-4 pb-24">
          <PodcastContainer data={tracks} />
          <EpisodesContainer episodes={episodes} />
        </div>
      )}
    </div>
  );
}
