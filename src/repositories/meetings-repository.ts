import { Meeting, Prisma } from "@prisma/client";

export interface MeetingsRepository {
  create(data: Prisma.MeetingUncheckedCreateInput): Promise<Meeting>;
  delete(id: string): Promise<Meeting | null>;
  findByConsultantId(id: string): Promise<Meeting[]>;
  findByUserId(id: string): Promise<Meeting[]>;
  findByUserIdAndConsultantId(
    userId: string,
    consultantId: string
  ): Promise<Meeting[]>;
}
