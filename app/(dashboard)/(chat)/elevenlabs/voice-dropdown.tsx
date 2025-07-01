"use client";
import React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface VoiceDropDownProps extends React.ComponentProps<typeof Select> {
    voices: any[];
}

export default function VoiceDropDown({ voices, ...props }: VoiceDropDownProps) {
    const renderVoices = async () => {
        return voices && voices?.map((voice: any, index: number) => {
            return (
                <SelectItem key={index} value={voice?.voice_id}>
                    {voice.name}
                </SelectItem>
            );
        });
    }

    return (
        <Select name="voice" {...props}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a default voice" />
            </SelectTrigger>
            <SelectContent id="voice">
                <SelectGroup>
                    <SelectLabel>Voices</SelectLabel>
                    {renderVoices()}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
