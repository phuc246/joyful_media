import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const settings = await prisma.settings.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => (map[s.key] = s.value));
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data: Record<string, string> = await req.json();
  
  await Promise.all(
    Object.entries(data).map(([key, value]) =>
      prisma.settings.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  return NextResponse.json({ success: true });
}
