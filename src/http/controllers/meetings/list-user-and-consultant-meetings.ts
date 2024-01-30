import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeListUserAndConsultantMeetingsUseCase } from "@/use-cases/factories/make-list-user-and-consultant-meetings-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUserAndConsultantMeetings(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listUserAndConsultantMeetingsParamsSchema = z.object({
    userId: z.string().uuid(),
    consultantId: z.string().uuid(),
  });

  const { userId, consultantId } =
    listUserAndConsultantMeetingsParamsSchema.parse(request.params);

  try {
    const listUserAndConsultantMeetingsUseCase =
      makeListUserAndConsultantMeetingsUseCase();

    const { meetings } = await listUserAndConsultantMeetingsUseCase.execute({
      userId,
      consultantId,
    });

    return reply.status(200).send({ meetings });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
