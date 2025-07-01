import { KeyRoundIcon } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import { MainMenu } from "./navigation/main-menu";
import { MobileMenu } from "./navigation/mobile-menu";
import { Button } from "./ui/button";

export default async function Header() {
    const renderStateLinks = () => {
        return (
            <>
                <li>
                    <Button variant="secondary" asChild>
                        <Link href={`/login`} className="hidden h-8 lg:flex text-sm font-semibold border border-neutral-200 dark:border-neutral-800 shadow-xs rounded-md px-2 py-1">
                            <span>Login</span>
                            <KeyRoundIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button asChild>
                        <Link href={`/signup`} className="hidden h-8 lg:flex text-sm font-semibold">
                            Sign up
                        </Link>
                    </Button>
                </li>
            </>
        );
    };
    return (
        <div className="flex sticky top-0 w-full mx-auto items-center justify-center z-50">
            <div className="flex bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-md w-full max-w-7xl justify-between px-6 py-2">
                <div className="flex gap-5 items-center">
                    <Link
                        href={`/`}
                        className="active:opacity-75"
                        title="PrizmSol Logo"
                    >
                        <Logo />
                    </Link>
                    <MainMenu className="hidden lg:flex ml-10" />
                </div>
                <div className="flex gap-10">
                    <ul className="flex gap-4 lg:gap-5 items-center justify-center ml-2.5">
                        {renderStateLinks()}
                        <li className="flex lg:hidden">
                            <MobileMenu />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

