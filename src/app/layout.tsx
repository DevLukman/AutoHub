import type { Metadata } from "next";
import { Inter, Nosifer } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontInter.variable} ${fontNosifer.variable} bg-secondary text-primary font-inter antialiased`}
      >
        <main>{children}</main>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
