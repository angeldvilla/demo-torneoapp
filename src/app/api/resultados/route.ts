import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { partidoId, golesLocal, golesVisitante } = await req.json();

    // validar datos básicos
    if (
      partidoId === undefined ||
      golesLocal === undefined ||
      golesVisitante === undefined
    ) {
      return Response.json({
        ok: false,
        message: "Datos incompletos",
      });
    }

    // verificar si ya existe resultado
    const [existe]: any = await db.query(
      "SELECT * FROM resultados WHERE partidoId = ?",
      [partidoId]
    );

    if (existe.length > 0) {
      // actualizar
      await db.query(
        `UPDATE resultados 
         SET golesLocal = ?, golesVisitante = ?, updatedAt = NOW()
         WHERE partidoId = ?`,
        [golesLocal, golesVisitante, partidoId]
      );
    } else {
      // crear
      await db.query(
        `INSERT INTO resultados 
        (partidoId, golesLocal, golesVisitante, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())`,
        [partidoId, golesLocal, golesVisitante]
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error guardando resultado" });
  }
}