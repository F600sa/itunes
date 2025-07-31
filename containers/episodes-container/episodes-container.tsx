'use client';

import React from 'react';
import EpisodeListItem from '@/components/episode-list-item/episode-list-item';
import DropdownMenu, { DropdownItem } from '@/components/dropdown-menu/dropdown-menu';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Episode } from '@/types';
import EpisodeCard from '@/components/episode-card/episode-card';
import { DisplayMode } from '@/lib/enum';



type Props = {
    episodes: Episode[];
};

export default function EpisodesContainer({ episodes }: Props) {
    const [mode, setMode] = React.useState<DisplayMode>(DisplayMode.Scroll);

    const allItems: (DropdownItem & { key: DisplayMode })[] = [
        { key: DisplayMode.Scroll, label: 'Scroll', action: () => setMode(DisplayMode.Scroll) },
        { key: DisplayMode.Grid, label: 'Grid', action: () => setMode(DisplayMode.Grid) },
        { key: DisplayMode.Compact, label: 'Compact', action: () => setMode(DisplayMode.Compact) },
        { key: DisplayMode.List, label: 'List', action: () => setMode(DisplayMode.List) },
    ];
    const items = allItems.filter(item => item.key !== mode);


    if (episodes.length === 0) {
        return (
            <section className="px-4 py-8 text-center text-gray-400">
                لا توجد حلقات
            </section>
        );
    }

    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-semibold text-white">Top episodes</h2>
                <DropdownMenu
                    trigger={<HiOutlineDotsVertical size={20} className="text-white" />}
                    items={items}
                />
            </div>

            {mode === DisplayMode.List ? (
                <div className="px-4 space-y-2">
                    {episodes.map((ep, i) => (
                        <EpisodeListItem episode={ep} key={`${ep.episodeId ?? 'ep'}_${i}`} variant="list" />
                    ))}
                </div>
            ) : mode === DisplayMode.Compact ? (
                <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {episodes.map((ep, i) => (
                        <EpisodeListItem key={`${ep.episodeId ?? 'ep'}_${i}`} episode={ep} variant="compact" />
                    ))}
                </div>
            ) : mode === DisplayMode.Grid ? (
                <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {episodes.map((ep, i) => (
                        <EpisodeCard key={`${ep.episodeId ?? 'ep'}_${i}`} episode={ep} />
                    ))}
                </div>
            ) : (
                /* scroll */
                <div className="overflow-x-auto px-4">
                    <div className="flex gap-4 scroll-container">
                        {episodes.map((ep, i) => (
                            <EpisodeCard key={`${ep.episodeId ?? 'ep'}_${i}`} isCarousel episode={ep} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
