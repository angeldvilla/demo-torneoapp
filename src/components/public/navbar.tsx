export default function NavBar() {
  return (
    <nav className="bg-white text-gray-900 shadow-md">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        <a href="#home" className="font-bold text-lg hover:text-blue-400">
          ⚽ TorneoApp
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6">
            <a href="#about" className="hover:text-blue-600 transition">
              Sobre el Torneo
            </a>
            <a href="#teams" className="hover:text-blue-600 transition">
              Equipos
            </a>
            <a href="#schedule" className="hover:text-blue-600 transition">
              Calendario
            </a>
            <a href="#standings" className="hover:text-blue-600 transition">
              Clasificación
            </a>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
