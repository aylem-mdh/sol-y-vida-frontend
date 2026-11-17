import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createSeo } from "../src/seo/schema.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, "src", "seo", f), "utf8"));
const seo = createSeo({ pages: read("pages.json"), local: read("localPages.json"), blog: read("blog.json") });
const local = read("localPages.json");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const IMAGE = "https://www.solyvidacare.com/og-image.jpg";

function stripSeoTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="(description|robots|twitter:[a-z]+)"[^>]*>/g, "")
    .replace(/<meta\s+property="og:(title|description|url|image|type|locale|site_name)"[^>]*>/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>/g, "");
}

function bodyFor(page) {
  const links = seo
    .allPublicPages()
    .filter((p) => !p.noindex)
    .map((p) => `<li><a href="${p.path}">${esc(p.name)}</a></li>`)
    .join("");
  const paragraphs = (list) => (list || []).map((t) => `<p>${esc(t)}</p>`).join("");
  const servicesHtml = `<h2>Servicios</h2><ul>${local.services.map((s) => `<li><strong>${esc(s.name)}</strong>: ${esc(s.text)}</li>`).join("")}</ul>`;
  let extra = "";
  if (page.kind === "local") {
    const lp = local.pages.find((p) => p.slug === page.slug);
    extra =
      paragraphs(lp.intro) +
      servicesHtml +
      (lp.sections || []).map((s) => `<h2>${esc(s.h2)}</h2>${paragraphs(s.paragraphs)}`).join("") +
      `<h2>Preguntas frecuentes</h2>${(lp.faq || []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}`;
  } else if (page.path === "/" || page.path === "/services") {
    extra = servicesHtml;
  }
  const contact = `<p>Teléfono: <a href="tel:${esc(seo.SITE.phone)}">${esc(seo.SITE.phoneDisplay)}</a> · ${esc(seo.SITE.email)}</p>`;
  return `<main><h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p>${extra}${contact}<nav aria-label="Principal"><ul>${links}</ul></nav></main>`;
}

function render(page) {
  const url = seo.absoluteUrl(page.path);
  const robots = page.noindex ? "noindex, nofollow" : "index, follow";
  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="es_ES" />`,
    `<meta property="og:site_name" content="Sol y Vida Care" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${IMAGE}" />`,
    ...(page.noindex
      ? []
      : seo.schemasFor(page).map((s) => `<script type="application/ld+json" data-seo="jsonld">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`)),
  ].join("\n  ");

  let html = stripSeoTags(template).replace("</head>", `  ${head}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyFor(page)}</div>`);
  return html;
}

const pages = seo.allPublicPages();

// Plantilla para las rutas privadas de la aplicación: sin metadatos de la home y con noindex.
fs.writeFileSync(
  path.join(dist, "app.html"),
  stripSeoTags(template).replace("</head>", `  <title>Sol y Vida Care</title>\n  <meta name="robots" content="noindex, nofollow" />\n</head>`),
);
// Vercel sirve 404.html con estado HTTP 404 para cualquier ruta inexistente.
fs.copyFileSync(path.join(dist, "app.html"), path.join(dist, "404.html"));
for (const page of pages) {
  const html = render(page);
  const out = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, page.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url>\n    <loc>${seo.absoluteUrl(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority ?? "0.5"}</priority>\n  </url>`)
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

const disallow = ["/admin", "/calendar", "/agenda", "/client", "/visits", "/family", "/incidents", "/documentation", "/reports", "/settings", "/notifications", "/budgets", "/maintenance", "/complaints", "/reviews", "/worker", "/activate-account", "/reset-password"];
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n${disallow.map((d) => `Disallow: ${d}`).join("\n")}\n\nSitemap: https://www.solyvidacare.com/sitemap.xml\n`,
);

console.log(`Prerendered ${pages.length} pages; sitemap has ${pages.filter((p) => !p.noindex).length} URLs.`);
