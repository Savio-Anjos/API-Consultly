import { Meeting, Prisma } from "@prisma/client";

export interface MeetingsRepository {
  create(data: Prisma.MeetingUncheckedCreateInput): Promise<Meeting>;
}
