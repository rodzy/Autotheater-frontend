import { Tickets } from './Tickets.interface';
export interface Billboard {
  id?: number;
  date_now: string;
  show_date: string;
  status: boolean;
  capacity: number;
  movie_id: number;
  location_id: number;
  tickets: Tickets[];
  created_at?: string;
  updated_at?: string;
}
