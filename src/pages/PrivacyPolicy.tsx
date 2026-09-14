import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ── Sección II: datos por categoría ──────────────────────────────────────────

interface TreatmentCategory {
  name: string;
  purposes: string[];
  retention: { label: string; value: string }[];
  legitimacy: string;
  recipients: string;
  international: string;
}

const treatmentCategories: TreatmentCategory[] = [
  {
    name: "Clientes",
    purposes: [
      "Gestión de asistencia social",
      "Gestión de clientes",
      "Contable, fiscal y administrativa",
      "Gestión y control sanitario",
    ],
    retention: [
      {
        label: "Gestión de asistencia social",
        value:
          "Durante el tiempo necesario para la prestación de la asistencia y, después, durante los plazos de prescripción de posibles responsabilidades.",
      },
      {
        label: "Gestión de clientes",
        value:
          "Mientras se mantenga la relación y, después, durante los plazos de prescripción de posibles responsabilidades.",
      },
      { label: "Contable, fiscal y administrativa", value: "4 años." },
      {
        label: "Gestión y control sanitario",
        value:
          "Como mínimo, 5 años desde la fecha de alta de cada proceso asistencial (y, en su caso, durante los plazos necesarios a efectos judiciales/epidemiológicos/investigación).",
      },
    ],
    legitimacy: "Ejecución de un contrato de prestación de servicios.",
    recipients: "Administración pública con competencia en la materia.",
    international: "No.",
  },
  {
    name: "Proveedores",
    purposes: ["Gestión de clientes", "Contable, fiscal y administrativa"],
    retention: [
      {
        label: "Gestión de clientes",
        value:
          "Mientras se mantenga la relación contractual y posteriormente, durante los plazos de prescripción de acciones legales.",
      },
      { label: "Contable, fiscal y administrativa", value: "4 años." },
    ],
    legitimacy: "Ejecución de un contrato de prestación de servicios.",
    recipients: "Administración pública con competencia en la materia.",
    international: "No.",
  },
  {
    name: "Familiares Usuarios",
    purposes: [
      "Contacto profesional",
      "Gestión de clientes",
      "Contable, fiscal y administrativa",
      "Otras finalidades",
    ],
    retention: [
      {
        label: "Contacto profesional",
        value:
          "Mientras se mantenga la relación profesional y, después, durante los plazos de prescripción de posibles responsabilidades derivadas del tratamiento.",
      },
      {
        label: "Gestión de clientes",
        value:
          "Durante la vigencia de la relación contractual/comercial y después, durante los plazos de prescripción de acciones legales (civiles/mercantiles).",
      },
      {
        label: "Contable, fiscal y administrativa",
        value: "4 años desde la finalización del ejercicio fiscal correspondiente.",
      },
    ],
    legitimacy: "Interés legítimo / consentimiento del interesado.",
    recipients: "Administración pública con competencia en la materia.",
    international: "No.",
  },
  {
    name: "Currículums",
    purposes: [
      "Gestión de clientes",
      "Contable, fiscal y administrativa",
      "Recursos humanos",
    ],
    retention: [
      {
        label: "Gestión de clientes",
        value:
          "Durante la vigencia de la relación y, posteriormente, durante los plazos de prescripción de acciones legales aplicables.",
      },
      { label: "Contable, fiscal y administrativa", value: "4 años." },
      { label: "Recursos humanos", value: "4 años." },
    ],
    legitimacy: "Interés legítimo / consentimiento del interesado.",
    recipients: "Administración pública con competencia en la materia.",
    international: "No.",
  },
  {
    name: "RRHH",
    purposes: [
      "Gestión de clientes",
      "Contable, fiscal y administrativa",
      "Gestión de nóminas",
      "Recursos humanos",
    ],
    retention: [
      {
        label: "Gestión de clientes",
        value:
          "Durante la vigencia de la relación y finalizada, durante los plazos de prescripción de acciones (con carácter general, 5 años).",
      },
      {
        label: "Contable, fiscal y administrativa",
        value:
          "6 años (documentación contable y mercantil) y 4 años (obligaciones tributarias; conservar/bloquear durante ese plazo).",
      },
      { label: "Gestión de nóminas", value: "4 años." },
      {
        label: "Recursos humanos",
        value:
          "Durante la vigencia de la relación y finalizada, durante los plazos de prescripción de acciones (con carácter general, 5 años).",
      },
    ],
    legitimacy: "Ejecución de un contrato laboral.",
    recipients: "Administración pública con competencia en la materia.",
    international: "No.",
  },
  {
    name: "Videovigilancia",
    purposes: ["Videovigilancia"],
    retention: [
      {
        label: "Videovigilancia",
        value: "Máximo 1 mes desde su captación.",
      },
    ],
    legitimacy: "Interés público / videovigilancia.",
    recipients: "Administración pública con competencia en la materia.",
    international: "No.",
  },
];

