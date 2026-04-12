"use client";

import { useState } from "react";

export default function EditResult({ partido }: any) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(partido.golesLocal ?? 0);
  const [visitante, setVisitante] = useState(partido.golesVisitante ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/resultados", {
        method: "POST",
        body: JSON.stringify({
          partidoId: partido.id,
          golesLocal: Number(local),
          golesVisitante: Number(visitante),
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert("Error guardando resultado");
        setSaving(false);
        return;
      }

      setEditing(false);
      setTimeout(() => location.reload(), 800);
    } catch (error) {
      alert("Error al guardar");
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-2">
        <input
          type="number"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-14 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-center font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
          min="0"
        />
        <span className="font-bold text-slate-600">-</span>
        <input
          type="number"
          value={visitante}
          onChange={(e) => setVisitante(e.target.value)}
          className="w-14 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-center font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
          min="0"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "✓ Guardar"}
        </button>
        <button
          onClick={() => setEditing(false)}
          className="rounded-2xl bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-400"
        >
          Cancelar
        </button>
      </div>
    );
  }

  const hasResult = partido.golesLocal !== null;

  return (
    <button
      onClick={() => setEditing(true)}
      className={`inline-flex items-center gap-2 rounded-3xl px-4 py-2 text-sm font-semibold transition ${
        hasResult
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
      }`}
    >
      {hasResult
        ? `${partido.golesLocal} - ${partido.golesVisitante}`
        : "Pendiente"}
    </button>
  );
}
