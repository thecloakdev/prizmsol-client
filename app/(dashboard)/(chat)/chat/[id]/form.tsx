"use client";

import AutogrowTextarea from "@/components/AutogrowTextarea";
import CircularProgress from "@/components/CircularProgress";
import SimpleTooltip from "@/components/simple-tooltip";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { isEmpty } from "lodash";
import { DownloadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export default function TTSForm({ action, creditLimit = 10000, message, defaultValue = "" }: {
    action: string | ((formData: FormData) => void | Promise<void>) | undefined;
    creditLimit?: number;
    defaultValue?: string;
    message?: string;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [usage, setUsage] = useState(0);
    const [credits, setCredits] = useState(1000);
    const [characters, setCharacters] = useState(0);

    useEffect(() => {
        if (!isEmpty(message) && textareaRef.current) {
            textareaRef.current.value = message as string;
        }
        setCredits(creditLimit - (message as string).length);
        setCharacters((message as string).length);
    }, [message]);

    /**
     * Handles changes in the textarea input.
     * @param event - The change event from the textarea.
     */
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value;
        const creds = text.length;
        setCredits(creditLimit - creds);
        setUsage(creds / creditLimit * 100);
        setCharacters(creds);
    }

    return (
        <form action={action} className="flex flex-col flex-1 justify-center items-center w-full">
            <div className="sticky top-0 z-20 rounded-t-lg bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 h-[53px] px-5 text-md font-semibold flex w-full items-center justify-between">
                <h1 className="text-sm font-semibold">Generate Text-to-speech</h1>
            </div>
            <div className="flex flex-col flex-1 justify-start w-full max-w-7xl pt-5 px-10">
                <AutogrowTextarea
                    ref={textareaRef}
                    placeholder="Start typing here or paste any text you want to turn into speech..."
                    className="flex flex-1 w-full border-0 text-sm bg-neutral-50 dark:bg-neutral-900 md:text-md ring-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-hidden resize-none"
                    name="text"
                    onChange={handleChange}
                    defaultValue={defaultValue || message}
                />
            </div>
            <div className="flex justify-between items-center py-5 px-10 w-full max-w-7xl gap-4">
                <div className="flex gap-4">
                    <div className="flex">
                        <CircularProgress progress={usage} size={20} strokeWidth={3} />
                    </div>
                    <span className="text-sm">{credits} / {creditLimit} credits remaining</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm">{characters} / 5,000 characters</span>
                    <SimpleTooltip text="Download latest">
                        <Button type="button" variant="outline" size="icon" className="h-10 rounded-lg">
                            <DownloadIcon className="w-5 h-5" />
                        </Button>
                    </SimpleTooltip>
                    <div className="flex items-center gap-4">
                        <SubmitButton className="h-10 rounded-lg text-sm" text={"Generate Speech"} />
                    </div>
                </div>
            </div>
        </form>
    );
}
