import { PackageOpen } from "lucide-react";
import { getProducts } from "../lib/api/products";
import ProductCard from "@/components/shop/ProductCard";

export const metadata = {
  title: "Products | ShopNext",
  description: "Explore product directly from the database",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Catalog
          </span>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
            Live Store Products
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          showing {products.length} products loaded from microservice.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200">
          <PackageOpen className="w-12 h-12 text-slate-400 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">
            No products found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mt-1">
            Ensure your .NET Product Service and YARP reverse proxy are running.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
