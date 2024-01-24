import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { userRoutes } from "./http/controllers/users/routes";
import fastifyJwt from "@fastify/jwt";
import { consultantRoutes } from "./http/controllers/consultants/routes";
import { availabilitiesRoutes } from "./http/controllers/availabilities/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(consultantRoutes);
app.register(availabilitiesRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internar server error." });
});
