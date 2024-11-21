import App from '@app';
import { eventRoute } from '@events';
import { bookingRouter } from '@booking';
import { seatRoute } from '@seats';

const app = new App([eventRoute, bookingRouter, seatRoute]);
app.listen();
