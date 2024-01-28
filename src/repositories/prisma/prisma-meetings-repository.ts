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

  findByConsultantId(
    id: string
  ): Promise<
    {
      id: string;
      title: string;
      startTime: Date;
      endTime: Date;
      userId: string;
      consultantId: string;
    }[]
  > {
    throw new Error("Method not implemented.");
  }
  findByUserId(
    id: string
  ): Promise<
    {
      id: string;
      title: string;
      startTime: Date;
      endTime: Date;
      userId: string;
      consultantId: string;
    }[]
  > {
    throw new Error("Method not implemented.");
  }
}
