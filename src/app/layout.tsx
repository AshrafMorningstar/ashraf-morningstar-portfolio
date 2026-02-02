/*
 * Copyright (c) 2022-2026 Ashraf Morningstar
 * These are personal recreations of existing projects, developed by Ashraf Morningstar for learning and skill development.
 * Original project concepts remain the intellectual property of their respective creators.
 */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono', // Ensure variable name matches CSS
  display: 'swap',
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashraf Morningstar | Elite Web Developer & System Architect",
  description: "Elite web developer specializing in high-performance, ultra-secure web applications and viral digital experiences.",
  keywords: ["web developer", "system architect", "security", "Next.js", "React", "Ashraf Morningstar"],
  authors: [{ name: "Ashraf Morningstar" }],
  creator: "Ashraf Morningstar",
};

import { SplashScreen } from "@/components/ui/SplashScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${syne.variable} ${jetbrainsMono.variable}`}>
        <SplashScreen />
        <Navbar />
        <main className="min-h-screen pt-[var(--header-height)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
