import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreateMeetingUseCase } from "@/use-cases/factories/make-create-meeting-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMeeting(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createMeetingBodySchema = z.object({
    startTime: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
      message: "Invalid date format for startTime",
    }),
    endTime: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
      message: "Invalid date format for endTime",
    }),
    userId: z.string().uuid(),
    consultantId: z.string().uuid(),
  });

  const { startTime, endTime, userId, consultantId } =
    createMeetingBodySchema.parse(request.body);

  try {
    const createMeetingUseCase = makeCreateMeetingUseCase();

    await createMeetingUseCase.execute({
      startTime,
      endTime,
      userId,
      consultantId,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
