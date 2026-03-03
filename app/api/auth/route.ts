import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const account = verifyCredentials(username, password);
  if (!account) {
    return NextResponse.json({ error: "Sai tài khoản hoặc mật khẩu" }, { status: 401 });
  }

  const token = signToken({ username: account.username, role: account.role });

  const response = NextResponse.json({
    success: true,
    user: { username: account.username, role: account.role },
  });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
