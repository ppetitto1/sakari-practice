import { FastifySchema } from "fastify";
import { z } from "zod";

export const zodBookSchema = z.object({
  workId: z.string().optional(),
  title: z.string(),
  authors: z.array(z.string()),
  firstPublishYear: z.number().optional(),
  subjects: z.array(z.string()).optional(),
});

export const getBookByWorkIdSchema: FastifySchema = {
  params: z.object({
    workId: z.string(),
  }),
  response: {
    200: zodBookSchema,
  },
};

export const zodFavoriteSchema = z.object({
  name: z.string(),
  book: z.string(),
  message: z.string().optional(),
});

export const zodWorkSchema = z.object({
  workId: z.string(),
  title: z.string(),
  description: z.string(),
  subjects: z.array(z.string()),
  authors: z.array(z.string()),
  firstPublishYear: z.number(),
});

export const searchRequestSchema: FastifySchema = {
  querystring: z.object({
    query: z.string(),
  }),
  response: {
    200: z.object({
      items: z.array(zodBookSchema),
    }),
  },
};

export const getBooksRequestSchema: FastifySchema = {
  querystring: z.object({
    page: z.number().optional().default(0),
    limit: z.number().optional().default(10),
  }),
  response: {
    200: z.object({
      items: z.array(zodBookSchema),
    }),
  },
};

export const upsertBookRequestSchema: FastifySchema = {
  body: zodBookSchema,
  response: {
    201: zodBookSchema,
  },
};
