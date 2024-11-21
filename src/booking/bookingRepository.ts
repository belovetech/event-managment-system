import { prisma } from '@datasource';
import { IEventSeat, IUser } from './bookingInterface';
import { EventSeat, Ticket, User } from '@prisma/client';

export default class BookingRepository {
  async createBooking(booking: IEventSeat): Promise<any> {
    const eventSeat = await this.createEventSeat(booking);
    const ticket = await prisma.ticket.create({
      data: { eventSeatId: eventSeat.id },
      select: {
        eventSeat: {
          select: {
            event: true,
            seat: true,
            ticket: true,
          },
        },
      },
    });

    return ticket;
  }

  private async createEventSeat(booking: IEventSeat): Promise<EventSeat> {
    return await prisma.eventSeat.create({
      data: {
        eventId: booking.eventId,
        seatId: booking.seatId,
      },
    });
  }

  async checkEventSeatAvailability(booking: IEventSeat): Promise<boolean> {
    const eventSeat = await prisma.eventSeat.findFirst({
      where: {
        seatId: booking.seatId,
        eventId: booking.eventId,
      },
    });

    if (eventSeat) {
      return false;
    }

    return true;
  }

  async getTicketById(ticketId: string): Promise<Ticket | null> {
    return await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
  }

  async createUser(user: IUser): Promise<User> {
    const userAlreadyExist = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userAlreadyExist) {
      return userAlreadyExist;
    }

    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  }
}
