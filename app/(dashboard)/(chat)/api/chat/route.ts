import { generateTitleFromUserMessage } from '@/app/(dashboard)/(chat)/actions';
import { chat_research_prompt } from '@/lib/ai/prompts';
import { createDocumentTool, webSearchTool } from '@/lib/ai/tools';
import { isProductionEnvironment } from '@/lib/constants';
import { getMessagesByChatId, saveChat, saveMessages } from '@/lib/db/queries';
import { google } from '@ai-sdk/google';
import { appendResponseMessages, createDataStreamResponse, smoothStream, streamText } from 'ai';
import { isEmpty } from 'lodash';
import { revalidatePath } from 'next/cache';
import { v4 as uuid } from 'uuid';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const {
      messages: msgs,
      chatId,
      model,
    } = await req.json();

    // get messages from db.
    const messages = await getMessagesByChatId({
      id: chatId,
    });
    const message = msgs[msgs.length - 1];

    if (isEmpty(messages)) {
      const title = await generateTitleFromUserMessage(message.content);

      // create chat.
      await saveChat({
        id: chatId,
        title: title,
      });
    }

    if (!isEmpty(message) && messages[messages.length - 1]?.role !== "user") {
      // save users message to db.
      await saveMessages({
        messages: [{
          chatId: chatId,
          id: message.id,
          content: message.content,
          role: 'user',
          parts: message.parts,
          attachments: message.attachments ?? [],
          createdAt: new Date(),
        }]
      });
    }

    const mappedMessages = messages.map((message: any) => {
      return ({
        role: message.role,
        content: message.content,
      })
    });

    const renderSystemPrompt = (model: any) => {
      return chat_research_prompt;
    }

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: google("gemini-2.0-flash"),
          system: renderSystemPrompt(model),
          messages: msgs || mappedMessages,
          maxSteps: 10,
          experimental_transform: smoothStream({ chunking: "word" }),
          tools: {
            createDocumentTool: createDocumentTool({
              dataStream,
              chatId,
            }),
            webSearchTool
          },
          onFinish: async (result) => {
            const uid = uuid();
            const [, assistantMessage] = appendResponseMessages({
              messages: [message],
              responseMessages: result.response.messages,
            });

            // save message to db.
            await saveMessages({
              messages: [{
                chatId: chatId,
                id: uid,
                role: "assistant",
                content: assistantMessage.content,
                parts: assistantMessage.parts,
                attachments: assistantMessage.experimental_attachments ?? [],
                createdAt: new Date(),
              }]
            });

            revalidatePath("/", "layout");
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text"
          }
        });

        result.consumeStream();
        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
          sendSources: true,
        });
      },
      onError: (error: any) => {
        console.error(error);
        return 'Oops! Something went wrong.';
      }
    });
  } catch (error) {
    console.error(error);
    return new Response('An error occurred while processing your request!', {
      status: 404,
    });
  }
}
