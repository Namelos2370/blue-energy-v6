"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Définition du type d'article dans le panier
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

// 2. Définition des fonctions disponibles
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // CHARGEMENT DU PANIER (Au démarrage)
  useEffect(() => {
    const savedCart = localStorage.getItem("be_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // SAUVEGARDE DU PANIER (À chaque modification)
  useEffect(() => {
    localStorage.setItem("be_cart", JSON.stringify(cart));
  }, [cart]);

  // AJOUTER UN ARTICLE
  const addToCart = (product: any, size: string) => {
    setCart((prev) => {
      // Vérifie si l'article existe déjà (même ID et même TAILLE)
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      
      if (existing) {
        // Si oui, on augmente la quantité
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Sinon, on ajoute le nouveau produit
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        size, 
        quantity: 1 
      }];
    });
  };

  // RETIRER UN ARTICLE
  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  // MODIFIER LA QUANTITÉ
  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  // VIDER LE PANIER
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le panier partout
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};