import { Classificationproduct } from './Classificationproduct.interface';

export interface Products {
  id?: number;
  name: string;
  description: string;
  price: string;
  status: boolean;
  type_id: number;
  created_at?: string;
  updated_at?: string;
  ratings_count?: number;
  classificationproducts: Classificationproduct[];
}

