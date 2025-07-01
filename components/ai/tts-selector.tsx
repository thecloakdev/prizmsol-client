"use client";
import { Button } from "@/components/ui/button";
import { PlayCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type TTSSelectorProps = {
    text: string;
}

export default function TTSSelector({ text }: TTSSelectorProps) {
    const router = useRouter();
    const handleTextToSpeech = async () => {
        console.log(text);
        // create a text to speech session and redirect to the session page.
        // const session = await createTextToSpeechSession(text);
        // router.push(`/tts/${session.id}`);

    }

    return (
        <div className="flex gap-4 w-full">
            <Button variant="outline" className="w-full" onClick={handleTextToSpeech}>
                <PlayCircleIcon className="w-4 h-4" />
                <span className="text-sm">Convert Text to Speech</span>
            </Button>
        </div>
    );
}