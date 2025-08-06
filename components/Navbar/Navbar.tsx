'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get('q') ?? '';
  const [search, setSearch] = useState<string>(initial);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearch(q);
    if (q.trim()) {
      router.push(`/?q=${encodeURIComponent(q)}`);
    } else {
      router.push(`/`);
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full px-4">
      <div className="flex items-center gap-4">
        <div className="flex shrink-0 items-center gap-3">
          <button
            title="Toggle menu"
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={20} />
          </button>

          <div className="hidden items-center gap-2 text-white md:flex">
            <button title="Back" className="hover:text-gray-300">
              <IoIosArrowBack size={20} />
            </button>
            <button title="Forward" className="hover:text-gray-300">
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={onChange}
            placeholder="Search through over 70 million podcasts and episodes..."
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-center text-sm text-white backdrop-blur-md transition outline-none placeholder:text-white/50 focus:placeholder-transparent"
          />
        </div>

        <div className="relative hidden shrink-0 items-center gap-3 text-white md:flex">
          <button className="rounded bg-[#2c5378] px-4 py-1 text-sm font-medium transition hover:bg-[#40678c]">
            Login
          </button>
          <button className="rounded bg-[#2c5378] px-4 py-1 text-sm font-medium transition hover:bg-[#40678c]">
            Sign up
          </button>

          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="More options"
              className="hover:text-gray-300"
            >
              <HiOutlineDotsVertical size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
