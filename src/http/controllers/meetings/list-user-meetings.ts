import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeListUserMeetingsUseCase } from "@/use-cases/factories/make-list-user-meetings-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUserMeetings(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listUserMeetingsParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = listUserMeetingsParamsSchema.parse(request.params);

  try {
    const listUserMeetingsUseCase = makeListUserMeetingsUseCase();

    const { meetings } = await listUserMeetingsUseCase.execute({
      userId: id,
    });

    return reply.status(200).send({ meetings });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
