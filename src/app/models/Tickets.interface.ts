export interface Tickets {
  id?: number;
  name: string;
  description: string;
  pricing: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}
