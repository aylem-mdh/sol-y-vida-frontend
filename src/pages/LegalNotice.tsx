import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const sections = [
  {
    id: "condiciones-generales",
    title: "1. CONDICIONES GENERALES DE USO DEL SITIO WEB",
    paragraphs: [
      "El portal oficial de https://www.solyvidacare.com/ tiene por objeto facilitar al público en general el conocimiento de las actividades que prestamos, así como de los productos y servicios que presentamos.",
      "El uso de este sitio web implica la expresa y plena aceptación de las condiciones aquí expuestas, sin perjuicio de aquellas particulares que puedan ser de aplicación a determinados productos o servicios concretos del sitio web.",
      "ROSA, AUGUSTIN GEL se reserva la facultad de efectuar, en cualquier momento y sin necesidad de previo aviso, modificaciones y actualizaciones de la información contenida en su portal, así como de su configuración y presentación.",
      "Los contenidos del sitio web podrán ser modificados, corregidos, eliminados o actualizados cuando resulte conveniente.",
    ],
  },
  {
    id: "propiedad-intelectual",
    title: "2. PROPIEDAD INTELECTUAL, INDUSTRIAL Y FRAMES",
    paragraphs: [
      "Todos los elementos que forman el sitio Web, así como su estructura, diseño, código fuente, contenidos, logotipos, marcas y demás signos distintivos que aparecen en la misma son titularidad de ROSA, AUGUSTIN GEL o de sus colaboradores, estando protegidos por los derechos de propiedad intelectual e industrial.",
      "Igualmente están protegidos por los correspondientes derechos de propiedad intelectual e industrial las imágenes y otros elementos gráficos contenidos en los portales.",
      "Queda expresamente prohibida la realización de \"framing\" o la utilización por parte de terceros de cualesquiera otros mecanismos que alteren la configuración original o contenidos de nuestros portales.",
      "El uso de los contenidos deberá respetar el licenciamiento particular de tal uso. Queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra actividad similar o análoga, salvo autorización expresa.",
    ],
  },
  {
    id: "responsabilidad",
    title: "3. RESPONSABILIDAD",
    paragraphs: [
      "No garantizamos la inexistencia de errores en el acceso a la Web, en su contenido, ni que éste se encuentre actualizado, aunque ROSA, AUGUSTIN GEL desarrollará sus mejores esfuerzos para evitarlos, subsanarlos o actualizarlos.",
      "Tanto el acceso a los portales como el uso que pueda hacerse de la información contenida en los mismos es de exclusiva responsabilidad del usuario.",
      "No nos hacemos responsables de los posibles errores de seguridad que se puedan producir ni de los posibles daños que puedan causarse al sistema informático del usuario y, especialmente, de los que puedan producirse por virus, así como de los contenidos almacenados en el mismo.",
      "Asimismo, no nos responsabilizamos de la información y contenidos almacenados, a título enunciativo pero no limitativo, en foros, chats, blogs, generadores de contenido, redes sociales o cualquier otro medio que permita a terceros publicar contenidos de forma independiente en nuestra página web.",
      "No obstante, y en cumplimiento de lo dispuesto en la LSSI, ponemos a disposición de todas las personas usuarias, autoridades y fuerzas de seguridad, los canales adecuados para que puedan retirar o bloquear aquellos contenidos que pudieran afectar a derechos de terceros o a la moral y el orden público.",
    ],
  },
  {
    id: "links",
    title: "4. LINKS O HIPERENLACES",
    paragraphs: [
      "La Web puede contener enlaces a contenidos que dirijan a contenidos de terceros.",
      "El objetivo de dichos enlaces será únicamente facilitar la búsqueda de recursos que le puedan interesar a través de Internet.",
      "No obstante, dichas páginas no pertenecen a ROSA, AUGUSTIN GEL, ni tampoco realiza una revisión de sus contenidos y, por ello, no se hace responsable del contenido, informaciones o servicios que puedan aparecer en dichos sitios.",
      "Los enlaces a la Web deberán respetar las condiciones indicadas en el documento original.",
    ],
  },
  {
    id: "proteccion-datos",
    title: "5. PROTECCIÓN DE DATOS PERSONALES",
    paragraphs: [
      "ROSA, AUGUSTIN GEL manifiesta su compromiso con el cumplimiento de la normativa de protección de datos de carácter personal y con el cumplimiento íntegro de las obligaciones dispuestas en la legislación aplicable.",
      "Se deberá consultar la Política de Privacidad para obtener la información ampliada sobre el tratamiento de los datos personales.",
    ],
  },
  {
    id: "ley-aplicable",
    title: "6. LEY APLICABLE Y JURISDICCIÓN",
    paragraphs: [
      "La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este Aviso Legal, así como cualquier cuestión relacionada con los servicios del presente Portal, será la ley española.",
      "Para la resolución de cualquier conflicto que pueda surgir con ocasión de la visita al Portal o del uso de éste, ROSA, AUGUSTIN GEL y la persona usuaria acuerdan someterse a los Jueces y Tribunales del domicilio de ROSA, AUGUSTIN GEL.",
    ],
  },
];

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F6FCFB_45%,#FFFFFF_100%)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0F9E98_0%,#6EC8C3_40%,#F29A38_100%)] pb-16 pt-8 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Header />
        </div>

        <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-white/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-[#FFF5E8]/55 blur-3xl sm:h-80 sm:w-80" />

        <div className="relative mx-auto mt-14 max-w-4xl px-6 text-center text-white sm:mt-16 lg:mt-20">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/85 sm:text-sm">
            Sol y Vida Cuidados
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Aviso Legal
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/90 sm:text-lg lg:text-xl">
            En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI).
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-14 sm:pt-16 lg:pt-20">

        {/* Datos identificativos */}
        <section className="rounded-[34px] border border-[#D8EFEA] bg-white p-7 shadow-[0_20px_54px_rgba(15,158,152,0.08)] sm:p-10 lg:p-14">
          <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">Datos identificativos</h2>
          <div className="mt-6 space-y-3 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI), informamos de que{" "}
              <strong className="text-[#1F2937]">ROSA, AUGUSTIN GEL</strong>, con NIF{" "}
              <strong className="text-[#1F2937]">38798627L</strong>, tiene su domicilio social en{" "}
              <strong className="text-[#1F2937]">CAMINO SANATORIO MARÍTIMO, 4 - 2ºA, TORREMOLINOS, MÁLAGA, 29620</strong>.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-[#DFF3F0] bg-[#FCFEFE] p-5 sm:grid-cols-2 sm:gap-4 sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F9E98]">Teléfono</p>
                <a
                  href="tel:626405477"
                  className="mt-1 block text-base font-semibold text-[#1F2937] transition hover:text-[#0F9E98]"
                >
                  626 405 477
                </a>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F9E98]">E-mail</p>
                <a
                  href="mailto:solyvidacare@gmail.com"
                  className="mt-1 block text-base font-semibold text-[#1F2937] transition hover:text-[#0F9E98]"
                >
                  solyvidacare@gmail.com
                </a>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F9E98]">Dominio</p>
                <a
                  href="https://www.solyvidacare.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-base font-semibold text-[#1F2937] transition hover:text-[#0F9E98]"
                >
                  https://www.solyvidacare.com/
                </a>
                <p className="mt-1 text-sm text-[#6B7280]">
                  El nombre de dominio <strong>https://www.solyvidacare.com/</strong> es titularidad de ROSA, AUGUSTIN GEL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="mt-8 space-y-6 sm:mt-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
            >
              <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
