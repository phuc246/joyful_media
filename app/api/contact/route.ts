import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  // Save to DB
  await prisma.contactMessage.create({
    data: { name, email, phone, service, message },
  });

  return NextResponse.json({ success: true, message: "Gửi thành công! Chúng tôi sẽ liên hệ sớm." });
}

export async function GET(req: NextRequest) {
  // Admin only – list all messages
  const { searchParams } = new URL(req.url);
  const unread = searchParams.get("unread");
  const messages = await prisma.contactMessage.findMany({
    where: unread ? { read: false } : {},
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(messages);
}
