import { getChatsFromCollection, getCollection } from "@/lib/db/queries";
import CollectionHeader from "./collection-header";
import ChatItem from "@/components/chat-item";

export default async function CollectionItemPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const slug = await params;
    const id = slug.id;

    const collection = await getCollection({
        id: id
    });

    const chats = await getChatsFromCollection({
        id: id
    });

    return (
        <div className="flex flex-col flex-1">
            <CollectionHeader collection={collection} />
            <ul className="flex flex-col w-full gap-2 p-5">
                {chats.map((chat: any, index: number) => <ChatItem key={index} chat={chat} />)}
            </ul>
        </div>
    );
}
