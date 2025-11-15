import fp from "fastify-plugin";
import mongoose, { model } from "mongoose";
import { zodBookSchema, zodFavoriteSchema } from "../helpers/schema";
import { zodSchema } from "@zodyac/zod-mongoose";

export default fp(async (fastify) => {
  try {
    // Connect to the MongoDB server
    await mongoose.connect(fastify.getEnvs<{ MONGO_URI: string }>().MONGO_URI);
    fastify.log.info("Mongoose connected");

    // Decorate the Fastify instance with the mongoose connection
    fastify.decorate("mongoose", mongoose);

    // Create the models
    const bookModel = model("Book", zodSchema(zodBookSchema));
    const favoriteModel = model("Favorite", zodSchema(zodFavoriteSchema));

    // Decorate the Fastify instance with the models
    fastify.decorate("bookModel", bookModel);
    fastify.decorate("favoriteModel", favoriteModel);

    // Log the models
    fastify.log.info(
      `Models created: ${JSON.stringify({ bookModel, favoriteModel })}`
    );
  } catch (error) {
    fastify.log.error(error);
  }

  fastify.addHook("onClose", async () => {
    await mongoose.connection.close();
  });
});
