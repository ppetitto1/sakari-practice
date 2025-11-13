import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  //Auth
  interface FastifyInstance {
    checkApiKey: (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (err?: Error) => void
    ) => void;
  }

  //Mongoose Decorator
  interface FastifyInstance {
    mongoose: typeof mongoose;
  }

  //Models
  interface FastifyInstance {
    bookModel: Model<typeof bookSchema>;
    favoriteModel: Model<typeof favoriteSchema>;
  }
}
