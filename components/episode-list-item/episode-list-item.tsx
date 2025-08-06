'use client';
import React from 'react';

import Image from 'next/image';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoIosPlay } from 'react-icons/io';

import { Episode } from '@/types';

export type EpisodeItemProps = {
  episode: Episode;
  variant: 'compact' | 'list';
  onSelect?: (episode: Episode) => void;
};

export default function EpisodeItem({ episode, variant, onSelect }: EpisodeItemProps) {
  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect?.(episode)}
        className="my-1 flex items-center justify-between rounded-[3px] bg-transparent px-2 py-1 transition-colors hover:bg-white/10"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-sm bg-gray-700">
            {episode.artworkUrl600 ? (
              <Image
                src={episode.artworkUrl600!}
                alt={episode.title || 'Episode Image'}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-700"></div>
            )}
          </div>
          <div className="flex max-w-[200px] flex-col">
            <span className="line-clamp-2 truncate text-sm font-medium text-white">
              {episode.title || episode.podcastName}
            </span>
            <span className="line-clamp-2 truncate text-xs text-gray-300">
              {episode.podcastName}
            </span>
          </div>
        </div>
        <button title="More options" className="p-1 text-gray-400 hover:text-white">
          <HiOutlineDotsVertical size={18} />
        </button>
      </div>
    );
  }

  // variant === 'list'
  return (
    <div
      onClick={() => onSelect?.(episode)}
      className="flex items-start border-b border-gray-800 bg-transparent px-4 py-4 transition-colors"
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-transparent">
        {episode.artworkUrl600 ? (
          <Image
            src={episode.artworkUrl600!}
            alt={episode.title || 'Episode Image'}
            width={80}
            height={80}
            className="object-cover"
          />
        ) : (
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-700"></div>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 px-4">
        <div className="flex items-baseline justify-between">
          <h3 className="line-clamp-2 max-w-[120px] truncate text-sm font-semibold text-white sm:max-w-[200px]">
            {episode.title || episode.podcastName}
          </h3>
          <button title="Play episode" className="p-2 text-gray-400 hover:text-white">
            <IoIosPlay size={20} />
          </button>
        </div>
        <span className="line-clamp-2 max-w-[120px] truncate text-xs text-pink-400 sm:max-w-[200px]">
          {episode.podcastName}
        </span>
        {episode.description && (
          <p className="line-clamp-2 max-w-[120px] truncate text-xs leading-relaxed text-gray-300 sm:max-w-[200px]">
            {episode.description}
          </p>
        )}
        <span className="text-xs text-gray-500">{episode.releaseDate}</span>
      </div>
      <button title="More options" className="p-2 text-gray-400 hover:text-white">
        <HiOutlineDotsVertical size={18} />
      </button>
    </div>
  );
}
