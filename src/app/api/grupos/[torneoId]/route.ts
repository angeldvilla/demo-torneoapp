import { db } from "@/lib/db";

export async function GET(
  req: Request,
  context: { params: Promise<{ torneoId: string }> }
) {
  const params = await context.params;
  const [rows] = await db.query(
    "SELECT * FROM grupos WHERE torneoId = ?",
    [params.torneoId]
  );

  return Response.json(rows);
}