'use client';
import React from 'react';

import Image from 'next/image';

import { PodcastType } from '@/types';
import { BG_COLORS } from '@/utils/colors';

type PodcastCardProps = {
  podcast: PodcastType;
  index: number;
  isCarousel?: boolean;
};

export default function PodcastCard({ podcast, isCarousel, index }: PodcastCardProps) {
  const colorIndex = index! % BG_COLORS.length;
  const authorColor = BG_COLORS[colorIndex];

  return (
    <div className={`flex flex-col ${isCarousel ? 'w-[231px]' : 'w-full'}`}>
      <div
        className={`
         relative overflow-hidden rounded-[3px]
         ${isCarousel ? 'w-[231px] h-[231px]' : 'w-full aspect-square'}
      `}
      >
        <Image
          src={podcast.artworkUrl600}
          alt={podcast.trackName || 'Podcast Image'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 rounded-[3px] shadow-inner pointer-events-none" />
      </div>
      <div className="mt-2 px-1">
        <h3 className="text-sm font-semibold text-white truncate">{podcast.trackName}</h3>
        <p className="text-xs mt-1 truncate " style={{ color: authorColor }}>
          {podcast.artistName}
        </p>
      </div>
    </div>
  );
}
