import { getMessagesByChatId } from "@/lib/db/queries";
import isEmpty from "lodash/isEmpty";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const chatId = searchParams.get("chatId") as string;
        if (isEmpty(chatId)) {
            return NextResponse.json({
                success: false,
                message: "chatId not provided"
            }, {
                status: 400
            });
        }
        const messages = await getMessagesByChatId({
            id: chatId,
        });
        if (messages.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Found",
                messages
            });
        } else {
            return NextResponse.json({
                success: true,
                message: "Not found",
                messages: []
            });
        }
    } catch (error: any) {
        console.log("Something went wrong: ", error);
        return NextResponse.json({
            message: "Something went wrong"
        });
    }
}