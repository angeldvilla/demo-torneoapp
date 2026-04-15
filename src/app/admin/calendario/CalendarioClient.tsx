"use client";

import { useState, useMemo } from "react";
import EditMatchModal from "@/components/admin/editMatches";

export default function CalendarioClient({ partidos }: any) {
  const [tab, setTab] = useState("todos");
  const [torneoId, setTorneoId] = useState("all");

  const hoy = new Date().toISOString().split("T")[0];

  // 🔥 TORNEOS UNICOS
  const torneos = useMemo(() => {
    const map = new Map();
    partidos.forEach((p: any) => {
      map.set(p.torneoId, p.torneo);
    });
    return Array.from(map.entries());
  }, [partidos]);

  // 🔥 FILTROS
  const filtered = useMemo(() => {
    return partidos.filter((p: any) => {
      if (torneoId !== "all" && p.torneoId != torneoId) return false;

      if (tab === "hoy") return p.fechaRaw === hoy;
      if (tab === "proximos") return p.golesLocal === null;
      if (tab === "finalizados") return p.golesLocal !== null;

      return true;
    });
  }, [partidos, tab, torneoId]);

  // 🔥 AGRUPAR POR FECHA
  const grouped = useMemo(() => {
    return filtered.reduce((acc: any, p: any) => {
      if (!acc[p.fecha]) acc[p.fecha] = [];
      acc[p.fecha].push(p);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-6 rounded-3xl text-white shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
        <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-100/90">
          Revisa los partidos por fecha, filtra el torneo y edita los resultados
          de forma rápida.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-2 shadow-sm">
          {[
            { key: "todos", label: "Todos" },
            { key: "hoy", label: "Hoy" },
            { key: "proximos", label: "Próximos" },
            { key: "finalizados", label: "Finalizados" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-2xl border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                tab === t.key
                  ? "border-sky-200 bg-sky-100 text-sky-900 shadow-sm"
                  : "border-transparent bg-slate-100 text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="block rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Filtro de torneo
          </span>
          <select
            value={torneoId}
            onChange={(e) => setTorneoId(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            <option value="all">Todos los torneos</option>
            {torneos.map(([id, nombre]: any) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-6">
        {Object.keys(grouped).length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-slate-500 shadow-sm">
            No hay partidos disponibles según el filtro seleccionado.
          </div>
        )}

        {Object.entries(grouped).map(([fecha, matches]: any) => (
          <div
            key={fecha}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm"
          >
            <div className="sticky top-0 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
              📅 {fecha || "Sin Fecha"}
            </div>

            <div className="space-y-4 p-5">
              {matches.map((p: any) => (
                <div
                  key={p.id}
                  className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                      <span>{p.torneo}</span>
                      <span>•</span>
                      <span>{p.grupo}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-lg font-semibold text-slate-900">
                      <span>{p.local}</span>
                      <span className="text-slate-400">
                        {p.golesLocal !== null ? "-" : "vs"}
                      </span>
                      <span>{p.visitante}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                      <span>{p.hora || "Sin hora"}</span>
                      <span>•</span>
                      <span>{p.lugar || "Sin lugar"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.golesLocal === null
                          ? "bg-sky-100 text-sky-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {p.golesLocal === null ? "Próximo" : "Finalizado"}
                    </span>
                    <EditMatchModal partido={p} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
