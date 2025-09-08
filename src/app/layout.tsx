import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Nosifer } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUser } from "../lib/action";
import "./globals.css";
const fontInter = Inter({
  variable: "--font-inter",
  weight: "400",
  subsets: ["latin"],
});
const fontNosifer = Nosifer({
  variable: "--font-nosifer",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Hub | Home for AutoMobile",
  description: "Your Best Automobile Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkUser();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontInter.variable} ${fontNosifer.variable} bg-secondary text-primary font-inter antialiased`}
        >
          <main>{children}</main>
          <ToastContainer position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
