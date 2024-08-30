import { z } from "zod";


export const signUpSchema = z.object({
    Identifier: z.string(),
    password: z.string().min(8, {message: 'Password must be more than 8 letters'}).max(16, {message: 'Password must be less than 16 characters'})
}) 