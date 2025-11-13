import { search } from "../controllers/search";
import { searchRequestSchema } from "../helpers/schema";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const searchRouter: FastifyPluginAsyncZod = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/api/search", {
    schema: searchRequestSchema,
    handler: search,
    preHandler: fastify.auth([fastify.checkApiKey]),
  });

  fastify.log.info("Search route registered");
};

export default searchRouter;
