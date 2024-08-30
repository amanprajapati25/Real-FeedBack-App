// Verify Schema it is used to verify the OTP send to the user on email

import {z} from "zod";

export const verifySchemaValidation = z.object({
    otpCode: z.string().length(6,'OTP must of six digit')
})
