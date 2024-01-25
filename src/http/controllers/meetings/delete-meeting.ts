import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeDeleteMeetingUseCase } from "@/use-cases/factories/make-delete-meeting-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteMeeting(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteMeetingParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteMeetingParamsSchema.parse(request.params);

  try {
    const deleteMeetingUseCase = makeDeleteMeetingUseCase();

    await deleteMeetingUseCase.execute({
      id,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
