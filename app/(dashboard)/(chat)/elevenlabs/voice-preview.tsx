"use client";
import React from "react";
import VoiceDropDown from "./voice-dropdown";
import { usePlayer } from "@/hooks/use-player";

export default function VoicePreview({ voices }: {
    voices: any[];
}) {
    const {updatePlayer} = usePlayer();

    const handleChange = (data: any) => {
        if (!data) return;

        const getVoice = voices.find((voice) => voice.voice_id === data);

        updatePlayer({
            src: getVoice.preview_url || "",
            track: getVoice.name || "",
            author: "Preview",
            visible: true,
        });
    }

    return (
        <>
            <div className="flex flex-col gap-3">
                <VoiceDropDown voices={voices} onValueChange={handleChange} />
            </div>
        </>
    )
}


