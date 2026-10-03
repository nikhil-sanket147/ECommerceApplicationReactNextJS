import Link from 'next/link';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 py-28 text-center overflow-hidden">
        {/* Backdrop Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative space-y-6 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-50 border border-indigo-200/80 rounded-full shadow-sm">
            Next.js App Router & React 19
          </span>

          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl leading-tight">
            Next-Gen Commerce,{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Elevated.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Experience ultra-fast shopping powered by server-side rendering, instant Zustand state transitions, and type-safe validation.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/25 transition duration-200"
            >
              Browse Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-200 shadow-sm transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-500/10 text-indigo-600 rounded-2xl mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Server Components</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Zero client JavaScript overhead for catalog rendering and maximum SEO indexing.
            </p>
          </div>

          <div className="p-8 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-500/10 text-purple-600 rounded-2xl mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Zustand Persistence</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Cart data synchronizes instantly across views with zero lag and persistent storage.
            </p>
          </div>

          <div className="p-8 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 flex items-center justify-center bg-pink-500/10 text-pink-600 rounded-2xl mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Zod Type Safety</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Strict schema validation guarding registration, login, and checkout input data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}