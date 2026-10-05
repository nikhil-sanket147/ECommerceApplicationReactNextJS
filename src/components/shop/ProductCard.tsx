'use client';
import { Product } from "@/app/lib/types";
import { Link } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group relative flex flex-col bg-white/90 backdrop-blur-md border 
        border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl 
        transition-all duration-300 hover:-translate-y-1"
    >
      <Link
        className="relative h-48 w-full overflow-hidden bg-slate-100"
        href={`/products/${product.id}`}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-md rounded-full text-slate-700 border border-slate-200/60 shadow-xs">
          {product.categoryName || "General"}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-base line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Price
            </span>
            <span className="text-lg font-black text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
