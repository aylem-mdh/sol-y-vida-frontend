import pages from "./pages.json";
import local from "./localPages.json";
import blog from "./blog.json";
import { createSeo } from "./schema.mjs";

export const seo = createSeo({ pages, local, blog });
export const localPages = local.pages;
export const publishedLocalPages = local.pages.filter((p) => p.status !== "pending-review");
export const localServices = local.services;
export const blogData = blog;
export type LocalPage = (typeof local.pages)[number];
