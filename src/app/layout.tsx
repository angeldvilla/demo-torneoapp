import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  description: "Noticias, resultados y estadísticas de torneos deportivos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-linear-to-br from-gray-50 to-blue-50 text-gray-900">
        {/* MAIN */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
