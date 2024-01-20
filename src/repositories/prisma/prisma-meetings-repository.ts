import { Meeting, Prisma } from "@prisma/client";
import { MeetingsRepository } from "../meetings-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMeetingsRepository implements MeetingsRepository {
  public async create(
    data: Prisma.MeetingUncheckedCreateInput
  ): Promise<Meeting> {
    const meeting = await prisma.meeting.create({
      data,
    });

    return meeting;
  }
  public async delete(id: string): Promise<Meeting | null> {
    const meeting = await prisma.meeting.delete({
      where: {
        id,
      },
    });

    return meeting;
  }
}
