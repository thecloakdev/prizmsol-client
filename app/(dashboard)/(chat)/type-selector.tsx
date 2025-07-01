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
} from "@/components/ui/select"

export default function TypeSelector(props: React.ComponentProps<typeof Select>) {
    return (
        <Select {...props} defaultValue="tts">
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="tts">
                        Text to Speech
                    </SelectItem>
                    <SelectItem value="translate">Translate</SelectItem>
                    <SelectItem value="sound">Sound Generator</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
