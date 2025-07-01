import { Markdown } from "@/components/markdown";
import useTypewriter from "@/hooks/useTypewriter";

export default function MessageTyping({
    text
}: {
    text: string;
}) {
    const displayText = useTypewriter(text, 2);

    return (
        <Markdown>
            {displayText}
        </Markdown>
    );
}