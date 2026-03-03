import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  
  const portfolios = await prisma.portfolio.findMany({
    where: category ? { category } : {},
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(portfolios);
}

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const portfolio = await prisma.portfolio.create({ data });
  return NextResponse.json(portfolio, { status: 201 });
}
