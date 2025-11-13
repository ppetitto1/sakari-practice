import { FastifyPluginAsync } from "fastify";
import {
  getBooksRequestSchema,
  upsertBookRequestSchema,
  getBookByWorkIdSchema,
} from "../helpers/schema";
import { getBook, getBooks, upsertBook } from "../controllers/book";

const bookRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/api/books", {
    schema: getBooksRequestSchema,
    handler: getBooks,
  });

  fastify.get("/api/books/:workId", {
    schema: getBookByWorkIdSchema,
    handler: getBook,
  });

  fastify.post("/api/books", {
    schema: upsertBookRequestSchema,
    handler: upsertBook,
    preHandler: fastify.auth([fastify.checkApiKey]),
  });
};

export default bookRouter;
