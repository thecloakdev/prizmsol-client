"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { getPlanLimits } from "@/lib/constants"
import { Collection } from "@/lib/db/schema"
import { isEmpty } from "lodash"
import { PaperclipIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { aiModels, pills } from "./constants"
import EmptyDialog from "./empty-dialog"
import LimitDialog from "./limit-dialog"
import PromptCollection from "./prompt-collection"
import PromptSubmit from "./prompt-submit"
import PromptTextarea from "./prompt-textarea"

export default function PromptInput({
    placeholder,
    showPills,
    className,
    action,
    onSubmit,
    input,
    handleInputChange,
    onModelChange,
    clearOnSubmit = true,
    projectId,
    messagesCount = 0,
    defaultValue,
    collections
}: {
    placeholder?: string;
    showPills?: boolean;
    className?: string;
    action?: (formData: FormData) => Promise<void>;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    clearOnSubmit?: boolean;
    projectId?: string;
    input?: string;
    handleInputChange?: (input: string) => void;
    onModelChange?: (model: string) => void;
    messagesCount?: number;
    defaultValue?: string;
    collections?: Array<Collection>;
}) {
    const showModelSwitcher = false;
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null)
    const [prompt, setPrompt] = useState(defaultValue ? defaultValue : "")
    const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
    const [emptyDialog, setEmptyDialog] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleModelChange = (value: string) => {
        onModelChange?.(value)
    }

    // Function to adjust textarea height
    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current
        if (textarea) {
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = "auto"
            // Set the height to match content (with a min-height applied via className)
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [])

    // Adjust height when content changes
    useEffect(() => {
        adjustHeight()
    }, [adjustHeight, prompt])

    const enterToSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (prompt.trim() == "") {
                setEmptyDialog(true);
                return;
            }
            formRef.current?.requestSubmit();
            if (clearOnSubmit) {
                setPrompt("")
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
        }
    }

    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const canSend = async () => {
        const count = await getPlanLimits();
        return messagesCount >= count;
    }

    const handleAction = async (formData: FormData) => {
        const allowed = await canSend();
        if (allowed) {
            // send user to billing page
            setUpgradeDialogOpen(true)
            return;
        }
        if (action) {
            await action(formData)
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange?.(e.target.value)
        setPrompt(e.target.value)
    }

    const renderPills = () => {
        return pills.map((pill, index: number) => {
            return (
                <Button key={index} size="sm" className={`relative cursor-pointer group/pill overflow-hidden rounded-full px-5`} onClick={() => {
                    setPrompt(pill.prompt)
                    textareaRef.current?.focus();
                    textareaRef.current!.value = pill.prompt
                }}>
                    <div className="absolute left-0 top-0 z-10 h-[72px] w-full -translate-x-full bg-linear-to-r from-transparent via-white/50 dark:via-white/50 to-transparent group-hover/pill:animate-[shimmer_1s]"></div>
                    <pill.Icon className="h-4 w-4" />
                    <span>{pill.name}</span>
                </Button>
            );
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const allowed = await canSend()
        if (allowed) {
            // send user to billing page
            setUpgradeDialogOpen(true)
            return;
        }

        if (onSubmit) {
            onSubmit(e)
        }
    }

    const handleCollectionSelect = () => {
        console.log("Selected collection");
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form ref={formRef} action={handleAction} onSubmit={handleSubmit} className="relative">
                <input type="file" ref={fileInputRef} accept="*/*" className="hidden" onChange={handleFileChange} />
                {projectId && <input type="hidden" name="projectId" value={projectId} />}
                <div
                    className="relative rounded-2xl cursor-text transition-all border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:border-neutral-400 hover:focus-within:border-blue-500 focus-within:border-blue-500 dark:hover:border-neutral-700 dark:hover:focus-within:border-blue-500 dark:focus-within:border-blue-500 border-input bg-background focus-within:ring-4 ring-blue-500/40"
                    onClick={() => {
                        textareaRef.current?.focus()
                    }}
                >
                    <PromptTextarea
                        textareaRef={textareaRef}
                        className={className}
                        placeholder={placeholder || "Ask me anything..."}
                        name="prompt"
                        value={input}
                        onChange={handleTextChange}
                        enterToSend={enterToSend}
                        rows={1}
                        defaultValue={defaultValue}
                    />
                    <div className="flex items-center justify-between p-3 pt-0">
                        <div className="flex items-center gap-2">
                            {showModelSwitcher && <Select onValueChange={handleModelChange} name="model" defaultValue="gpt-4.1-mini">
                                <SelectTrigger className="bg-transparent dark:bg-transparent border-transparent hover:bg-transparent focus:bg-transparent focus:ring-0 focus:border-transparent">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent defaultValue="gpt">
                                    <SelectGroup>
                                        {aiModels.map((model, index: number) => (
                                            <SelectItem key={index} value={model.name} className="text-sm">
                                                {model.displayName}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>}
                            {collections && <PromptCollection collections={collections} onSelect={handleCollectionSelect} />}
                        </div>
                        <div className="flex flex-1 justify-end items-center gap-2">
                            {false && <Button type="button" size="icon" variant="ghost" className="hover:bg-neutral-300 dark:hover:bg-neutral-700 h-8 w-8 rounded-full" onClick={triggerFileUpload}>
                                <PaperclipIcon className="h-4 w-4" />
                                <span className="sr-only">Attach file</span>
                            </Button>}
                            <PromptSubmit disabled={isEmpty(prompt)} />
                        </div>
                    </div>
                </div>
            </form>

            {showPills && (
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                    {renderPills()}
                </div>
            )}
            <LimitDialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen} />
            <EmptyDialog open={emptyDialog} onOpenChange={setEmptyDialog} />
        </div>
    )
}
