"use client";
import { UIArtifact } from "@/components/artifact";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const initialArtifactState: UIArtifact = {
    title: "",
    documentId: "",
    kind: "text",
    content: "",
    isVisible: false,
    status: "idle",
    images: [],
    imageLoading: false
};

export const ArtifactContext = createContext<{
    artifact: UIArtifact;
    setArtifact: Dispatch<SetStateAction<UIArtifact>>
}>({
    artifact: initialArtifactState,
    setArtifact: null as unknown as Dispatch<SetStateAction<UIArtifact>>,
});

export default function ArtifactProvider({ children }: { children: React.ReactNode }) {

    const [artifactState, setArtifactState] = useState<UIArtifact>(initialArtifactState);

    const value = {
        artifact: artifactState,
        setArtifact: setArtifactState,
    }

    return (
        <ArtifactContext.Provider value={value}>
            {children}
        </ArtifactContext.Provider>
    );
}
