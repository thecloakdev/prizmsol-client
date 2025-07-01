import { getDocumentsByChatId } from "@/lib/db/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const documents = await getDocumentsByChatId({ chatId: id })
        if (documents.length > 0) {
            return NextResponse.json({
                success: true,
                documents
            });
        } else {
            return NextResponse.json({
                success: false,
                documents: []
            });
        }
    } catch (error: any) {
        console.log("Error: ", error);
    }
}