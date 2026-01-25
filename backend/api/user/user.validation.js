import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').trim(),
    email: z.string().email('Invalid email').toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    role: z.enum(['admin', 'driver']).default('driver')
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email').toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

export const updateUserSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional()
});
