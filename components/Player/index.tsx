"use client";
import { usePlayer } from "@/hooks/use-player";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    FastForward,
    Pause,
    Play,
    Rewind,
    Volume,
    Volume1,
    Volume2,
    VolumeX,
} from "lucide-react";
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export default function Player() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("4:20");
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const trackRef = useRef<HTMLSpanElement>(null);
    const scrubRef = useRef<HTMLSpanElement>(null);
    const bufferRef = useRef<HTMLSpanElement>(null);
    const volumeRangeRef = useRef<HTMLInputElement>(null);
    const volumeProgressRef = useRef<HTMLSpanElement>(null);

    const { src, author, track, stickToBottom, visible, updatePlayer } = usePlayer();

    const song = src || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // default song

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = src || song;
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [src]);

    const handlePlay = (e: any) => {
        e.preventDefault();
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
    };

    useEffect(() => {
        updateDuration();
        initVolume();
    }, []);

    useEffect(() => {
        updateDuration();
        initVolume();
    }, [isPlaying]);

    useEffect(() => {
        updateDuration();
    }, [src]);

    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - hours * 3600) / 60);
        const seconds = Math.floor(duration - hours * 3600 - minutes * 60);
        const hoursStr = hours > 0 ? `${hours}:` : "";
        const minutesStr = `${minutes.toString().padStart(2, "0")}:`;
        const secondsStr = seconds.toString().padStart(2, "0");
        return `${hoursStr}${minutesStr}${secondsStr}`;
    };

    const getBufferEnd = () => {
        return (
            (audioRef.current?.buffered &&
                audioRef.current?.buffered.length > 0 &&
                audioRef.current?.buffered.end(0)) ||
            0
        );
    };

    const updateDuration = () => {
        const d = formatDuration(audioRef.current?.duration || 0);
        setDuration(d);
    };

    const defaultVolume = () => {
        if (audioRef.current) {
            return audioRef.current?.volume * 100 || 0;
        }
    };

    const initVolume = () => {
        const volume = defaultVolume();
        volumeProgressRef.current?.style.setProperty("width", `${volume}%`);
    };

    const updateSeek = () => {
        if (audioRef.current) {
            const minutes = Math.floor((audioRef.current?.currentTime || 0) / 60);
            const seconds = Math.floor(
                (audioRef.current?.currentTime || 0) - minutes * 60
            );
            const percent =
                ((audioRef.current?.currentTime || 0) /
                    (audioRef.current?.duration || 1)) *
                100;
            const buffered =
                (getBufferEnd() / (audioRef.current?.duration || 1)) * 100;
            scrubRef.current?.style.setProperty("width", `${percent}%`);
            bufferRef.current?.style.setProperty("width", `${buffered}%`);
            const currentTime = formatDuration(audioRef.current?.currentTime || 0);
            setCurrentTime(currentTime);
            setCurrentPosition(percent);
        }
    };

    const onPause = () => {
        setIsPlaying(false);
    };

    const onPlay = () => {
        setIsPlaying(true);
        const buffered = (getBufferEnd() / (audioRef.current?.duration || 1)) * 100;
        bufferRef.current?.style.setProperty("width", `${buffered}%`);
    };

    const onProgress = () => {
        const buffered = (getBufferEnd() / (audioRef.current?.duration || 1)) * 100;
        bufferRef.current?.style.setProperty("width", `${buffered}%`);
    };

    const onTimeUpdate = () => {
        if (trackRef.current) {
            const percent =
                (audioRef.current?.currentTime || 0) /
                (audioRef.current?.duration || 1);
            scrubRef.current?.style.setProperty("width", `${percent}%`);
            updateSeek();
        }
    };

    const calculatePercent = (start: number, end: number, current: number) => {
        return (current - start) / (end - start);
    };

    const seekTo = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (trackRef.current && audioRef.current) {
            const startX = Math.round(
                trackRef.current?.getBoundingClientRect().x || 0
            );
            const endX = Math.round(
                trackRef.current?.getBoundingClientRect().x +
                (trackRef.current?.offsetWidth || 0)
            );

            const percent = calculatePercent(startX, endX, e.clientX);

            audioRef.current.currentTime = percent * (audioRef.current.duration || 0);
        }
    };

    const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (trackRef.current && audioRef.current && e.target.value) {
            audioRef.current.muted = true;
            audioRef.current.currentTime =
                (parseInt(e.target.value) / 100) * (audioRef.current.duration || 0);
        }
    };

    const startPlayer = () => {
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.muted = false;
            }
        }, 100);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //disable mute if volume is changed
        if (audioRef.current) {
            audioRef.current.muted = false;
        }

        if (audioRef.current && e.target.value) {
            audioRef.current.volume = parseInt(e.target.value) / 100;
        }

        if (volumeProgressRef.current) {
            volumeProgressRef.current.style.setProperty(
                "width",
                `${e.target.value}%`
            );
        }
    };

    const handleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    };

    const renderVolumeIcon = () => {
        if (audioRef.current) {
            const volume = audioRef.current?.volume || 0;
            if (audioRef.current.muted) {
                return <VolumeX size={24} />;
            }
            if (volume < 0.2) {
                return <Volume size={24} />;
            } else if (volume >= 0.2 && volume < 0.75) {
                return <Volume1 size={24} />;
            } else if (volume >= 0.75) {
                return <Volume2 size={24} />;
            }
        }
    };

    const StickToBottom = () => {
        return stickToBottom ? "fixed bottom-0" : "";
    };

    const handleClose = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        updatePlayer({ visible: false });
    };

    return visible && (
        <>
            <audio
                src={src || song}
                ref={audioRef}
                onPause={onPause}
                onPlay={onPlay}
                onProgress={onProgress}
                onTimeUpdate={onTimeUpdate}
            />
            <motion.div
                className={cn(`${StickToBottom()} flex justify-center min-h-[80px] w-full z-40`)}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5, bounce: 0 }}
            >
                <div className="flex flex-1 items-center justify-between backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 px-5">
                    <div className="flex items-center min-w-[240px] w-1/5">
                        <div className="flex flex-col">
                            <div className="text-sm font-bold line-clamp-1" title={track}>
                                {track}
                            </div>
                            <div className="flex text-sm">{author}</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 max-w-[550px] w-3/5">
                        <div className="flex self-center">
                            <Button type="button" variant="ghost">
                                <Rewind size={24} className="fill-black dark:fill-white" />
                            </Button>
                            <Button type="button" variant="ghost" onClick={handlePlay}>
                                {isPlaying ? (
                                    <Pause size={24} className="fill-black dark:fill-white" />
                                ) : (
                                    <Play size={24} className="fill-black dark:fill-white" />
                                )}
                            </Button>
                            <Button type="button" variant="ghost">
                                <FastForward size={24} className="fill-black dark:fill-white" />
                            </Button>
                        </div>
                        <div className="flex gap-5 items-center justify-center w-full">
                            <span className="flex text-sm w-[50px]">{currentTime}</span>
                            <span
                                ref={trackRef}
                                className="cursor-pointer h-1 relative bg-neutral-400 dark:bg-neutral-700 w-full max-w-[500px] rounded-full group"
                                onClick={seekTo}
                            >
                                <span
                                    ref={bufferRef}
                                    className="flex absolute left-0 h-full bg-neutral-950/30 dark:bg-neutral-50/50 rounded-full"
                                ></span>
                                <span
                                    ref={scrubRef}
                                    className={`flex items-center relative cursor-pointer h-full w-[0%] bg-neutral-900 dark:bg-neutral-100 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 rounded-full`}
                                ></span>
                                <input
                                    type="range"
                                    className="bg-transparent border-none appearance-none w-full absolute -bottom-[6px] left-0 range-thumb:cursor-pointer range-thumb:relative range-thumb:bottom-0.5 range-thumb:w-3 range-thumb:h-3 range-thumb:appearance-none range-thumb:rounded-full range-thumb:bg-neutral-950 dark:range-thumb:bg-neutral-50 range-thumb:hidden range-thumb:group-hover:flex"
                                    onChange={handleSlideChange}
                                    onMouseUp={startPlayer}
                                    value={currentPosition}
                                />
                            </span>
                            <span className="flex text-sm w-[50px]">{duration}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-center w-1/5">
                        <Button variant="ghost" onClick={handleMute}>
                            {renderVolumeIcon()}
                        </Button>
                        <div className="relative bg-neutral-400 h-1 dark:bg-neutral-500 w-full max-w-[100px] rounded-full">
                            <span
                                ref={volumeProgressRef}
                                className="flex items-center relative cursor-pointer h-full w-[0%] bg-blue-600 dark:bg-blue-500 rounded-full"
                            />
                            <input
                                type="range"
                                ref={volumeRangeRef}
                                className="bg-transparent absolute top-0 border-none appearance-none rounded-full w-full h-1 range-thumb:cursor-pointer range-thumb:w-4 range-thumb:h-4 range-thumb:appearance-none range-thumb:rounded-full range-thumb:bg-neutral-950 dark:range-thumb:bg-neutral-50"
                                onChange={handleVolumeChange}
                                defaultValue={defaultVolume()}
                            />
                        </div>
                        <Button type="button" variant="ghost" onClick={handleClose}>
                            <ChevronDown size={24} className="text-black dark:text-white" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
