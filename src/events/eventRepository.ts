import { prisma } from '@datasource';
import { IEvent } from '@interfaces';
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

  public async getEvents(): Promise<Event[]> {
    return await prisma.event.findMany();
  }
}
