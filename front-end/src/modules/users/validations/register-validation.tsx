import {z} from 'zod';

// Enhanced registration schema with better validation
export const registerSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim()
    .refine(val => /^[a-zA-Z\s]+$/.test(val), {
      message: "Name should only contain letters and spaces"
    }),
  
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .refine(val => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter"
    })
    .refine(val => /[0-9]/.test(val), {
      message: "Password must contain at least one number"
    }),
});

// Enhanced login schema with consistent validation
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters')
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;