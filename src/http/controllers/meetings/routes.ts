import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createMeeting } from "./create-meeting";
import { deleteMeeting } from "./delete-meeting";
import { listUserMeetings } from "./list-user-meetings";

export async function meetingsRoutes(app: FastifyInstance) {
  app.post("/meetings", { onRequest: verifyJWT }, createMeeting);
  app.delete("/meetings/:id", { onRequest: verifyJWT }, deleteMeeting);
  app.get("/meetings/:id", { onRequest: verifyJWT }, listUserMeetings);
}
