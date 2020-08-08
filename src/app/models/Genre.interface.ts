export interface Genre {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  pivot?: Pivot;
}

export interface Pivot {
  movie_id: number;
  genre_id: number;
}
