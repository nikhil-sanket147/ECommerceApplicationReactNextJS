'use client';

import { useCartStore } from "@/app/lib/store/use-cart-store";
import { Product } from "@/app/lib/types";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export default function AddToCartButton({
  product,
  quantity = 1,
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      disabled={product.stockQuantity === 0}
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
        product.stockQuantity === 0
          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
          : added
            ? "bg-emerald-600 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"
      }`}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Added!</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>
            {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
          </span>
        </>
      )}
    </button>
  );
}
