import CheckFill from "@/components/icons/check-fill";
import { Loader2Icon } from "lucide-react";

export default function FileAttachment({
    title,
    isGenerating = false,
}: {
    title: string;
    isGenerating?: boolean;
}) {
    return (
        <div className="flex items-center gap-2 py-1 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2">
            {isGenerating && <Loader2Icon className={`animate-spin h-4 w-4`} />}
            {!isGenerating && <CheckFill className="h-4 w-4 fill-blue-700 dark:fill-blue-500" />}
            <div className="flex items-center justify-between">
                <h4 className="text-sm">{title}</h4>
            </div>
        </div>
    );
}