export default function Teams({ equipos }: any) {
  return (
    <section className="bg-linear-to-r from-white to-blue-50 py-16 w-full">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          👥 Equipos Participantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipos.map((e: any) => (
            <div
              key={e.id}
              className="bg-linear-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  ⚽
                </div>
                <h3 className="text-xl font-bold mb-2">{e.nombre}</h3>
                <p className="text-blue-100 mb-4">
                  Grupo: {e.grupo || "Sin asignar"}
                </p>
                <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300">
                  Ver Estadísticas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
