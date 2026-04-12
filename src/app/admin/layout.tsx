import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
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
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <div className="flex min-h-screen">
          <aside className="hidden lg:block min-w-24 border-r border-gray-200 bg-slate-950 text-slate-100 transition-all duration-300">
            <Sidebar />
          </aside>

          <main className="flex-1 bg-slate-50 transition-all duration-300">
            <Header />
            <div className="max-w-6xl mx-auto p-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
