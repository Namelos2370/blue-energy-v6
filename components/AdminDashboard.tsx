"use client";
import React, { useState } from 'react';
import { X, Plus, Trash2, Lock, LogOut, Package, Upload, Zap, Eye, AlignLeft } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../data/store';

interface AdminProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  views: number; // <--- NOUVEAU : On reçoit le nombre de vues
}

export default function AdminDashboard({ isOpen, onClose, products, setProducts, views }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newImage, setNewImage] = useState<string>(""); 

  if (!isOpen) return null;

  // LOGIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2025") { setIsAuthenticated(true); setError(""); } 
    else { setError("Mot de passe incorrect"); }
  };

  // UPLOAD
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2000000) { alert("Image trop lourde ! Max 2Mo."); return; }
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ACTIONS
  const updateStock = (id: number, newStock: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };
  const setOutOfStock = (id: number) => { if (confirm("Marquer comme ÉPUISÉ ?")) updateStock(id, 0); };
  const deleteProduct = (id: number) => { if (confirm("Supprimer ?")) setProducts(products.filter(p => p.id !== id)); };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Récupération de la description facultative
    const customDesc = formData.get('desc') as string;

    const newProduct: Product = {
      id: Date.now(),
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      category: formData.get('category') as any, 
      tag: "Nouveau",
      desc: customDesc || "Nouvelle pièce exclusive Blue Energy.", // Utilise la desc ou une phrase par défaut
      images: [newImage || "/images/hoodie.png"], 
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"]
    };

    setProducts([...products, newProduct]);
    form.reset(); setNewImage(""); alert("Produit ajouté !");
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={32} /></div>
          <h2 className="text-2xl font-black mb-2 text-[#0A1128]">Admin 2026</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Code PIN" className="w-full text-center text-2xl font-bold tracking-widest p-4 bg-gray-50 border rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button type="submit" className="w-full bg-[#0A1128] text-white py-4 rounded-xl font-bold">Déverrouiller</button>
            <button type="button" onClick={onClose} className="text-gray-400 text-sm underline">Retour au site</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 flex flex-col overflow-hidden animate-in fade-in">
      {/* Header */}
      <div className="bg-[#0A1128] text-white p-4 shadow-lg flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
             <h2 className="font-bold text-xl flex items-center gap-2"><Package /> Pilotage</h2>
             {/* COMPTEUR DE VUES */}
             <div className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-bold text-green-400 border border-green-500/30">
                <Eye size={14}/> {views.toLocaleString()} Vues
             </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsAuthenticated(false)} className="text-gray-400 hover:text-white flex items-center gap-2"><LogOut size={18}/> Quitter</button>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><X size={20}/></button>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* 1. TABLEAU STOCKS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             {/* ... (Tableau identique à avant, je ne le remets pas pour raccourcir, le code est déjà chez toi, garde la partie tableau) ... */}
             {/* Pour la clarté de la réponse, j'inclus le tableau complet ci-dessous */}
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Inventaire</h3>
              <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{products.length} références</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
                  <tr><th className="p-4">Produit</th><th className="p-4">Prix</th><th className="p-4 text-center">Stock</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p.id} className={`transition ${p.stock === 0 ? 'bg-red-50/50' : 'hover:bg-gray-50'}`}>
                      <td className="p-4 flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden relative"><Image src={p.images[0]} alt={p.title} fill className="object-cover" /></div>
                        <div>
                            <div className="font-bold text-[#0A1128]">{p.title}</div>
                            {p.stock === 0 && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">RUPTURE</span>}
                        </div>
                      </td>
                      <td className="p-4 text-blue-600 font-bold">{p.price.toLocaleString()}</td>
                      <td className="p-4 text-center">
                         <div className="flex justify-center items-center gap-2">
                            <button onClick={() => updateStock(p.id, p.stock - 1)} className="w-6 h-6 bg-gray-200 rounded font-bold">-</button>
                            <span className={`font-bold w-8 text-center ${p.stock===0?'text-red-500':''}`}>{p.stock}</span>
                            <button onClick={() => updateStock(p.id, p.stock + 1)} className="w-6 h-6 bg-gray-200 rounded font-bold">+</button>
                         </div>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                         {p.stock > 0 && <button onClick={() => setOutOfStock(p.id)} className="text-orange-500 bg-orange-50 p-1.5 rounded"><Zap size={16}/></button>}
                         <button onClick={() => deleteProduct(p.id)} className="text-red-500 bg-red-50 p-1.5 rounded"><Trash2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. FORMULAIRE AJOUT */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
                <Plus className="bg-blue-600 text-white rounded-full p-0.5" size={20}/> Ajouter un produit
            </h3>
            <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center">
                  <label className="cursor-pointer group relative w-full max-w-md h-32 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 flex flex-col items-center justify-center transition overflow-hidden">
                     {newImage ? <Image src={newImage} alt="Preview" fill className="object-cover opacity-80" /> : <div className="flex flex-col items-center"><Upload className="text-blue-600 mb-2" /><span className="font-bold text-gray-500 text-sm">Ajouter une photo</span></div>}
                     <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
              </div>
              <div className="space-y-4">
                  <input name="title" placeholder="Nom du produit" required className="w-full p-3 bg-gray-50 rounded-xl border font-bold" />
                  <input name="price" type="number" placeholder="Prix (FCFA)" required className="w-full p-3 bg-gray-50 rounded-xl border font-bold" />
              </div>
              <div className="space-y-4">
                  <select name="category" className="w-full p-3 bg-gray-50 rounded-xl border font-bold"><option value="hoodie">Hoodie</option><option value="t-shirt">T-Shirt</option><option value="accessoire">Accessoire</option></select>
                  <input name="stock" type="number" placeholder="Stock Initial" required className="w-full p-3 bg-gray-50 rounded-xl border font-bold" />
              </div>

              {/* CHAMP DESCRIPTION FACULTATIF */}
              <div className="md:col-span-2">
                 <div className="relative">
                    <AlignLeft className="absolute top-3 left-3 text-gray-400" size={18} />
                    <textarea 
                        name="desc" 
                        placeholder="Description du produit (Facultatif - Par défaut: 'Nouvelle pièce exclusive Blue Energy')" 
                        className="w-full p-3 pl-10 bg-gray-50 rounded-xl border font-medium h-24 resize-none focus:ring-2 ring-blue-500 outline-none"
                    ></textarea>
                 </div>
              </div>

              <button type="submit" className="md:col-span-2 w-full bg-[#0A1128] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition">Créer le produit</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}