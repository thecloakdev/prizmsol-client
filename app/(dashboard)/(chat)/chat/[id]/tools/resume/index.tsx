import AIEditor from "@/components/ai-editor";

export default function ResumeArtifact({
    contents
}: {
    contents: string;
}) {
    // tiptap
    return (
        <AIEditor defaultValue={contents} />
    );
}