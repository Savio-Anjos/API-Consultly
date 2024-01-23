import { FastifyInstance } from "fastify";
import { createConsultant } from "./create-consultant";

export async function consultantRoutes(app: FastifyInstance) {
  app.post("/consultants", createConsultant);
}
