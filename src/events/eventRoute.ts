import { Router } from 'express';
import { IRoute } from '@interfaces';
import EventController from './eventController';

export default class EventRoute implements IRoute {
  path = '/events';
  router = Router();
  eventController: EventController;

  constructor(eventController: EventController) {
    this.eventController = eventController;
    this.assignControllers();
  }

  private assignControllers(): void {
    this.router.post(`${this.path}`, this.eventController.create);
    this.router.get(`${this.path}/:id`, this.eventController.show);
    this.router.get(`${this.path}`, this.eventController.list);
  }
}
