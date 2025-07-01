import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
  console.log("uploaded file name ", fileName);

  const key = `${fileName}-${Date.now()}`;

  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: `${fileName}`,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);

  return {
    fileName: key,
    url: `${process.env.CLOUDFRONT_URL}${fileName}`,
    data,
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
    const arr = mimeType.split(".");
    const fileExtension = arr[arr.length - 1];
    const { fileName, url, data } = await uploadFileToS3(
      buffer,
      uuid() + "." + fileExtension
    );
    return NextResponse.json({ success: true, fileName, url, data });
  } catch (error) {
    return NextResponse.json({
      error: "Error uploading file.",
    });
  }
}
