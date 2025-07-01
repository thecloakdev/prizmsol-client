// use shortcut to navigate hook for keyboard shortcuts

import { useEffect } from "react";

export default function useShortcut(key: string, callback: () => void) {
    useEffect(() => {

        // if focused on input or textarea, don't trigger shortcut

        const handleKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
                return;
            }
            if (event.key === key) {
                callback();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [key, callback]);
}
