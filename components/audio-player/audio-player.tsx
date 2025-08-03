'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
    FaPlay, FaPause,
    FaLongArrowAltLeft, FaLongArrowAltRight,
    FaVolumeUp, FaStop
} from 'react-icons/fa';
import Image from 'next/image';
import { getBgColorById } from '@/utils/colors';
type Props = {
    id: string
    src: string;
    title: string;
    artist: string;
    image: string
    onStop: () => void;
    progressColor?: string;
};

export default function AudioPlayer({
    src, id, title, image, artist, onStop, progressColor = '#eab308'
}: Props) {
    const backgroundColor = getBgColorById(id, 0.2);

    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [rate, setRate] = useState(1.75);



    const togglePlay = () => {
        const audio = audioRef.current!;
        playing ? audio.pause() : audio.play();
        setPlaying(!playing);
    };
    const skip = (sec: number) => {
        const audio = audioRef.current!;
        audio.currentTime = Math.min(Math.max(0, audio.currentTime + sec), duration);
    };
    const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTo = +e.target.value;
        audioRef.current!.currentTime = seekTo;
        setCurrentTime(seekTo);
    };
    const adjustVolume = (delta: number) => {
        let newVolume = volume + delta;
        newVolume = Math.max(0, Math.min(1, newVolume));
        audioRef.current!.volume = newVolume;
        setVolume(newVolume);
    };
    const changeRate = (delta: number) => {
        const newRate = Math.min(Math.max(0.5, rate + delta), 3);
        audioRef.current!.playbackRate = newRate;
        setRate(newRate);
    };
    const handleStop = () => {
        const audio = audioRef.current!;
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
        onStop();
    };
    const formatTime = (time: number) => {
        const min = String(Math.floor(time / 60)).padStart(2, '0');
        const sec = String(Math.floor(time % 60)).padStart(2, '0');
        return `${min}:${sec}`;
    };
    const playedPct = duration ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        document.documentElement.style.setProperty('--progress-color', progressColor);
    }, [progressColor]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onLoaded = () => setDuration(audio.duration);
        const onTime = () => setCurrentTime(audio.currentTime);
        audio.addEventListener('loadedmetadata', onLoaded);
        audio.addEventListener('timeupdate', onTime);
        return () => {
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('timeupdate', onTime);
        };
    }, []);

    // auto-play on src change
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        audio.play().then(() => setPlaying(true)).catch(() => { });
    }, [src]);

    return (
        <div style={{ backgroundColor }} className=" text-white justify-between flex flex-row items-center px-4 py-2 space-y-2 md:space-y-0 md:space-x-6">
            <audio ref={audioRef} src={src} preload="metadata" />

            <div className='flex gap-2'>
                {/* cover */}
                <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden" >
                    <Image
                        src={image!}
                        alt={title || 'Episode Image'}
                        width={80}
                        height={80}
                    />
                </div>

                <div className="flex flex-col md:flex-row space-x-4">
                    <div className="flex flex-col max-w-[120px]">
                        <span className="text-[10px] text-gray-400 uppercase">
                            {playing ? 'PLAYING' : 'PAUSED'}
                        </span>
                        <span className="text-sm font-semibold truncate">{title}</span>
                        <span className="text-xs text-yellow-400 truncate">{artist}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => skip(-15)} className="flex items-center">
                            <FaLongArrowAltLeft size={12} /><span className="mx-1 text-sm">15</span>
                        </button>
                        <button onClick={togglePlay} className="text-2xl">
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={() => skip(15)} className="flex items-center">
                            <span className="mx-1 text-sm">15</span><FaLongArrowAltRight size={12} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full hidden md:flex flex-col mt-3">
                <input
                    title='Seek'
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={seek}
                    className="w-full h-2 rounded"
                    style={{
                        background: `linear-gradient( to right, var(--progress-color) ${playedPct}%, #fff ${playedPct}% )`
                    }}
                />
                <div className="flex justify-between text-xs text-gray-400 w-full mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center divide-y divide-gray-600">
                {/* volume */}
                <div className="flex items-center space-x-2 py-1 px-3">
                    <FaVolumeUp />
                    <button onClick={() => adjustVolume(-0.1)} className="px-1 hover:bg-white/10 rounded">−</button>
                    <span>{Math.round(volume * 100)}%</span>
                    <button onClick={() => adjustVolume(+0.1)} className="px-1 hover:bg-white/10 rounded">+</button>
                </div>
                {/* rate */}
                <div className="flex items-center space-x-2 py-1 px-3">
                    <button onClick={() => changeRate(-0.25)} className="px-1 hover:bg-white/10 rounded">−</button>
                    <span>{rate.toFixed(2)}x</span>
                    <button onClick={() => changeRate(+0.25)} className="px-1 hover:bg-white/10 rounded">+</button>
                </div>
                {/* stop */}
                <div className="py-1 px-3">
                    <button onClick={handleStop} title="STOP" className="text-xl hover:text-red-500"><FaStop /></button>
                </div>
            </div>
        </div>
    );
}
