"use server";

import { updateChatTitleById } from "@/lib/db/queries";

export async function editProjectTitle(formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const chat = await updateChatTitleById({
        chatId: id,
        title,
    });
    if (chat.count == 0) {
        return {
            error: "Chat not found",
        };
    }
    return {
        success: true,
        message: "Chat updated successfully",
    }
}