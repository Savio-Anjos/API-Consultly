import { FastifyInstance } from "fastify";
import { createAvailability } from "./create-availability";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function availabilitiesRoutes(app: FastifyInstance) {
  app.post("/availabilities", { onRequest: verifyJWT }, createAvailability);
}
