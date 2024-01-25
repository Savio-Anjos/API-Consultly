import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateConsultant } from "@/utils/create-and-authenticate-consultant";
import { prisma } from "@/lib/prisma";

describe("Delete availability (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to delete availability", async () => {
    const { token, id: consultantId } = await createAndAuthenticateConsultant(
      app
    );

    const { id } = await prisma.availability.create({
      data: {
        day: "2024-01-23",
        startTime: "2024-01-23T08:00:00.000Z",
        endTime: "2024-01-23T09:00:00.000Z",
        consultantId: consultantId,
      },
    });

    const response = await request(app.server)
      .delete(`/availabilities/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
