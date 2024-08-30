import { z } from "zod";

const usernameValidation = z.string()
                        .min(4,"Username must be more than 4 char")
                        .max(10, "Username must be less than 10  charters")
                        // .regex(,'')

export const signUpSchema = z.object({
    usename: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    password: z.string().min(8, {message: 'Password must be more than 8 letters'}).max(16, {message: 'Password must be less than 16 characters'})
}) 