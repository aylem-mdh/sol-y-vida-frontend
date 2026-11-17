import { useEffect } from "react";
import { seo } from "../../seo";

type Props = {
  path: string;
  noindex?: boolean;
  title?: string;
  description?: string;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ path, noindex, title, description }: Props) {
  useEffect(() => {
    const page = seo.findPage(path);
    const finalTitle = title ?? page?.title ?? "Sol y Vida Care";
    const finalDescription = description ?? page?.description ?? "";
    const url = seo.absoluteUrl(path);
    const image = "https://www.solyvidacare.com/logo.png";
    const hidden = noindex ?? page?.noindex ?? false;

    document.title = finalTitle;
    setMeta('meta[name="description"]', "name", "description", finalDescription);
    setMeta('meta[name="robots"]', "name", "robots", hidden ? "noindex, nofollow" : "index, follow");
    setMeta('meta[property="og:title"]', "property", "og:title", finalTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", finalDescription);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", finalTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", finalDescription);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.head.querySelectorAll('script[data-seo="jsonld"]').forEach((n) => n.remove());
    if (page && !hidden) {
      seo.schemasFor(page).forEach((schema) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seo = "jsonld";
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [path, noindex, title, description]);

  return null;
}
