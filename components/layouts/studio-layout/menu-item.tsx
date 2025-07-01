"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function MenuItemButton({ children, href }: { children: React.ReactNode, href: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <SidebarMenuButton isActive={isActive} className="hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-transparent data-[active=true]:bg-blue-100 dark:data-[active=true]:bg-blue-800/30 data-[active=true]:border-blue-200 dark:data-[active=true]:border-blue-800/30 data-[active=true]:text-blue-700 dark:data-[active=true]:text-blue-400" asChild>
            {children}
        </SidebarMenuButton>
    );
}