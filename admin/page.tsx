"use client";

import { useCart } from "@/context/CartContext";
import { usePromo } from "@/context/PromoContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { applyPromo, removePromo, appliedPromo, discountAmount } = usePromo();
  
  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", city: "", phone: "" });

  // Calculs
  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalTotal = subTotal - discountAmount;

  const handleApplyPromo = () => {
    if (!promoInput) return;
    const result = applyPromo(promoInput, subTotal);
    setPromoMessage(result.message);
    if(result.success) setPromoInput("");
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.city || !formData.phone) {
      alert("Remplissez vos infos pour la livraison !");
      return;
    }

    let message = `*COMMANDE BLUE ENERGY* ⚡\n\n`;
    message += `👤 ${formData.name}\n📞 ${formData.phone}\n📍 ${formData.city}\n\n`;
    cart.forEach((item) => { message += `▪️ ${item.quantity}x ${item.name} (${item.size})\n`; });

    message += `\n💰 Sous-Total: ${subTotal.toLocaleString()} FCFA\n`;
    if (appliedPromo) {
      message += `🏷️ Code ${appliedPromo.code}: -${discountAmount.toLocaleString()} FCFA\n`;
    }
    message += `💸 *TOTAL: ${finalTotal.toLocaleString()} FCFA*\n`;

    window.open(`https://wa.me/237690328980?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    removePromo();
  };

  if (cart.length === 0) return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold">Panier vide 🛒</h2>
      <Link href="/" className="text-blue-600 underline mt-4 block">Retour au shop</Link>
      <Link href="/admin/promos" className="bg-blue-600 text-white px-4 py-2 rounded">
  Gérer les Codes Promo
</Link>
    </div>
    <div className="my-6">
  <Link 
    href="/admin/promos" 
    className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 w-fit hover:bg-gray-800 transition"
  >
    🏷️ Gérer les Codes Promo
  </Link>
</div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-6 uppercase">Mon Panier</h1>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item.id + item.size} className="flex gap-4 border p-4 rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded relative overflow-hidden">
               <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">Taille: {item.size}</p>
              <div className="flex items-center gap-4 mt-2">
                <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Minus size={16}/></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus size={16}/></button>
                <button onClick={() => removeFromCart(item.id, item.size)} className="ml-auto text-red-500"><Trash2 size={18}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ZONE CODE PROMO */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Code Promo</label>
        <div className="flex gap-2">
          <input 
            type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Ex: VISION10" className="flex-1 border p-2 rounded uppercase"
            disabled={!!appliedPromo}
          />
          {!appliedPromo ? (
            <button onClick={handleApplyPromo} className="bg-black text-white px-4 rounded font-bold">OK</button>
          ) : (
            <button onClick={() => { removePromo(); setPromoMessage(""); }} className="bg-red-500 text-white px-4 rounded">X</button>
          )}
        </div>
        {promoMessage && <p className="text-xs mt-2 text-blue-600">{promoMessage}</p>}
      </div>

      {/* TOTAL */}
      <div className="border-t pt-4 space-y-2 mb-8">
        <div className="flex justify-between"><span>Sous-total</span><span>{subTotal.toLocaleString()} FCFA</span></div>
        {appliedPromo && (
           <div className="flex justify-between text-green-600 font-bold">
             <span>Réduction ({appliedPromo.code})</span><span>- {discountAmount.toLocaleString()} FCFA</span>
           </div>
        )}
        <div className="flex justify-between text-2xl font-black"><span>Total</span><span>{finalTotal.toLocaleString()} FCFA</span></div>
      </div>

      {/* FORMULAIRE */}
      <div className="space-y-3">
        <input type="text" placeholder="Nom complet" className="w-full border p-3 rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input type="tel" placeholder="Téléphone" className="w-full border p-3 rounded" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        <input type="text" placeholder="Ville" className="w-full border p-3 rounded" onChange={(e) => setFormData({...formData, city: e.target.value})} />
        
        <button onClick={handleCheckout} className="w-full bg-[#25D366] text-white py-4 rounded font-bold text-lg hover:bg-green-600 transition">
          Commander sur WhatsApp 🚀
        </button>
      </div>
    </div>
  );
}