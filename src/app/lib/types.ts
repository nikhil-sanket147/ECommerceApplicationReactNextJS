export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  stockQuantity?: number;
  categoryId?: string | number;
  categoryName?: string;
  imageUrl?: string;
}