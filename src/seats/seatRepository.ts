import { prisma } from '@datasource';
import { EventSeat, Seat } from '@prisma/client';
import { ISeat } from './seatInterface';

export default class SeatRepository {
  async createSeats(seats: ISeat[]): Promise<any> {
    return await prisma.seat.createMany({
      data: seats,
    });
  }

  async getSeatsByEventId(eventId: string): Promise<EventSeat[]> {
    return await prisma.eventSeat.findMany({
      where: {
        eventId,
      },
    });
  }

  async getSeats(): Promise<Seat[]> {
    return await prisma.seat.findMany();
  }
}
