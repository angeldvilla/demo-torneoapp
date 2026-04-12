import { db } from "@/lib/db";
import { notFound } from "next/navigation";

async function getTorneo(id: string) {
  const torneoId = Number(id);
  if (!Number.isInteger(torneoId)) return null;

  const [rows]: any = await db.query("SELECT * FROM torneos WHERE id = ?", [
    torneoId,
  ]);
  return rows[0] ?? null;
}

async function getGrupos(torneoId: number) {
  const [rows]: any = await db.query(
    "SELECT id, nombre, descripcion FROM grupos WHERE torneoId = ? ORDER BY nombre ASC",
    [torneoId],
  );
  return rows;
}

async function getEquipos(torneoId: number) {
  const [rows]: any = await db.query(
    `
    SELECT e.*, g.nombre as grupo
    FROM equipos e
    JOIN grupos g ON g.id = e.grupoId
    WHERE g.torneoId = ?
    ORDER BY e.nombre ASC
    `,
    [torneoId],
  );
  return rows;
}

async function getPartidos(torneoId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      p.id,
      p.numeroFecha,
      DATE_FORMAT(p.fecha, '%d/%m/%Y') as fecha,
      TIME_FORMAT(p.hora, '%H:%i') as hora,
      p.lugar,
      p.estado,
      g.nombre as grupo,
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
    ORDER BY p.fecha ASC, p.hora ASC, p.numeroFecha ASC
    `,
    [torneoId],
  );
  return rows;
}

async function getPosiciones(torneoId: number) {
  const [rows]: any = await db.query(
    `
    SELECT
      pos.*,
      e.nombre AS equipo,
      g.nombre AS grupo
    FROM posiciones pos
    JOIN equipos e ON e.id = pos.equipoId
    JOIN grupos g ON g.id = pos.grupoId
    WHERE g.torneoId = ?
    ORDER BY g.nombre ASC, pos.pts DESC, pos.dif DESC, pos.gf DESC, pos.pg DESC
    `,
    [torneoId],
  );
  return rows;
}

function formatMatchDate(date?: string, time?: string) {
  if (!date) return "Fecha no definida";
  return `${date}${time ? ` • ${time}` : ""}`;
}

export default async function TorneoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const torneoId = Number(resolved.id);
  if (!Number.isInteger(torneoId)) {
    notFound();
  }

  const torneo = await getTorneo(resolved.id);

  if (!torneo) {
    notFound();
  }

  const grupos = await getGrupos(torneoId);
  const equipos = await getEquipos(torneoId);
  const partidos = await getPartidos(torneoId);
  const posiciones = await getPosiciones(torneoId);

  const resultados = partidos.filter((p: any) => p.golesLocal !== null);
  const proximos = partidos.filter((p: any) => p.golesLocal === null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-linear-to-r from-blue-600 via-cyan-500 to-green-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.24em]">
            Resultado • Posiciones • Fixture
          </span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            {torneo.nombre}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            {torneo.descripcion ||
              "Sigue los torneos con mejores resultados, tablas y próximos partidos."}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur-sm border border-white/20">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Equipos
              </p>
              <p className="mt-3 text-3xl font-semibold">{equipos.length}</p>
            </div>
            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur-sm border border-white/20">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Grupos
              </p>
              <p className="mt-3 text-3xl font-semibold">{grupos.length}</p>
            </div>
            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur-sm border border-white/20">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Partidos jugados
              </p>
              <p className="mt-3 text-3xl font-semibold">{resultados.length}</p>
            </div>
            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur-sm border border-white/20">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                Próximos
              </p>
              <p className="mt-3 text-3xl font-semibold">{proximos.length}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14 space-y-14">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Resultados recientes</h2>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  Resumen
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {resultados.slice(0, 5).map((p: any) => (
                  <div
                    key={p.id}
                    className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
                      <span>{p.grupo}</span>
                      <span>{formatMatchDate(p.fecha, p.hora)}</span>
                      <span>{p.lugar || "Lugar sin definir"}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="text-lg font-semibold text-gray-900">
                        {p.local}
                      </div>
                      <div className="rounded-full bg-blue-600 px-4 py-2 text-white font-bold">
                        {p.golesLocal} - {p.golesVisitante}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {p.visitante}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <section>
              <div className="rounded-3xl bg-white shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">
                    Clasificación por grupo
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    Actualizada
                  </span>
                </div>
                <div className="mt-6 space-y-6">
                  {grupos.map((grupo: any) => {
                    const tablaGrupo = posiciones.filter(
                      (pos: any) => pos.grupo === grupo.nombre,
                    );
                    return (
                      <div
                        key={grupo.id}
                        className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">
                          {grupo.nombre}
                        </h3>
                        <div className="mt-4 overflow-x-auto">
                          <table className="min-w-full text-sm text-left">
                            <thead className="text-xs uppercase text-gray-500">
                              <tr>
                                <th className="px-3 py-2">#</th>
                                <th className="px-3 py-2">Equipo</th>
                                <th className="px-3 py-2 text-center">PJ</th>
                                <th className="px-3 py-2 text-center">PG</th>
                                <th className="px-3 py-2 text-center">PE</th>
                                <th className="px-3 py-2 text-center">PP</th>
                                <th className="px-3 py-2 text-center">GF</th>
                                <th className="px-3 py-2 text-center">GC</th>
                                <th className="px-3 py-2 text-center">Pts</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tablaGrupo.map((pos: any, index: number) => (
                                <tr
                                  key={pos.id}
                                  className="border-t border-gray-200"
                                >
                                  <td className="px-3 py-3 font-semibold">
                                    {index + 1}
                                  </td>
                                  <td className="px-3 py-3">{pos.equipo}</td>
                                  <td className="px-3 py-3 text-center">
                                    {pos.pj}
                                  </td>
                                  <td className="px-3 py-3 text-center">
                                    {pos.pg}
                                  </td>
                                  <td className="px-3 py-3 text-center">
                                    {pos.pe}
                                  </td>
                                  <td className="px-3 py-3 text-center">
                                    {pos.pp}
                                  </td>
                                  <td className="px-3 py-3 text-center">
                                    {pos.gf}
                                  </td>
                                  <td className="px-3 py-3 text-center">
                                    {pos.gc}
                                  </td>
                                  <td className="px-3 py-3 text-center font-semibold text-blue-700">
                                    {pos.pts}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </aside>
        </section>

        <div className="rounded-3xl bg-white shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Próximos encuentros</h2>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              A tiempo
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {proximos.slice(0, 5).map((p: any) => (
              <div
                key={p.id}
                className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
                  <span>{p.grupo}</span>
                  <span>{formatMatchDate(p.fecha, p.hora)}</span>
                  <span>{p.lugar || "Lugar sin definir"}</span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="text-lg font-semibold text-gray-900">
                    {p.local}
                  </div>
                  <div className="rounded-full bg-gray-100 px-4 py-2 text-gray-800">
                    vs
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {p.visitante}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
