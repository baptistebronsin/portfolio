import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const project = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string(),
    logo: z.string().optional(),
    contributors: z.array(z.string()).optional(),
    publishedAt: z.date().optional(),
    tags: z.array(z.string()).optional(),
    links: z
      .object({
        website: z.string().optional(),
        github: z.string().optional(),
        gitlab: z.string().optional(),
      })
      .optional(),
    status: z.enum(["active", "inactive", "archived"]).optional(),
    type: z.enum(["personal", "university"]).optional(),
    license: z.string().optional(),
    isAvailable: z.boolean().default(true),
    isDisplayedOnHomepage: z.boolean().default(true),
  }),
});

const article = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string(),
    thumbnail: z.string().optional(),
    authors: z.array(z.string()).optional(),
    publishedAt: z.date().optional(),
    isAvailable: z.boolean().default(true),
    isDisplayedOnHomepage: z.boolean().default(true),
  }),
});

export const collections = { article, project };
