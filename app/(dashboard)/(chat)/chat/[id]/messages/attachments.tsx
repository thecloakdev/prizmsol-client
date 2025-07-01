import { UIMessage } from "ai";
import FileAttachment from "./file-attachment";

export default function FileAttachments({
    toolInvocations
}: {
    toolInvocations: UIMessage["parts"];
}) {
    const renderList = () => {
        return toolInvocations.map((toolInvocation) => {
            if (toolInvocation.type == "tool-invocation") {
                return toolInvocation.toolInvocation.args.files?.map((file: any, index: number) => {
                    return (
                        <FileAttachment
                            key={index}
                            title={file.path}
                            isGenerating={toolInvocation.toolInvocation.state != "result"}
                        />
                    );
                });
            }
        });
    }
    return toolInvocations.length > 0 && (
        <div className="flex flex-col gap-2.5 mt-5">
            <span className="text-sm font-semibold">Generated Files:</span>
            <div className="flex flex-wrap gap-2.5 justify-start items-start">
                {renderList()}
            </div>
        </div>
    );
}