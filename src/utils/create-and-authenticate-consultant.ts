import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateConsultant(app: FastifyInstance) {
  const { id } = await prisma.consultant.create({
    data: {
      name: "Jonh Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    },
  });

  const authResponse = await request(app.server)
    .post("/consultants/auth")
    .send({ email: "jonhdoe@example.com", password: "123456" });

  const { token } = authResponse.body;

  return { token, id };
}
