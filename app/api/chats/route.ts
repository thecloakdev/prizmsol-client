import { getChats, getMessagesCountByUserId } from "@/lib/db/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") as string;
    const page = searchParams.get("page") as string;

    // count
    const count = await getMessagesCountByUserId();

    const { chats } = await getChats({
        page: parseInt(page),
        limit: parseInt(limit as string) || 10,
    });
    return NextResponse.json({
        limit,
        chats,
        count,
    }, {
        status: 200
    });
}
