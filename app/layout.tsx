import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// C'est ici qu'on gère le référencement (SEO) et le Logo de l'onglet
export const metadata: Metadata = {
  title: "Blue Energy | Officiel",
  description: "Découvrez la nouvelle collection Blue Energy. Streetwear premium conçu à Yaoundé. Hoodies, T-shirts et accessoires de luxe.",
  keywords: ["Blue Energy", "Streetwear Cameroun", "Mode Yaoundé", "Vêtements luxe", "237"],
  icons: {
    icon: "/images/logo.jpeg", // <--- C'est ça qui remplace le logo React dans l'onglet !
    apple: "/images/logo.jpeg", // Pour les iPhone
  },
  openGraph: {
    title: "Blue Energy - Collection 2026",
    description: "Le nouveau standard du streetwear au Cameroun.",
    images: ["/images/logo.jpeg"], // Image qui s'affiche quand on partage sur WhatsApp/FB
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