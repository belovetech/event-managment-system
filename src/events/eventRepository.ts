import { prisma } from '@datasource';
import { IEvent, IEventQuery } from './eventInterface';
import { Event } from '@prisma/client';
export default class EventRepository {
  public async createEvent(event: IEvent): Promise<Event> {
    return await prisma.event.create({
      data: {
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        endDate: event.endDate,
      },
    });
  }

  public async getEventById(id: string): Promise<Event | null> {
    return await prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  public async getEventByTitle(title: string): Promise<Event | null> {
    return await prisma.event.findUnique({
      where: {
        title,
      },
    });
  }

  public async getEvents(query: IEventQuery): Promise<Event[]> {
    const { open, limit, offset, search } = query;
    const where: any = {};

    if (open === 'true') {
      where.endDate = {
        gte: new Date(),
      };
    }
    return await prisma.event.findMany({
      where: {
        ...where,
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: +limit ?? 10,
      skip: +offset ?? 0,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        seats: true,
      },
    });
  }
}
