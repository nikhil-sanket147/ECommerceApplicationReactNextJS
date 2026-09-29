import Link from 'next/link';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-50 rounded-full border border-indigo-200">
          Next.js App Router & React 19
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl max-w-4xl mx-auto">
          Modern Commerce, Built for <span className="text-indigo-600">Peak Performance</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Server-rendered product catalog, lightning-fast cart persistence with Zustand, and responsive design.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition"
          >
            Browse Products
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="w-full bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Server Side Rendered</h3>
              <p className="text-sm text-gray-500 mt-1">SEO optimized product pages with instantaneous initial page loads.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Client-Side Store</h3>
              <p className="text-sm text-gray-500 mt-1">Zustand global cart with local storage persistence across sessions.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Type-Safe Forms</h3>
              <p className="text-sm text-gray-500 mt-1">Validated checkout and authentication flows using Zod schemas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}