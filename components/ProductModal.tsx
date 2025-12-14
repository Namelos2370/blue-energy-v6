"use client";
import React, { useState } from 'react';
import { X, Check, ShoppingBag, Ruler } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../data/store';

interface ModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ModalProps) {
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [showGuide, setShowGuide] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (!size) return alert("Veuillez choisir une taille");
    if (!color) return alert("Veuillez choisir une couleur");
    onAddToCart(product, size, color);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-in zoom-in-95 duration-200">
        
        {/* Partie Gauche : Image */}
        <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto">
          <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full md:hidden"><X /></button>
        </div>

        {/* Partie Droite : Détails */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white">
          <div className="flex justify-between items-start mb-4">
            <div>
               <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">{product.category}</span>
               <h2 className="text-3xl font-black text-[#0A1128] leading-tight">{product.title}</h2>
            </div>
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition"><X /></button>
          </div>

          <p className="text-2xl font-bold text-blue-700 mb-6">{product.price.toLocaleString()} FCFA</p>
          <p className="text-gray-500 leading-relaxed mb-8">{product.desc}</p>

          {/* Sélecteur Couleur */}
          <div className="mb-6">
            <span className="font-bold text-sm uppercase text-gray-400 mb-3 block">Couleur</span>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button 
                  key={c} 
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition ${color === c ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Sélecteur Taille */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
               <span className="font-bold text-sm uppercase text-gray-400">Taille</span>
               <button onClick={() => setShowGuide(!showGuide)} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                 <Ruler size={14}/> Guide des tailles
               </button>
            </div>
            
            {showGuide && (
                <div className="mb-4 bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
                    <p>M : 170-175cm / 65-75kg</p>
                    <p>L : 175-180cm / 75-85kg</p>
                    <p>XL : 180-185cm / 85-95kg</p>
                </div>
            )}

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((s) => (
                <button 
                  key={s} 
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition ${size === s ? 'bg-[#0A1128] text-white border-[#0A1128]' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton Action */}
          <button 
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="w-full bg-[#0A1128] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <ShoppingBag size={20} />
             {product.stock > 0 ? `Ajouter au panier` : `Rupture de stock`}
          </button>
        </div>
      </div>
    </div>
  );
}