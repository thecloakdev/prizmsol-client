import Link from "next/link";

import { formatDistance } from 'date-fns';

interface ChatItemProps {
    id: string;
    createdAt: string;
    title: string;
    userId: string;
    visibility: string;
}

export default function ChatItem({
    chat: {
        id,
        title,
        createdAt
    }
}: {
    chat: ChatItemProps;
}) {
    const now = formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true
    })
    return (
        <li className="flex flex-1 w-full">
            <Link
                href={`/chat/${id}`}
                className="flex flex-col flex-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-2.5 rounded-md"
            >
                <h2 className="text-md font-bold">{title}</h2>
                <span className="text-sm font-normal text-neutral-500 dark:text-neutral-500">{now}</span>
            </Link>
        </li>
    );
}
