'use client';
import React from 'react';

import Image from 'next/image';
import { HiOutlineDotsVertical, HiOutlinePlay } from 'react-icons/hi';

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
      className={`
        ${isCarousel ? 'flex-shrink-0 w-[400px] ' : 'w-full'}
        h-32
        bg-gray-800
        rounded-md
        flex
        overflow-hidden
      `}
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
        <div className="w-[112px] h-[138px] flex-shrink-0 rounded-sm overflow-hidden bg-gray-700"></div>
      )}

      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-white truncate max-w-[150px]">
            {episode.title || episode.podcastName}
          </h3>
          <button title="خيارات" className="text-gray-400 hover:text-white">
            <HiOutlineDotsVertical size={20} />
          </button>
        </div>

        {episode.description && (
          <p className="text-xs max-w-full text-gray-300 line-clamp-2">{episode.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{date}</span>
          <div className="flex items-center gap-2">
            {episode.audioUrl && (
              <a
                href={episode.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <HiOutlinePlay /> Play
              </a>
            )}
            {episode.trackViewUrl && (
              <a
                href={episode.trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
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
