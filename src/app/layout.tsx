import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
      <body className="min-h-full flex flex-col relative">
        {/* Subtle Dot Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
        
        <Nav />
        {/* Widened from max-w-xl to max-w-2xl */}
        <div className="max-w-2xl mx-auto w-full px-6 flex flex-col flex-grow">
          <main className="flex-grow pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
