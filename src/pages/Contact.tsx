import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-soft">
      <div className="pt-8 px-6 max-w-7xl mx-auto">
        <Header />
      </div>

      {/* HERO */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Contacto</h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Estamos aquí para ayudarte y resolver cualquier duda.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* INFO */}
          <section className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Información de contacto
            </h2>

            <div className="mt-8 space-y-6 text-lg text-gray-600">
              <div>
                <p className="font-semibold text-gray-800">📞 Teléfono</p>
                <a
                  href="tel:+34626406477"
                  className="text-primary hover:underline"
                >
                  +34 626 40 64 77
                </a>
              </div>

              <div>
                <p className="font-semibold text-gray-800">✉️ Email</p>
                <p>info@solyvida.com</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">📍 Cobertura</p>
                <p>
                  Torremolinos · Benalmádena · Fuengirola · Mijas · Alhaurín de
                  la Torre
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">🕒 Horario</p>
                <p>Lunes a Domingo · 24h</p>
              </div>
            </div>

            <button className="mt-10 w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition">
              WhatsApp
            </button>
          </section>

          {/* FORM */}
          <section className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Envíanos un mensaje
            </h2>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <textarea
                placeholder="¿Cómo podemos ayudarte?"
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition">
                Enviar mensaje
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}