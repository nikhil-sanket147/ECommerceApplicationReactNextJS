import { Product } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001'

const DEFAULT_IMAGE =
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80';

export async function getProducts(categoryId?: string): Promise<Product[]> {
    try {
        const endpoint = categoryId
            ? `${API_BASE_URL}/Product/category/${categoryId}`
            : `${API_BASE_URL}/Product`;

        console.log('--- Fetching Products from:', endpoint);
        const res = await fetch(endpoint, {
            cache: 'no-store'
        });

        console.log('--- Product response status:', res.status);
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const data: Product[] = await res.json();
        console.log('--- Products loaded count:', data.length);

        return data.map((item) => ({
            ...item,
            imageUrl: item.imageUrl || DEFAULT_IMAGE,
        }));
    }
    catch (error) {
        console.error('CRITICAL: Error fetching products from .NET:', error);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/Product/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return null;
        }

        const data: Product = await res.json();
        return {
            ...data,
            imageUrl: data.imageUrl || DEFAULT_IMAGE,
        };
    } catch (error) {
        console.error(`Error in getProductById(${id}):`, error);
        return null;
    }
}