import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { getProductById } from '@/app/lib/api/products';
import AddToCartButton from '@/components/shop/AddToCartButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 mb-8 transition" href="/products">
        <ArrowLeft className="w-4 h-4"/>
        Back to all products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xs">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
              {product.categoryName || 'General'}
            </span>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                In Stock: {product.stockQuantity}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            <div className="text-3xl font-extrabold text-slate-900 pt-4">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 space-y-6 pt-6 border-t border-slate-100">
            <div className="w-full sm:w-60">
              <AddToCartButton product={product}/>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-slate-600 text-xs">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck className="w-5 h-5 text-indigo-600"/>
                <span>Free delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-indigo-600"/>
                <span>7-day returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-indigo-600"/>
                <span>Authentic items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}