import { FastifyPluginAsync } from "fastify";
import {
  getBooksSchema,
  upsertBookSchema,
  getBookSchema,
} from "../helpers/schema";
import { getBook, getBooks, upsertBook } from "../controllers/book";

const bookRouter: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/api/books", {
    schema: getBooksSchema,
    handler: getBooks,
  });

  fastify.get("/api/books/:workId", {
    schema: getBookSchema,
    handler: getBook,
  });

  fastify.post("/api/books", {
    schema: upsertBookSchema,
    handler: upsertBook,
    preHandler: fastify.auth([fastify.checkApiKey]),
  });
};

export default bookRouter;
