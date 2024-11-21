import { Request, Response, NextFunction } from 'express';
import SeatService from './seatService';
import { SuccessResponse } from '@utils';
export default class SeatController {
  private seatService: SeatService;

  constructor(seatService: SeatService) {
    this.seatService = seatService;
  }

  getSeats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const seats = await this.seatService.getSeats();
      res
        .status(200)
        .json(new SuccessResponse('Seats retrieved successfully', seats));
    } catch (error) {
      next(error);
    }
  };
}
