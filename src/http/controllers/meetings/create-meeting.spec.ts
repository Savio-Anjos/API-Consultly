import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateConsultant } from "@/utils/create-and-authenticate-consultant";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Create meeting (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create meeting", async () => {
    const { token, id: consultantId } = await createAndAuthenticateConsultant(
      app
    );
    const { id: userId } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/meetings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        startTime: "2024-01-23T08:00:00.000Z",
        endTime: "2024-01-23T09:00:00.000Z",
        userId,
        consultantId,
      });

    expect(response.statusCode).toEqual(201);
  });
});
