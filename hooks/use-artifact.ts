"use client";
import { UIArtifact } from "@/components/artifact";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

export const initialArtifactData: UIArtifact = {
    title: "",
    documentId: "",
    kind: "text",
    content: "",
    imageLoading: false,
    images: [],
    isVisible: false,
    status: "idle",
};

export function useArtifact() {
    const { data: localArtifact, mutate: setLocalArtifact } = useSWR<UIArtifact>('artifact', null, {
        fallbackData: initialArtifactData,
    });

    const artifact = useMemo(() => {
        if (!localArtifact) return initialArtifactData;
        return localArtifact;
    }, [localArtifact]);

    const setArtifact = useCallback(
        (updaterFn: UIArtifact | ((currentArtifact: UIArtifact) => UIArtifact)) => {
            setLocalArtifact((currentArtifact) => {
                const artifactToUpdate = currentArtifact || initialArtifactData;

                if (typeof updaterFn === 'function') {
                    return updaterFn(artifactToUpdate);
                }

                return updaterFn;
            });
        },
        [setLocalArtifact],
    );

    return useMemo(
        () => ({
            artifact,
            setArtifact,
        }),
        [artifact, setArtifact],
    );
}
