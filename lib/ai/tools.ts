import { google } from "@ai-sdk/google";
import { tool as createTool, DataStreamWriter, generateText } from "ai";
import { v4 as uuid } from 'uuid';
import { z } from "zod";
import { documentHandlersByArtifactKind } from "./artifacts/server";
import { websearch_prompt } from "./prompts";

export const createDocumentTool = ({ dataStream, chatId }: {
    dataStream: DataStreamWriter;
    chatId: string;
}) => createTool({
    description: "Creates a document based on a prompt",
    parameters: z.object({
        kind: z.string().describe("The kind of document to create. Options: text, code, images"),
        title: z.string().describe("The title of the document. Include an emoji at the beginning. Maximum 25 characters"),
        prompt: z.string().describe("The precise prompt to use for generating a document"),
        imageQuery: z.string().describe("The query to use for searching an image, if applicable"),
        sources: z.array(z.object({
            title: z.string().describe("The title of the source"),
            url: z.string().describe("The url of the source"),
        })).optional().describe("The sources uses in generating the document"),
    }),
    execute: async ({ prompt, kind, title, imageQuery }) => {
        const id = uuid();

        dataStream.writeData({
            type: 'title',
            content: title
        });

        dataStream.writeData({
            type: 'prompt',
            content: prompt
        });

        dataStream.writeData({
            type: 'kind',
            content: kind
        });

        dataStream.writeData({
            type: 'clear',
            content: ''
        });

        // stream data to artifact.
        const documentHandler = documentHandlersByArtifactKind.find(
            (documentHandlerByArtifactKind) =>
                documentHandlerByArtifactKind.kind === kind,
        );

        if (!documentHandler) {
            throw new Error(`No document handler found for kind: ${kind}`);
        }

        await documentHandler.onCreateDocument({
            id,
            chatId: chatId,
            title: title,
            prompt: prompt,
            session: "0",
            dataStream: dataStream,
        });

        // end
        dataStream.writeData({
            type: 'finish',
            content: ''
        });


        return {
            id,
            kind: kind,
            title: title,
            prompt: prompt,
            content: "A document was been created and is now visible to the user.",
        };
    }
});

export const imageTool = createTool({
    description: "Create an image based on the prompt",
    parameters: z.object({
        prompt: z.string().describe("The prompt to use for generating an image"),
    }),
    execute: async (params) => {
        const url = process.env.NEXT_PUBLIC_URL as string;
        const imageResp = await fetch(`${url}/api/image`, {
            method: "POST",
            body: JSON.stringify({
                prompt: params.prompt,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const image = await imageResp.json();
        if (!image.success) {
            return {
                error: "Failed to create image",
                content: "An error occurred while creating the image.",
            };
        }

        return {
            prompt: params.prompt,
            content: "An image has been created and is now visible to the user.",
            image: image.image,
        };
    }
});

export const webSearchTool = createTool({
    description: "Search the web for more information. This tool will call other functions that will include the research findings.",
    parameters: z.object({
        prompt: z.string().describe("The optimized prompt to use for generating a web search that will yield the best thorough results")
    }),
    execute: async (params) => {
        const { text, sources } = await generateText({
            model: google("gemini-2.0-flash-001", {
                useSearchGrounding: true,
            }),
            system: websearch_prompt,
            prompt: params.prompt,
        });

        return {
            query: params.prompt,
            text: text,
            sources: sources,
            images: [],
            content: "Search results have been generated and are now visible to the user.",
        };
    }
});

export const tools = {
    createDocumentTool,
    webSearchTool,
};
