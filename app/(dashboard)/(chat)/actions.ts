'use server';

import { title_prompt } from "@/lib/ai/prompts";
import { addToCollection, saveChat, saveMessages } from "@/lib/db/queries";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { v4 as uuid } from "uuid";

export async function generateTitleFromUserMessage(message: string) {
    const { text: title } = await generateText({
        model: google("gemini-2.0-flash-001"),
        system: title_prompt,
        prompt: message,
    });

    return title;
}

export async function submitMessage(formData: FormData) {
    const content = formData.get("prompt") as string;
    const collection = formData.get("collection") as string;
    const id = uuid();
    const mid = uuid();

    const title = await generateTitleFromUserMessage(content);

    const chat = await saveChat({
        id,
        title: title,
    });

    if (chat.count == 0) {
        return {
            error: "Chat not created",
        };
    }

    const message = await saveMessages({
        messages: [
            {
                chatId: id,
                id: mid,
                content,
                role: "user",
                parts: [{
                    type: "text",
                    text: content,
                }],
                attachments: [],
                createdAt: new Date(),
            },
        ],
    });

    if (message.count == 0) {
        return {
            error: "Message not created",
        };
    }

    // @TODO: save into collection
    if (collection !== "0") {
        const collResult = await addToCollection({
            collectionId: collection,
            chatId: id
        });

        if (collResult.count == 0) {
            console.warn("Error when saving to collection");
        }
    }


    return {
        success: true,
        message: "Message created successfully",
        data: {
            id: mid,
            content,
            role: "user",
            parts: [{
                type: "text",
                text: content,
            }],
            attachments: [],
            createdAt: new Date(),
        },
        chatId: id,
    };
}
