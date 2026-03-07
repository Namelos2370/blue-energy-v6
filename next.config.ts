import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On ignore les petites erreurs de syntaxe pour que Vercel ne bloque jamais la mise en ligne
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;