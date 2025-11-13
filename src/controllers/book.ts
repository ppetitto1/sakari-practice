import { FastifyReply, FastifyRequest } from "fastify";
import { UpsertBookReq, GetBookReq, GetBooksReq } from "../helpers/models";
import MongooseService from "../services/MongooseService";

export const getBooks = async (
  request: FastifyRequest<{ Querystring: GetBooksReq }>,
  reply: FastifyReply
) => {
  //Get Books and return a paginated list
  const { page, limit } = request.query;
  const books = await new MongooseService(request.server).getBooks({
    page,
    limit,
  });

  return reply.status(200).send(books);
};

export const upsertBook = async (
  request: FastifyRequest<{ Body: UpsertBookReq }>,
  reply: FastifyReply
) => {
  //Create a book
  const body = request.body;
  request.log.info(body);

  request.log.info("Upserting book");
  const book = await new MongooseService(request.server).upsertBook(body);
  request.log.info(book);
  return reply.status(201).send(book);
};

export const getBook = async (
  request: FastifyRequest<{ Params: GetBookReq }>,
  reply: FastifyReply
) => {
  //Get a book by its workId
  const book = await new MongooseService(request.server).getBook(
    request.params
  );
  return reply.status(200).send(book);
};
