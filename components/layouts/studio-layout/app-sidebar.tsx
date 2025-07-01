import Logo from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Link from "next/link"
import { sidebarItems } from "./constants"
import MenuItemButton from "./menu-item"

export async function AppSidebar() {
  return (
    <Sidebar className="border-none overflow-hidden overflow-y-auto">
      <div className="flex flex-col flex-1 justify-between bg-neutral-100 dark:bg-neutral-950">
        <SidebarHeader className="sticky top-0 bg-neutral-100 dark:bg-neutral-950 z-20">
          <div className="flex p-2">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <MenuItemButton href={item.href}>
                    <Link href={item.href} className="flex flex-1 items-center gap-2">
                      <item.icon size={16} />
                      <span>{item.name}</span>
                    </Link>
                  </MenuItemButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  )
}
