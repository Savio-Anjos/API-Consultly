import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeListUserMeetingsUseCase } from "@/use-cases/factories/make-list-user-meetings-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUserMeetings(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listUserMeetingsParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = listUserMeetingsParamsSchema.parse(request.body);

  try {
    const listUserMeetingsUseCase = makeListUserMeetingsUseCase();

    await listUserMeetingsUseCase.execute({
      userId,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
