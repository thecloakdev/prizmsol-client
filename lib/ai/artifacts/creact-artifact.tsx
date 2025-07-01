import { UIArtifact } from '@/components/artifact';
import { DataStreamDelta } from '@/components/data-stream-handler';
import { UseChatHelpers } from '@ai-sdk/react';
import { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react';

export type ArtifactActionContext = {
    content: string;
    handleVersionChange: (type: 'next' | 'prev' | 'toggle' | 'latest') => void;
    currentVersionIndex: number;
    isCurrentVersion: boolean;
};

export type ArtifactToolbarContext = {
    appendMessage: UseChatHelpers['append'];
};

export type ArtifactToolbarItem = {
    description: string;
    icon: ReactNode;
    onClick: (context: ArtifactToolbarContext) => void;
};

type ArtifactConfig<T extends string, M = any> = {
    kind: T;
    description: string;
    content: ComponentType<M>;
    onStreamPart: (args: {
        setArtifact: Dispatch<SetStateAction<UIArtifact>>;
        streamPart: DataStreamDelta;
    }) => void;
};

export class Artifact<T extends string, M = any> {
    readonly kind: T;
    readonly description: string;
    readonly content: ComponentType<M>;
    readonly onStreamPart: (args: {
        setArtifact: Dispatch<SetStateAction<UIArtifact>>;
        streamPart: DataStreamDelta;
    }) => void;

    constructor(config: ArtifactConfig<T, M>) {
        this.kind = config.kind;
        this.description = config.description;
        this.content = config.content;
        this.onStreamPart = config.onStreamPart;
    }
}
