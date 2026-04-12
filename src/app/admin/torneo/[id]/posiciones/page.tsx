import { db } from "@/lib/db";
import Link from "next/link";

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
    <div className="space-y-8">
      <section className="rounded-4xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-950 p-8 text-white shadow-2xl">
        <Link
          href={`/admin/torneo/${id}`}
          className="inline-flex text-sm text-slate-300 hover:text-white transition"
        >
          ← Volver al torneo
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Tabla de posiciones
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Clasificación actualizada de todos los equipos
        </p>
      </section>

      <section className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200 overflow-x-auto">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            Estado
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Clasificación general
          </h2>
        </div>

        <div className="min-w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 text-left text-xs uppercase tracking-widest text-slate-600">
                <th className="px-4 py-4 font-semibold">#</th>
                <th className="px-4 py-4 font-semibold">Equipo</th>
                <th className="px-4 py-4 text-center font-semibold">PJ</th>
                <th className="px-4 py-4 text-center font-semibold">PG</th>
                <th className="px-4 py-4 text-center font-semibold">PE</th>
                <th className="px-4 py-4 text-center font-semibold">PP</th>
                <th className="px-4 py-4 text-center font-semibold">GF</th>
                <th className="px-4 py-4 text-center font-semibold">GC</th>
                <th className="px-4 py-4 text-center font-semibold">DIF</th>
                <th className="px-4 py-4 text-center font-semibold">PTS</th>
              </tr>
            </thead>

            <tbody>
              {tabla.map((t: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b border-slate-200 transition hover:bg-slate-50 ${
                    index === 0 ? "bg-emerald-50" : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {t.equipo}
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600">
                    {t.pj}
                  </td>
                  <td className="px-4 py-4 text-center text-emerald-600 font-semibold">
                    {t.pg}
                  </td>
                  <td className="px-4 py-4 text-center text-amber-600 font-semibold">
                    {t.pe}
                  </td>
                  <td className="px-4 py-4 text-center text-red-600 font-semibold">
                    {t.pp}
                  </td>
                  <td className="px-4 py-4 text-center text-blue-600 font-semibold">
                    {t.gf}
                  </td>
                  <td className="px-4 py-4 text-center text-slate-600">
                    {t.gc}
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-slate-900">
                    {t.gf - t.gc}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-slate-900 text-white font-bold">
                      {t.pts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
