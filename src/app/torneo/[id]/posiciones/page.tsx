import { db } from "@/lib/db";
import Link from "next/link";

// 🔹 traer partidos + resultados
async function getData(torneoId: string) {
  const [rows]: any = await db.query(
    `
    SELECT 
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

// 🔹 traer equipos
async function getEquipos(torneoId: string) {
  const [rows]: any = await db.query(
    `
    SELECT e.id, e.nombre
    FROM equipos e
    JOIN grupos g ON g.id = e.grupoId
    WHERE g.torneoId = ?
    `,
    [torneoId],
  );

  return rows;
}

// 🔹 lógica de tabla
function calcularTabla(equipos: any[], partidos: any[]) {
  const tabla: any = {};

  equipos.forEach((e) => {
    tabla[e.id] = {
      equipo: e.nombre,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      pts: 0,
    };
  });

  partidos.forEach((p) => {
    if (p.golesLocal === null || p.golesVisitante === null) return;

    const local = tabla[p.equipoLocalId];
    const visitante = tabla[p.equipoVisitanteId];

    if (!local || !visitante) return;

    local.pj++;
    visitante.pj++;

    local.gf += p.golesLocal;
    local.gc += p.golesVisitante;

    visitante.gf += p.golesVisitante;
    visitante.gc += p.golesLocal;

    if (p.golesLocal > p.golesVisitante) {
      local.pg++;
      visitante.pp++;
      local.pts += 3;
    } else if (p.golesLocal < p.golesVisitante) {
      visitante.pg++;
      local.pp++;
      visitante.pts += 3;
    } else {
      local.pe++;
      visitante.pe++;
      local.pts += 1;
      visitante.pts += 1;
    }
  });

  return Object.values(tabla).sort((a: any, b: any) => {
    if (b.pts !== a.pts) return b.pts - a.pts;

    const diffA = a.gf - a.gc;
    const diffB = b.gf - b.gc;

    return diffB - diffA;
  });
}

// 🔹 PAGE
export default async function PosicionesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const partidos = await getData(id);
  const equipos = await getEquipos(id);

  const tabla = calcularTabla(equipos, partidos);

  return (
    <div className="grid gap-4">
      {/* NAV */}
      <Link href={`/torneo/${id}`} className="text-sm text-blue-600">
        ← Volver al torneo
      </Link>

      <h1 className="text-2xl font-bold">Tabla de posiciones</h1>

      {/* TABLA */}
      <div className="bg-gray-800 p-4 rounded-xl shadow border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>#</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>PTS</th>
            </tr>
          </thead>

          <tbody>
            {tabla.map((t: any, index: number) => (
              <tr key={index} className="border-b">
                <td>{index + 1}</td>
                <td>{t.equipo}</td>
                <td>{t.pj}</td>
                <td>{t.pg}</td>
                <td>{t.pe}</td>
                <td>{t.pp}</td>
                <td>{t.gf}</td>
                <td>{t.gc}</td>
                <td className="font-bold">{t.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
