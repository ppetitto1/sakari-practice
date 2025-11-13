import { FastifyReply, FastifyRequest } from "fastify";
import { getOpenLibraryService } from "../services/OpenLibraryService";
import { GetWorkReq } from "../helpers/models";

export async function getWork(
  request: FastifyRequest<{ Querystring: GetWorkReq }>,
  reply: FastifyReply
): Promise<void> {
  request.log.info("Search controller called");
  const openLibraryService = getOpenLibraryService();
  request.log.info("OpenLibraryService created");
  const result = await openLibraryService.getWork({
    workId: request.query.workId,
  });
  request.log.info(result);
  reply.status(200).send({ items: result });
}
