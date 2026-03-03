import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { image, folder } = await req.json();
  if (!image) return NextResponse.json({ error: "No image provided" }, { status: 400 });

  const result = await uploadImage(image, folder || "JOYFULMEDIA");
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { publicId } = await req.json();
  if (!publicId) return NextResponse.json({ error: "No publicId provided" }, { status: 400 });

  const result = await deleteImage(publicId);
  return NextResponse.json(result);
}
