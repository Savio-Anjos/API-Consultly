import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateConsultantUseCase } from "@/use-cases/factories/make-authenticate-consultant-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateConsultant(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateConsultantBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateConsultantBodySchema.parse(
    request.body
  );

  try {
    const authenticateConsultantUseCase = makeAuthenticateConsultantUseCase();

    const { consultant } = await authenticateConsultantUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({}, { sub: consultant.id });

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
