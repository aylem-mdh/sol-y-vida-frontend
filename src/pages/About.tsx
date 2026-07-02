import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-soft">
      {/* HERO OSCURO */}
      <section className="bg-slate-900 pb-16 pt-8">
        <div className="px-6 max-w-7xl mx-auto">
          <Header />
        </div>

        <div className="text-center mt-20 text-white px-6">
          <h1 className="text-5xl font-bold">Sobre Nosotros</h1>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Cuidamos con profesionalidad, cercanía y confianza.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <section className="bg-white rounded-3xl shadow-md p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Nuestra misión
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            En Sol y Vida Cuidados trabajamos para mejorar la calidad de vida de
            personas mayores y dependientes, ofreciendo asistencia domiciliaria
            basada en la cercanía, el respeto y la confianza.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Nuestros valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
            {[
              ["❤️", "Empatía"],
              ["🛡️", "Confianza"],
              ["👩‍⚕️", "Profesionalidad"],
              ["🤝", "Cercanía"],
            ].map(([icon, title]) => (
              <div key={title} className="bg-white rounded-2xl shadow-md p-8">
                <div className="text-4xl">{icon}</div>
                <h3 className="text-2xl font-bold mt-4">{title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}