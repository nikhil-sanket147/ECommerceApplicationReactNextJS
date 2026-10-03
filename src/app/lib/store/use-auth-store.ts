import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    role: 'customer' | 'admin' | string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string, refreshToken: string, user: User) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        setAuth: (token, refreshToken, user) => {
            set({ user, token, refreshToken, isAuthenticated: true });
            if (typeof document !== 'undefined') {
                document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
            }
        },
        clearAuth: () => {
            set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
            if (typeof document !== 'undefined') {
                document.cookie = 'auth_token=; path=/; max-age=0;';
            }
        },
    }),
        {
            name: 'ecommerce-auth-storage'
        }
    ));