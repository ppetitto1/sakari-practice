import fp from "fastify-plugin";
import helmet, { FastifyHelmetOptions } from "@fastify/helmet";

/**
 * This plugins adds Helmet to the Fastify instance
 *
 * @see https://github.com/fastify/fastify-helmet
 */
export default fp<FastifyHelmetOptions>(async (fastify) => {
  fastify.register(helmet, {});
});
