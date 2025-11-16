import { FastifyPluginAsync } from "fastify";
import { getFavoritesSchema, upsertFavoriteSchema } from "../helpers/schema";
import { upsertFavorite } from "../controllers/favorites";
import { getFavorites } from "../controllers/favorites";

const favoritesRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/api/favorites", {
    schema: getFavoritesSchema,
    handler: getFavorites,
  });

  fastify.post("/api/favorites", {
    schema: upsertFavoriteSchema,
    handler: upsertFavorite,
    preHandler: fastify.auth([fastify.checkApiKey]),
  });
};

export default favoritesRouter;
