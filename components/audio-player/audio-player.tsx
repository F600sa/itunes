'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';

import Image from 'next/image';
import { FaPlay, FaPause, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

import { BG_COLORS, hexToRgba } from '@/utils/colors';

import AudioControls from '../audio-controls/audio-controls';
type Props = {
  id: string;
  src: string;
  title: string;
  artist: string;
  image: string;
  onStop: () => void;
};

export default function AudioPlayer({ src, title, id, image, artist, onStop }: Props) {
  const index = useMemo(() => {
    const num = typeof id === 'string' ? parseInt(id, 10) || 0 : 0;
    return num % BG_COLORS.length;
  }, [id]);
  const progressColor = useMemo(() => BG_COLORS[(index + 1) % BG_COLORS.length], [index]);

  const backgroundGradient = useMemo(() => {
    const color = BG_COLORS[index];
    const start = hexToRgba(color, 0.8);
    const end = hexToRgba(color, 0.3);
    return `linear-gradient(135deg, ${start}, ${end})`;
  }, [index]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);

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
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        console.error('Failed to play audio');
      });
  }, [src]);

  return (
    <div
      style={{ background: backgroundGradient }}
      className="flex h-20 flex-row items-center justify-between overflow-hidden text-white backdrop-blur-lg"
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex gap-2">
        <div className="h-20 w-20 overflow-hidden">
          <Image src={image!} alt={title || 'Episode Image'} width={80} height={80} />
        </div>

        <div className="mt-0 flex flex-col space-x-4 md:mt-3 md:flex-row">
          <div className="flex max-w-[120px] flex-col">
            <span className="text-[10px] text-white uppercase">
              {playing ? 'PLAYING' : 'PAUSED'}
            </span>
            <span className="truncate text-sm font-semibold">{title}</span>
            <span className="truncate text-xs text-yellow-400">{artist}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => skip(-15)} className="flex items-center">
              <FaLongArrowAltLeft size={12} />
              <span className="mx-1 text-sm">15</span>
            </button>
            <button onClick={togglePlay} className="text-2xl">
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => skip(15)} className="flex items-center">
              <span className="mx-1 text-sm">15</span>
              <FaLongArrowAltRight size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 hidden w-full flex-col px-4 md:flex">
        <input
          title="Seek"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={seek}
          className="mt-0 h-2 w-full rounded md:mt-3"
          style={{
            background: `linear-gradient(to right, var(--progress-color) ${playedPct}%, #fff ${playedPct}%)`,
          }}
        />
        <div className="mt-1 flex w-full justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div>
        <AudioControls
          volume={volume}
          onVolumeChange={adjustVolume}
          rate={rate}
          onRateChange={changeRate}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}
