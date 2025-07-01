import LogoIcon from "@/components/logoIcon";

export default function ChatLoading() {
    return (
        <div className="flex flex-col flex-1 gap-2.5 justify-center items-center">
            <LogoIcon className="w-12 h-12 grayscale animate-pulse" />
            <span className="text-sm text-center">Loading Chat...</span>
        </div>
    );
}
