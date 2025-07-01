import { ArtifactData } from "@/components/artifact";
import LogoIcon from "@/components/logoIcon";
import { cn } from "@/lib/utils";
import { Message as Msg } from "ai";
import { memo, useRef } from "react";
import Message from "./message";

function PureMessages({
    artifactData,
    messages,
    status,
    isToolbarOpen = false,
    isLoading,
}: {
    artifactData: Array<ArtifactData>;
    messages: Array<Msg>;
    status: "streaming" | "ready" | "error" | "submitted";
    isToolbarOpen: boolean;
    isLoading: boolean;
}) {
    const chatContainerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <div
                ref={chatContainerRef}
                className={cn(
                    "flex flex-col justify-start items-center mx-auto px-5 w-full h-full overflow-hidden overflow-y-auto",
                    {
                        "max-h-[calc(100vh-220px)]": !isToolbarOpen,
                        "max-h-[calc(100vh-235px)]": isToolbarOpen,
                    }
                )}
            >
                <div
                    className="flex flex-col relative mx-auto gap-4 mt-5 w-full max-w-3xl h-full"
                >
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            artifactData={artifactData}
                            message={message}
                            isLoading={isLoading}
                            status={status}
                        />
                    ))}
                    {status === "submitted" && messages.length > 0 && messages[messages.length - 1].role === "user" && <ThinkingMessages />}
                </div>
            </div>
        </>
    );
}

function ThinkingMessages() {
    return (
        <div className="flex gap-3">
            <div className="flex items-center justify-center w-7 h-7 ml-1">
                <LogoIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col h-7 relative mt-1.5 overflow-hidden">
                <div className="absolute left-0 top-0 z-10 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-neutral-50/80 dark:via-[#101012] to-transparent animate-[shimmer_1.5s_infinite]"></div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 min-h-[calc(100vh-18px)]">Prizm is thinking...</span>
            </div>
        </div>
    );
}


const Messages = memo(PureMessages, (prevProps, nextProps) => {
    // Prevent re-rendering if the messages and artifactData are the same
    return (
        prevProps.messages === nextProps.messages &&
        prevProps.artifactData === nextProps.artifactData &&
        prevProps.status === nextProps.status &&
        prevProps.isToolbarOpen === nextProps.isToolbarOpen &&
        prevProps.isLoading === nextProps.isLoading
    );
});

export default Messages;