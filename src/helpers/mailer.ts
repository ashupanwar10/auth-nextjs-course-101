import nodemailer from "nodemailer";
import User from "@/models/userModel";
// for token and encryption
import bcryptjs from "bcryptjs";

interface SendEmailProps {
    email: string;
    emailType: "verify" | "reset";
    userId: string;
}

export const sendEmail = async ({
    email,
    emailType,
    userId,
}: SendEmailProps) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "verify") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "reset") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
                // TODO: add these in environment variable file
            },
        });

        const mailOptions = {
            from: "initkloud@nodemailer.com",
            to: email,
            subject:
                emailType === "verify"
                    ? "VERIFICATION: Verify your email"
                    : "PASSWORD RESET: Reset your password",
            html: `<p>Click <a href="${
                process.env.DOMAIN_URL
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "verify" ? "verify" : "reset"
            } your account</p>

            <p>You can also copy the link from here: ${
                process.env.DOMAIN_URL
            }/verifyemail?token=${hashedToken}</p>


            <p>This link will expire in 1 hour.</p>   
            <p>If you did not request this email, please ignore it.</p>
             `,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
