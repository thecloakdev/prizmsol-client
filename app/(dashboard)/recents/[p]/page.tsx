import ChatItem from "@/components/chat-item";
import { getChats } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import Paging from "../paging";

export default async function RecentsPage({
    params
}: {
    params: Promise<{ p: string }>
}) {
    const page = (await params).p as string;
    const p = parseInt(page) || 1;
    const {
        chats,
        pagination
    } = await getChats({
        page: p,
        limit: 10,
    });

    if (chats.length == 0 && p > 1) {
        redirect(`/recents/1`);
    }

    return (
        <>
            <ul className="flex flex-col w-full gap-2">
                {chats.map((chat: any, index: number) => <ChatItem key={index} chat={chat} />)}
            </ul>
            <Paging
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                slug="/recents"
            />
        </>
    );
}
