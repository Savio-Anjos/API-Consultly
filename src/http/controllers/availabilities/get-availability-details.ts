import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetAvailabilityDetailsUseCase } from "@/use-cases/factories/make-get-availability-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getAvailabilityDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAvailabilityDetailsParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getAvailabilityDetailsParamsSchema.parse(request.params);

  try {
    const getAvailabilityDetailsUseCase = makeGetAvailabilityDetailsUseCase();

    const { availabilities } = await getAvailabilityDetailsUseCase.execute({
      id,
    });

    return reply.status(200).send({ availabilities });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
