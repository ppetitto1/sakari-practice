import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const generateZodPaginatedResponseSchema = (itemSchema: z.ZodSchema) => {
  return z.object({
    items: z.array(itemSchema),
    page: z.string(),
    limit: z.string(),
    hasMore: z.boolean(),
  });
};

export const handleControllerFunction = async <T>(
  request: FastifyRequest,
  reply: FastifyReply,
  fn: () => Promise<T>
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};
