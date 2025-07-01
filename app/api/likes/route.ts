import { GetLike, LikeMessage } from "@/lib/db/queries";
import { isEmpty } from "lodash";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { messageId } = await req.json();

    if (isEmpty(messageId)) {
        return NextResponse.json({
            success: false,
            message: "Message Id not provided."
        }, {
            status: 400
        });
    }

    const result = await LikeMessage({
        messageId
    });

    if (result.count > 0) {
        return NextResponse.json({
            success: true,
            message: "Thanks for the feedback"
        });
    }
    return NextResponse.json({
        success: false,
        message: "Feedback could not be recorded"
    });
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const messageId = searchParams.get("messageId") as string;

    if (isEmpty(messageId)) {
        return NextResponse.json({
            success: false,
            message: "Message Id not provided."
        }, {
            status: 400
        });
    }

    const likes = await GetLike({
        messageId
    });

    if (likes.length > 0) {
        return NextResponse.json({
            success: true,
            like: likes[0]
        });
    } else {
        return NextResponse.json({
            success: true,
            like: null
        });
    }
}