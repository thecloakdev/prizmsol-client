"use client";
import PromptInput from "@/components/prompt-input";
import { Collection } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitMessage } from "./actions";

export default function ChatPrompt({
    count,
    defaultPrompt,
    collections
}: {
    count: number;
    defaultPrompt: string;
    collections: Array<Collection>;
}) {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const { success, chatId } = await submitMessage(formData);
        if (success) {
            toast.success("Chat created successfully. Taking you there...");
            router.push(`/chat/${chatId}`);
        } else {
            toast.error("Failed to send message");
        }
    }

    return (
        <PromptInput
            showPills
            action={handleSubmit}
            messagesCount={count}
            defaultValue={defaultPrompt}
            collections={collections}
        />
    );
}
