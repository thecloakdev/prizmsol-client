import Link from "next/link";
import LogoIcon from "./logoIcon";
export default async function AppHeader({ centered }: { centered?: boolean }) {
    const style = centered ? "w-full max-w-7xl" : "w-full";
    return (
        <header className="flex bg-neutral-100 dark:bg-neutral-950 backdrop-blur-md justify-center items-center w-full z-40">
            <div className={`flex flex-1 justify-between min-h-[60px] ${style} px-3.5 py-2`}>
                <div className="flex gap-2.5 items-center">
                    <Link href="/" className="flex gap-2.5 justify-center items-center">
                        <LogoIcon />
                        <div className="flex gap-2.5 items-center">
                            <h4 className="text-xl font-semibold">Prizmsol</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

