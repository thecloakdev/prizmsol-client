import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS as string,
    secretAccessKey: process.env.AWS_SECRET as string,
  },
});

async function uploadFileToS3(file: Buffer, fileName: string): Promise<any> {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.VID_BUCKET_NAME as string,
    Key: fileName,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  const fileUrl = `${process.env.CLOUDFRONT_URL}${fileName}`;

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return {
    url,
    fileName,
    fileUrl,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as (Blob & { name: string }) | null;
    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.name;
    const ext = mimeType.split(".");
    const fileExtension = ext[ext.length - 1];
    const { url, fileName, fileUrl } = await uploadFileToS3(
      buffer,
      uuid() + "." + fileExtension
    );
    return NextResponse.json({ url, fileName, fileUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Error uploading file.",
      error,
    });
  }
}
