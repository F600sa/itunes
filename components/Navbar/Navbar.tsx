'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const initial = params.get('q') ?? '';
    const [search, setSearch] = useState(initial);

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
            <div className="flex items-center gap-4 ">
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        title="Toggle menu"
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <FaBars size={20} />
                    </button>

                    <div className="hidden md:flex items-center gap-2 text-white">
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
                        className="w-full px-4 py-2 text-sm text-white text-center placeholder:text-white/50 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md outline-none transition focus:placeholder-transparent"
                    />
                </div>

                <div className="hidden md:flex items-center gap-3 shrink-0 text-white relative">
                    <button className="text-sm font-medium px-4 py-1 rounded bg-[#2c5378] hover:bg-[#40678c] transition">
                        Login
                    </button>
                    <button className="text-sm font-medium px-4 py-1 rounded bg-[#2c5378] hover:bg-[#40678c] transition">
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
