import { db } from "@/lib/db";
import Link from "next/link";
import GenerateMatchesButton from "@/components/admin/matchesButton";

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

  const totalEquipos = gruposConEquipos.reduce(
    (sum: number, g: any) => sum + g.equipos.length,
    0,
  );

  return (
    <div className="space-y-8">
      <section className="rounded-4xl bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 p-8 text-white shadow-2xl shadow-blue-900/20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/admin/torneo"
              className="inline-flex text-sm text-blue-200 hover:text-blue-100 transition"
            >
              ← Volver a torneos
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              {torneo.nombre}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-blue-100/90">
              {torneo.descripcion || "Descripción no disponible"}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/admin/torneo/${id}/partidos`}
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 border border-white/20"
            >
              📝 Ver partidos
            </Link>
            <Link
              href={`/admin/torneo/${id}/posiciones`}
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              📊 Ver tabla
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
            <p className="text-sm text-blue-200/80">Grupos</p>
            <p className="mt-2 text-2xl font-semibold">{grupos.length}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
            <p className="text-sm text-blue-200/80">Equipos</p>
            <p className="mt-2 text-2xl font-semibold">{totalEquipos}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
            <p className="text-sm text-blue-200/80">Estado</p>
            <p className="mt-2 text-2xl font-semibold">Activo</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm border border-white/20">
            <p className="text-sm text-blue-200/80">Formato</p>
            <p className="mt-2 text-2xl font-semibold">Liga</p>
          </div>
        </div>
      </section>

      <section className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Organización
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Grupos y equipos
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-500">
            Revisa los grupos, sus equipos participantes y genera el fixture
            para cada grupo.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {gruposConEquipos.length === 0 ? (
            <div className="rounded-[1.75rem] border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-slate-600">No hay grupos creados aún</p>
              <p className="mt-2 text-sm text-slate-500">
                Empieza por crear un grupo para este torneo.
              </p>
            </div>
          ) : (
            gruposConEquipos.map((grupo: any) => (
              <div
                key={grupo.id}
                className="rounded-[1.75rem] border border-slate-200 overflow-hidden bg-white shadow-sm"
              >
                <div className="bg-linear-to-r from-blue-50 to-slate-50 p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                        Grupo
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                        {grupo.nombre}
                      </h3>
                    </div>
                    <div className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {grupo.equipos.length} equipos
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {grupo.equipos.length === 0 ? (
                    <p className="text-slate-500">
                      No hay equipos en este grupo
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {grupo.equipos.map((equipo: any, index: number) => (
                        <div
                          key={equipo.id}
                          className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4 hover:bg-blue-50 transition"
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                            {index + 1}
                          </span>
                          <p className="font-semibold text-slate-900">
                            {equipo.nombre}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <GenerateMatchesButton grupoId={grupo.id} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-4xl bg-linear-to-br from-slate-900 to-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Próximos pasos
          </p>
          <h3 className="mt-4 text-2xl font-semibold">
            Flujo de administración
          </h3>
          <ol className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold shrink-0">
                1
              </span>
              <span>
                Revisa los grupos y equipos registrados en este torneo.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold shrink-0">
                2
              </span>
              <span>
                Genera el fixture para cada grupo usando el botón disponible.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold shrink-0">
                3
              </span>
              <span>
                Ve a "<strong>Ver partidos</strong>" para registrar resultados.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold shrink-0">
                4
              </span>
              <span>
                Consulta la tabla de posiciones en "<strong>Ver tabla</strong>".
              </span>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
