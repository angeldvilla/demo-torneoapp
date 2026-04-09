// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TorneoApp",
  description: "Gestión de torneos de fútbol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100 text-gray-900">
        {/* HEADER */}
        <Header />

        {/* MAIN */}
        <main className="flex-1">
          <div className="max-w-5xl mx-auto p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
