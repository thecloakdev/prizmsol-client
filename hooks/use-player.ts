"use client";
import { PlayerContext } from "@/providers/player-provider";
import { useContext  } from "react";

export function usePlayer() {
    const playerContext = useContext(PlayerContext);
    return playerContext;
}
