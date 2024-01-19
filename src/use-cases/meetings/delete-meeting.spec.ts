import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ConsultantsRepository } from "@/repositories/consultants-repository";
import { InMemoryConsultantsRepository } from "@/repositories/in-memory/in-memory-consultants-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { DeleteMeetingUseCase } from "./delete-meeting";
import { MeetingsRepository } from "@/repositories/meetings-repository";
import { InMemoryMeetingRepository } from "@/repositories/in-memory/in-memory-meetings-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let meetingsRepository: MeetingsRepository;
let usersRepository: UsersRepository;
let consultantsRepository: ConsultantsRepository;
let sut: DeleteMeetingUseCase;
describe("Delete Meeting Use Case", () => {
  beforeEach(() => {
    meetingsRepository = new InMemoryMeetingRepository();
    consultantsRepository = new InMemoryConsultantsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteMeetingUseCase(meetingsRepository);
  });

  it("should be able to delete meeting", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const consultant = await consultantsRepository.create({
      name: "John Doe",
      email: "jonhdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await meetingsRepository.create({
      title: "Title test",
      startTime: "18:00",
      endTime: "19:00",
      userId: user.id,
      consultantId: consultant.id,
    });

    const { id } = await meetingsRepository.create({
      title: "Title test 2",
      startTime: "18:00",
      endTime: "19:00",
      userId: user.id,
      consultantId: consultant.id,
    });

    const { meetings } = await sut.execute({ id });

    expect(meetings).toHaveLength(1);
  });
});
