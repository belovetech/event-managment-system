import EventRepository from './eventRepository';
import EventService from './eventService';
import EventController from './eventController';
import EventRoute from './eventRoute';

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);
const eventRoute = new EventRoute(eventController);

export default eventRoute;
