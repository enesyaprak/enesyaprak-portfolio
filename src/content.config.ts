import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Kapak görseli yolu (public/ altından, ör. /blog/yapay-zeka.jpg). Yoksa renkli placeholder. */
    cover: z.string().optional(),
  }),
});

const iconNames = [
  'amazonwebservices',
  'ansible',
  'argo',
  'docker',
  'github',
  'graylog',
  'githubactions',
  'gitlab',
  'grafana',
  'helm',
  'kubernetes',
  'linkedin',
  'linux',
  'prometheus',
  'proxmox',
  'terraform',
  'vmware',
] as const;

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    repo: z.url().optional(),
    url: z.url().optional(),
    /** Satır başındaki logo; src/icons içindeki dosya adlarından biri. */
    icon: z.enum(iconNames).optional(),
    /** 'devam' → "devam ediyor" rozeti. */
    status: z.enum(['devam', 'yayinda', 'plan']).default('yayinda'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { blog, projects };
