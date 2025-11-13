import { FastifyReply, FastifyRequest } from "fastify";
import { getOpenLibraryService } from "../services/OpenLibraryService";
import { SearchReq } from "../helpers/models";

export async function search(
  request: FastifyRequest<{ Querystring: SearchReq }>,
  reply: FastifyReply
): Promise<void> {
  request.log.info("Search controller called");
  const openLibraryService = getOpenLibraryService();
  request.log.info("OpenLibraryService created");
  const result = await openLibraryService.search({
    query: request.query.query,
    page: request.query.page,
    limit: request.query.limit,
  });
  request.log.info(result);
  reply.status(200).send({ items: result });
}
