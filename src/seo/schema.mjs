export function createSeo({ pages, local, blog }) {
const SITE = pages.site;

const WWW = "https://www.solyvidacare.com";

function absoluteUrl(path) {
  return path === "/" ? `${WWW}/` : `${WWW}${path}`;
}

function localPath(slug) {
  return `/${slug}`;
}

function allPublicPages() {
  const base = pages.pages.map((p) => ({ ...p }));
  const localPages = local.pages.map((p) => ({
    path: localPath(p.slug),
    name: `Ayuda a domicilio en ${p.municipality}`,
    title: p.title,
    description: p.description,
    h1: p.h1,
    priority: "0.8",
    kind: "local",
    noindex: p.status === "pending-review",
    slug: p.slug,
  }));
  const blogPages = blog.published
    ? [
        {
          path: "/blog",
          name: "Consejos",
          title: "Consejos para el Cuidado de Personas Mayores | Sol y Vida Care",
          description: "Artículos y consejos para familias que cuidan o buscan ayuda para una persona mayor en la Costa del Sol.",
          h1: "Consejos para el cuidado de personas mayores",
          priority: "0.6",
          kind: "blog-index",
        },
        ...blog.posts.map((p) => ({
          path: `/blog/${p.slug}`,
          name: p.title,
          title: `${p.title} | Sol y Vida Care`,
          description: p.description,
          h1: p.title,
          priority: "0.5",
          kind: "blog",
          slug: p.slug,
        })),
      ]
    : [];
  return [...base, ...localPages, ...blogPages];
}

function findPage(path) {
  const clean = path.length > 1 ? path.replace(/\/$/, "") : path;
  return allPublicPages().find((p) => p.path === clean);
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${WWW}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description: "Cuidado y acompañamiento de personas mayores a domicilio en la Costa del Sol.",
    url: `${WWW}/`,
    logo: `${WWW}/logo.png`,
    image: `${WWW}/logo.png`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "ES",
    },
    areaServed: local.pages
      .filter((p) => p.status !== "pending-review")
      .map((p) => ({ "@type": "City", name: p.municipality })),
  };
}

function breadcrumb(page) {
  const items = [{ name: "Inicio", url: absoluteUrl("/") }];
  if (page.path !== "/") {
    if (page.kind === "blog") {
      items.push({ name: "Consejos", url: absoluteUrl("/blog") });
    }
    items.push({ name: page.name, url: absoluteUrl(page.path) });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function schemasFor(page) {
  const out = [];
  if (page.path === "/") {
    out.push(organizationSchema());
    out.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: `${WWW}/`,
      name: SITE.name,
      inLanguage: "es",
    });
  } else {
    out.push(breadcrumb(page));
  }
  if (page.kind === "local") {
    const lp = local.pages.find((p) => p.slug === page.slug);
    out.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Ayuda a domicilio y cuidado de mayores en ${lp.municipality}`,
      serviceType: "Cuidado y acompañamiento de personas mayores a domicilio",
      description: page.description,
      provider: { "@id": `${WWW}/#organization` },
      areaServed: { "@type": "City", name: lp.municipality },
      url: absoluteUrl(page.path),
    });
  }
  if (page.kind === "blog") {
    const post = blog.posts.find((p) => p.slug === page.slug);
    out.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      inLanguage: "es",
      mainEntityOfPage: absoluteUrl(page.path),
      author: { "@id": `${WWW}/#organization` },
      publisher: { "@id": `${WWW}/#organization` },
    });
  }
  return out;
}

return { SITE, absoluteUrl, localPath, allPublicPages, findPage, organizationSchema, schemasFor };
}
