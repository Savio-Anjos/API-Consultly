import { FastifyInstance } from "fastify";
import { createConsultant } from "./create-consultant";
import { authenticateConsultant } from "./authenticate-consultant";

export async function consultantRoutes(app: FastifyInstance) {
  app.post("/consultants", createConsultant);
  app.post("/consultants/auth", authenticateConsultant);
}
