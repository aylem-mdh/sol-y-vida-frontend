import { Link, Navigate, useParams } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Seo from "../components/seo/Seo";
import { localPages, localServices, seo } from "../seo";
import { trackEvent } from "../lib/analytics";

export default function LocalLanding() {
  const { slug } = useParams();
  const page = localPages.find((p) => p.slug === slug);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  const path = `/${page.slug}`;
  const related = page.related
    .map((s) => localPages.find((p) => p.slug === s))
    .filter((p): p is (typeof localPages)[number] => Boolean(p));

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F7FCFB_45%,#FFFFFF_100%)]">
      <Seo path={path} />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Header />
      </div>

      <main className="mx-auto max-w-4xl px-6 pb-16 pt-12 sm:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-[#4B5563]">
          <Link to="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <span>Ayuda a domicilio en {page.municipality}</span>
        </nav>

        <article className="mt-6 rounded-[32px] border border-[#D6F1EE] bg-white p-7 shadow-[0_20px_55px_rgba(15,158,152,0.08)] sm:p-10">
          <h1 className="text-3xl font-bold leading-tight text-[#1F2937] sm:text-4xl">{page.h1}</h1>
          {page.intro.map((text) => (
            <p key={text} className="mt-4 text-base leading-8 text-[#4B5563]">{text}</p>
          ))}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${seo.SITE.phone}`}
              onClick={() => trackEvent("phone_click", { location: `local_${page.slug}` })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F9E98] px-6 py-3 font-semibold text-white transition hover:bg-[#0B817C]"
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> Llamar al {seo.SITE.phoneDisplay}
            </a>
            <a
              href="https://wa.me/34626406477"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: `local_${page.slug}` })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#25D366] px-6 py-3 font-semibold text-[#14803C] transition hover:bg-[#EAFBF1]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
            </a>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[#1F2937]">Servicios que puedes solicitar</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {localServices.map((s) => (
                <li key={s.name} className="rounded-2xl border border-[#E7F6F4] bg-[#F7FCFB] p-5">
                  <h3 className="font-semibold text-[#1F2937]">{s.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4B5563]">{s.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {page.sections.map((section) => (
            <section key={section.h2} className="mt-10">
              <h2 className="text-2xl font-bold text-[#1F2937]">{section.h2}</h2>
              {section.paragraphs.map((text) => (
                <p key={text} className="mt-3 text-base leading-8 text-[#4B5563]">{text}</p>
              ))}
            </section>
          ))}

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[#1F2937]">{page.zonesTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {page.zones.map((zone) => (
                <li key={zone} className="inline-flex items-center gap-2 rounded-full bg-[#DDF7F5] px-4 py-2 text-sm font-semibold text-[#0B6F6A]">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> {zone}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[#1F2937]">Preguntas frecuentes</h2>
            <dl className="mt-4 space-y-5">
              {page.faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-[#1F2937]">{item.q}</dt>
                  <dd className="mt-1 text-base leading-7 text-[#4B5563]">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-10 rounded-2xl bg-[#FFF5E8] p-6">
            <h2 className="text-xl font-bold text-[#1F2937]">Solicita información sin compromiso</h2>
            <p className="mt-2 text-[#4B5563]">Cuéntanos la situación de tu familiar y te explicamos cómo podemos ayudarte.</p>
            <Link
              to="/contact"
              className="mt-4 inline-block rounded-2xl bg-[#F29A38] px-6 py-3 font-semibold text-white transition hover:bg-[#E28727]"
            >
              Ir al formulario de contacto
            </Link>
          </section>

          <section className="mt-10 border-t border-[#E7F6F4] pt-6">
            <h2 className="text-lg font-bold text-[#1F2937]">Más información</h2>
            <ul className="mt-3 space-y-2 text-[#0B6F6A]">
              <li><Link to="/services" className="font-semibold hover:underline">Todos nuestros servicios</Link></li>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/${r.slug}`} className="font-semibold hover:underline">
                    Ayuda a domicilio en {r.municipality}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
