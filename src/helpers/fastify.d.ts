import { FastifyRequest, FastifyReply } from "fastify";
import MongooseService from "../services/MongooseService";

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
    mongooseService: MongooseService;
  }
}
