import { Availability, Prisma } from "@prisma/client";

export interface AvailabilityRepository {
  create(data: Prisma.AvailabilityUncheckedCreateInput): Promise<Availability>;
  delete(id: string): Promise<Availability[]>;
  findByConsultantId(id: string): Promise<Availability[]>;
}
