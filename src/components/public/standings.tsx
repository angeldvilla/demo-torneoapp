export default function Standings({ tabla }: any) {
  return (
    <section className="bg-linear-to-r from-green-50 to-blue-50 py-16 w-full">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          🏆 Clasificación
        </h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Pos</th>
                <th className="py-4 px-6 text-left">Equipo</th>
                <th className="py-4 px-6 text-center">PJ</th>
                <th className="py-4 px-6 text-center">PG</th>
                <th className="py-4 px-6 text-center">PE</th>
                <th className="py-4 px-6 text-center">PP</th>
                <th className="py-4 px-6 text-center">GF</th>
                <th className="py-4 px-6 text-center">GC</th>
                <th className="py-4 px-6 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {tabla.map((t: any, i: number) => (
                <tr
                  key={i}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition duration-300 ${
                    i === 0
                      ? "bg-green-50"
                      : i === 1
                        ? "bg-blue-50"
                        : i === 2
                          ? "bg-yellow-50"
                          : ""
                  }`}
                >
                  <td className="py-4 px-6 font-semibold">{i + 1}</td>
                  <td className="py-4 px-6 font-medium">{t.equipo}</td>
                  <td className="py-4 px-6 text-center">{t.pj || 0}</td>
                  <td className="py-4 px-6 text-center">{t.pg || 0}</td>
                  <td className="py-4 px-6 text-center">{t.pe || 0}</td>
                  <td className="py-4 px-6 text-center">{t.pp || 0}</td>
                  <td className="py-4 px-6 text-center">{t.gf || 0}</td>
                  <td className="py-4 px-6 text-center">{t.gc || 0}</td>
                  <td className="py-4 px-6 text-center font-bold text-blue-600">
                    {t.pts || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
