"use client";
import Artifact, { ArtifactData } from "@/components/artifact";
import PromptInput from "@/components/prompt-input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useArtifact } from "@/hooks/use-artifact";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Message } from "ai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Messages from "./messages";
import SidebarTitle from "./sidebar-title";

export default function Chat({
    messages: msgs,
    project,
    messagesCount
}: {
    messages: Array<Message>;
    project: any;
    messagesCount: number;
}) {
    const router = useRouter();
    const { setArtifact, artifact } = useArtifact();
    const [model, setModel] = useState("gemini");
    const [initialArtifact, setInitialArtifact] = useState<Array<ArtifactData>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { isExpanded } = useSidebar();

    const {
        messages,
        handleSubmit,
        input,
        setInput,
        status,
        reload,
    } = useChat({
        id: project.id,
        initialMessages: msgs as any,
        experimental_throttle: 150, // fixes the repeated component update issue
        body: {
            chatId: project.id,
            model: model,
        },
        onFinish: () => {
            getArtifactData();
        }
    });

    const getArtifactData = async () => {
        const req = await fetch(`/api/documents/${project.id}`)
        const { documents } = await req.json() as { success: boolean; documents: Array<ArtifactData> };
        setInitialArtifact(documents);
        setIsLoading(false);
        setArtifact({
            ...artifact,
            title: documents[documents.length - 1]?.title,
            content: documents[documents.length - 1]?.content,
            kind: documents[documents.length - 1]?.type,
            images: documents[documents.length - 1]?.images || [],
            documentId: documents[documents.length - 1]?.id,
            isVisible: documents.length > 0
        });
    }

    useEffect(() => {
        getArtifactData();

        return () => {
            setArtifact({
                ...artifact,
                isVisible: false,
            });
        }
    }, []);

    useEffect(() => {
        if (messages[messages.length - 1]?.role === "user" && status === "ready") {
            reload();
            getArtifactData();
        }
    }, [messages]);

    const handleModelChange = (value: string) => {
        setModel(value);
    }

    return (
        <div className={cn("flex flex-col flex-1 w-full max-w-[calc(100vw-70px)] lg:max-w-[calc(100vw-225px)]", {
            "max-w-[calc(100vw-50px)] lg:max-w-[calc(100vw-225px)]": isExpanded,
            "max-w-[calc(100vw-60px)] lg:max-w-[calc(100vw-60px)]": !isExpanded,
        })}>
            <ResizablePanelGroup
                direction="horizontal"
                className="group flex flex-1 overflow-hidden"
            >
                <ResizablePanel defaultSize={20} minSize={20} className="flex flex-col min-w-[300px]">
                    <div
                        className="flex flex-1 relative flex-col w-full overflow-hidden"
                    >
                        <SidebarTitle
                            project={project}
                            numberOfMessages={messages.length}
                        />
                        <div className="flex flex-col mx-auto w-full">
                            <Messages
                                messages={messages}
                                artifactData={initialArtifact}
                                status={status}
                                isLoading={isLoading}
                                isToolbarOpen={artifact.isVisible}
                            />
                        </div>
                        <div
                            className="flex justify-center items-center absolute bottom-0 px-4 w-full bg-transparent dark:bg-transparent z-20 min-h-[135px] flex-col pb-2.5"
                        >
                            <PromptInput
                                showPills={false}
                                placeholder="Ask a follow up..."
                                className="max-h-[500px]"
                                input={input}
                                handleInputChange={setInput}
                                onSubmit={handleSubmit}
                                onModelChange={handleModelChange}
                                clearOnSubmit={true}
                                projectId={project.id}
                                messagesCount={messagesCount}
                            />
                            <span className="text-xs text-neutral-500 text-center mt-1">Prizmsol can make mistakes. Please double check responses.</span>
                        </div>
                    </div>
                </ResizablePanel>
                {artifact.isVisible && <ResizableHandle className="h-full transition-all w-[2px] bg-transparent dark:bg-transparent hover:bg-blue-500 active:bg-blue-500 dark:hover:bg-blue-500 dark:active:bg-blue-500 cursor-col-resize" />}
                <Artifact
                    artifactData={initialArtifact as ArtifactData[]}
                    status={status}
                    isLoading={isLoading}
                />
            </ResizablePanelGroup>
        </div>
    );
}
