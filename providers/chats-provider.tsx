"use client";

import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext<{
    chats: Array<any>;
    hasMore: boolean;
    loading: boolean;
    newLoading: boolean;
    hasNew: boolean;
    refreshChats: () => void;
    fetchMoreChats: () => void;
    setChatLimit: (newLimit: number) => void;
    fetchNewChat: () => void;
}>({
    chats: [],
    hasMore: true,
    loading: true,
    newLoading: false,
    hasNew: false,
    fetchMoreChats: () => { },
    refreshChats: () => { },
    setChatLimit: () => { },
    fetchNewChat: () => { },
});

export default function ChatsProvider({ children }: { children: React.ReactNode }) {
    const [chats, setChats] = useState<Array<any>>([]);
    const [limit, setLimit] = useState(10);
    const [more, setMore] = useState(true);
    const [newChat, setNewChat] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newLoading, setNewLoading] = useState(false);

    const refreshChats = async () => {
        const result = await fetch(`/api/chats?limit=${limit}`, {
            cache: "no-store",
            next: {
                revalidate: 0,
            }
        }).then((res) => res.json());
        const { chats: items, hasMore } = result;
        setChats(items);
        setMore(hasMore);
        setLoading(false);
    }

    const fetchNewChat = async () => {
        await refreshChats();
        setNewChat(true);
    }

    useEffect(() => {
        refreshChats();
    }, []);

    const fetchMoreChats = async () => {
        setNewLoading(true);
        const cursor = chats.length > 0 ? chats[chats.length - 1].id : null;
        const url = cursor ? `/api/chats?limit=${limit}&cursor=${cursor}` : `/api/chats?limit=${limit}`;
        const result = await fetch(url).then((res) => res.json());
        const { chats: items, hasMore } = result;
        setChats((prev: Array<any>) => [...prev, ...items]);
        setMore(hasMore);
        setLimit((prev) => prev + 10);
        setNewLoading(false);
    }

    const setChatLimit = (newLimit: number) => {
        setLimit(newLimit);
    }

    return (
        <ChatContext.Provider value={{
            chats,
            hasMore: more,
            loading,
            newLoading,
            hasNew: newChat,
            refreshChats,
            fetchMoreChats,
            setChatLimit,
            fetchNewChat,
        }}>
            {children}
        </ChatContext.Provider>
    );
}