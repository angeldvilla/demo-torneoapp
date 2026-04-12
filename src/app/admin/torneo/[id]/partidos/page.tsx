import { db } from "@/lib/db";
import Link from "next/link";
import EditResult from "@/components/admin/editResult";

async function getPartidos(torneoId: string) {
  const [rows]: any = await db.query(
    `
    SELECT 
      p.id,
      p.grupoId,
      DATE_FORMAT(p.fecha, '%d/%m/%Y') as fecha,
      TIME_FORMAT(p.hora, '%H:%i') as hora,
      p.lugar,
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
    ORDER BY p.fecha ASC, p.hora ASC
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
  const jugados = partidos.filter((p: any) => p.golesLocal !== null);
  const pendientes = partidos.filter((p: any) => p.golesLocal === null);

  return (
    <div className="space-y-8">
      <section className="rounded-4xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-950 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href={`/admin/torneo/${id}`}
              className="inline-flex text-sm text-slate-300 hover:text-white transition"
            >
              ← Volver al torneo
            </Link>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Partidos
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Registra los resultados de los partidos del torneo
            </p>
          </div>
          <div className="inline-flex gap-4 rounded-3xl bg-white/10 px-6 py-3 backdrop-blur-sm border border-white/20">
            <div className="text-center">
              <p className="text-sm text-slate-300">Jugados</p>
              <p className="mt-1 text-2xl font-semibold">{jugados.length}</p>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-sm text-slate-300">Pendientes</p>
              <p className="mt-1 text-2xl font-semibold">{pendientes.length}</p>
            </div>
          </div>
        </div>
      </section>

      {partidos.length === 0 ? (
        <div className="rounded-4xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <p className="text-lg text-slate-600">No hay partidos generados</p>
          <p className="mt-2 text-sm text-slate-500">
            Vuelve al torneo para generar el fixture
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {pendientes.length > 0 && (
            <section className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  Por jugar
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {pendientes.length} partidos pendientes
                </h2>
              </div>

              <div className="space-y-4">
                {pendientes.map((p: any) => (
                  <div
                    key={p.id}
                    className="rounded-3xl border border-slate-200 bg-linear-to-r from-slate-50 to-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-blue-500 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {p.local} <span className="text-slate-400">vs</span>{" "}
                        {p.visitante}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {p.fecha} {p.hora ? `• ${p.hora}` : ""}{" "}
                        {p.lugar ? `• ${p.lugar}` : ""}
                      </p>
                    </div>
                    <EditResult partido={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {jugados.length > 0 && (
            <section className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  Resultados
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {jugados.length} partidos jugados
                </h2>
              </div>

              <div className="space-y-4">
                {jugados.map((p: any) => (
                  <div
                    key={p.id}
                    className="rounded-3xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {p.local}{" "}
                        <span className="text-lg font-bold text-emerald-600 mx-2">
                          {p.golesLocal} - {p.golesVisitante}
                        </span>{" "}
                        {p.visitante}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {p.fecha} {p.hora ? `• ${p.hora}` : ""}{" "}
                        {p.lugar ? `• ${p.lugar}` : ""}
                      </p>
                    </div>
                    <EditResult partido={p} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
