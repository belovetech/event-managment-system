import BookingController from './bookingController';
import BookingRepository from './bookingRepository';
import BookingRoute from './bookingRoute';
import BookingService from './bookingService';

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);
const bookingRouter = new BookingRoute(bookingController);

export { bookingRouter };
