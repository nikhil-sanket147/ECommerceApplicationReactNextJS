import { useAuthStore } from "@/app/lib/store/use-auth-store";
import { Link, LogOut, Store, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  // const totalItems
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  });

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-indigo-600"
        >
          <Store>
            <span>ShopNext</span>
          </Store>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Products
          </Link>

          {mounted && isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900 bg-gray-100 py-1 px-3 rounded-full">
                <UserIcon className="w-3.5 h-3.5 text-gray-500" />
                {user.name}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-indigo-600 transition"
          >
            {/* <ShoppingCart className="w-6 h-6" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )} */}
          </Link>
        </nav>
      </div>
    </header>
  );
}
