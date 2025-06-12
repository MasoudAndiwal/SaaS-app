import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});
import { ClerkProvider } from '@clerk/nextjs'
export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

  /**
   * The root layout component.
   *
   * This component wraps the entire app and handles things like the global font
   * and the Clerk authentication provider.
   *
   * @param {React.ReactNode} children - The children to be rendered inside the root layout.
   * @returns {JSX.Element} - The root layout.
   */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{variables:{colorPrimary: '#fe5933'}}} >
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
