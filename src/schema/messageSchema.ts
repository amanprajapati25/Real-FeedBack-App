import {z} from "zod"

export const acceptMessageSchema = z.object({
    content: z.string().min(5,'Minimum 5 letters Required').max(300,"Cannot be more than 300 letters")
})