// ── Sección III: principios ───────────────────────────────────────────────────

const principles = [
  {
    title: "Licitud, lealtad, transparencia y limitación de la finalidad",
    text: "El tratamiento de datos siempre deberá ser informado a la persona afectada, mediante cláusulas y procedimientos establecidos; y sólo se considerará legítimo si hay consentimiento para el tratamiento de datos (con especial atención al prestado por los menores de edad), o cuenta con otra legitimación válida, y la finalidad del mismo es acorde a la Normativa de aplicación.",
  },
  {
    title: "Minimización de datos",
    text: "Los datos tratados deberán ser adecuados, pertinentes y limitados a lo necesario en relación a las distintas finalidades del tratamiento.",
  },
  {
    title: "Exactitud",
    text: "Los datos deberán ser exactos y, si fuera necesario, actualizados. A este respecto se adoptarán las medidas necesarias para que se supriman o rectifiquen sin dilación, los datos personales que sean inexactos con respecto a los fines del tratamiento.",
  },
  {
    title: "Limitación del plazo de conservación",
    text: "Los datos serán mantenidos de forma que se permita la identificación de las personas interesadas durante no más tiempo del necesario para la finalidad del tratamiento en cuestión.",
  },
  {
    title: "Integridad y confidencialidad",
    text: "Los datos personales serán tratados de tal manera que se garantice una seguridad adecuada, incluida la protección contra el tratamiento no autorizado o ilícito, y contra su pérdida, destrucción o daño accidental, mediante la aplicación de las medidas técnicas u organizativas apropiadas.",
  },
  {
    title: "Cesiones de datos",
    text: "Queda prohibida la compra u obtención de datos de carácter personal, cuyo origen provenga de fuentes ilegítimas, o en aquellos casos en los que dichos datos hayan sido recabados o cedidos contraviniendo la ley o no se garantice suficientemente su legítima procedencia.",
  },
  {
    title: "Contratación de proveedores con acceso a datos",
    text: "Sólo se elegirán para su contratación a proveedores que ofrezcan garantías suficientes para aplicar medidas técnicas y de seguridad apropiadas en el tratamiento de datos. Con estos, se documentará el debido contrato a este respecto.",
  },
  {
    title: "Transferencias internacionales de datos",
    text: "Todo tratamiento de datos de carácter personal sujeto a la normativa de la Unión Europea que implique una transferencia de datos fuera del Espacio Económico Europeo, deberá llevarse a cabo con estricto cumplimiento de los requisitos establecidos en la ley aplicable.",
  },
];

// ── Sección VI: compromisos del personal ─────────────────────────────────────

const staffCommitments = [
  "Realizar la formación de sensibilización en Protección de datos que ROSA, AUGUSTIN GEL pone a su disposición.",
  "Aplicar las medidas de seguridad a nivel de usuario que apliquen a su puesto de trabajo, sin perjuicio de las responsabilidades en su diseño e implantación que pudieran atribuírsele en función de su rol dentro de ROSA, AUGUSTIN GEL.",
  "Utilizar los formatos establecidos para el ejercicio de Derechos por parte de las personas usuarias afectadas, e informar a ROSA, AUGUSTIN GEL de forma inmediata, de modo que pueda hacerse efectiva la respuesta.",
  "Informar a ROSA, AUGUSTIN GEL, tan pronto tenga conocimiento, de desviaciones de lo establecido en esta Política, en particular de \u201cViolaciones de seguridad de los datos personales\u201d, utilizando para ello el formato establecido al efecto.",
];

// ── Componente principal ──────────────────────────────────────────────────────

