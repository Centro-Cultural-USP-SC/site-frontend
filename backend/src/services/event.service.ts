import prisma from "../config/prisma";

interface CreateEventInput {
  title: string;
  description: string;
  location?: string;
  coverImage?: string;
  startDate: Date;
  endDate?: Date;
  published?: boolean;
}

class EventService {
  async create(data: CreateEventInput) {
    return prisma.event.create({
      data,
    });
  }

  async list() {
    return prisma.event.findMany({
      where: {
        published: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.event.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: Partial<CreateEventInput>
  ) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.event.delete({
      where: { id },
    });
  }
}

export default new EventService();