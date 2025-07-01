import NotFound from "@/app/not-found";
import { getChatById } from "@/lib/db/queries";
import { isEmpty } from "lodash";

export default async function ChatLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const slug = await params;

    const chat = await getChatById({
        id: slug.id,
    });

    if (isEmpty(chat)) {
        return NotFound();
    }

    return (
        <>
            {children}
        </>
    );
}
