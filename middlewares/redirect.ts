import { getValidSubdomain } from "@/lib/subdomain";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/; // Files

export default function RedirectMiddleware(req: NextRequest) {
    // Clone the URL
    const url = req.nextUrl.clone();

    // Skip public files
    if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next"))
        return;

    const host = req.headers.get("host") as string;
    const subdomain = getValidSubdomain(host);
    if (subdomain && subdomain !== "www" && subdomain !== "prizmsol") {
        url.pathname = `/site/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }
}