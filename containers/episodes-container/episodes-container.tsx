'use client';

import React, { useState } from 'react';

import { HiOutlineDotsVertical } from 'react-icons/hi';

import AudioPlayer from '@/components/audio-player/audio-player';
import DropdownMenu, { DropdownItem } from '@/components/dropdown-menu/dropdown-menu';
import EpisodeCard from '@/components/episode-card/episode-card';
import EpisodeListItem from '@/components/episode-list-item/episode-list-item';
import { DisplayMode } from '@/lib/enum';
import { Episode } from '@/types';

type Props = {
  episodes: Episode[];
};

export default function EpisodesContainer({ episodes }: Props) {
  const [mode, setMode] = React.useState<DisplayMode>(DisplayMode.Scroll);
  const [current, setCurrent] = useState<Episode | null>(null);
  const allItems: (DropdownItem & { key: DisplayMode })[] = [
    { key: DisplayMode.Scroll, label: 'Scroll', action: () => setMode(DisplayMode.Scroll) },
    { key: DisplayMode.Grid, label: 'Grid', action: () => setMode(DisplayMode.Grid) },
    { key: DisplayMode.Compact, label: 'Compact', action: () => setMode(DisplayMode.Compact) },
    { key: DisplayMode.List, label: 'List', action: () => setMode(DisplayMode.List) },
  ];
  const items = allItems.filter((item) => item.key !== mode);

  const handleSelect = (ep: Episode) => setCurrent(ep);
  const handleStop = () => setCurrent(null);

  if (episodes.length === 0) {
    return <section className="px-4 py-8 text-center text-gray-400">لا توجد حلقات</section>;
  }

  return (
    <div className="flex h-full w-full flex-col space-y-4">
      <section className="space-y-3">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-semibold text-white">Top episodes</h2>
          <DropdownMenu
            trigger={<HiOutlineDotsVertical size={20} className="text-white" />}
            items={items}
          />
        </div>

        {mode === DisplayMode.List ? (
          <div className="space-y-2">
            {episodes.map((ep, i) => (
              <EpisodeListItem
                onSelect={handleSelect}
                episode={ep}
                key={`${ep.episodeId ?? 'ep'}_${i}`}
                variant="list"
              />
            ))}
          </div>
        ) : mode === DisplayMode.Compact ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {episodes.map((ep, i) => (
              <EpisodeListItem
                onSelect={handleSelect}
                key={`${ep.episodeId ?? 'ep'}_${i}`}
                episode={ep}
                variant="compact"
              />
            ))}
          </div>
        ) : mode === DisplayMode.Grid ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {episodes.map((ep, i) => (
              <EpisodeCard
                onSelect={handleSelect}
                key={`${ep.episodeId ?? 'ep'}_${i}`}
                episode={ep}
              />
            ))}
          </div>
        ) : (
          /* scroll */
          <div className="relative overflow-x-auto">
            <div className="scroll-container flex gap-4">
              {episodes.map((ep, i) => (
                <EpisodeCard
                  onSelect={handleSelect}
                  key={`${ep.episodeId ?? 'ep'}_${i}`}
                  isCarousel
                  episode={ep}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[hsla(238,27%,12%,1)] to-transparent" />
          </div>
        )}
      </section>
      {current && (
        <div className="fixed right-0 bottom-0 left-0 lg:left-[225px]">
          <AudioPlayer
            image={current.artworkUrl600!}
            src={current.audioUrl!}
            title={current.title}
            artist={current.collectionName!}
            onStop={handleStop}
            id={current.episodeId!}
          />
        </div>
      )}
    </div>
  );
}
