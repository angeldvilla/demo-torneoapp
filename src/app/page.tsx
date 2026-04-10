"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [torneos, setTorneos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/torneos")
      .then((res) => res.json())
      .then(setTorneos);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Torneos</h1>

      <div className="grid gap-4">
        {torneos.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm border">
            <p className="font-semibold">{t.nombre}</p>
            <p className="text-sm text-gray-500">{t.categoria}</p>
            <Link
              href={`/torneo/${t.id}`}
              className="text-blue-500 hover:underline"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
