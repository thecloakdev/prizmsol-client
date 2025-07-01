import { Suspense } from "react";
import VoicePreview from "./voice-preview";
export default async function VoiceSelector() {

    const fetchVoices = async (): Promise<Array<any>> => {
        const req = await fetch("https://api.elevenlabs.io/v1/voices?show_legacy=true", {
            next: {
                revalidate: false
            }
        });
        const res = await req.json();
        return res?.voices || [];
    }

    const voices = await fetchVoices();

    const renderLoader = () => {
        return (
            <div className="flex flex-col gap-3">
                <div className="h-[40px] w-full bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-md" />
            </div>
        );
    }
    return (
        <Suspense fallback={renderLoader()}>
            <VoicePreview voices={voices} />
        </Suspense>
    );
}
