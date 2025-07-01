"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import DeviceIcon from "../icons/device"
import { Input } from "./input"
import { Label } from "./label"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <div className="flex justify-self-start items-start border border-neutral-200 dark:border-neutral-800 rounded-full">
            <span className="h-full">
                <Input
                    type="radio"
                    id="system"
                    name="theme"
                    value="system"
                    className="hidden peer"
                    checked={theme === "system"}
                    onChange={() => setTheme("system")}
                />
                <Label htmlFor="system" className="flex p-1.5 cursor-pointer rounded-full border-r border-transparent peer-checked:border-r peer-checked:border-neutral-200 dark:peer-checked:border-neutral-700">
                    <DeviceIcon />
                    <span className="sr-only">System</span>
                </Label>
            </span>
            <span className="h-full">
                <Input
                    type="radio"
                    id="light"
                    name="theme"
                    value="light"
                    className="hidden peer"
                    checked={theme === "light"}
                    onChange={() => setTheme("light")}
                />
                <Label htmlFor="light" className="flex p-1.5 cursor-pointer rounded-full border border-transparent peer-checked:border-neutral-200 dark:peer-checked:border-neutral-700">
                    <Sun className="h-4 w-4" />
                    <span className="sr-only">Light</span>
                </Label>
            </span>
            <span className="h-full">
                <Input
                    type="radio"
                    id="dark"
                    name="theme"
                    value="dark"
                    className="hidden peer"
                    checked={theme === "dark"}
                    onChange={() => setTheme("dark")}
                />
                <Label htmlFor="dark" className="flex p-1.5 cursor-pointer rounded-full border-l border-transparent peer-checked:border-l peer-checked:border-neutral-200 dark:peer-checked:border-neutral-700">
                    <Moon className="h-4 w-4" />
                    <span className="sr-only">Dark</span>
                </Label>
            </span>
        </div>
    )
}
