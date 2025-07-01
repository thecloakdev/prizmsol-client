import {
    BookmarkIcon,
    CreditCardIcon,
    KeyRoundIcon,
    LayersIcon,
    MessageCircleIcon,
    PlusIcon
} from "lucide-react";

export const appMenuItems = [
    {
        name: "New Chat",
        icon: PlusIcon,
        href: "/",
        newChat: true,
    },
    {
        name: "Collections",
        icon: BookmarkIcon,
        href: "/collections"
    },
    {
        name: "Chats",
        icon: MessageCircleIcon,
        href: "/recents",
    }
]

export const loggedOutMenuItems = [
    {
        name: "New Chat",
        icon: PlusIcon,
        href: "/",
        variant: "outline",
        newChat: true,
    },
    {
        name: "Home",
        icon: LayersIcon,
        href: "/",
    },
    {
        name: "Pricing",
        icon: CreditCardIcon,
        href: "/pricing",
    },
    {
        name: "Login",
        icon: KeyRoundIcon,
        href: "/login",
    }
]
