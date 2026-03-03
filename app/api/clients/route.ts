import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const clients = await prisma.client.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const client = await prisma.client.create({ data });
  return NextResponse.json(client, { status: 201 });
}
