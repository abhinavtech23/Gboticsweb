import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const UPLOADS_DIR = 'D:\\GboticsData\\uploads';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  
  if (!filename) {
    return new NextResponse("Filename is required", { status: 400 });
  }

  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    const fileBuffer = await fs.readFile(filePath);
    
    // Determine the general content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    // If file doesn't exist or can't be read
    return new NextResponse("File not found", { status: 404 });
  }
}
