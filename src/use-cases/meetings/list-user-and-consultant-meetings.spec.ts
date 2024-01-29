import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { InMemoryMeetingRepository } from "@/repositories/in-memory/in-memory-meetings-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ListUserMeetingsUseCase } from "./list-user-meetings";
import { ListUserAndConsultantMeetingsUseCase } from "./list-user-and-consultant-meetings";

let meetingsRepository: MeetingsRepository;
let usersRepository: UsersRepository;
let consultantsRepository: ConsultantsRepository;
let sut: ListUserAndConsultantMeetingsUseCase;
describe("List User And Consultant Meetings Use Case", () => {
  beforeEach(() => {
    meetingsRepository = new InMemoryMeetingRepository();
    consultantsRepository = new InMemoryConsultantsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUserAndConsultantMeetingsUseCase(meetingsRepository);
  });

  it("should be able to list user meetings", async () => {
    const { id: userId } = await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { id: userId2 } = await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe2@example.com",
      password_hash: await hash("123456", 6),
    });

    const { id: consultantId } = await consultantsRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await meetingsRepository.create({
      title: "Title test",
      startTime: "2024-01-23T08:00:00.000Z",
      endTime: "2024-01-23T09:00:00.000Z",
      userId,
      consultantId,
    });

    await meetingsRepository.create({
      title: "Title test",
      startTime: "2024-01-23T08:00:00.000Z",
      endTime: "2024-01-23T09:00:00.000Z",
      userId: userId2,
      consultantId,
    });

    const { meetings } = await sut.execute({ userId, consultantId });

    expect(meetings).toHaveLength(2);
  });
});
