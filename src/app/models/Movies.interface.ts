import { Genre } from './Genre.interface';
export interface Movie {
  id?: number;
  name: string;
  sinopsis: string;
  image: string;
  banner: string;
  status: boolean;
  classification_id: number;
  created_at?: string;
  updated_at?: string;
  likes_count?: number;
  genres: Genre[];
}
