'use client';

import Spinner from "@/components/Spinner/Spinner";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0C1D]">
            <Spinner />
        </div>
    )
}