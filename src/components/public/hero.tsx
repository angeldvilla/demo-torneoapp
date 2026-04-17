export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-30"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src="/hero-bg.jpg"
            alt="Futbol background"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-opacity-20"></div>
      </div>

      <div className="relative z-10 text-center w-full px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-white">
          ⚽ Torneos de Fútbol
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-up delay-200">
          Sigue los mejores torneos de fútbol del mundo. Resultados en tiempo
          real, clasificaciones actualizadas, estadísticas detalladas y la
          emoción del deporte rey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Explorar Torneos
          </button>
          <button className="border-2 border-gray-600 bg-gray-600 text-white hover:border-gray-900 hover:bg-gray-900 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
            Ver Partidos en Vivo
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
          🏆
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl">
          ⚽
        </div>
      </div>
    </section>
  );
}
