import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateConsultant } from "@/utils/create-and-authenticate-consultant";

describe("Create availability (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create availability", async () => {
    const { token, id } = await createAndAuthenticateConsultant(app);

    const response = await request(app.server)
      .post("/availabilities")
      .set("Authorization", `Bearer ${token}`)
      .send({
        day: "2024-01-23",
        startTime: "2024-01-23T08:00:00.000Z",
        endTime: "2024-01-23T09:00:00.000Z",
        consultantId: id,
      });

    expect(response.statusCode).toEqual(201);
  });
});
