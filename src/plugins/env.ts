import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { FastifyEnvOptions } from "@fastify/env";

/**
 * This plugins adds environment variables to the Fastify instance
 *
 * @see https://github.com/fastify/fastify-env
 */

const schema = {
  type: "object",
  required: ["API_KEY", "PORT", "MONGO_URI"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    API_KEY: {
      type: "string",
    },
    MONGO_URI: {
      type: "string",
    },
  },
};

export default fp<FastifyEnvOptions>(async (fastify) => {
  fastify.register(fastifyEnv, {
    confKey: "config",
    schema,
    dotenv: true,
  });
});
