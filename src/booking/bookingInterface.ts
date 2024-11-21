export interface IBooking extends IUser, IEventSeat {}

export interface IEventSeat {
  eventId: string;
  seatId: string;
}

export interface IUser {
  name: string;
  email: string;
}
