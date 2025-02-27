import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import CategoryUi from "@/components/Ui/CategoryUi";

export const metadata: Metadata = {
  title: "QnA",
  description: "Hi",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} font-sans text-gray-100  bg-bgColor `}
      >
        <CategoryUi />
        {children}
      </body>
    </html>
  );
}
