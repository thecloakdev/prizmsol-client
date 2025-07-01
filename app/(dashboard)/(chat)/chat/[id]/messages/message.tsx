import { ArtifactData } from "@/components/artifact";
import { Markdown } from "@/components/markdown";
import ProxyImage from "@/components/ProxyImage";
import SimpleTooltip from "@/components/simple-tooltip";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useArtifact } from "@/hooks/use-artifact";
import { cn } from "@/lib/utils";
import { Message as Msg } from "ai";
import { isEmpty } from "lodash";
import { CodeIcon, FileTextIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Message({
    artifactData,
    message,
    isLoading,
    status
}: {
    artifactData: Array<ArtifactData>;
    message: Msg;
    isLoading: boolean;
    status: "streaming" | "ready" | "error" | "submitted";
}) {
    const { setArtifact, artifact } = useArtifact();
    const router = useRouter();

    useEffect(() => {
        if (status === "ready" && message.role === "assistant") {
            router.refresh();
        }
    }, [status]);

    const handleArtifactClick = (documentId: string) => () => {
        const currentArtifact: ArtifactData = artifactData.find(artifact => artifact.id == documentId) as ArtifactData || [];

        setArtifact({
            ...artifact,
            kind: currentArtifact.type,
            documentId: currentArtifact.id,
            title: currentArtifact.title,
            images: currentArtifact.images || [],
            content: currentArtifact.content,
            isVisible: true,
        });
    }

    const printSources = () => {
        return message.role == "assistant" && (
            <div className="flex flex-col flex-1 gap-4 mb-2.5 w-full">
                <div className="flex gap-2 w-full overflow-hidden overflow-x-auto">
                    {message.parts?.map((part, index: number) => {
                        const { type } = part;

                        if (type == "tool-invocation" && part.toolInvocation.toolName == "webSearchTool") {
                            const { state } = part.toolInvocation;
                            if (state == "call") {
                                return (
                                    <div className="flex items-center gap-2.5 w-full" key={index}>
                                        {[...Array(4)].map((_, ind) => (
                                            <div className="flex items-center w-full h-[40px] rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" key={ind}>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }

                            if (state == "result") {
                                const { result } = part.toolInvocation;
                                return result.sources.map((source: any, ind: number) => (
                                    <SimpleTooltip key={ind} text={source.title}>
                                        <Link key={index} href={source.url} target="_blank" rel="noopener noreferrer" className="flex flex-col hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 gap-1 p-2.5 rounded-md">
                                            <div className="flex flex-1 gap-2 items-center">
                                                <GlobeIcon className="h-4 w-4 text-neutral-500" />
                                                <span className="flex-1 text-sm line-clamp-1">{source.title}</span>
                                            </div>
                                        </Link>
                                    </SimpleTooltip>
                                ));
                            }
                        }
                    })}
                </div>
            </div>
        );
    };

    const renderImages = (images: Array<any>, loading: boolean) => {

        if (loading) {
            return (
                <div className='flex gap-2.5 w-full h-[150px]'>
                    {[...Array(5)].map((_, index: number) => (
                        <div key={index} className="flex items-center justify-center bg-neutral-300 dark:bg-neutral-700 h-[150px] w-[150px] rounded-xl animate-pulse">
                        </div>
                    ))}
                </div>
            );
        }


        // get only 5 images.
        return images && images.length > 0 && (
            <div className='flex gap-2.5 w-full h-[150px]'>
                {images.map((image: any, index) => (
                    <div className="flex flex-col border border-neutral-300 dark:border-neutral-800 rounded-xl items-center relative aspect-square h-[150px] w-[150px]" key={index}>
                        <Link href={image.url || image.thumbnail} target="_blank" className="w-full h-full">
                            <ProxyImage
                                key={index}
                                src={image.url || image.thumbnail}
                                fallbackurl={image.thumbnail}
                                alt={image.title || `Image ${index + 1}`}
                                fill
                                unoptimized={true}
                                className="object-cover rounded-xl"
                            />
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    const hasImages = () => {
        let arr = message.parts?.map((part) => {
            if (part.type === "tool-invocation" && part.toolInvocation.toolName == "webSearchTool" && part.toolInvocation.state == "result") {
                console.log("images -> ", part.toolInvocation.result.images);
                return !isEmpty(part.toolInvocation.result.images);
            }
        });
        arr = arr?.filter(value => value !== undefined && value !== false);
        return !isEmpty(arr);
    }

    const printSearchImages = () => {
        return message.role == "assistant" && hasImages() && (
            <div className="flex flex-col sticky top-0 gap-5 w-full h-[200px] bg-gradient-to-b from-neutral-50 from-85% to-transparent dark:from-[#101012] overflow-hidden overflow-x-auto pt-5">
                <div className="flex flex-col">
                    {message.parts?.map((part) => {
                        if (part.type == "tool-invocation") {
                            if (part.toolInvocation.toolName == "webSearchTool") {
                                if (part.toolInvocation.state == "result") {
                                    return renderImages(part.toolInvocation.result.images, false)
                                } else {
                                    return renderImages([], true);
                                }
                            }
                        }
                    })}
                </div>
            </div>
        );
    }

    const printImage = () => {
        return message.parts?.map((part, index: number) => {
            if (part.type == "tool-invocation") {
                const { state, toolName } = part.toolInvocation;
                if (state == "result") {
                    const { result } = part.toolInvocation;
                    if (toolName == "imageTool") {
                        return (
                            <div key={index} className="flex flex-col relative w-[500px] h-[500px] rounded-lg overflow-hidden">
                                <Image
                                    src={result.image}
                                    alt="Generated Image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        );
                    }
                }
            }
        });
    }

    const getInitials = (name: string) => {
        const names = name ? name?.split(" ") : "AA";
        if (names.length > 1) {
            return names[0][0] + names[1][0];
        } else {
            return names[0][0];
        }
    }

    return (
        <div className={cn("flex flex-col", {
            "bg-neutral-200 dark:bg-neutral-800/80 p-3 rounded-lg shadow-xs self-start": message.role == "user",
            "w-full": message.role == "assistant",
        })}>
            <div className="flex gap-3 w-full">
                {message.role == "user" && <div className="flex items-center justify-center w-7 h-7">
                    <Avatar className="flex justify-center items-center bg-neutral-800 dark:bg-neutral-300 h-[32px] w-[32px]">
                        <span className="text-sm font-bold text-neutral-50 dark:text-neutral-800">AA</span>
                    </Avatar>
                </div>}
                <div className="flex flex-col space-y-4 flex-wrap w-full">
                    {printSources()}
                    {printSearchImages()}
                    {message.parts?.map((part, index) => {
                        const { type } = part;
                        if (type == "text") {
                            return (
                                <div key={index} className={"flex flex-col space-y-4 mt-1"}>
                                    <Markdown>{part.text}</Markdown>
                                </div>
                            );
                        }

                        if (type == "tool-invocation") {
                            const { toolName, args, state } = part.toolInvocation;

                            if (state == "call") {
                                if (toolName == "createDocumentTool") {
                                    return (
                                        <div key={index} className="flex items-center gap-2.5">
                                            <div className="flex flex-col items-center h-7 relative overflow-hidden">
                                                <div className="absolute left-0 top-0 z-10 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-neutral-50/80 dark:via-[#101012] to-transparent animate-[shimmer_1.5s_infinite]"></div>
                                                <span className="flex flex-1 text-sm text-neutral-500 dark:text-neutral-400 min-h-[calc(100vh-18px)]">Creating Document...</span>
                                            </div>
                                        </div>
                                    );
                                }

                                if (toolName == "webSearchTool") {
                                    return (
                                        <div key={index} className="flex items-center gap-2.5">
                                            <div className="flex flex-col items-center h-7 relative overflow-hidden">
                                                <div className="absolute left-0 top-0 z-10 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-neutral-50/80 dark:via-[#101012] to-transparent animate-[shimmer_1.5s_infinite]"></div>
                                                <span className="flex flex-1 text-sm text-neutral-500 dark:text-neutral-400 min-h-[calc(100vh-18px)]">Gathering information...</span>
                                            </div>
                                        </div>
                                    );
                                }

                                if (toolName == "imageTool") {
                                    return (
                                        <div key={index} className="flex items-center gap-2.5">
                                            <div className="flex items-center justify-center w-[25px] h-[25px]">
                                                <Loader2Icon className="w-4 h-4 animate-spin text-neutral-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex flex-col h-7 relative mt-1 overflow-hidden">
                                                    <div className="absolute left-0 top-0 z-10 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-neutral-50/80 dark:via-[#101012] to-transparent animate-[shimmer_1.5s_infinite]"></div>
                                                    <span className="text-sm text-neutral-500 dark:text-neutral-400 min-h-[calc(100vh-18px)]">Generating Image...</span>
                                                </div>
                                                <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 w-[500px] h-[500px] rounded-lg p-2.5 mt-2"></div>
                                            </div>
                                        </div>
                                    );
                                }
                            }

                            if (state == "result") {
                                const { result } = part.toolInvocation;
                                if (toolName == "createDocumentTool") {
                                    return isLoading ? (
                                        <div key={index} className="flex h-[36px] w-[250px] rounded-md bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            key={index}
                                            className="h-auto justify-start gap-2.5 self-start mb-2.5"
                                            onClick={handleArtifactClick(result.id)}
                                        >
                                            <div className="mt-0.5 self-start text-sm font-semibold text-muted-foreground">
                                                {args.kind == "code" && <CodeIcon className="h-5 w-5" />}
                                                {args.kind == "text" && <FileTextIcon className="h-5 w-5" />}
                                            </div>
                                            <div className="flex flex-1 self-start flex-col gap-1">
                                                <span className="text-sm text-muted-foreground text-start text-balance  line-clamp-2">
                                                    {artifact.status == "streaming" ? `Creating "${args.title}"` || "Creating document" : `Created "${args.title}"` || "Created document"}
                                                </span>
                                            </div>
                                        </Button>
                                    );
                                }
                                { printImage() }
                            }
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
