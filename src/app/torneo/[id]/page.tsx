import { db } from "@/lib/db";
import Link from "next/link";
import GenerateMatchesButton from "@/components/matchesButton";

async function getTorneo(id: string) {
  const [rows]: any = await db.query("SELECT * FROM torneos WHERE id = ?", [
    id,
  ]);

  return rows[0];
}

async function getGrupos(id: string) {
  const [rows]: any = await db.query(
    "SELECT * FROM grupos WHERE torneoId = ?",
    [id],
  );

  return rows;
}

async function getEquipos(grupoId: number) {
  const [rows]: any = await db.query(
    "SELECT * FROM equipos WHERE grupoId = ?",
    [grupoId],
  );

  return rows;
}

async function getPartidosConResultados(torneoId: string) {
  const [rows]: any = await db.query(
    `
    SELECT 
      p.id,
      p.grupoId,
      p.equipoLocalId,
      p.equipoVisitanteId,
      r.golesLocal,
      r.golesVisitante
    FROM partidos p
    JOIN grupos g ON g.id = p.grupoId
    LEFT JOIN resultados r ON r.partidoId = p.id
    WHERE g.torneoId = ?
    `,
    [torneoId],
  );

  return rows;
}

export default async function TorneoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const torneo = await getTorneo(id);
  const grupos = await getGrupos(id);

  const gruposConEquipos = await Promise.all(
    grupos.map(async (g: any) => {
      const equipos = await getEquipos(g.id);
      return { ...g, equipos };
    }),
  );

  return (
    <div className="grid gap-4">
      <Link href="/" className="text-sm text-blue-600">
        ← Volver a inicio
      </Link>

      <Link
        href={`/torneo/${id}/posiciones`}
        className="inline-block mb-4 text-sm bg-black text-white px-3 py-1 rounded"
      >
        Ver tabla de posiciones
      </Link>

      <Link
        href={`/torneo/${id}/partidos`}
        className="inline-block mb-4 text-sm bg-black text-white px-3 py-1 rounded"
      >
        Ver todos los partidos
      </Link>

      {/* GRUPOS */}
      {gruposConEquipos.map((g: any) => (
        <div key={g.id} className="bg-white p-4 rounded-xl shadow border">
          <p className="font-semibold mb-2">{g.nombre}</p>

          <div className="text-sm text-gray-600">
            {g.equipos.length === 0 ? (
              <p>No hay equipos</p>
            ) : (
              g.equipos.map((e: any) => <p key={e.id}>• {e.nombre}</p>)
            )}
          </div>
          <GenerateMatchesButton grupoId={g.id} />
        </div>
      ))}
    </div>
  );
}
