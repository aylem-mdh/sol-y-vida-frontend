export interface SeoPage {
  path: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  priority?: string;
  noindex?: boolean;
  kind?: "local" | "blog" | "blog-index";
  slug?: string;
}

export interface SeoApi {
  SITE: Record<string, string>;
  absoluteUrl(path: string): string;
  localPath(slug: string): string;
  allPublicPages(): SeoPage[];
  findPage(path: string): SeoPage | undefined;
  organizationSchema(): object;
  schemasFor(page: SeoPage): object[];
}

export function createSeo(data: { pages: unknown; local: unknown; blog: unknown }): SeoApi;
