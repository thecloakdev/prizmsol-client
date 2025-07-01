import { getChats } from "@/lib/db/queries";
import { cookies } from "next/headers";
import AppMenu from "./AppMenu";

export default async function Sidebar() {
    const expanded = (await cookies()).get("sidebar_state")?.value as string;

    const chats = await getChats({
        page: 1,
        limit: 25,
    });

    return (
        <AppMenu isExpanded={parseInt(expanded)} chats={chats} />
    );
}
