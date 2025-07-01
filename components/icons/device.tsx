"use client";
import { cn } from "@/lib/utils";
import * as React from "react"
const DeviceIcon = ({className, ...props}: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={16}
        height={16}
        strokeLinejoin="round"
        data-testid="geist-icon"
        {...props}
    >
        <path
            className={cn("fill-black dark:fill-white", className)}
            d="M1 3.25A3.25 3.25 0 0 1 4.25 0h7.5A3.25 3.25 0 0 1 15 3.25V16H1V3.25ZM4.25 1.5A1.75 1.75 0 0 0 2.5 3.25V14.5h11V3.25a1.75 1.75 0 0 0-1.75-1.75h-7.5ZM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H4V4Zm5 9h3v-1.5H9V13Z"
            clipRule="evenodd"
        />
    </svg>
)
export default DeviceIcon;
