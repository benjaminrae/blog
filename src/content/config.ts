import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      title: z.string(),
      postSlug: z.string().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDateTime: z.date(),
      description: z.string(),
      draft: z.boolean().optional(),
      featured: z.boolean().optional(),
      projectSlug: z.string().optional(),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      link: z.string().optional(),
      repository: z.string().optional(),
      tags: z.array(z.string()).default(["others"]),
      type: z.enum(["side", "professional", "education"]).default("side"),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog: blog, projects: projects };
