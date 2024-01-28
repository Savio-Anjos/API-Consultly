import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createAndAuthenticateConsultant } from "@/utils/create-and-authenticate-consultant";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("List user meetings (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to list user meetings", async () => {
    const { token, id: consultantId } = await createAndAuthenticateConsultant(
      app
    );

    const { id: userId } = await createAndAuthenticateUser(app);

    await prisma.meeting.create({
      data: {
        title: "Test Meeting",
        startTime: "2024-01-23T08:00:00.000Z",
        endTime: "2024-01-23T09:00:00.000Z",
        userId,
        consultantId,
      },
    });

    const response = await request(app.server)
      .get(`/meetings/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
