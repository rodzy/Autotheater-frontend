import { Tickets } from './Tickets.interface';
import { Products } from './Products.interface';
export interface Reservation {
  id?: number;
  date_now: string;
  tax: number;
  total: number;
  status?: boolean;
  billboard_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  tickets: Tickets[];
  products: Products[];
}
