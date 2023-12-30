import { Meeting, Prisma } from "@prisma/client";
import { MeetingsRepository } from "../meetings-repository";

export class InMemoryMeetingRepository implements MeetingsRepository {
  create(data: Prisma.MeetingCreateInput): Promise<Meeting> {
    throw new Error("Method not implemented.");
  }
}
