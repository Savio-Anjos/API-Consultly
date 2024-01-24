import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeDeleteAvailabilityUseCase } from "@/use-cases/factories/make-delete-availability-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteAvailability(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteAvailabilityParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteAvailabilityParamsSchema.parse(request.params);

  try {
    const deleteAvailabilityUseCase = makeDeleteAvailabilityUseCase();

    await deleteAvailabilityUseCase.execute({
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
