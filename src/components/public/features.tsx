export default function Features() {
  const features = [
    {
      icon: "📊",
      title: "Estadísticas en Tiempo Real",
      description:
        "Sigue cada jugada con estadísticas actualizadas al instante, desde goles hasta tarjetas.",
    },
    {
      icon: "🏆",
      title: "Cobertura Completa de Torneos",
      description:
        "Accede a información detallada de todos los torneos, desde amateurs hasta profesionales.",
    },
    {
      icon: "👥",
      title: "Comunidad de Fans",
      description:
        "Conecta con aficionados apasionados y comparte la emoción del fútbol.",
    },
    {
      icon: "📱",
      title: "Acceso Móvil",
      description:
        "Disfruta de la experiencia completa en cualquier dispositivo, en cualquier lugar.",
    },
    {
      icon: "🎥",
      title: "Highlights y Resúmenes",
      description:
        "Revive los mejores momentos con videos destacados y resúmenes automáticos.",
    },
    {
      icon: "🔍",
      title: "Información Confiable",
      description:
        "Datos precisos y actualizados de fuentes oficiales para una experiencia inigualable.",
    },
  ];

  return (
    <section className="bg-linear-to-r from-blue-50 to-green-50 py-16 w-full">
      <div className="w-full px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          ¿Por qué Seguir Torneos con Nosotros?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-blue-200"
            >
              <div className="text-5xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
