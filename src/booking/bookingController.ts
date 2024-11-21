import { NextFunction, Request, Response } from 'express';
import BookingService from './bookingService';
import { bookingSchema } from './bookingSchema';
import { BadRequestException } from '@exception';
import { SuccessResponse } from '@utils';

export default class BookingController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = req.body;
      const payload = bookingSchema.validate(booking);

      if (payload.error) {
        return next(new BadRequestException(payload.error.message));
      }

      const newBooking = await this.bookingService.createBooking(payload.value);
      res
        .status(201)
        .json(new SuccessResponse('Booking created successfully', newBooking));
    } catch (error) {
      return next(error);
    }
  };

  getTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketId = req.params.id;
      const ticket = await this.bookingService.getTicketById(ticketId);
      res
        .status(200)
        .json(new SuccessResponse('Ticket fetched successfully', ticket));
    } catch (error) {
      return next(error);
    }
  };
}
