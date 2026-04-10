import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { torneoId: string } }
) {
  const [rows] = await db.query(
    "SELECT * FROM grupos WHERE torneoId = ?",
    [params.torneoId]
  );

  return Response.json(rows);
}