export interface Products {
  id: number;
  name: string;
  description: string;
  price: string;
  status: boolean;
  type_id: number;
  created_at: string;
  updated_at: string;
  ratings_count?: number;
  classificationproducts: Classificationproduct[];
}

export interface Classificationproduct {
  id: number;
  type: string;
  description: string;
  pricetotal: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  product_id: number;
  classification_product_id: number;
}
