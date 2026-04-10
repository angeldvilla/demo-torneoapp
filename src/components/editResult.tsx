"use client";

import { useState } from "react";

export default function EditResult({ partido }: any) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(partido.golesLocal ?? 0);
  const [visitante, setVisitante] = useState(partido.golesVisitante ?? 0);

  const handleSave = async () => {
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
      return;
    }

    setEditing(false);
    location.reload();
  };

  if (editing) {
    return (
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-12 border px-1"
        />
        <span>-</span>
        <input
          type="number"
          value={visitante}
          onChange={(e) => setVisitante(e.target.value)}
          className="w-12 border px-1"
        />

        <button
          onClick={handleSave}
          className="text-xs bg-green-600 text-white px-2 py-1 rounded"
        >
          Guardar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="text-xs bg-black text-white px-3 py-1 rounded"
    >
      Editar
    </button>
  );
}
