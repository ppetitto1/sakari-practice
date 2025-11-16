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

export const zodPaginationSchema = z.object({
  page: z.number().optional().default(0),
  limit: z.number().optional().default(10),
});

export const getBooksRequestSchema: FastifySchema = {
  querystring: zodPaginationSchema,
  response: {
    200: z.object({
      items: z.array(zodBookSchema),
      page: z.number(),
      limit: z.number(),
      hasMore: z.boolean(),
    }),
  },
};

export const upsertBookRequestSchema: FastifySchema = {
  body: zodBookSchema,
  response: {
    201: zodBookSchema,
  },
};

export const getFavoritesRequestSchema: FastifySchema = {
  querystring: zodPaginationSchema,
  response: {
    200: z.object({
      items: z.array(zodFavoriteSchema),
      page: z.number(),
      limit: z.number(),
      hasMore: z.boolean(),
    }),
  },
};

export const upsertFavoriteRequestSchema: FastifySchema = {
  body: zodFavoriteSchema,
  response: {
    201: zodFavoriteSchema,
  },
};
