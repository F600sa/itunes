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
            <div onClick={() => onSelect?.(episode)} className="flex items-center justify-between rounded-[3px] px-2 py-1 my-1 bg-transparent hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden bg-gray-700">
                        {episode.artworkUrl600 ? (
                            <Image
                                src={episode.artworkUrl600!}
                                alt={episode.title || 'Episode Image'}
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                        ) : <div className='w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-gray-700'></div>}
                    </div>
                    <div className="flex flex-col max-w-[200px]">
                        <span className="text-white text-sm font-medium truncate line-clamp-2">
                            {episode.title || episode.podcastName}
                        </span>
                        <span className="text-gray-300 text-xs truncate line-clamp-2">
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
        <div className="flex items-start py-4 px-4 border-b border-gray-800 bg-transparent transition-colors">
            <div className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-transparent">
                {episode.artworkUrl600 ? (
                    <Image
                        src={episode.artworkUrl600!}
                        alt={episode.title || 'Episode Image'}
                        width={80}
                        height={80}
                        className="object-cover"
                    />
                ) : <div className='w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-gray-700'></div>}
            </div>
            <div className="flex-1 flex flex-col px-4 space-y-2">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 truncate max-w-[120px] sm:max-w-[200px]">
                        {episode.title || episode.podcastName}
                    </h3>
                    <button title="Play episode" className="p-2 text-gray-400 hover:text-white">
                        <IoIosPlay size={20} />
                    </button>
                </div>
                <span className="text-pink-400 text-xs line-clamp-2 truncate max-w-[120px] sm:max-w-[200px]">
                    {episode.podcastName}
                </span>
                {episode.description && (
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 truncate max-w-[120px] sm:max-w-[200px]">
                        {episode.description}
                    </p>
                )}
                <span className="text-gray-500 text-xs">
                    {episode.releaseDate}
                </span>
            </div>
            <button title="More options" className="p-2 text-gray-400 hover:text-white">
                <HiOutlineDotsVertical size={18} />
            </button>
        </div>
    );
}
