import { NextFunction, Request, Response } from 'express';
import EventService from './eventService';
import { eventSchema } from './eventSchema';
import { BadRequestException } from '@exception';

export default class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = req.body;
      const payload = eventSchema.validate(event);

      if (payload.error) {
        return next(new BadRequestException(payload.error.message));
      }

      const newEvent = await this.eventService.createEvent(event);
      res.status(201).json({
        success: true,
        message: 'Event created successfully',
        data: newEvent,
      });
    } catch (error) {
      return next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const event = await this.eventService.getEventById(id);
      res.status(200).json({
        success: true,
        message: 'Event fetched successfully',
        data: event,
      });
    } catch (error) {
      return next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await this.eventService.getEvents(req.query);
      res.status(200).json({
        success: true,
        message: 'Events fetched successfully',
        data: events,
      });
    } catch (error) {
      return next(error);
    }
  };
}
