import fp from "fastify-plugin";
import MongooseService from "../services/MongooseService";

export default fp(async (fastify) => {
  try {
    // Connect to the MongoDB server
    const mongooseService = new MongooseService({
      MONGO_URI: fastify.getEnvs<{ MONGO_URI: string }>().MONGO_URI,
    });
    await mongooseService.connect();

    // Decorate the Fastify instance with the mongoose service
    fastify.decorate("mongooseService", mongooseService);
  } catch (error) {
    fastify.log.error(error);
  }

  fastify.addHook("onClose", async () => {
    await fastify.mongooseService.disconnect();
  });
});
