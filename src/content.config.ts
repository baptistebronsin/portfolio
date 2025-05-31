import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const docSchema = z.object({
  title: z.string(),
  description: z.string(),
  permalink: z.string().optional(),
  order: z.number(),
  icon: z.string().optional(),
})

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

export const collections = { article };