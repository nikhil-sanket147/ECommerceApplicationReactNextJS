import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: String, token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (email, token, user) => {
            set({ user, token, isAuthenticated: true });
            document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
        },
        logout: () => {
            set({ user: null, token: null, isAuthenticated: false });
            document.cookie = 'auth_token=; path=/; max-age=0;';
        },
    }),
        {
            name: 'ecommerce-auth-storage'
        }
    ));