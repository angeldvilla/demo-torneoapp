import { db } from "@/lib/db";
import Link from "next/link";

async function getEquipos() {
  const [rows]: any = await db.query(`
    SELECT 
      e.id,
      e.nombre,
      g.nombre as grupo,
      t.id as torneoId,
      t.nombre as torneo
    FROM equipos e
    JOIN grupos g ON g.id = e.grupoId
    JOIN torneos t ON t.id = g.torneoId
    ORDER BY t.nombre ASC, g.nombre ASC, e.nombre ASC
  `);

  return rows;
}

export default async function EquiposPage() {
  const equipos = await getEquipos();

  // 🔥 agrupación por torneo
  const torneosMap: any = {};

  equipos.forEach((e: any) => {
    if (!torneosMap[e.torneoId]) {
      torneosMap[e.torneoId] = {
        nombre: e.torneo,
        equipos: [],
      };
    }

    torneosMap[e.torneoId].equipos.push(e);
  });

  const torneos = Object.entries(torneosMap);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="rounded-4xl bg-linear-to-r from-indigo-600 to-blue-500 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-semibold">Equipos registrados</h1>
        <p className="mt-2 text-sm text-white/90">
          Visualiza todos los equipos organizados por torneo
        </p>
      </section>

      {/* LISTADO */}
      {torneos.length === 0 ? (
        <div className="rounded-4xl border-2 border-dashed border-slate-300 p-10 text-center">
          <p>No hay equipos registrados</p>
        </div>
      ) : (
        <div className="space-y-10">
          {torneos.map(([torneoId, torneoData]: any) => (
            <section
              key={torneoId}
              className="rounded-4xl bg-white p-6 shadow border border-slate-200"
            >
              {/* TORNEO */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{torneoData.nombre}</h2>

                <Link
                  href={`/admin/torneo/${torneoId}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver torneo →
                </Link>
              </div>

              {/* EQUIPOS */}
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {torneoData.equipos.map((e: any) => (
                  <div
                    key={e.id}
                    className="rounded-3xl border border-slate-200 p-4 hover:shadow-md transition bg-slate-50"
                  >
                    <p className="text-sm text-slate-500">{e.grupo}</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {e.nombre}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
