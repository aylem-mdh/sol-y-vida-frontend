import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const cookieTypes = [
  {
    title: "Cookies propias",
    paragraphs: [
      "Son aquellas cookies enviadas a tu dispositivo, y gestionadas exclusivamente por ROSA, AUGUSTIN GEL, con la finalidad de mejorar el funcionamiento del sitio web. La información recabada es empleada para mejorar y personalizar nuestros servicios, así como los contenidos de nuestra web y facilitar a la persona usuaria la visita a la misma.",
      "Estas cookies permitirán reconocerte como visitante recurrente a nuestra página web, con la intención de adaptar nuestros contenidos a tus preferencias y necesidades.",
    ],
  },
  {
    title: "Cookies de terceros",
    paragraphs: [
      "Son aquellas utilizadas y gestionadas por entidades externas a nosotros, y nos proporcionan una serie de servicios con el objetivo de mejorar nuestra página web, así como tu experiencia al visitarla.",
      "Los principales objetivos por los que se utilizan cookies de terceros son la obtención de estadísticas y el análisis de información sobre la interacción en nuestra web.",
      "La información que se podrá obtener con este tipo de cookies se referirá, por ejemplo, al número de páginas visitadas por la persona usuaria, su idioma, dirección IP, el número de personas que nos visitan, así como su frecuencia de utilización y el tiempo de permanencia en nuestra web.",
      "En ningún caso se recogerá información de forma anónima, sin identificar a las personas individualmente.",
      "Las entidades encargadas del suministro de cookies podrán ceder esta información a terceras partes, siempre y cuando la ley lo permita y dichas entidades lo procesen para sus propios fines.",
    ],
  },
  {
    title: "Cookies de redes sociales",
    paragraphs: [
      "En nuestra página web pueden encontrarse incorporados plugins de redes sociales que permitirán acceder directamente a las mismas, a través de nuestro sitio web.",
      "Estas cookies pueden encontrarse almacenadas en el navegador.",
      "Las entidades titulares de dichas redes sociales disponen de sus propias políticas de privacidad y cookies, siendo en su caso responsables de los tratamientos de datos realizados con las mismas.",
    ],
  },
];

