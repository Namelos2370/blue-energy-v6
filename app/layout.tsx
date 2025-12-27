import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import { PromoProvider } from "../context/PromoContext"; // <--- NOUVEAU

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blue Energy | Vision 2026",
  description: "Streetwear Premium Designed in Cameroon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <PromoProvider> {/* <--- ON ENTOURE ICI */}
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
          </PromoProvider>
        </CartProvider>
      </body>
    </html>
  );
}