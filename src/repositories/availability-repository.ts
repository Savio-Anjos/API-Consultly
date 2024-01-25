import { Availability, Prisma } from "@prisma/client";

export interface AvailabilityRepository {
  create(data: Prisma.AvailabilityUncheckedCreateInput): Promise<Availability>;
  delete(id: string): Promise<Availability | null>;
  findByConsultantId(id: string): Promise<Availability[]>;
}
