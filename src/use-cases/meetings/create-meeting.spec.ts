import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { CreateMeetingUseCase } from "./create-meeting";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryMeetingRepository } from "@/repositories/in-memory/in-memory-meetings-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let usersRepository: UsersRepository;
let consultantsRepository: ConsultantsRepository;
let meetingsRepository: MeetingsRepository;
let sut: CreateMeetingUseCase;

describe("Create Meeting Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    consultantsRepository = new InMemoryConsultantsRepository();
    meetingsRepository = new InMemoryMeetingRepository();
    sut = new CreateMeetingUseCase(
      usersRepository,
      consultantsRepository,
      meetingsRepository
    );
  });

  it("should be able to create meeting", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const consultant = await consultantsRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { meeting } = await sut.execute({
      startTime: "2024-01-23T08:00:00.000Z",
      endTime: "2024-01-23T09:00:00.000Z",
      userId: user.id,
      consultantId: consultant.id,
    });

    expect(meeting.id).toEqual(expect.any(String));
  });

  it("It should not be possible to create a meeting with a non-existent user or consultant ID", async () => {
    await expect(() =>
      sut.execute({
        startTime: "2024-01-23T08:00:00.000Z",
        endTime: "2024-01-23T09:00:00.000Z",
        userId: "non-existent id",
        consultantId: "non-existent id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
