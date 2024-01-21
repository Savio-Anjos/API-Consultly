import { app } from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, it } from "vitest";
import request from "supertest";

describe("Create user (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to create user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
