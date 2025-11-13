import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";
import fastifyAuth from "@fastify/auth";
import { FastifyAuthPluginOptions } from "@fastify/auth";

/**
 * This plugins adds authentication to the Fastify instance
 *
 * @see https://github.com/fastify/fastify-api-key
 */
export default fp<FastifyAuthPluginOptions>(async (fastify) => {
  fastify.decorate(
    "checkApiKey",
    (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (err?: Error) => void
    ) => {
      const apiKey = fastify.getEnvs<{ API_KEY: string }>().API_KEY;
      if (!apiKey) {
        reply.status(500).send("Internal Server Error: API_KEY is not set");
      }
      if (request.headers["x-api-key"] !== apiKey) {
        reply.status(401).send("Unauthorized: Invalid API_KEY");
      }

      done();
    }
  );
  await fastify.register(fastifyAuth);
});
