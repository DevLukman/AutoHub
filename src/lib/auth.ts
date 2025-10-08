import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod } from "better-auth/plugins";
import { Resend } from "resend";
import ForgotPasswordEmail from "../components/ForgetPasswordEmail";
const now = new Date();
const requestedAt = now
  .toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  .replace(",", " at");
const resend = new Resend(process.env.RESEND_API_KEY as string);
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: "AutoHub <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset your password",
          react: ForgotPasswordEmail({
            username: user.name,
            resetUrl: url,
            userEmail: user.email,
            companyName: "Auto Hub",
            logoUrl: "https://yourapp.com/logo.png",
            supportEmail: "support@AutoHub.com",
            companyAddress: "456 Tech Avenue, San Francisco, CA 94105",
            requestedAt,
          }),
        });
      } catch (error) {
        console.error("Failed to send reset email:", error);
        throw new Error("Failed to send reset email");
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [lastLoginMethod(), nextCookies()],
});
