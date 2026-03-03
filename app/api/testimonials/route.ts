import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  return NextResponse.json(await prisma.testimonial.create({ data }), { status: 201 });
}
