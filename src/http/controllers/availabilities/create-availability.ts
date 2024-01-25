import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreateAvailabilityUseCase } from "@/use-cases/factories/make-create-avalilability-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createAvailability(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createAvailabilityBodySchema = z.object({
    day: z.string(),
    startTime: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
      message: "Invalid date format for startTime",
    }),
    endTime: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
      message: "Invalid date format for endTime",
    }),
    consultantId: z.string().uuid(),
  });

  const { day, startTime, endTime, consultantId } =
    createAvailabilityBodySchema.parse(request.body);

  try {
    const createAvailabilityUseCase = makeCreateAvailabilityUseCase();

    await createAvailabilityUseCase.execute({
      day,
      startTime,
      endTime,
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
