import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Authenticate consultant (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to authenticateconsultant", async () => {
    await prisma.consultant.create({
      data: {
        name: "John Doe",
        email: "jonhdoe@example.com",
        password_hash: await hash("123456", 6),
      },
    });

    const response = await request(app.server).post("/consultants/auth").send({
      email: "jonhdoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
