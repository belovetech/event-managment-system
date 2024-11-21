import { IEvent, IEventQuery } from './eventInterface';
import EventRepository from './eventRepository';
import { ConflictException, NotfoundException } from '@exception';
import { Event } from '@prisma/client';

export default class EventService {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async createEvent(event: IEvent): Promise<Event> {
    const eventExists = await this.eventRepository.getEventByTitle(event.title);
    if (eventExists) {
      throw new ConflictException('Event already exists');
    }
    event.date = new Date(event.date);
    event.endDate = new Date(event.endDate);
    return await this.eventRepository.createEvent(event);
  }

  async getEventById(id: string): Promise<Event | null> {
    const event = await this.eventRepository.getEventById(id);
    if (!event) {
      throw new NotfoundException('Event not found');
    }
    return event;
  }

  async getEvents(queryString: any): Promise<Event[]> {
    const query = queryString as IEventQuery;
    return await this.eventRepository.getEvents(query);
  }
}
