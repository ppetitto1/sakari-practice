import { FastifyReply, FastifyRequest } from "fastify";
import { GetFavoritesReq, UpsertFavoriteReq } from "../helpers/schema";
import { handleControllerFunction } from "../helpers/utils";

export const getFavorites = async (
  request: FastifyRequest<{ Querystring: GetFavoritesReq }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  //Get Books and return a paginated list
  const { page, limit } = request.query;
  request.log.info("Getting favorites");
  const favorites = await handleControllerFunction(
    request,
    reply,
    async () =>
      await request.server.mongooseService.getFavorites({
        page,
        limit,
      })
  );
  request.log.info(favorites);
  return reply.status(200).send(favorites);
};

export const upsertFavorite = async (
  request: FastifyRequest<{ Body: UpsertFavoriteReq }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  //Create a book
  const body = request.body;
  request.log.info("Upserting favorite");
  const favorite = await handleControllerFunction(
    request,
    reply,
    async () => await request.server.mongooseService.upsertFavorite(body)
  );
  request.log.info(favorite);
  return reply.status(201).send(favorite);
};
