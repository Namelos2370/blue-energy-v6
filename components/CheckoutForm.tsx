"use client";
import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { CartItem } from '../data/store';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutForm({ cart, total, isOpen, onClose, onSuccess }: CheckoutProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const client = {
      name: formData.get('name'),
      city: formData.get('city'),
      phone: formData.get('phone')
    };

    // Construction du message WhatsApp
    let message = `*NOUVELLE COMMANDE - BLUE ENERGY*\n`;
    message += `👤 Client: ${client.name}\n`;
    message += `📍 Ville: ${client.city}\n`;
    message += `📱 Tel: ${client.phone}\n\n`;
    message += `*🛒 PANIER :*\n`;
    
    cart.forEach(item => {
      message += `▪ ${item.quantity}x ${item.title}\n   └ Taille: ${item.selectedSize} | Couleur: ${item.selectedColor}\n`;
    });
    
    message += `\n💰 *TOTAL : ${total.toLocaleString()} FCFA*\n`;
    message += `----------------------------\n`;
    message += `Merci de confirmer ma commande.`;

    // 1. Ouvrir WhatsApp (NUMÉRO MIS À JOUR ICI)
    window.open(`https://wa.me/237658980051?text=${encodeURIComponent(message)}`, '_blank');
    
    // 2. Vider le panier
    onSuccess(); 

    // 3. Fermer la fenêtre
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center px-4 pb-4 md:pb-0">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-black">Vos Coordonnées</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-1">Nom complet</label>
            <input name="name" required placeholder="ex: Gabriel Fokou" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold focus:ring-2 ring-blue-500 outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold text-gray-500 mb-1">Ville</label>
                <input name="city" required placeholder="ex: Yaoundé" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold focus:ring-2 ring-blue-500 outline-none" />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-500 mb-1">Téléphone</label>
                <input name="phone" type="tel" required placeholder="ex: 658..." className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold focus:ring-2 ring-blue-500 outline-none" />
             </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
               <span>Articles ({cart.length})</span>
               <span>{total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between font-black text-lg text-blue-900">
               <span>Total à payer</span>
               <span>{total.toLocaleString()} FCFA</span>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#0A1128] text-white py-4 rounded-xl font-bold hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-xl mt-4">
             <MessageCircle /> Confirmer sur WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}