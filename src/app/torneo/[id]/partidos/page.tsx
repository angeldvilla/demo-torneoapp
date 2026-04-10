import { db } from "@/lib/db";
import Link from "next/link";
import EditResult from "@/components/editResult";

async function getPartidos(torneoId: string) {
  const [rows]: any = await db.query(
    `
    SELECT 
      p.id,
      p.grupoId,
      el.nombre as local,
      ev.nombre as visitante,
      r.golesLocal,
      r.golesVisitante
    FROM partidos p
    JOIN grupos g ON g.id = p.grupoId
    JOIN equipos el ON el.id = p.equipoLocalId
    JOIN equipos ev ON ev.id = p.equipoVisitanteId
    LEFT JOIN resultados r ON r.partidoId = p.id
    WHERE g.torneoId = ?
    `,
    [torneoId],
  );

  return rows;
}

export default async function PartidosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const partidos = await getPartidos(id);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <Link href={`/torneo/${id}`} className="text-sm text-blue-600">
          ← Volver al torneo
        </Link>

        <h1 className="text-2xl font-bold mt-2">Partidos</h1>
      </div>

      {/* LISTA */}
      <div className="grid gap-3">
        {partidos.length === 0 ? (
          <p className="text-gray-500">No hay partidos</p>
        ) : (
          partidos.map((p: any) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-700">
                  {p.local} vs {p.visitante}
                </p>

                {p.golesLocal !== null ? (
                  <p className="text-sm text-gray-600">
                    {p.golesLocal ?? 0} - {p.golesVisitante ?? 0}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">Sin jugar</p>
                )}
              </div>

              {/* FUTURO: botón editar resultado */}
              <button className="text-xs bg-black text-white px-3 py-1 rounded">
                <EditResult partido={p} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
