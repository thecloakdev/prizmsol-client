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
    .resize(160, 160) // Specify your desired width or height for resizing
    .toBuffer();

  const name = `${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: name,
    Body: resizedImageBuffer,
    ContentType: "image/jpeg", // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);

  return {
    fileName: `${Date.now()}-${fileName}`,
    url: `${process.env.CLOUDFRONT_URL}${name}`,
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

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const { fileName, url } = await uploadImageToS3(
      buffer,
      uuid() + "." + fileExtension
    );

    return NextResponse.json({
      success: true,
      fileName,
      url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
