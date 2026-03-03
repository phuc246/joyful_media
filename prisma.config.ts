import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Prisma CLI by default only loads .env
// We need it to load .env.local for Next.js convention
config({ path: ".env.local" });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
