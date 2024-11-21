import { Router } from 'express';
import { IRoute } from '@interfaces';
import SeatController from './seatController';

export default class SeatRoute implements IRoute {
  path = '/seats';
  router = Router();
  seatController: SeatController;

  constructor(seatController: SeatController) {
    this.seatController = seatController;
    this.assignControllers();
  }

  private assignControllers(): void {
    this.router.get(`${this.path}`, this.seatController.getSeats);
  }
}
