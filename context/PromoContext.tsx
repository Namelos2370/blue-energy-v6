"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Définition d'un Code Promo
export type PromoCode = {
  code: string;
  type: "percent" | "fixed"; // % ou montant fixe
  value: number; // ex: 10 pour 10%
  active: boolean;
};

// 2. Les codes par défaut (Ceux qui marchent tout le temps)
const DEFAULT_PROMOS: PromoCode[] = [
  { code: "VISION10", type: "percent", value: 10, active: true },
  { code: "VIP2026", type: "fixed", value: 2000, active: true }, // Exemple: -2000 FCFA
];

interface PromoContextType {
  promos: PromoCode[];
  appliedPromo: PromoCode | null;
  discountAmount: number;
  applyPromo: (code: string, subtotal: number) => { success: boolean; message: string };
  removePromo: () => void;
  addPromo: (newPromo: PromoCode) => void; // Pour le Dashboard
  deletePromo: (code: string) => void; // Pour le Dashboard
}

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export const PromoProvider = ({ children }: { children: React.ReactNode }) => {
  const [promos, setPromos] = useState<PromoCode[]>(DEFAULT_PROMOS);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Charger les codes sauvegardés (si tu en ajoutes depuis le dashboard)
  useEffect(() => {
    const saved = localStorage.getItem("be_promos");
    if (saved) {
      setPromos(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder quand on modifie la liste
  const savePromos = (newList: PromoCode[]) => {
    setPromos(newList);
    localStorage.setItem("be_promos", JSON.stringify(newList));
  };

  const applyPromo = (code: string, subtotal: number) => {
    const promo = promos.find((p) => p.code === code.toUpperCase() && p.active);

    if (!promo) {
      return { success: false, message: "Code invalide ou expiré ❌" };
    }

    let discount = 0;
    if (promo.type === "percent") {
      discount = (subtotal * promo.value) / 100;
    } else {
      discount = promo.value;
    }

    setAppliedPromo(promo);
    setDiscountAmount(discount);
    return { success: true, message: `Code ${promo.code} appliqué ! ✅` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
  };

  // Fonctions pour le Dashboard
  const addPromo = (newPromo: PromoCode) => {
    const updated = [...promos, { ...newPromo, code: newPromo.code.toUpperCase() }];
    savePromos(updated);
  };

  const deletePromo = (code: string) => {
    const updated = promos.filter((p) => p.code !== code);
    savePromos(updated);
  };

  return (
    <PromoContext.Provider value={{ promos, appliedPromo, discountAmount, applyPromo, removePromo, addPromo, deletePromo }}>
      {children}
    </PromoContext.Provider>
  );
};

export const usePromo = () => {
  const context = useContext(PromoContext);
  if (!context) throw new Error("usePromo must be used within a PromoProvider");
  return context;
};