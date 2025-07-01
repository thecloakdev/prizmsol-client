"use client";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function StabilitySlider({
    defaultValue = [50],
    name
}: {
    defaultValue?: number[];
    name: string;
}) {
    const [value, setValue] = useState(defaultValue);
    const printValue = () => {
        if (value[0] < 30) {
            return "May be unstable under 30%";
        }
        return value[0] + "%";
    }
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex justify-between w-full">
                <span className="text-sm font-semibold">Stability</span>
                <span className={cn(`text-xs font-semibold`, {
                    "text-amber-700 dark:text-amber-500": value[0] < 30,
                    "text-neutral-950 dark:text-white": value[0] >= 30
                })}>{printValue()}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">More Variable</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">More Stable</span>
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
