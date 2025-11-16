import { FastifyReply, FastifyRequest } from "fastify";
import { getOpenLibraryService } from "../services/OpenLibraryService";
import { GetWorkReq } from "../helpers/schema";
import { handleControllerFunction } from "../helpers/utils";

export async function getWork(
  request: FastifyRequest<{ Querystring: GetWorkReq }>,
  reply: FastifyReply
): Promise<FastifyReply> {
  request.log.info("Search controller called");
  const openLibraryService = getOpenLibraryService();
  request.log.info("OpenLibraryService created");
  const result = await handleControllerFunction(
    request,
    reply,
    async () =>
      await openLibraryService.getWork({
        workId: request.query.workId,
      })
  );
  request.log.info(result);
  return reply.status(200).send({ items: result });
}
