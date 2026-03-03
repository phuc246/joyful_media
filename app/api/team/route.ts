import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const members = await prisma.teamMember.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const member = await prisma.teamMember.create({ data });
  return NextResponse.json(member, { status: 201 });
}
