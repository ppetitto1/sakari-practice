import { FastifyPluginAsync } from "fastify";
import {
  getFavoritesRequestSchema,
  upsertFavoriteRequestSchema,
} from "../helpers/schema";
import { upsertFavorite } from "../controllers/favorites";
import { getFavorites } from "../controllers/favorites";

const favoritesRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/api/favorites", {
    schema: getFavoritesRequestSchema,
    handler: getFavorites,
  });

  fastify.post("/api/favorites", {
    schema: upsertFavoriteRequestSchema,
    handler: upsertFavorite,
    preHandler: fastify.auth([fastify.checkApiKey]),
  });
};

export default favoritesRouter;
