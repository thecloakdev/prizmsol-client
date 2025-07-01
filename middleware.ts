import { NextRequest, NextResponse } from 'next/server';
import { getValidSubdomain } from './lib/subdomain';

const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(request: NextRequest) {
    // Clone the URL
    const url = request.nextUrl.clone();

    // Skip public files
    if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next"))
        return;

    const host = request.headers.get("host") as string;
    const subdomain = getValidSubdomain(host);
    if (subdomain && subdomain !== "www" && subdomain !== "prizmsol") {
        url.pathname = `/site/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.rewrite(url);
}
