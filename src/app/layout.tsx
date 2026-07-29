import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SidePanel from "@/components/SidePanel";
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
  title: "Hamza El Haiba",
  description: "Full-stack engineer building scalable web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`macchiato ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <Nav />
        <div className="max-w-2xl mx-auto w-full px-6 flex flex-col flex-grow relative xl:after:content-[''] xl:after:absolute xl:after:top-16 xl:after:bottom-16 xl:after:-right-12 xl:after:w-px xl:after:bg-ctp-surface-0/50">
          <main className="flex-grow pt-16 pb-16">{children}</main>
          <Footer />

          {/* Side panel — Scratchpad / Hire Me */}
          <SidePanel />
        </div>
      </body>
    </html>
  );
}
