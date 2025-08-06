'use client';
import React, { useState } from 'react';

import { HiOutlineDotsVertical } from 'react-icons/hi';

import DropdownMenu, { DropdownItem } from '@/components/dropdown-menu/dropdown-menu';
import PodcastCard from '@/components/podcast-card/podcast-card';
import { PodcastType } from '@/types';

type Props = { data: PodcastType[] };

export default function PodcastCarousel({ data }: Props) {
  const [isGrid, setIsGrid] = useState<boolean>(false);
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
        <div className="grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {data.map((pod, i) => (
            <PodcastCard key={`${pod.trackId}_${i}`} podcast={pod} index={i} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto px-4">
          <div className="flex items-stretch gap-2">
            {data.map((pod, i) => (
              <PodcastCard key={`${pod.trackId}_${i}`} podcast={pod} isCarousel index={i} />
            ))}

            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[hsla(238,27%,12%,1)] to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}
