import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default async function StudioLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col flex-1">
            <SidebarProvider className="z-40">
                <AppSidebar />
                <main className="flex flex-col flex-1 bg-neutral-100 dark:bg-neutral-950 justify-center gap-2 p-2.5">
                    <div className="flex flex-col flex-1 relative w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">
                        <SidebarTrigger className="absolute top-1 left-1" />
                        <div className="flex flex-col flex-1 w-full pl-5">
                            {children}
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}
