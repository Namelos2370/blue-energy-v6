"use client";
import React, { useRef, useState } from 'react';
import { X, ShoppingBag, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [activeImg, setActiveImg] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !product) return null;

  const handleGalleryScroll = () => {
    const el = galleryRef.current;
    if (el && el.clientWidth) setActiveImg(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goToImage = (i: number) => {
    const el = galleryRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(product.images.length - 1, i));
    el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' });
  };

  const handleAdd = () => {
    if (!size) return alert("Veuillez choisir une taille");
    if (!color) return alert("Veuillez choisir une couleur");
    onAddToCart(product, size, color);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-in zoom-in-95 duration-200">
        
        {/* Partie Gauche : Galerie (glisser vers le côté pour voir les autres photos) */}
        <div className="w-full md:w-1/2 bg-gray-100 relative h-[55vh] md:h-auto shrink-0">
          <div
            ref={galleryRef}
            onScroll={handleGalleryScroll}
            className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {product.images.map((img, i) => (
              <div key={i} className="relative h-full w-full shrink-0 snap-center">
                <Image
                  src={img}
                  alt={`${product.title} - photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain md:object-cover"
                />
              </div>
            ))}
          </div>
          {product.images.length > 1 && (
            <>
              <button
                onClick={() => goToImage(activeImg - 1)}
                aria-label="Photo précédente"
                className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow transition ${activeImg === 0 ? 'opacity-30 pointer-events-none' : ''}`}
              ><ChevronLeft size={20} /></button>
              <button
                onClick={() => goToImage(activeImg + 1)}
                aria-label="Photo suivante"
                className={`absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow transition ${activeImg === product.images.length - 1 ? 'opacity-30 pointer-events-none' : ''}`}
              ><ChevronRight size={20} /></button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    aria-label={`Photo ${i + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition ${activeImg === i ? 'bg-[#0A1128] scale-125' : 'bg-white/80'}`}
                  />
                ))}
              </div>
            </>
          )}
          <button onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow md:hidden"><X /></button>
        </div>

        {/* Partie Droite : Détails */}
        <div className="w-full md:w-1/2 p-6 md:p-8 md:overflow-y-auto bg-white">
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