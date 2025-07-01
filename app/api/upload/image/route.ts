import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS as string,
    secretAccessKey: process.env.AWS_SECRET as string,
  },
});

async function uploadImageToS3(file: Buffer, fileName: string): Promise<any> {
  const resizedImageBuffer = await sharp(file)
    .resize(500, 500) // Specify your desired width or height for resizing
    .png()
    .toBuffer();

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: fileName,
    Body: resizedImageBuffer,
    ContentType: "image/png", // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  const fileUrl = `${process.env.CLOUDFRONT_URL}${fileName}`;

  return {
    fileUrl,
    fileName,
    data,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { fileName, fileUrl } = await uploadImageToS3(
      buffer,
      uuid() + ".png"
    );

    return NextResponse.json({
      success: true,
      fileName,
      fileUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
