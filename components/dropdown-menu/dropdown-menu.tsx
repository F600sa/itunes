'use client';
import React, { useState, useRef, useEffect } from 'react';

export type DropdownItem = {
    label: string;
    action: () => void;
};

type Props = {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
};

export default function DropdownMenu({ trigger, items }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block">
            <button onClick={() => setOpen((o) => !o)}>
                {trigger}
            </button>

            {open && (
                <div
                    className={`
            absolute top-full mt-2 w-48 z-50 p-2
            bg-gradient-to-tr from-[#404080] to-[#6B4080]
            rounded shadow-lg right-0
          `}
                >
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                item.action();
                                setOpen(false);
                            }}
                            className="w-full text-start px-2 py-1 text-sm text-white hover:bg-white/20 rounded"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
