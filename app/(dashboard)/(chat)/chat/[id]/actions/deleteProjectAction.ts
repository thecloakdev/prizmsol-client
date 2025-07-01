"use server";

import { deleteChatById } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

export async function deleteChatAction(formData: FormData) {
    const id = formData.get("id") as string;

    const deletedChat = await deleteChatById({
        id,
    });
    if (deletedChat.count > 0) {
        revalidatePath("/", "layout");
        return {
            success: true,
            message: "Chat deleted successfully",
        };
    } else {
        return {
            success: false,
            error: "Chat not found",
        };
    }
}
