import { Meeting, Prisma } from "@prisma/client";
import { MeetingsRepository } from "../meetings-repository";
import { randomUUID } from "crypto";

export class InMemoryMeetingRepository implements MeetingsRepository {
  public items: Meeting[] = [];
  public async create(
    data: Prisma.MeetingUncheckedCreateInput
  ): Promise<Meeting> {
    const meeting: Meeting = {
      id: randomUUID(),
      title: data.title,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      userId: data.userId,
      consultantId: data.consultantId,
    };

    this.items.push(meeting);

    return meeting;
  }

  public async delete(id: string): Promise<Meeting | null> {
    const indexToRemove = this.items.findIndex((item) => item.id === id);

    let meeting: Meeting | null;

    if (indexToRemove !== -1) {
      meeting = this.items.splice(indexToRemove, 1)[0];
    } else {
      meeting = null;
    }

    return meeting;
  }

  public async findByConsultantId(id: string): Promise<Meeting[]> {
    const meetings = this.items.filter((item) => item.consultantId === id);

    return meetings;
  }

  public async findByUserId(id: string): Promise<Meeting[]> {
    const meetings = this.items.filter((item) => item.userId === id);

    return meetings;
  }

  public async findByUserIdAndConsultantId(
    userId: string,
    consultantId: string
  ): Promise<Meeting[]> {
    const meetings = this.items.filter(
      (item) => item.userId === userId && item.consultantId === consultantId
    );

    return meetings;
  }
}
