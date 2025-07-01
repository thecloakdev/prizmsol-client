"use client";
import Amazon from "@/assets/amazon";
import BKLogo from "@/assets/bk";
import Emirates from "@/assets/emirates";
import FordLogo from "@/assets/ford";
import Gucci from "@/assets/gucci";
import KFCLogo from "@/assets/kfc";
import Mozilla from "@/assets/mozilla";
import { useTheme } from "next-themes";
import Marquee from "react-fast-marquee";

export default function CompanyBanner() {
    const { theme } = useTheme();
    const gradient = theme == "dark" ? "#0f172a" : "#f1f5f9";

    return (
        <Marquee pauseOnHover className="flex-1" gradient gradientColor={gradient}>
            <div className="flex items-center justify-between gap-16 px-5">
                <Emirates className="w-24 h-24" />
                <FordLogo className="w-24 h-24  child:fill-black dark:child:fill-white" />
                <Mozilla className="h-24 w-32 child:fill-black dark:child:fill-white" />
                <BKLogo className="h-16 w-16 child:fill-black dark:child:fill-white" />
                <Amazon className="h-16 w-28 child:fill-black dark:child:fill-white" />
                <Gucci className="h-32 w-32 child:fill-black dark:child:fill-white" />
                <KFCLogo className="h-32 w-32 child:fill-black dark:child:fill-white" />
            </div>
        </Marquee>
    );
}
