"use client";

import { createContext, useState } from "react";

export const SidebarContext = createContext<{
    isExpanded: number;
    setIsExpanded: (value: number) => void;
    toggleExpanded: () => void;
}>({
    isExpanded: 0,
    setIsExpanded: () => { },
    toggleExpanded: () => { },
});

export default function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState<number>(0);

    const toggleExpanded = () => {
        setIsExpanded(isExpanded == 0 ? 1 : 0);
    };

    return (
        <SidebarContext.Provider value={{ isExpanded, setIsExpanded, toggleExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
}