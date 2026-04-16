import { db } from "@/lib/db";
import Link from "next/link";

async function getTorneos() {
  const [rows]: any = await db.query(
    "SELECT id, nombre, descripcion FROM torneos ORDER BY id DESC",
  );
  return rows;
}

export default async function TorneoListPage() {
  const torneos = await getTorneos();

  return (
    <div className="space-y-8">
      <section className="rounded-4xl bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 p-8 text-white shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-white/80">
              Gestión de torneos
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Administra todos tus torneos
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/90">
              Crea nuevos torneos, configura grupos, administra equipos y
              controla el flujo completo desde la configuración hasta el cierre.
            </p>
          </div>

          <Link
            href="#crear"
            className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/20 transition hover:bg-slate-100"
          >
            + Crear torneo
          </Link>
        </div>
      </section>

      <section className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Todos los torneos
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {torneos.length === 0
                ? "Sin torneos creados"
                : `${torneos.length} torneo${torneos.length !== 1 ? "s" : ""} activo${torneos.length !== 1 ? "s" : ""}`}
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-500">
            Selecciona un torneo para acceder a su configuración, participantes,
            calendario y resultados.
          </p>
        </div>

        <div className="mt-8">
          {torneos.length === 0 ? (
            <div className="rounded-4xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <p className="text-lg text-slate-600">
                No hay torneos creados aún
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Empieza por crear tu primer torneo usando el botón anterior.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {torneos.map((torneo: any) => (
                <Link
                  key={torneo.id}
                  href={`/admin/torneo/${torneo.id}`}
                  className="group rounded-[1.75rem] border border-slate-200 bg-linear-to-br from-slate-50 to-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-linear-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white group-hover:shadow-lg">
                      {torneo.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {torneo.nombre}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {torneo.descripcion || "Sin descripción adicional"}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-sm text-blue-600 font-medium">
                      Ver detalles <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-4xl bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-500 p-8 text-white shadow-2xl shadow-slate-950/20">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-gray-200/80">
            Información útil
          </p>
          <h3 className="mt-4 text-2xl font-semibold">
            ¿Cómo crear un nuevo torneo?
          </h3>
          <ol className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shrink-0">
                1
              </span>
              <span>
                Haz clic en "<strong>Crear torneo</strong>" en la parte
                superior.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shrink-0">
                2
              </span>
              <span>
                Define el nombre, descripción y selecciona el formato (liga
                simple).
              </span>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shrink-0">
                3
              </span>
              <span>Crea los grupos y agrega los equipos participantes.</span>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shrink-0">
                4
              </span>
              <span>Genera el fixture y comienza a registrar resultados.</span>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
