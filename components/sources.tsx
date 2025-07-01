import { GlobeIcon } from "lucide-react";
import Link from "next/link";

export default function Sources({
    sources: s,
}: {
    sources: Array<{
        id: string;
        title: string;
        sourceType: string;
        url: string;
    }>;
}) {
    const sources = Array.from(
        new Map(s.map(source => [source.url, source])).values()
    );
    return (
        <div className="flex flex-col gap-4 mb-2.5">
            <span className="text-md font-semibold">Sources:</span>
            <div className="flex gap-2 w-full overflow-hidden overflow-x-auto">
                {sources.map((source) => (
                    <Link key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="flex flex-col hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 gap-1 p-2.5 rounded-md">
                        <div className="flex flex-1 gap-2 items-center">
                            <GlobeIcon className="h-4 w-4 text-neutral-500" />
                            <span className="text-sm line-clamp-2">{source.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
