import { db } from "@/lib/db";
import Link from "next/link";

async function getTorneos() {
  const [rows]: any = await db.query(
    "SELECT id, nombre, descripcion FROM torneos ORDER BY id DESC LIMIT 6",
  );
  return rows;
}

const dashboardStats = [
  {
    label: "Torneos activos",
    value: "6",
    icon: "🏆",
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Equipos registrados",
    value: "24",
    icon: "👥",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    label: "Próximos partidos",
    value: "8",
    icon: "🗓️",
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Tablas actualizadas",
    value: "3",
    icon: "📊",
    color: "from-orange-500 to-amber-500",
  },
];

const quickActions = [
  {
    title: "Torneos",
    href: "/admin/torneo",
    description: "Configura y administra torneos",
  },
  {
    title: "Equipos",
    href: "/admin/equipos",
    description: "Agrega equipos y asigna grupos",
  },
  {
    title: "Calendario",
    href: "/admin/calendario",
    description: "Genera fixtures y revisa fechas",
  },
  {
    title: "Resultados",
    href: "/admin/torneo",
    description: "Registra marcadores al instante",
  },
];

export default async function AdminDashboard() {
  const torneos = await getTorneos();

  return (
    <div className="space-y-8">
      <section className="rounded-4xl bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 ring-1 ring-white/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
              Dashboard general
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Control completo de la administración
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300">
              Monitorea el estado de torneos, equipos, calendario y resultados
              en un solo lugar. Navega rápido hacia las acciones más importantes
              de gestión.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-slate-900/90 p-5 shadow-lg shadow-slate-950/30 ring-1 ring-white/10"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-linear-to-br ${stat.color} text-xl shadow-inner shadow-black/20`}
                >
                  {stat.icon}
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Navegación rápida
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Acciones principales
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-500">
              Abre las secciones más utilizadas para administrar torneos,
              equipos, calendario y resultados.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-500 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {action.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      {action.description}
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                  Resumen de administración
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  Visión general rápida
                </h3>
              </div>
              <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                Actualizado recientemente
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Torneos en progreso</p>
                <p className="mt-2 text-2xl font-semibold">4</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Partidos hoy</p>
                <p className="mt-2 text-2xl font-semibold">5</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Tablas pendientes</p>
                <p className="mt-2 text-2xl font-semibold">2</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="rounded-4xl bg-linear-to-br from-indigo-600 to-cyan-500 p-6 text-white shadow-2xl shadow-cyan-500/10 ring-1 ring-white/20">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/80">
              Torneo destacado
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              Último torneo creado
            </h3>
            {torneos.length > 0 ? (
              <div className="mt-5 space-y-4">
                <p className="text-lg font-semibold">{torneos[0].nombre}</p>
                <p className="text-sm text-cyan-100/90">
                  {torneos[0].descripcion || "Sin descripción disponible"}
                </p>
                <Link
                  href={`/admin/torneo/${torneos[0].id}`}
                  className="inline-flex rounded-3xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Ver torneo
                </Link>
              </div>
            ) : (
              <p className="mt-5 text-sm text-cyan-100/80">
                Aún no hay torneos para mostrar.
              </p>
            )}
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Métricas rápidas
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <span>Progreso de la tabla</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <span>Fixture generado</span>
                <span className="font-semibold">62%</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <span>Resultados registrados</span>
                <span className="font-semibold">41%</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-4xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Torneos recientes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Últimos torneos creados
            </h2>
          </div>
          <Link
            href="/admin/torneo"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Ver todos los torneos
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {torneos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
              No hay torneos creados aún. Empieza por crear el primero.
            </div>
          ) : (
            torneos.map((torneo: any) => (
              <Link
                key={torneo.id}
                href={`/admin/torneo/${torneo.id}`}
                className="block rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-500 hover:bg-white"
              >
                <p className="text-lg font-semibold text-slate-900">
                  {torneo.nombre}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  {torneo.descripcion || "Descripción no disponible"}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
