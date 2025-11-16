import { FastifyReply, FastifyRequest } from "fastify";
import { UpsertBookReq, GetBookReq, GetBooksReq } from "../helpers/schema";
import { handleControllerFunction } from "../helpers/utils";

export const getBooks = async (
  request: FastifyRequest<{
    Querystring: GetBooksReq;
  }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  //Get Books and return a paginated list
  const { page, limit } = request.query;

  request.log.info("Getting books");
  const books = await handleControllerFunction(
    request,
    reply,
    async () =>
      await request.server.mongooseService.getBooks({
        page,
        limit,
      })
  );
  request.log.info(books);
  return reply.status(200).send(books);
};

export const upsertBook = async (
  request: FastifyRequest<{ Body: UpsertBookReq }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  //Create a book
  const body = request.body;
  request.log.info(body);

  request.log.info("Upserting book");
  const book = await handleControllerFunction(
    request,
    reply,
    async () => await request.server.mongooseService.upsertBook(body)
  );
  request.log.info(book);
  return reply.status(201).send(book);
};

export const getBook = async (
  request: FastifyRequest<{ Params: GetBookReq }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  //Get a book by its workId
  request.log.info("Getting book");
  const book = await handleControllerFunction(
    request,
    reply,
    async () => await request.server.mongooseService.getBook(request.params)
  );
  request.log.info(book);
  return reply.status(200).send(book);
};
