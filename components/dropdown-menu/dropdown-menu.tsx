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
  const [open, setOpen] = useState<boolean>(false);
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
      <button onClick={() => setOpen((o) => !o)}>{trigger}</button>

      {open && (
        <div
          className={`absolute top-full right-0 z-50 mt-2 w-48 rounded bg-gradient-to-tr from-[#404080] to-[#6B4080] p-2 shadow-lg`}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.action();
                setOpen(false);
              }}
              className="w-full rounded px-2 py-1 text-start text-sm text-white hover:bg-white/20"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
