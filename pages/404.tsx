export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A5B8A] to-[#FF7A3C] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Página no encontrada</p>
        <a href="/zona-core-gym/" className="mt-6 inline-block bg-white text-[#2A5B8A] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Volver al inicio
        </a>
      </div>
    </div>
  )
}
