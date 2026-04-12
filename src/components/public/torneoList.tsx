import Link from "next/link";

export default function TorneoList({ torneos }: any) {
  return (
    <section className="bg-linear-to-r from-blue-50 to-green-50 text-gray-900 py-16 w-full">
      <div className="w-full px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          🏆 Torneos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {torneos.map((t: any) => (
            <Link
              key={t.id}
              href={`/torneo/${t.id}`}
              className="bg-linear-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 block border border-gray-200"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  🏆
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {t.nombre}
                </h3>
                <p className="text-gray-600 mb-4">
                  Sigue resultados, clasificaciones y estadísticas en tiempo
                  real
                </p>
                <div className="text-sm text-gray-500">
                  Información actualizada del torneo
                </div>
                <div className="mt-4">
                  <span className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Explorar Torneo
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
