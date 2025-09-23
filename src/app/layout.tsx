//src/app/layout.sx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import { Poppins } from "next/font/google";
import ProtectedLayout from "@/auth/ProtectedLayout";
import logo from "@/assets/portal-logo.png"
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Well Management System",
  description: "Well Management System",
  icons: {
    icon: "/portal-logo.png", // ✅ custom logo
    shortcut: "/portal-logo.png",
    apple: "/portal-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
