export interface IEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
  endDate: Date;
}

export interface IEventQuery {
  open: 'true' | 'false';
  limit: number;
  offset: number;
  search: string;
}
