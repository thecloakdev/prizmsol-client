import {Banknote, BarChart2, FileText, HardDrive, Layers, LayoutDashboard, PcCase, Users, Video } from "lucide-react"

export const sidebarItems = [
    {
      name: "Studio",
      icon: LayoutDashboard,
      href: "/studio",
    },
    {
      name: "Video Manager",
      icon: Video,
      href: "/studio/video-manager",
    },
    {
      name: "Community",
      icon: Users,
      href: "/studio/community",
    },
    {
      name: "Analytics",
      icon: BarChart2,
      href: "/studio/analytics",
    },
    {
      name: "Content",
      icon: PcCase,
      href: "/studio/content",
    },
    {
      name: "Earnings",
      icon: Banknote,
      href: "/studio/earnings",
    },
    {
      name: "Storage",
      icon: HardDrive,
      href: "/studio/storage",
    },
  ]