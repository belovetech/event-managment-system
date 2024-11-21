import SeatController from './seatController';
import SeatRepository from './seatRepository';
import SeatRoute from './seatRoute';
import SeatService from './seatService';

const seatRepository = new SeatRepository();
const seatService = new SeatService(seatRepository);
const seatController = new SeatController(seatService);
const seatRoute = new SeatRoute(seatController);

export { seatRoute };
