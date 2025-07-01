"use client";
import Player from "@/components/Player";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import SimilaritySlider from "../../../../elevenlabs/similarity-slider";
import SpeedSlider from "../../../../elevenlabs/speed-slider";
import StabilitySlider from "../../../../elevenlabs/stability-slider";
import VoiceSelector from "../../../../elevenlabs/voice-selector";
import { generateSpeech } from "../../actions/generateSpeech";
import TTSForm from "../../form";

export default function TTSEditor({
    message
}: {
    message?: string;
}) {
    const handleGenerateSpeech = async (formData: FormData) => {
        // Handle form submission here
        await generateSpeech(formData);
    }
    return (
        <div className="flex flex-1">
            <div className="flex flex-col flex-1">
                <TTSForm action={handleGenerateSpeech} message={message} />
                <Player />
            </div>
            <div className="flex flex-col w-[300px] border-l border-neutral-200 dark:border-neutral-800 p-5">
                <div className="flex mb-2.5">
                    <h1 className="text-md font-semibold">Voice Settings</h1>
                </div>
                <VoiceSelector />
                <div className="flex flex-col gap-4 mt-5">
                    <SpeedSlider name="speed" />
                    <StabilitySlider name="stability" />
                    <SimilaritySlider name="similarity" />
                    <div className="flex flex-col gap-2 mt-5">
                        <Button variant="outline" className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white hover:text-white dark:text-white dark:hover:text-white">
                            <SaveIcon size={20} />
                            <span>Save Voice Settings</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
