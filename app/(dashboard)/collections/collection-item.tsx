import { Collection } from "@/lib/db/schema";
import { formatDistance } from "date-fns";
import Link from "next/link";

export default function CollectionItem({
    collection
}: {
    collection: Collection
}) {
    const now = formatDistance(new Date(collection.createdAt), new Date(), {
        addSuffix: true,
    })
    return (
        <li>
            <Link href={`/collection/${collection.id}`} className="flex flex-col gap-1 cursor-default border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md p-2.5">
                <span className="text-md font-bold">{collection.name}</span>
                <span className="text-sm font-normal">{collection.description}</span>
                <span className="text-sm font-normal text-neutral-500">{now}</span>
            </Link>
        </li>
    );
}
