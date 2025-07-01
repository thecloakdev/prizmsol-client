"use client";
import { createContext, useState } from "react";

interface UpdatePlayerArgs {
    src?: string,
    track?: string,
    author?: string,
    stickToBottom?: boolean,
    visible?: boolean
}

export const PlayerContext = createContext<{
    src: string;
    track: string;
    author: string;
    stickToBottom: boolean;
    visible: boolean;
    updatePlayer: (args: UpdatePlayerArgs) => void;
}>({
    src: "",
    track: "",
    author: "",
    visible: false,
    stickToBottom: false,
    updatePlayer: () => { },
});

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [src, setSrc] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [track, setTrack] = useState<string>("");
    const [stickToBottom, setStickToBottom] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const updatePlayer = ({
        src,
        track,
        author,
        stickToBottom,
        visible,
    }: UpdatePlayerArgs) => {
        setSrc(src || "");
        setTrack(track || "");
        setAuthor(author || "");
        setStickToBottom(stickToBottom || false);
        setVisible(visible || false);
    }



    return (
        <PlayerContext.Provider value={{ src, track, author, updatePlayer, stickToBottom, visible }}>
            {children}
        </PlayerContext.Provider>
    );
}