export default function PrivacyPolicy() {
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
            Política de Privacidad
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-white/90 sm:text-lg lg:text-xl">
            Política de protección de datos de carácter personal de ROSA, AUGUSTIN GEL.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-14 sm:pt-16 lg:pt-20">

        {/* Introducción */}
        <section className="rounded-[34px] border border-[#D8EFEA] bg-white p-7 shadow-[0_20px_54px_rgba(15,158,152,0.08)] sm:p-10 lg:p-14">
          <div className="space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              <strong className="text-[#1F2937]">ROSA, AUGUSTIN GEL</strong> es una Organización en la que se recaban, por los diferentes medios de los que dispone, datos de carácter personal, lo que le atribuye una importante responsabilidad en el diseño y organización de procedimientos, de modo que estén alineados con el cumplimiento legal en Protección de datos. Por ello, ROSA, AUGUSTIN GEL adoptará todas aquellas medidas de seguridad necesarias para asegurar la protección de los datos recabados.
            </p>
            <p>
              En el ejercicio de estas responsabilidades, y con el objeto de establecer los principios generales que deben regir el tratamiento de los datos de carácter personal en la Organización, ROSA, AUGUSTIN GEL aprueba esta Política de protección de datos de carácter personal, que notifica y pone a disposición a todos sus grupos de interés, respetando asimismo las siguientes normas:
            </p>
            <ul className="mt-2 space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                <span>
                  El Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                <span>
                  La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                <span>
                  La Ley 34/2002, de 1 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* I. Ámbito de aplicación */}
        <section
          id="ambito-aplicacion"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">I. ÁMBITO DE APLICACIÓN</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              Esta Política de protección de datos de carácter personal será de aplicación a ROSA, AUGUSTIN GEL, a sus órganos de administración, dirección y plantilla, así como a todas las personas que se relacionen con la Organización, con inclusión expresa de los proveedores de servicio con acceso a datos ("Encargados del tratamiento").
            </p>
            <p>
              El responsable del tratamiento de los datos personales recogidos en la Organización es:{" "}
              <strong className="text-[#1F2937]">ROSA, AUGUSTIN GEL</strong>, provista de NIF:{" "}
              <strong className="text-[#1F2937]">38798627L</strong>, cuyo representante es:{" "}
              <strong className="text-[#1F2937]">ROSA AUGUSTIN GEL</strong> (en adelante, Responsable del tratamiento).
            </p>
            <div className="rounded-2xl border border-[#DFF3F0] bg-[#FCFEFE] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F9E98]">Datos de contacto</p>
              <ul className="mt-3 space-y-1 text-sm text-[#1F2937] sm:text-base">
                <li>
                  <span className="text-[#6B7280]">Dirección: </span>
                  CAMINO SANATORIO MARÍTIMO, 4 - 2ºA, TORREMOLINOS, MÁLAGA, 29620
                </li>
                <li>
                  <span className="text-[#6B7280]">Teléfono: </span>
                  <a href="tel:626406477" className="font-semibold transition hover:text-[#0F9E98]">626 406 477</a>
                </li>
                <li>
                  <span className="text-[#6B7280]">Correo electrónico: </span>
                  <a href="mailto:solyvidacare@gmail.com" className="font-semibold transition hover:text-[#0F9E98]">solyvidacare@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* II. Información sobre tratamientos */}
        <section
          id="tratamientos"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            II. INFORMACIÓN SOBRE EL RESPONSABLE Y TRATAMIENTOS DE LOS DATOS PERSONALES EN ROSA, AUGUSTIN GEL
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              La información adicional sobre los tratamientos de datos es un conjunto de detalles más específicos y ampliados que las entidades deben proporcionar a las personas interesadas sobre cómo se gestionan sus datos personales. Este concepto deriva del principio de transparencia del Reglamento General de Protección de Datos (RGPD) y complementa la información básica que se facilita inicialmente, proporcionando un mayor nivel de detalle sobre los tratamientos.
            </p>
            <p>
              A continuación, ROSA, AUGUSTIN GEL facilita información adicional sobre los tratamientos de datos que realiza.
            </p>

            {/* Datos del responsable */}
            <div className="rounded-2xl border border-[#DFF3F0] bg-[#FCFEFE] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F9E98]">Datos sobre el responsable del tratamiento</p>
              <ul className="mt-3 space-y-1 text-sm text-[#1F2937] sm:text-base">
                <li><span className="text-[#6B7280]">Identidad: </span>ROSA, AUGUSTIN GEL</li>
                <li><span className="text-[#6B7280]">Dirección: </span>CAMINO SANATORIO MARÍTIMO, 4 - 2ºA, TORREMOLINOS, MÁLAGA, 29620</li>
                <li>
                  <span className="text-[#6B7280]">Teléfono: </span>
                  <a href="tel:626406477" className="font-semibold transition hover:text-[#0F9E98]">626 406 477</a>
                </li>
                <li>
                  <span className="text-[#6B7280]">Correo electrónico: </span>
                  <a href="mailto:solyvidacare@gmail.com" className="font-semibold transition hover:text-[#0F9E98]">solyvidacare@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Finalidades por categoría */}
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#0F9E98]">
              Finalidades del tratamiento por categoría
            </p>

            <div className="mt-2 space-y-5">
              {treatmentCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="overflow-hidden rounded-2xl border border-[#E3F1EF]"
                >
                  {/* Cabecera de categoría */}
                  <div className="bg-[#DDF7F5] px-5 py-3">
                    <p className="text-sm font-bold uppercase tracking-wider text-[#0F9E98]">
                      {cat.name}
                    </p>
                  </div>

                  <div className="divide-y divide-[#F0F9F8] p-5 sm:p-6">
                    {/* Finalidades */}
                    <div className="pb-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Finalidad del tratamiento</p>
                      <ul className="mt-2 space-y-1">
                        {cat.purposes.map((p) => (
                          <li key={p} className="flex gap-2 text-sm text-[#1F2937] sm:text-base">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0F9E98]" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Plazos */}
                    <div className="py-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Plazo de conservación</p>
                      <ul className="mt-2 space-y-2">
                        {cat.retention.map((r) => (
                          <li key={r.label} className="text-sm text-[#4B5563] sm:text-base">
                            <span className="font-semibold text-[#1F2937]">{r.label}: </span>
                            {r.value}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Legitimación */}
                    <div className="py-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Legitimación</p>
                      <p className="mt-2 text-sm text-[#4B5563] sm:text-base">{cat.legitimacy}</p>
                    </div>

                    {/* Destinatarios */}
                    <div className="pt-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Destinatarios</p>
                      <p className="mt-2 text-sm text-[#4B5563] sm:text-base">
                        <span className="font-semibold text-[#1F2937]">Previsión de cesiones: </span>
                        {cat.recipients}
                      </p>
                      <p className="mt-1 text-sm text-[#4B5563] sm:text-base">
                        <span className="font-semibold text-[#1F2937]">Transferencias internacionales: </span>
                        {cat.international}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Derechos */}
            <div
              id="derechos"
              className="mt-4 rounded-2xl border border-[#F8E1BE] bg-[#FFF5E8] p-5 sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#F29A38]">
                Derechos que les corresponden y medios a su disposición
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
                <p>
                  Cualquier persona tiene derecho a obtener confirmación sobre si en ROSA, AUGUSTIN GEL estamos tratando datos personales que le conciernen.
                </p>
                <p>
                  Las personas interesadas tienen derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos, o en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines por los que fueron recabados.
                </p>
                <p>
                  En determinadas circunstancias, las personas interesadas podrán solicitar la limitación del tratamiento de sus datos, en cuyo caso únicamente los conservaremos para el ejercicio o defensa de reclamaciones, así como para atender los plazos de conservación legalmente establecidos.
                </p>
                <p>
                  Asimismo, las personas interesadas podrán oponerse al tratamiento de sus datos personales. Por ello, ROSA, AUGUSTIN GEL dejará de tratar sus datos, salvo por motivos legítimos e imperiosos, o en el ejercicio de posibles reclamaciones.
                </p>
                <p>
                  En el mismo sentido, cuando concurran determinadas circunstancias y sea técnicamente posible, las personas interesadas tendrán derecho a que sus datos personales sean transmitidos directamente a otro responsable o encargado del tratamiento, previa solicitud.
                </p>
                <p>Para el ejercicio de los derechos anteriormente indicados, deberá ponerse en contacto con nosotros, dirigiendo un escrito ante:</p>
                <div className="rounded-xl border border-[#FFD4A3] bg-white p-4 text-sm text-[#1F2937]">
                  <p className="font-semibold">ROSA, AUGUSTIN GEL</p>
                  <p>CAMINO SANATORIO MARÍTIMO, 4 - 2ºA, TORREMOLINOS, MÁLAGA, 29620</p>
                  <p className="mt-1">
                    o bien por correo electrónico a:{" "}
                    <a href="mailto:solyvidacare@gmail.com" className="font-semibold text-[#0F9E98] transition hover:text-[#0A7F7A]">
                      solyvidacare@gmail.com
                    </a>
                  </p>
                  <p className="mt-2 text-[#6B7280]">Recomendamos acompañar su solicitud con copia de su DNI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* III. Principios */}
        <section
          id="principios"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            III. PRINCIPIOS APLICABLES AL TRATAMIENTO DE DATOS PERSONALES
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              La Política de protección de datos de carácter personal es una medida de Responsabilidad proactiva, que tiene la finalidad de asegurar el cumplimiento de la legislación aplicable en esta materia y en relación a ésta, el respeto del derecho al honor y a la intimidad en el tratamiento de los datos de carácter personal de todas las personas que se relacionan con ROSA, AUGUSTIN GEL.
            </p>
            <p>
              En desarrollo de lo dispuesto en esta Política, se establecen cuáles son los Principios que rigen el tratamiento de datos en la organización y en consecuencia, los procedimientos y las medidas organizativas y de seguridad que las personas afectadas por esta Política se comprometen a implementar en su ámbito de responsabilidad.
            </p>
            <p>En relación con lo expuesto, ROSA, AUGUSTIN GEL velará por el cumplimiento de los siguientes principios:</p>
            <ul className="mt-2 space-y-4">
              {principles.map((p) => (
                <li key={p.title} className="rounded-xl border border-[#E3F1EF] bg-[#FCFEFE] p-4 sm:p-5">
                  <p className="font-semibold text-[#1F2937]">{p.title}</p>
                  <p className="mt-1 text-[#4B5563]">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* IV. Menores de edad */}
        <section
          id="menores"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            IV. DATOS PERSONALES DE MENORES DE EDAD
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              Respetando lo establecido en los artículos 8 del RGPD y 7 de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, solo los mayores de 14 años podrán otorgar su consentimiento para el tratamiento de sus datos personales de forma lícita por ROSA, AUGUSTIN GEL.
            </p>
            <p>
              Si se trata de un menor de 14 años, será necesario el consentimiento de los padres o tutores para el tratamiento, y este solo se considerará lícito en la medida en la que los mismos lo hayan autorizado.
            </p>
          </div>
        </section>

        {/* V. Secreto y seguridad */}
        <section
          id="secreto-seguridad"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            V. SECRETO Y SEGURIDAD DE LOS DATOS PERSONALES
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              ROSA, AUGUSTIN GEL se compromete a comunicar a la persona usuaria, sin dilación indebida, cuando ocurra una violación de seguridad de los datos personales que sea probable que entrañe un alto riesgo para sus derechos y libertades.
            </p>
            <p>
              Siguiendo lo establecido en el artículo 4 del RGPD, se entiende por violación de la seguridad de los datos personales toda violación de la seguridad que ocasione la destrucción, pérdida o alteración accidental o ilícita de datos personales transmitidos, conservados o tratados de otra forma, o la comunicación o acceso no autorizados a dichos datos.
            </p>
            <p>
              Los datos personales serán tratados como confidenciales por el Responsable del tratamiento, quien se compromete a informar y a garantizar por medio de una obligación legal o contractual que dicha confidencialidad sea respetada por sus trabajadores/as, asociados, y toda persona a la cual le haga accesible la información.
            </p>
          </div>
        </section>

        {/* VI. Compromiso del personal */}
        <section
          id="compromiso-personal"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            VI. COMPROMISO DEL PERSONAL DE ROSA, AUGUSTIN GEL
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              Por lo anterior, expresamos que los trabajadores y trabajadoras de ROSA, AUGUSTIN GEL, se encuentran informados de la presente Política, y se declaran conscientes de que la información de carácter personal es un activo de ROSA, AUGUSTIN GEL, y a este respecto se adhieren a ella, comprometiéndose a lo siguiente:
            </p>
            <ul className="space-y-3">
              {staffCommitments.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#DDF7F5] text-xs font-bold text-[#0F9E98]">
                    {i + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* VII. Control y evaluación */}
        <section
          id="control-evaluacion"
          className="mt-6 rounded-[28px] border border-[#EAF2F1] bg-white p-7 shadow-[0_12px_32px_rgba(15,158,152,0.06)] sm:p-10"
        >
          <h2 className="text-lg font-bold text-[#0F9E98] sm:text-xl">
            VII. CONTROL Y EVALUACIÓN
          </h2>
          <div className="mt-4 text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
            <p>
              ROSA, AUGUSTIN GEL realizará una verificación, evaluación y valoración anual, así como cada vez que haya cambios significativos en los tratamientos de datos, de la eficacia de las medidas técnicas y organizativas para garantizar la seguridad del tratamiento.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
