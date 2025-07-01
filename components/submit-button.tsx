"use client";

import { cn } from '@/lib/utils';
import { CheckCircle2Icon, Loader2Icon, LucideIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SubmitButton({
    text,
    pendingText,
    doneText,
    className,
    variant,
    icon: Icon,
}: {
    text: string;
    className?: string;
    pendingText?: string;
    doneText?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    icon?: LucideIcon;
}) {
    const status = useFormStatus();
    const [showCheck, setShowCheck] = React.useState(false);

    useEffect(() => {
        if (!status.pending) {
            setTimeout(() => {
                setShowCheck(false);
            }, 1000);
        }
    }, [status]);

    const renderCheck = () => {
        return showCheck && (
            <CheckCircle2Icon size={15} className='font-bold' />
        );
    }

    return (
        <Button type="submit" variant={variant} onClick={() => setShowCheck(true)} disabled={status.pending} className={cn('flex justify-center items-center', className)}>
            {status.pending ? <Loader2Icon size={15} className='animate-spin' /> : renderCheck()}
            {!status.pending && !showCheck && Icon && <Icon size={15} className='mr-2' />}
            <span className='text-md'>
                {status.pending ? pendingText || text : showCheck ? doneText || "Done" : text}
            </span>
        </Button>
    );
}
