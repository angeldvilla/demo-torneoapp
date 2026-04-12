export default function Matches({ partidos }: any) {
  return (
    <section className="bg-linear-to-r from-green-50 to-blue-50 text-gray-900 py-16 w-full">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          🏟️ Partidos Recientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partidos.slice(0, 6).map((p: any) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 border border-gray-200"
            >
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500 mb-2">
                  {p.fecha || "Fecha no disponible"}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {p.grupo || "Grupo"}
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-center flex-1">
                  <div className="text-xl font-bold text-gray-900">
                    {p.local}
                  </div>
                </div>
                <div className="text-center mx-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {p.golesLocal ?? 0} - {p.golesVisitante ?? 0}
                  </div>
                  <div className="text-sm text-gray-500">Final</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-xl font-bold text-gray-900">
                    {p.visitante}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
            Ver Todos los Partidos
          </button>
        </div>
      </div>
    </section>
  );
}
