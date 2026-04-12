"use client";

import { useState } from "react";

export default function GenerateMatchesButton({ grupoId }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/partidos/generar/${grupoId}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!data.ok) {
        alert("Error: " + data.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      alert("Error al generar partidos");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="inline-flex items-center gap-2 rounded-3xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
        ✓ Fixture generado con éxito
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Generando..." : "📅 Generar fixture"}
    </button>
  );
}
