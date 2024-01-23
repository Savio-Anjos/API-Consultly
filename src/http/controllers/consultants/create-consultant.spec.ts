import { app } from "@/app";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create consultant (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create consultant", async () => {
    const response = await request(app.server).post("/consultants").send({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
