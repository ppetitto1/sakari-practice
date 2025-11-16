import { getSearch } from "../controllers/search";
import { getSearchSchema } from "../helpers/schema";
import { FastifyPluginAsync } from "fastify";

const searchRouter: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/api/search", {
    schema: getSearchSchema,
    handler: getSearch,
    preHandler: fastify.auth([fastify.checkApiKey]),
  });

  fastify.log.info("Search route registered");
};

export default searchRouter;
