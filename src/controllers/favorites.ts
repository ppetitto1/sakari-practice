import { FastifyReply, FastifyRequest } from "fastify";
import { GetFavoritesReq, UpsertFavoriteReq } from "../helpers/models";

export const getFavorites = async (
  request: FastifyRequest<{ Querystring: GetFavoritesReq }>,
  reply: FastifyReply
) => {
  //Get Books and return a paginated list
  const { page, limit } = request.query as { page: number; limit: number };
  const favorites = await request.server.mongooseService.getFavorites({
    page,
    limit,
  });
  return reply.status(200).send(favorites);
};

export const upsertFavorite = async (
  request: FastifyRequest<{ Body: UpsertFavoriteReq }>,
  reply: FastifyReply
) => {
  //Create a book
  const body = request.body;
  const favorite = await request.server.mongooseService.upsertFavorite(body);
  return reply.status(201).send(favorite);
};
