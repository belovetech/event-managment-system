import { NextFunction, Request, Response, Router } from 'express';
import { IRoute } from '@interfaces';
import BookingController from './bookingController';

export default class BookingRoute implements IRoute {
  path = '/bookings';
  router = Router();
  bookingController: BookingController;

  constructor(bookingController: BookingController) {
    this.bookingController = bookingController;
    this.assignControllers();
  }

  private assignControllers(): void {
    this.router.post(`${this.path}`, this.bookingController.createBooking);
    this.router.get(`${this.path}/:id`, this.bookingController.getTicketById);
  }
}
