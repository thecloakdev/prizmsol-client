import { ArtifactKind } from '@/components/artifact';
import { createDocumentHandler } from '@/lib/ai/artifacts/server';
import { code_prompt } from '@/lib/ai/prompts';
import { google } from '@ai-sdk/google';
import { smoothStream, streamText } from 'ai';

export const codeDocumentHandler = createDocumentHandler<ArtifactKind>({
    kind: 'code',
    onCreateDocument: async ({ prompt, dataStream }) => {
        let draftContent = '';
        // stream data to artifact.
        const result = streamText({
            model: google("gemini-2.0-flash", {
                useSearchGrounding: true,
            }),
            system: code_prompt,
            prompt: prompt,
            experimental_transform: smoothStream({ chunking: 'word' }),
        });

        const { fullStream } = result;

        for await (const delta of fullStream) {
            const { type } = delta;

            if (type === 'text-delta') {
                const { textDelta } = delta;

                draftContent += textDelta;

                dataStream.writeData({
                    type: 'text-delta',
                    content: textDelta,
                });
            }
        }

        return draftContent;
    }
})