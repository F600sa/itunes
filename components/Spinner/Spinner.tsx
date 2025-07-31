'use client';
import React from 'react';

export default function Spinner() {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
        </div>
    );
}
