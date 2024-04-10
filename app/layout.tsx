import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export const metadata: Metadata = {
  title: 'Sprintify',
  description: "Scrum Manager App",
  icons: [{url: 'favicon.ico'}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  );
}
