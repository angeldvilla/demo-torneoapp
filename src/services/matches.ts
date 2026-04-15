"use server";

import { db } from "@/lib/db";

export async function updateMatchSchedule({
  partidoId,
  fecha,
  hora,
  lugar,
}: {
  partidoId: number;
  fecha: string;
  hora: string;
  lugar: string;
}) {
  if (!partidoId) throw new Error("Partido inválido");

  await db.query(
    `
    UPDATE partidos
    SET fecha = ?, hora = ?, lugar = ?
    WHERE id = ?
    `,
    [fecha, hora, lugar, partidoId]
  );
}

export async function updateMatchResult({
  partidoId,
  golesLocal,
  golesVisitante,
}: {
  partidoId: number;
  golesLocal: number;
  golesVisitante: number;
}) {
  if (golesLocal < 0 || golesVisitante < 0) {
    throw new Error("Resultado inválido");
  }

  await db.query(
    `
    INSERT INTO resultados (partidoId, golesLocal, golesVisitante)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
    golesLocal = VALUES(golesLocal),
    golesVisitante = VALUES(golesVisitante)
    `,
    [partidoId, golesLocal, golesVisitante]
  );
}