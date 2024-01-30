import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeListConsultantMeetingsUseCase } from "@/use-cases/factories/make-list-consultant-meetings-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listConsultantMeetings(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listConsultantMeetingsParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = listConsultantMeetingsParamsSchema.parse(request.params);

  try {
    const listConsultantMeetingsUseCase = makeListConsultantMeetingsUseCase();

    const { meetings } = await listConsultantMeetingsUseCase.execute({
      consultantId: id,
    });

    return reply.status(200).send({ meetings });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
