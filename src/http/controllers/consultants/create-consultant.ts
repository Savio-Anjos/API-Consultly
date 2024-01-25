import { ConsultantAlreadyExistsError } from "@/use-cases/errors/consultant-already-exists-error";
import { makeCreateConsultantUseCase } from "@/use-cases/factories/make-create-consultant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createConsultant(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createConsultantBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createConsultantBodySchema.parse(
    request.body
  );

  try {
    const createConsultantUseCase = makeCreateConsultantUseCase();

    await createConsultantUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof ConsultantAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
