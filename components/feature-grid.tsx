import { AudioLinesIcon, AudioWaveformIcon, BellRingIcon, ServerIcon } from "lucide-react";
import Link from "next/link";

export default function FeatureGrid() {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <li className="flex flex-1">
                <Link href={`/`} className="flex flex-1 flex-col justify-center items-center h-full min-h-[200px] transition-all ring-0 hover:ring-4 ring-transparent hover:ring-blue-800/20 dark:hover:ring-blue-800/40 border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-800 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-950 active:scale-95 rounded-md overflow-hidden">
                    <div className="flex h-3/5 relative justify-center items-center bg-linear-to-br from-rose-500 to-purple-500 w-full">
                        <ServerIcon size={50} className="text-white" />
                    </div>
                    <div className="flex flex-col flex-1 gap-1 bg-neutral-50 dark:bg-neutral-900 w-full p-2.5">
                        <span className="text-md font-semibold">Create server</span>
                        <span className="text-sm opacity-50">Start a server for your audience</span>
                    </div>
                </Link>
            </li>
            <li className="flex flex-1">
                <Link href={`//tts`} className="flex flex-1 flex-col justify-center items-center h-full min-h-[200px] transition-all ring-0 hover:ring-4 ring-transparent hover:ring-blue-800/20 dark:hover:ring-blue-800/40 border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-800 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-950 active:scale-95 rounded-md overflow-hidden">
                    <div className="flex h-3/5 relative justify-center items-center bg-linear-to-br from-purple-500 to-cyan-600 w-full">
                        <AudioLinesIcon size={50} className="text-white" />
                    </div>
                    <div className="flex flex-col flex-1 gap-1 bg-neutral-50 dark:bg-neutral-900 w-full p-2.5">
                        <span className="text-md font-semibold">Text to Speech</span>
                        <span className="text-sm opacity-50">Create TTS for voice overs or Twitch</span>
                    </div>
                </Link>
            </li>
            <li className="flex flex-1">
                <Link href={`//translate`} className="flex flex-1 flex-col justify-center items-center h-full min-h-[200px] transition-all ring-0 hover:ring-4 ring-transparent hover:ring-blue-800/20 dark:hover:ring-blue-800/40 border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-800 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-950 active:scale-95 rounded-md overflow-hidden">
                    <div className="flex h-3/5 relative justify-center items-center bg-linear-to-br from-cyan-500 to-green-600 w-full">
                        <AudioWaveformIcon size={50} className="text-white" />
                    </div>
                    <div className="flex flex-col flex-1 gap-1 bg-neutral-50 dark:bg-neutral-900 w-full p-2.5">
                        <span className="text-md font-semibold">Translate</span>
                        <span className="text-sm opacity-50">Translate Audio or Video</span>
                    </div>
                </Link>
            </li>
            <li className="flex flex-1">
                <Link href={`//sounds`} className="flex flex-1 flex-col justify-center items-center h-full min-h-[200px] transition-all ring-0 hover:ring-4 ring-transparent hover:ring-blue-800/20 dark:hover:ring-blue-800/40 border-2 border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-800 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-950 active:scale-95 rounded-md overflow-hidden">
                    <div className="flex h-3/5 relative justify-center items-center bg-linear-to-br from-green-500 to-yellow-600 w-full">
                        <BellRingIcon size={50} className="text-white" />
                    </div>
                    <div className="flex flex-col flex-1 gap-1 bg-neutral-50 dark:bg-neutral-900 w-full p-2.5">
                        <span className="text-md font-semibold">Sound Generator</span>
                        <span className="text-sm opacity-50">Generate different sounds for your content</span>
                    </div>
                </Link>
            </li>
        </ul>
    );
}