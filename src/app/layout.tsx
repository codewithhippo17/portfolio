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
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {/* Ambient Glow / Spotlights */}
        <div className="fixed top-[-10%] right-[-5%] -z-10 w-[500px] h-[500px] rounded-full bg-ctp-mauve opacity-[0.15] blur-[120px] pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[-10%] -z-10 w-[600px] h-[600px] rounded-full bg-ctp-blue opacity-[0.10] blur-[150px] pointer-events-none"></div>
        
        <Nav />
        <div className="max-w-xl mx-auto w-full px-6 flex flex-col flex-grow">
          <main className="flex-grow pb-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
