import { FastifyReply, FastifyRequest } from "fastify";
import { getOpenLibraryService } from "../services/OpenLibraryService";
import { SearchReq } from "../helpers/schema";
import { handleControllerFunction } from "../helpers/utils";

export async function getSearch(
  request: FastifyRequest<{ Querystring: SearchReq }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  request.log.info("Search controller called");
  const openLibraryService = getOpenLibraryService();
  request.log.info("OpenLibraryService created");
  const result = await handleControllerFunction(
    request,
    reply,
    async () =>
      await openLibraryService.search({
        query: request.query.query,
        page: request.query.page,
        limit: request.query.limit,
      })
  );
  request.log.info(result);
  return reply.status(200).send({ items: result });
}
