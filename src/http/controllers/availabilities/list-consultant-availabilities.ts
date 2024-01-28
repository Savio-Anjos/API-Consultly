import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeListConsultantAvailabilitiesUseCase } from "@/use-cases/factories/make-list-consultant-availabilities-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function ListConsultantAvailabilities(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAvailabilityDetailsParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getAvailabilityDetailsParamsSchema.parse(request.params);

  try {
    const getAvailabilityDetailsUseCase =
      makeListConsultantAvailabilitiesUseCase();

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
