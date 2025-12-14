import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blue Energy | Elevate Your Standard",
  description: "Découvrez la nouvelle collection Blue Energy 2026. Streetwear premium conçu à Yaoundé.",
  keywords: ["Blue Energy", "Streetwear Cameroun", "Mode Yaoundé", "Vêtements luxe", "237"],
  icons: {
    icon: "/logo.JPEG", 
    apple: "/logo.JPEG",
  },
  openGraph: {
    title: "Blue Energy - Collection 2026",
    description: "Le nouveau standard du streetwear au Cameroun.",
    images: ["/logo.JPEG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}