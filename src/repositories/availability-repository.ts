import { Availability, Prisma } from "@prisma/client";

export interface AvailabilityRepository {
  create(data: Prisma.AvailabilityUncheckedCreateInput): Promise<Availability>;
}
