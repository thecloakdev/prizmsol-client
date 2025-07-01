'use client';

import { useArtifact } from '@/hooks/use-artifact';
import { initialArtifactState } from '@/providers/artifact-provider';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { artifactDefinitions, ArtifactKind } from './artifact';

export type DataStreamDelta = {
    type:
    | 'text-delta'
    | 'sheet-delta'
    | 'image-delta'
    | 'images'
    | 'images-loading'
    | 'title'
    | 'id'
    | 'suggestion'
    | 'clear'
    | 'finish'
    | 'kind';
    content: string;
};

export function DataStreamHandler({ id }: { id: string }) {
    const { data: dataStream } = useChat({ id });
    const { artifact, setArtifact } = useArtifact();
    const lastProcessedIndex = useRef(-1);

    useEffect(() => {
        if (!dataStream?.length) return;

        const newDeltas = dataStream.slice(lastProcessedIndex.current + 1);
        lastProcessedIndex.current = dataStream.length - 1;

        (newDeltas as DataStreamDelta[]).forEach((delta: DataStreamDelta) => {
            const artifactDefinition = artifactDefinitions.find(
                (artifactDefinition) => artifactDefinition.kind === artifact.kind,
            );

            if (artifactDefinition?.onStreamPart) {
                artifactDefinition.onStreamPart({
                    streamPart: delta,
                    setArtifact,
                });
            }

            setArtifact((draftArtifact: any) => {
                if (!draftArtifact) {
                    return { ...initialArtifactState, imageLoading: true, status: 'streaming' };
                }

                switch (delta.type) {
                    case 'id':
                        return {
                            ...draftArtifact,
                            documentId: delta.content as string,
                            status: 'streaming',
                        };

                    case 'title':
                        return {
                            ...draftArtifact,
                            title: delta.content as string,
                            status: 'streaming',
                        };

                    case 'images-loading':
                        return {
                            ...draftArtifact,
                            imageLoading: true,
                            images: [],
                            status: 'streaming',
                        };

                    case 'images':
                        return {
                            ...draftArtifact,
                            images: delta.content || draftArtifact.images || [],
                            imageLoading: false,
                            status: 'streaming',
                        };

                    case 'kind':
                        return {
                            ...draftArtifact,
                            kind: delta.content as ArtifactKind,
                            status: 'streaming',
                        };

                    case 'clear':
                        return {
                            ...draftArtifact,
                            content: '',
                            status: 'streaming',
                        };

                    case 'finish':
                        return {
                            ...draftArtifact,
                            status: 'idle',
                        };

                    default:
                        return draftArtifact;
                }
            });
        });
    }, [dataStream, setArtifact, artifact]);

    return null;
}
