import { FastifyInstance } from "fastify";
import { createAvailability } from "./create-availability";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { deleteAvailability } from "./delete-availability";
import { ListConsultantAvailabilities } from "./list-consultant-availabilities";

export async function availabilitiesRoutes(app: FastifyInstance) {
  app.post("/availabilities", { onRequest: verifyJWT }, createAvailability);
  app.get(
    "/availabilities/:id",
    { onRequest: verifyJWT },
    ListConsultantAvailabilities
  );
  app.delete(
    "/availabilities/:id",
    { onRequest: verifyJWT },
    deleteAvailability
  );
}
