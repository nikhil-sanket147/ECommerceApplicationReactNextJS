export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
  imageUrl?: string;
}

export interface CartItem extends Product{
  quantity: number;
}

export interface Category {
  id: string;
  name:String;
}