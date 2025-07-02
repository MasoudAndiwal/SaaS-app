import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EstateFlow - Modern Real Estate Platform",
  description: "Find your dream home with our modern real estate platform. Buy, sell, and rent properties with ease.",
  keywords: ["real estate", "homes", "buy", "sell", "rent", "properties"],
  authors: [{ name: "EstateFlow" }],
  openGraph: {
    title: "EstateFlow - Modern Real Estate Platform",
    description: "Find your dream home with our modern real estate platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
