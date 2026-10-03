import { User } from "../store/use-auth-store";
import { LoginInput, RegisterInput } from "../validations/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001';

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: User;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    message: string;
}

export async function loginUser(credentials: LoginInput): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.title || 'Invalid email or password');
    }

    return data;
}

export async function registerUser(credentials: RegisterInput): Promise<AuthResponse> {
    const { confirmPassword, ...payload } = credentials;

    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.title || 'Registration failed. Please check your details.');
    }

    return data;
}

export async function logoutUser(refreshToken: string): Promise<void> {
    try {
    await fetch(`${API_BASE_URL}/Auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
}