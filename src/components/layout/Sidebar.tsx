'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  X, 
  Home, 
  ShoppingBag, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import { logoutUser } from "@/app/lib/api/auth";
import { useAuthStore } from "@/app/lib/store/use-auth-store";
import { useUIStore } from "@/app/lib/store/use-ui-store";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const { user, refreshToken, isAuthenticated, clearAuth } = useAuthStore();

  const isAuthPage = pathname === '/login' ||
  pathname === '/register';
  if(!isSidebarOpen || isAuthPage || !isAuthenticated) return null;

  if (!isSidebarOpen) return null;

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
      closeSidebar();
      router.push('/login');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'All Products', href: '/products', icon: ShoppingBag },
  ];

  const categories = [
    'Electronics',
    'Accessories',
    'Wearables',
    'Lifestyle',
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop */}
      <div 
        onClick={closeSidebar} 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer */}
      <aside className="relative flex flex-col w-72 max-w-[80vw] h-full bg-white shadow-2xl z-10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <span className="font-black text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ShopNext
          </span>
          <button 
            onClick={closeSidebar} 
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card inside Sidebar */}
        <div className="py-4 my-2 border-b border-slate-100">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">
                {user.firstName?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Welcome! Please sign in to manage orders.</p>
          )}
        </div>

        {/* Primary Links */}
        <div className="space-y-1 py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="pt-4 pb-2">
          <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 px-3 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Categories
          </p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                onClick={closeSidebar}
                className="block px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Actions / Auth */}
        <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={closeSidebar}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={closeSidebar}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}