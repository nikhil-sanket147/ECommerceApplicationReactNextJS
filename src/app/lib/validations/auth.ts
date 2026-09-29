import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    name: z.string().trim().min(2, 'Name must be atleast of 2 characters'),
    email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });


    export type LoginInput = z.infer<typeof loginSchema>;
    export type RegisterInput = z.infer<typeof registerSchema>;