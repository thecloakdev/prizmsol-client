export default function CodeArtifact({
    content,
}: {
    content: string;
}) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-col flex-1">
                <span>{content}</span>
            </div>
        </div>
    );
}