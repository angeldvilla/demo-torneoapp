// src/app/api/test/route.ts

import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT NOW() as now");
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: "DB ERROR" }, { status: 500 });
  }
}