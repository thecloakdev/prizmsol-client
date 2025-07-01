"use server";

import { deleteCollection, updateCollectionDataById } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

export async function deleteCollectionAction(formData: FormData) {
    const id = formData.get("id") as string;

    const deletedChat = await deleteCollection({
        id,
    });
    if (deletedChat.count > 0) {
        revalidatePath("/", "layout");
        return {
            success: true,
            message: "Collection deleted successfully",
        };
    } else {
        return {
            success: false,
            error: "Collection not found",
        };
    }
}

export async function editCollection(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const chat = await updateCollectionDataById({
        id: id,
        name,
        description
    });
    if (chat.count == 0) {
        return {
            error: "Collection not found",
        };
    }
    return {
        success: true,
        message: "Collection updated successfully",
    }
}
