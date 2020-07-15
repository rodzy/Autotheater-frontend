export interface Movie {
  id: number;
  name: string;
  sinopsis: string;
  image: string;
  banner: string;
  status: boolean;
  classification_id: number;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  movie_id: number;
  genre_id: number;
}
