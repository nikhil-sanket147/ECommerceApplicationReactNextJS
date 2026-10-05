'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Store, UserIcon, LogOut, Menu } from 'lucide-react';
import { logoutUser } from '@/app/lib/api/auth';
import { useAuthStore } from '@/app/lib/store/use-auth-store';
// import { useCartStore } from '@/app/lib/store/use-cart-store';
import { useUIStore } from '@/app/lib/store/use-ui-store';

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  // const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, refreshToken, isAuthenticated, clearAuth } = useAuthStore();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = pathName === '/login' || pathName === '/register';
  if(!mounted || isAuthPage || !isAuthenticated){
    return null;
  }

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Sidebar Toggle + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 font-black text-xl text-indigo-600 hover:text-indigo-700 transition"
          >
            <Store className="w-6 h-6" />
            <span className="hidden sm:inline">ShopNext</span>
          </Link>
        </div>

        {/* Right: Navigation, User Profile, and Cart */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Products
          </Link>

          {mounted && isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-100 py-1.5 px-3 rounded-full border border-slate-200">
                <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="max-w-[100px] truncate">{user.firstName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition p-1 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-block text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}

          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-indigo-600 transition rounded-xl hover:bg-slate-100"
          >
            {/* <ShoppingCart className="w-5 h-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )} */}
          </Link>
        </nav>
      </div>
    </header>
  );
}