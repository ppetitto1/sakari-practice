import { FastifySchema } from "fastify";
import { z } from "zod";
import { generateZodPaginatedResponseSchema } from "./utils";

export const zodPaginationSchema = z.object({
  page: z.string().optional().default("0"),
  limit: z.string().optional().default("10"),
});

export const zodSearchResultSchema = z.object({
  workId: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  firstPublishYear: z.number().optional(),
});

export const zodSearchQuerySchema = z.object({
  query: z.string(),
  page: z.string().optional().default("0"),
  limit: z.string().optional().default("10"),
});

export const zodBookSchema = z.object({
  workId: z.string().optional(),
  title: z.string(),
  authors: z.array(z.string()),
  firstPublishYear: z.number().optional(),
});

export const zodWorkSchema = z.object({
  workId: z.string(),
  title: z.string(),
  description: z.string(),
  subjects: z.array(z.string()),
  authors: z.array(z.string()),
  firstPublishYear: z.number(),
});

export const zodWorkIdSchema = z.object({
  workId: z.string(),
});

export const zodFavoriteSchema = z.object({
  note: z.string().optional(),
  workId: z.string().optional(),
});

/** Paginated Responses */

export const zodSearchPaginatedResponseSchema =
  generateZodPaginatedResponseSchema(zodSearchResultSchema);

export const zodBooksPaginatedResponseSchema =
  generateZodPaginatedResponseSchema(zodBookSchema);

export const zodFavoritesPaginatedResponseSchema =
  generateZodPaginatedResponseSchema(zodFavoriteSchema);

/** Fastify Schema definitions */

export const getSearchSchema: FastifySchema = {
  querystring: zodSearchQuerySchema,
  response: {
    200: zodSearchPaginatedResponseSchema,
  },
};

export const getBooksSchema: FastifySchema = {
  querystring: zodPaginationSchema,
  response: {
    200: zodBooksPaginatedResponseSchema,
  },
};

export const getBookSchema: FastifySchema = {
  params: zodWorkIdSchema,
  response: {
    200: zodBookSchema,
  },
};

export const upsertBookSchema: FastifySchema = {
  body: zodBookSchema,
  response: {
    201: zodBookSchema,
  },
};

export const getFavoritesSchema: FastifySchema = {
  querystring: zodPaginationSchema,
  response: {
    200: zodFavoritesPaginatedResponseSchema,
  },
};

export const upsertFavoriteSchema: FastifySchema = {
  params: zodWorkIdSchema,
  body: zodFavoriteSchema,
  response: {
    201: zodFavoriteSchema,
  },
};

/** Interfaces */

export interface SearchReq extends z.infer<typeof zodSearchQuerySchema> {}

export interface SearchRes
  extends z.infer<typeof zodSearchPaginatedResponseSchema> {}

export interface GetWorkReq extends z.infer<typeof zodWorkIdSchema> {}

export interface GetWorkRes extends z.infer<typeof zodWorkSchema> {}

export interface GetBookReq extends z.infer<typeof zodWorkIdSchema> {}

export interface GetBookRes extends z.infer<typeof zodWorkSchema> {}

export interface PaginationReq extends z.infer<typeof zodPaginationSchema> {}

export interface GetBooksReq extends PaginationReq {}

export interface GetBooksRes
  extends z.infer<typeof zodBooksPaginatedResponseSchema> {}

export interface UpsertBookReq extends z.infer<typeof zodBookSchema> {}

export interface UpsertBookRes extends z.infer<typeof zodBookSchema> {}

export interface UpsertFavoriteReq extends z.infer<typeof zodFavoriteSchema> {}

export interface UpsertFavoriteRes extends z.infer<typeof zodFavoriteSchema> {}

export interface GetFavoritesReq extends PaginationReq {}

export interface GetFavoritesRes
  extends z.infer<typeof zodFavoritesPaginatedResponseSchema> {}

export interface Favorite extends z.infer<typeof zodFavoriteSchema> {}
