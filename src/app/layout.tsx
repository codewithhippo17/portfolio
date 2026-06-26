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
      <body className="min-h-full flex flex-col">
        <Nav />
        <div className="max-w-4xl mx-auto w-full px-6 flex flex-grow gap-12">
          {/* Main Content Column */}
          <div className="flex-grow min-w-0 flex flex-col">
            <main className="flex-grow pb-16">{children}</main>
            <Footer />
          </div>

          {/* Right Sidebar (TOC Placeholder) */}
          <aside className="hidden lg:block w-48 flex-shrink-0 pt-4">
            <div className="sticky top-24">
              <h4 className="text-xs font-semibold text-ctp-text uppercase tracking-wider mb-4">On this page</h4>
              <div className="space-y-3 text-sm text-ctp-subtext-0">
                <div className="hover:text-ctp-text cursor-pointer transition-colors">Overview</div>
                <div className="hover:text-ctp-text cursor-pointer transition-colors">Architecture</div>
                <div className="hover:text-ctp-text cursor-pointer transition-colors">Trade-offs</div>
                <div className="hover:text-ctp-text cursor-pointer transition-colors">Conclusion</div>
              </div>
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
