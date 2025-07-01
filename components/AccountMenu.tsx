"use client";
import {
    ChevronsUpDownIcon,
    CreditCardIcon,
    Layers,
    LifeBuoyIcon,
    LockIcon,
    ScrollIcon,
    Settings,
    SunMoonIcon
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export default function AccountMenu({
    user,
    showName = true,
}: {
    user: any;
    showName?: boolean;
}) {
    const [plan, setPlan] = useState<string>("Free");
    const [loading, setLoading] = useState<boolean>(true);
    const name = user?.user_metadata?.name || "Unknown User";
    const getInitials = (name: string) => {
        const names = name ? name.split(" ") : "AA";
        if (names.length > 1) {
            return names[0][0] + names[1][0];
        } else {
            return names[0][0];
        }
    }

    const getPlan = async () => {
        const request = await fetch(`/api/billing/subscription`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { plan: defaultPlan } = await request.json();
        setPlan(defaultPlan?.name || "Free");
        setLoading(false);
    }

    useEffect(() => {
        getPlan();
    }, []);

    return (
        <div className="flex flex-1 h-full bg-transparent">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex flex-1 gap-1 justify-start items-center cursor-pointer active:opacity-80">
                        <Button variant="ghost" className={cn("relative hover:bg-neutral-200 dark:hover:bg-neutral-900 justify-start px-2 py-1 my-1 h-auto w-full", !showName && "hover:bg-transparent dark:hover:bg-transparent")}>
                            <div className="flex items-center flex-1 gap-2">
                                <Avatar className="flex justify-center items-center bg-blue-500 dark:bg-blue-500 h-[32px] w-[32px]">
                                    {user?.imageUrl ? (
                                        <AvatarImage src={user?.imageUrl} className="flex h-[32px] w-[32px]" />
                                    ) : (
                                        <span className="text-md text-white">{getInitials(name)}</span>
                                    )}
                                </Avatar>
                                {showName && <div className="flex flex-col">
                                    <span className="text-md">{name}</span>
                                    {loading ? (<div className="flex animate-pulse h-[20px] w-1/3 bg-neutral-300 dark:bg-neutral-800 rounded-sm"></div>) : <span className="flex text-md opacity-50">{plan}</span>}
                                </div>}
                            </div>
                            {showName && <ChevronsUpDownIcon className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[300px]">
                    <DropdownMenuLabel className="flex items-center gap-2">
                        <Avatar className="flex bg-blue-500 dark:bg-blue-500 justify-center items-center h-[35px] w-[35px]">
                            {user?.imageUrl ? (
                                <AvatarImage src={user?.imageUrl} className="flex h-[35px] w-[35px]" />
                            ) : (
                                <span className="text-md text-white">{getInitials(name)}</span>
                            )}
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-md">{name}</span>
                            {user?.email && <span className="flex text-md font-normal">{user.email}</span>}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link href="/" className="flex items-center w-full">
                                <Layers className="mr-2 h-4 w-4" />
                                <span>Home</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/billing" className="flex items-center w-full">
                                <CreditCardIcon className="mr-2 h-4 w-4" />
                                <span>Billing & Usage</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings" className="flex items-center w-full">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <LifeBuoyIcon className="mr-2 h-4 w-4" />
                                <span>Legal</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/legal/terms"
                                            className="flex items-center w-full"
                                        >
                                            <ScrollIcon className="mr-2 h-4 w-4" />
                                            <span>Terms of Service</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/legal/privacy"
                                            className="flex items-center w-full"
                                        >
                                            <LockIcon className="mr-2 h-4 w-4" />
                                            <span>Privacy</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <div className="flex flex-1 justify-between items-center mx-2">
                            <div className="flex items-center">
                                <SunMoonIcon className="mr-4 h-4 w-4" />
                                <span className="text-sm">Theme</span>
                            </div>
                            <ModeToggle />
                        </div>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
