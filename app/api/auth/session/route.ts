import { NextRequest, NextResponse, userAgent } from "next/server";
import { userInfo } from "os";
import dns from 'dns';

export async function GET(request: NextRequest) {
    const ip_address = request.headers.get('X-Forwarded-For');
    const device = userAgent(request)
    const info = userInfo();
    dns.resolveCname("www.theprizmsol.com", (_err, addresses) => console.log("addresses: %j", addresses))
    return NextResponse.json({
        ip_address,
        device,
        info
    });
}

