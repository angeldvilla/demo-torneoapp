import { db } from "@/lib/db";
import CalendarioClient from "./CalendarioClient";

async function getPartidos() {
  const [rows]: any = await db.query(`
    SELECT 
      p.id,
      DATE_FORMAT(p.fecha, '%Y-%m-%d') as fechaRaw,
      DATE_FORMAT(p.fecha, '%d/%m/%Y') as fecha,
      TIME_FORMAT(p.hora, '%H:%i') as hora,
      p.lugar,
      p.estado,
      t.id as torneoId,
      t.nombre as torneo,
      g.nombre as grupo,
      el.nombre as local,
      ev.nombre as visitante,
      r.golesLocal,
      r.golesVisitante
    FROM partidos p
    JOIN grupos g ON g.id = p.grupoId
    JOIN torneos t ON t.id = g.torneoId
    JOIN equipos el ON el.id = p.equipoLocalId
    JOIN equipos ev ON ev.id = p.equipoVisitanteId
    LEFT JOIN resultados r ON r.partidoId = p.id
    ORDER BY p.fecha ASC, p.hora ASC
  `);

  return rows;
}

export default async function Page() {
  const partidos = await getPartidos();

  return <CalendarioClient partidos={partidos} />;
}
