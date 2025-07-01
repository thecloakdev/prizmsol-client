"use client";

import useClickOutside from "@/hooks/use-clickoutside";
import useShortcut from "@/hooks/useShortcut";
import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function SearchBox() {
    const ref = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useShortcut("/", () => {
        inputRef.current?.focus();
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }, 20);
    });

    useClickOutside(ref, () => {
        setShowSuggestions(false);
    });

    return (
        <div ref={ref} className="flex flex-col relative gap-2.5 items-center w-full max-w-[640px] mx-5">
            <form action="/search" className="flex relative z-10 gap-2.5 rounded-lg items-center w-full">
                <Input
                    ref={inputRef}
                    id="search"
                    name="q"
                    placeholder="Search"
                    onFocus={() => setShowSuggestions(true)}
                    className="flex-1 p-2 transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 outline-hidden border-neutral-200 hover:border-neutral-300 focus-visible:border-neutral-300 focus-visible:bg-white bg-neutral-50 hover:bg-white dark:bg-neutral-800/30 dark:hover:bg-neutral-800/50 dark:focus-visible:bg-neutral-800/50 dark:hover:border-neutral-700 dark:focus-visible:border-neutral-700 text-lg font-semibold"
                    autoComplete="off"
                />
                <Button type="submit" variant="outline" className="border-blue-300 hover:border-blue-400 focus-visible:border-blue-600 dark:border-blue-900 dark:hover:border-blue-800 dark:focus-visible:border-blue-500 bg-blue-300/40 hover:bg-blue-400/40 dark:bg-blue-800/40 dark:hover:bg-blue-700/40 text-blue-700 dark:text-blue-200">
                    <SearchIcon size={22} />
                </Button>
            </form>
            {showSuggestions && (
                <div className="flex flex-col rounded-b-md rounded-t-[20px] bg-neutral-50 dark:bg-neutral-950 shadow-md absolute top-0 left-0 gap-2.5 w-[calc(100%-59px)]">
                    <ul className="flex flex-col gap-2.5 w-full px-1.5 pt-[40px]">
                        <li>Agent00</li>
                        <li>Agent00</li>
                        <li>Agent00</li>
                        <li>Agent00</li>
                        <li>Agent00</li>
                        <li>Agent00</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
