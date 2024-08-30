import { Resend } from 'resend';
import { ApiResponseTypes } from "@/type/ApiResponseTypes";
import VerificationEmail from '../../emailTemplates/verificationEmail';
export async function sendVerificationEmail(
    email: string,
    username: string,
    otpCode: string
): Promise<ApiResponseTypes> {
    const resend = new Resend('re_123456789');

    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'hello world',
            react: VerificationEmail({username, otp: otpCode}),
          });

        const response: ApiResponseTypes = {
            success: true,
            message: "Verification email sent successfully",
        };

        return response;
    } catch (error) {
        console.log("Email Verification Failed", error);
        return {
            success: false,
            message: "Email Verification Failed",
        };
    }
}
