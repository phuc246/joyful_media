import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const ADMIN_ACCOUNTS = [
  {
    username: process.env.ADMIN_USER_1 || "admin",
    password: process.env.ADMIN_PASS_1 || "joyfulmedia2025",
    role: "admin",
  },
  {
    username: process.env.ADMIN_USER_2 || "manager",
    password: process.env.ADMIN_PASS_2 || "joyful@manager",
    role: "manager",
  },
];

export function verifyCredentials(username: string, password: string) {
  const account = ADMIN_ACCOUNTS.find(
    (a) => a.username === username && a.password === password
  );
  return account || null;
}

export function signToken(payload: { username: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; role: string };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest) {
  const cookie = req.cookies.get("admin_token")?.value;
  if (cookie) return verifyToken(cookie);
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return verifyToken(authHeader.slice(7));
  }
  return null;
}

export function requireAuth(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user) return false;
  return user;
}
