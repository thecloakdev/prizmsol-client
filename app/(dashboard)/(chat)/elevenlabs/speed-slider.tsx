"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SpeedSlider({
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
                <span className="text-sm font-semibold">Speed</span>
                <span className={"text-xs font-semibold"}>{printValue()}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Slower</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">Faster</span>
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
