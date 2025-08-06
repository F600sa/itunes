'use client';
import React, { useState } from 'react';

import { HiOutlineDotsVertical } from 'react-icons/hi';

import DropdownMenu, { DropdownItem } from '@/components/dropdown-menu/dropdown-menu';
import PodcastCard from '@/components/podcast-card/podcast-card';
import { PodcastType } from '@/types';

type Props = { data: PodcastType[] };

export default function PodcastCarousel({ data }: Props) {
  const [isGrid, setIsGrid] = useState(false);
  const items: DropdownItem[] = [
    {
      label: isGrid ? 'Switch to Carousel' : 'Switch to Grid',
      action: () => setIsGrid((g) => !g),
    },
  ];

  if (data.length === 0) {
    return <section className="px-4 py-8 text-center text-gray-400">لا توجد بودكاستات</section>;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold text-white">Top podcasts</h2>
        <DropdownMenu
          trigger={<HiOutlineDotsVertical size={20} className="text-white" />}
          items={items}
        />
      </div>

      {isGrid ? (
        <div className="px-4 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {data.map((pod, i) => (
            <PodcastCard key={`${pod.trackId}_${i}`} podcast={pod} index={i} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto px-4 scroll-container">
          <div className="flex gap-2">
            {data.map((pod, i) => (
              <PodcastCard key={`${pod.trackId}_${i}`} podcast={pod} isCarousel index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
