import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const project = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string().optional(),
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
    type: z.enum(["personnal", "university"]).optional(),
    license: z.string().optional(),
  })
});

const article = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    permalink: z.string().optional(),
    thumbnail: z.string().optional(),
    authors: z.array(z.string()).optional(),
    publishedAt: z.date().optional()
  }),
})

export const collections = { article, project };