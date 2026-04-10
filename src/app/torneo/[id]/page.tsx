import { db } from "@/lib/db";

async function getTorneo(id: string) {
  const [rows]: any = await db.query("SELECT * FROM torneos WHERE id = ?", [
    id,
  ]);

  return rows[0];
}

async function getGrupos(id: string) {
  const [rows]: any = await db.query(
    "SELECT * FROM grupos WHERE torneoId = ?",
    [id],
  );

  return rows;
}

async function getEquipos(grupoId: number) {
  const [rows]: any = await db.query(
    "SELECT * FROM equipos WHERE grupoId = ?",
    [grupoId],
  );

  return rows;
}

export default async function TorneoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const torneo = await getTorneo(id);
  const grupos = await getGrupos(id);

  const gruposConEquipos = await Promise.all(
    grupos.map(async (g: any) => {
      const equipos = await getEquipos(g.id);
      return { ...g, equipos };
    }),
  );

  return (
    <div className="grid gap-4">
      {gruposConEquipos.map((g: any) => (
        <div key={g.id} className="bg-white p-4 rounded-xl shadow border">
          <p className="font-semibold mb-2">{g.nombre}</p>

          <div className="text-sm text-gray-600">
            {g.equipos.length === 0 ? (
              <p>No hay equipos</p>
            ) : (
              g.equipos.map((e: any) => <p key={e.id}>• {e.nombre}</p>)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
