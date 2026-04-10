import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ grupoId: string }> }
) {
  try {
    const { grupoId } = await params;

    // limpiar partidos previos
    await db.query("DELETE FROM partidos WHERE grupoId = ?", [grupoId]);

    const [equipos]: any = await db.query(
      "SELECT * FROM equipos WHERE grupoId = ?",
      [grupoId]
    );

    if (equipos.length < 2) {
      return Response.json({
        ok: false,
        message: "No hay suficientes equipos",
      });
    }

    const partidos = [];

    for (let i = 0; i < equipos.length; i++) {
      for (let j = i + 1; j < equipos.length; j++) {
        partidos.push({
          local: equipos[i].id,
          visitante: equipos[j].id,
        });
      }
    }

    for (const p of partidos) {
      await db.query(
        `INSERT INTO partidos 
        (grupoId, equipoLocalId, equipoVisitanteId, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())`,
        [grupoId, p.local, p.visitante]
      );
    }

    return Response.json({ ok: true, total: partidos.length });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error creando partidos" });
  }
}