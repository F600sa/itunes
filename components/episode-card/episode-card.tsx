'use client';
import React from 'react';

import Image from 'next/image';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { Episode } from '@/types';
import { getBgColorById } from '@/utils/colors';

type Props = {
  episode: Episode;
  isCarousel?: boolean;
  onSelect?: (episode: Episode) => void;
};

export default function EpisodeCard({ episode, isCarousel, onSelect }: Props) {
  const date = new Date(episode.releaseDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const bgColor = getBgColorById(Number(episode.episodeId), 0.2);
  return (
    <div
      onClick={() => onSelect?.(episode)}
      className={` ${isCarousel ? 'w-[400px] flex-shrink-0' : 'w-full'} flex h-32 overflow-hidden rounded-md bg-gray-800`}
      style={{ backgroundColor: bgColor }}
    >
      {episode.artworkUrl600 ? (
        <Image
          src={episode.artworkUrl600 as string}
          alt={episode.title || 'Episode Image'}
          width={112}
          height={138}
        />
      ) : (
        <div className="h-[138px] w-[112px] flex-shrink-0 overflow-hidden rounded-sm bg-gray-700"></div>
      )}

      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="flex items-start justify-between">
          <h3 className="max-w-[150px] truncate text-sm font-semibold text-white">
            {episode.title || episode.podcastName}
          </h3>
          <button title="خيارات" className="text-gray-400 hover:text-white">
            <HiOutlineDotsVertical size={20} />
          </button>
        </div>

        {episode.description && (
          <p className="line-clamp-2 max-w-full text-xs text-gray-300">{episode.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{date}</span>
          <div className="flex items-center gap-2">
            {episode.trackViewUrl && (
              <a
                href={episode.trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-white"
              >
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
