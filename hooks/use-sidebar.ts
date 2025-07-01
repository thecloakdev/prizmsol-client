"use client";
import { SidebarContext } from "@/providers/sidebar-provider";
import { useContext } from "react";

export function useSidebar() {
    const sidebarContext = useContext(SidebarContext);
    return sidebarContext;
}
