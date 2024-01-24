import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createMeeting } from "./create-meeting";

export async function meetingsRoutes(app: FastifyInstance) {
  app.post("/meetings", { onRequest: verifyJWT }, createMeeting);
}
