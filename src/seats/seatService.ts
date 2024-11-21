import SeatRepository from './seatRepository';
import { ISeat } from './seatInterface';
import { EventSeat, Seat } from '@prisma/client';

export default class SeatService {
  private seatRepository: SeatRepository;

  constructor(seatRepository: SeatRepository) {
    this.seatRepository = seatRepository;
  }

  async createSeats(seats: ISeat[]): Promise<any> {
    return await this.seatRepository.createSeats(seats);
  }

  async getSeatsByEventId(eventId: string): Promise<EventSeat[]> {
    return await this.seatRepository.getSeatsByEventId(eventId);
  }

  async getSeats(): Promise<Seat[]> {
    return await this.seatRepository.getSeats();
  }
}
