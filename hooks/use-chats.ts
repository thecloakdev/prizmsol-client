"use client";
import { ChatContext } from "@/providers/chats-provider";
import { useContext } from "react";

export function useChats() {
    const chatsContext = useContext(ChatContext);
    return chatsContext;
}
