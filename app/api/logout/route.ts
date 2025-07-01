import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    (await cookies()).delete("authorization");
    (await cookies()).delete("isLoggedIn");
    return NextResponse.json({ message: "Logged out", success: true });
}
