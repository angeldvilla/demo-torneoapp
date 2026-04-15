"use client";

import { useState } from "react";
import { updateMatchSchedule, updateMatchResult } from "@/services/matches";

export default function EditMatchModal({ partido }: any) {
  const [open, setOpen] = useState(false);

  const [fecha, setFecha] = useState(partido.fechaRaw || "");
  const [hora, setHora] = useState(partido.hora || "");
  const [lugar, setLugar] = useState(partido.lugar || "");

  const [golesLocal, setGolesLocal] = useState(partido.golesLocal ?? "");
  const [golesVisitante, setGolesVisitante] = useState(
    partido.golesVisitante ?? "",
  );

  const handleSave = async () => {
    try {
      await updateMatchSchedule({
        partidoId: partido.id,
        fecha,
        hora,
        lugar,
      });

      if (golesLocal !== "" && golesVisitante !== "") {
        await updateMatchResult({
          partidoId: partido.id,
          golesLocal: Number(golesLocal),
          golesVisitante: Number(golesVisitante),
        });
      }

      setOpen(false);
      location.reload();
    } catch (err) {
      alert("Error al guardar");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        Editar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-[30px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
                  Modificar partido
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  {partido.local} vs {partido.visitante}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Actualiza fecha, hora, lugar y resultado con claridad.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Detalles del partido
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {partido.torneo} • {partido.grupo}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span className="font-medium">Fecha</span>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-700">
                  <span className="font-medium">Hora</span>
                  <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Lugar</span>
                <input
                  placeholder="Ej. Cancha central"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </label>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    Resultado
                  </p>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    Opcional
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium">Goles local</span>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={golesLocal}
                      onChange={(e) => setGolesLocal(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-700">
                    <span className="font-medium">Goles visitante</span>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={golesVisitante}
                      onChange={(e) => setGolesVisitante(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>

                  <div className="hidden items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-500 sm:flex">
                    vs
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSave}
                className="flex-1 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
