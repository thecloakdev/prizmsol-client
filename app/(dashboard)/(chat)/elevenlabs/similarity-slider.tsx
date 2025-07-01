"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SimilaritySlider({
    defaultValue = [50],
    name
}: {
    defaultValue?: number[];
    name: string;
}) {
    const [value, setValue] = useState(defaultValue);
    const printValue = () => {
        return value[0] + "%";
    }
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex justify-between w-full">
                <span className="text-sm font-semibold">Similarity</span>
                <span className="text-xs font-semibold">{printValue()}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Low</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">High</span>
            </div>
            <Slider
                min={0}
                max={100}
                step={1}
                name={name}
                value={value}
                onValueChange={setValue}
                defaultValue={defaultValue}
                className="w-full"
            />
        </div>
    );
}