export default function CookiePolicy() {
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
            Política de Cookies
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/90 sm:text-lg lg:text-xl">
            Información sobre el uso de cookies en{" "}
            <span className="font-semibold">https://www.solyvidacare.com/</span>
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-14 sm:pt-16 lg:pt-20">

        {/* Qué son las cookies */}
        <section className="rounded-[34px] border border-[#D8EFEA] bg-white p-7 shadow-[0_20px_54px_rgba(15,158,152,0.08)] sm:p-10 lg:p-14">
          <h2 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">¿Qué son las cookies?</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              El acceso al sitio Web <strong className="text-[#1F2937]">https://www.solyvidacare.com/</strong> puede implicar la utilización de cookies (pequeños archivos de información que se almacenan en el navegador de quien accede a la página web) para el correcto funcionamiento y visualización de los contenidos de la Web, así como para la personalización de cierta información, que únicamente la persona que visita el sitio puede visualizar.
            </p>
            <p>
              Por ende, las cookies son procedimientos automáticos de recogida de información referida a determinadas preferencias de la persona, durante su visita a nuestro sitio web, con la finalidad de reconocerla como persona usuaria, personalizar su experiencia y el uso de la misma, así como también nos permiten ayudar a identificar y resolver posibles errores.
            </p>
            <p>
              La información que las cookies pueden recoger será: desde la fecha y hora en que se produjo la visita a la web, páginas visitadas por la persona usuaria, tiempo de permanencia en la misma, idioma del navegador, dirección IP y el tiempo de permanencia en la página, así como los sitios web visitados con anterioridad o posterioridad.
            </p>
            <p>
              Sin embargo, ninguna cookie permitirá extraer información de una persona que no pueda ser identificada directamente.
            </p>
            <p>
              La información personal y/o confidencial de la persona que visita el sitio no será recogida ni almacenada por una cookie, sin que exista un consentimiento expreso en cuanto al uso en el tratamiento de sus datos personales por la cookie seleccionada.
            </p>
            <p>
              Dicho consentimiento será comunicado, en base a una elección claramente afirmativa, previamente a la realización del tratamiento de datos personales, pudiendo ser en todo momento revocado.
            </p>
          </div>
        </section>

        {/* Tipos de cookies */}
        <section
          id="tipos-cookies"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">Tipos de cookies</h2>
          <div className="mt-6 space-y-5">
            {cookieTypes.map((type) => (
              <div
                key={type.title}
                className="overflow-hidden rounded-2xl border border-[#E3F1EF]"
              >
                <div className="bg-[#DDF7F5] px-5 py-3">
                  <p className="text-sm font-bold uppercase tracking-wider text-[#0F9E98]">
                    {type.title}
                  </p>
                </div>
                <div className="space-y-3 p-5 text-sm leading-7 text-[#4B5563] sm:p-6 sm:text-base sm:leading-8">
                  {type.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabla de cookies */}
        <section
          id="tabla-cookies"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            Información detallada sobre las cookies utilizadas
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            A continuación se detalla la información sobre las cookies que utiliza este sitio web. La tabla recoge las siguientes columnas: Cookie, Finalidad, Temporalidad, Titularidad y Funcionalidad.
          </p>
          {/* Tabla con encabezados del documento — sin filas, el documento original no especifica cookies concretas */}
          <div className="mt-5 overflow-x-auto rounded-2xl border border-[#E3F1EF]">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#DDF7F5]">
                  {["Cookie", "Finalidad", "Temporalidad", "Titularidad", "Funcionalidad"].map((col) => (
                    <th
                      key={col}
                      className="border-b border-r border-[#B8E8E5] px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#0F9E98] last:border-r-0"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-5 text-center text-sm text-[#6B7280]"
                  >
                    El documento original no especifica cookies concretas en esta tabla.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Aceptación y modificación */}
        <section
          id="aceptacion-cookies"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            Aceptación y modificación de cookies
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              Siempre que nos visites, aparecerá un aviso sobre dichas cookies, que deberán en su caso ser aceptadas, rechazadas, configuradas o modificadas.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] p-4 sm:p-5">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                <span>
                  <strong className="text-[#1F2937]">En caso de no aceptarlas:</strong>{" "}
                  no se volverá a visualizar este aviso al acceder a cualquier página del sitio web durante la primera sesión.
                </span>
              </li>
              <li className="flex gap-3 rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] p-4 sm:p-5">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                <span>
                  <strong className="text-[#1F2937]">En caso de modificar la configuración:</strong>{" "}
                  podrá elegir qué cookies desea aceptar, así como gestionar posteriormente su configuración.
                </span>
              </li>
            </ul>
            <p>
              La persona usuaria podrá acceder a la Política de Cookies y modificar la configuración de las mismas, así como negar, restringir o bloquear las cookies en cualquier momento.
            </p>
          </div>
        </section>

        {/* Deshabilitar / eliminar cookies */}
        <section
          id="deshabilitar-cookies"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            Deshabilitar, rechazar o eliminar cookies
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              Puedes deshabilitar, rechazar o eliminar las cookies previamente instaladas en tu dispositivo.
            </p>
            <p>
              En este sentido, los procedimientos para rechazar y eliminar cookies en cada navegador pueden variar según sus características.
            </p>
            <p>
              A continuación encontrarás información sobre cómo gestionar las cookies en los navegadores más habituales:
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://windows.microsoft.com/es-xl/internet-explorer/delete-manage-cookies#ie=ie-10"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] px-4 py-3 text-sm font-medium text-[#1F2937] transition hover:border-[#C7EAE6] hover:text-[#0F9E98]"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                  Microsoft Edge / Internet Explorer
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] px-4 py-3 text-sm font-medium text-[#1F2937] transition hover:border-[#C7EAE6] hover:text-[#0F9E98]"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647?hl=es"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] px-4 py-3 text-sm font-medium text-[#1F2937] transition hover:border-[#C7EAE6] hover:text-[#0F9E98]"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://www.apple.com/es/privacy/use-of-cookies/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] px-4 py-3 text-sm font-medium text-[#1F2937] transition hover:border-[#C7EAE6] hover:text-[#0F9E98]"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                  Safari
                </a>
              </li>
            </ul>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
