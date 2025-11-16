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
  });

  fastify.log.info("Search route registered");
};

export default searchRouter;
