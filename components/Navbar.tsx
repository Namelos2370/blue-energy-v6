"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calcul du nombre total d'articles
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 h-16">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2">
           {/* Assure-toi que logo.jpg est bien dans le dossier public */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-900">
            <Image src="/logo.jpg" alt="Logo" fill className="object-cover" /> 
          </div>
          <span className="font-black text-lg tracking-tighter">BLUE ENERGY</span>
        </Link>

        {/* 2. MENU BUREAU (Caché sur mobile) */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/" className="hover:text-blue-600 transition">ACCUEIL</Link>
          <Link href="/#collection" className="hover:text-blue-600 transition">COLLECTION</Link>
          <Link href="/admin/promos" className="hover:text-blue-600 transition text-gray-400">ADMIN</Link>
        </div>

        {/* 3. ICONES (Panier + Menu Mobile) */}
        <div className="flex items-center gap-4">
          {/* Panier */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Bouton Menu Mobile */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. MENU MOBILE (S'ouvre quand on clique) */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4 md:hidden flex flex-col gap-4 shadow-xl">
          <Link 
            href="/" 
            className="font-bold text-lg py-2 border-b border-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            ACCUEIL
          </Link>
          <Link 
            href="/cart" 
            className="font-bold text-lg py-2 border-b border-gray-50 flex justify-between items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            PANIER
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {totalItems} articles
            </span>
          </Link>
           <Link 
            href="/admin/promos" 
            className="font-bold text-sm text-gray-400 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            DASHBOARD ADMIN
          </Link>
        </div>
      )}
    </nav>
  );
}