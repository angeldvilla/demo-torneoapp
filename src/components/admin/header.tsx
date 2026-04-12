export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Administración
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Panel administrativo
          </h1>
        </div>

        <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
              A
            </span>
            <div>
              <p className="font-semibold text-slate-900">Admin Torneo</p>
              <p className="text-sm text-slate-500">Administrador</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
