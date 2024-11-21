import BookingRepository from './bookingRepository';
import { IBooking } from './bookingInterface';
import { ConflictException, NotfoundException } from '@exception';
import { Ticket } from '@prisma/client';

export default class BookingService {
  private bookingRepository: BookingRepository;

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async createBooking(booking: IBooking): Promise<any> {
    const userData = { email: booking.email, name: booking.name };
    const eventData = { eventId: booking.eventId, seatId: booking.seatId };
    const user = await this.bookingRepository.createUser(userData);

    const eventSeatAvailable =
      await this.bookingRepository.checkEventSeatAvailability(eventData);
    if (!eventSeatAvailable) {
      throw new ConflictException('Event seat is already booked');
    }

    const ticket = await this.bookingRepository.createBooking(eventData);

    return { ticket, user };
  }

  async getTicketById(ticketId: string): Promise<Ticket | null> {
    const ticket = await this.bookingRepository.getTicketById(ticketId);
    if (!ticket) {
      throw new NotfoundException('Ticket not found');
    }
    return ticket;
  }
}
