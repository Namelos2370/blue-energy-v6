"use client";
import React, { useState } from 'react';
import { X, Save, Eye, Package, Tag, Trash2, Plus, Lock, Search, Edit2 } from 'lucide-react';
import { Product } from '../data/store';

// On définit le type PromoCode ici pour être sûr
type PromoCode = { code: string; percent: number };

interface AdminProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  views: number;
  promoCodes: PromoCode[];
  setPromoCodes: React.Dispatch<React.SetStateAction<PromoCode[]>>;
}

export default function AdminDashboard({ isOpen, onClose, products, setProducts, views, promoCodes, setPromoCodes }: AdminProps) {
  // --- ÉTATS SÉCURITÉ & UI ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'products' | 'promos'>('products');
  const [searchTerm, setSearchTerm] = useState("");

  // --- ÉTATS FORMULAIRE AJOUT PRODUIT ---
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "", price: 0, stock: 10, category: "t-shirt", tag: "NOUVEAU", images: ["/images/placeholder.png"]
  });

  // --- ÉTATS PROMOS ---
  const [newCode, setNewCode] = useState("");
  const [newPercent, setNewPercent] = useState(10);

  if (!isOpen) return null;

  // 🔒 GESTION CONNEXION
  const handleLogin = () => {
    if (password === "admin") { // <--- CHANGE LE MOT DE PASSE ICI SI TU VEUX
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect !");
    }
  };

  // 📦 GESTION PRODUITS
  const handleUpdateProduct = (id: number, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price) return alert("Remplissez au moins le nom et le prix");
    
    const productToAdd: Product = {
      id: Date.now(), // ID unique basé sur l'heure
      title: newProduct.title,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      category: newProduct.category as any,
      tag: newProduct.tag || "NOUVEAU",
      images: ["/images/hoodie.png"], // Image par défaut si vide
      description: "Description par défaut"
    };

    setProducts(prev => [productToAdd, ...prev]);
    setShowAddForm(false);
    setNewProduct({ title: "", price: 0, stock: 10, category: "t-shirt", tag: "NOUVEAU" });
  };

  // 🏷️ GESTION PROMOS
  const handleAddPromo = () => {
    if (!newCode) return;
    const code = newCode.toUpperCase().trim();
    if (promoCodes.find(p => p.code === code)) return alert("Ce code existe déjà !");
    setPromoCodes(prev => [...prev, { code, percent: Number(newPercent) }]);
    setNewCode("");
    setNewPercent(10);
  };

  const handleDeletePromo = (code: string) => {
    setPromoCodes(prev => prev.filter(p => p.code !== code));
  };

  // --- ÉCRAN DE CONNEXION ---
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-[#0A1128]" />
          </div>
          <h2 className="text-2xl font-black text-[#0A1128] mb-2">ACCÈS RESTREINT</h2>
          <p className="text-gray-400 text-sm mb-6">Veuillez vous identifier pour gérer la boutique.</p>
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4 font-bold text-center focus:border-[#0A1128] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full bg-[#0A1128] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition">
            ENTRER
          </button>
          <button onClick={onClose} className="mt-4 text-xs text-gray-400 hover:text-black underline">Retour au site</button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD COMPLET ---
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="bg-[#0A1128] text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black tracking-tight">ADMIN PANEL</h2>
            <div className="flex gap-2 text-xs font-bold bg-white/10 px-3 py-1 rounded-full items-center">
               <Eye size={14} /> {views} Vues
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition"><X /></button>
        </div>

        {/* TABS */}
        <div className="flex border-b bg-gray-50">
          <button onClick={() => setActiveTab('products')} className={`flex-1 p-4 font-bold flex items-center justify-center gap-2 border-b-4 transition ${activeTab === 'products' ? 'border-[#0A1128] text-[#0A1128] bg-white' : 'border-transparent text-gray-400 hover:bg-gray-100'}`}>
            <Package size={18} /> PRODUITS ({products.length})
          </button>
          <button onClick={() => setActiveTab('promos')} className={`flex-1 p-4 font-bold flex items-center justify-center gap-2 border-b-4 transition ${activeTab === 'promos' ? 'border-[#0A1128] text-[#0A1128] bg-white' : 'border-transparent text-gray-400 hover:bg-gray-100'}`}>
            <Tag size={18} /> CODES PROMO ({promoCodes.length})
          </button>
        </div>

        {/* CONTENU SCROLLABLE */}
        <div className="overflow-y-auto p-6 flex-grow bg-gray-50/50">
          
          {/* --- ONGLET PRODUITS --- */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              {/* BARRE D'OUTILS */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-0 bg-gray-50/95 backdrop-blur p-2 z-10">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Rechercher un produit..." 
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full md:w-64 focus:outline-none focus:border-blue-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button onClick={() => setShowAddForm(!showAddForm)} className="bg-[#0A1128] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-900 transition">
                  <Plus size={18} /> {showAddForm ? 'Annuler' : 'Ajouter Produit'}
                </button>
              </div>

              {/* FORMULAIRE D'AJOUT */}
              {showAddForm && (
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl animate-in slide-in-from-top-4">
                  <h3 className="font-bold text-blue-900 mb-4">Nouveau Produit</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <input type="text" placeholder="Nom du produit" className="p-2 rounded border" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                    <input type="number" placeholder="Prix (FCFA)" className="p-2 rounded border" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                    <input type="number" placeholder="Stock" className="p-2 rounded border" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
                    <select className="p-2 rounded border" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                      <option value="t-shirt">T-Shirt</option>
                      <option value="hoodie">Hoodie</option>
                      <option value="accessoire">Accessoire</option>
                    </select>
                  </div>
                  <button onClick={handleAddProduct} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold w-full">CONFIRMER L'AJOUT</button>
                </div>
              )}

              {/* LISTE DES PRODUITS */}
              <div className="space-y-3">
                {products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                  <div key={product.id} className={`bg-white p-4 rounded-xl flex flex-col md:flex-row items-center gap-4 shadow-sm border transition ${product.stock === 0 ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}>
                     
                     {/* Image & Nom */}
                     <div className="flex items-center gap-4 flex-1 w-full">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                           <img src={product.images[0]} alt="" className="object-cover w-full h-full"/>
                        </div>
                        <div className="flex-1">
                           <input 
                             type="text" 
                             className="font-bold text-[#0A1128] bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full"
                             value={product.title}
                             onChange={(e) => handleUpdateProduct(product.id, 'title', e.target.value)}
                           />
                           <div className="flex items-center gap-2 mt-1">
                             <input 
                                type="number" 
                                className="text-xs text-gray-500 bg-transparent w-20 border-b border-transparent hover:border-gray-300 outline-none"
                                value={product.price}
                                onChange={(e) => handleUpdateProduct(product.id, 'price', Number(e.target.value))}
                             />
                             <span className="text-xs text-gray-400">FCFA</span>
                           </div>
                        </div>
                     </div>

                     {/* Stock & Actions */}
                     <div className="flex items-center gap-6 justify-between w-full md:w-auto">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                           <span className={`text-xs font-bold uppercase ${product.stock === 0 ? 'text-red-500' : 'text-gray-400'}`}>
                             {product.stock === 0 ? 'RUPTURE' : 'STOCK:'}
                           </span>
                           <input 
                              type="number" 
                              className={`w-12 bg-transparent font-bold text-center outline-none ${product.stock === 0 ? 'text-red-600' : 'text-[#0A1128]'}`}
                              value={product.stock}
                              onChange={(e) => handleUpdateProduct(product.id, 'stock', Number(e.target.value))}
                           />
                        </div>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="Supprimer">
                          <Trash2 size={20} />
                        </button>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- ONGLET PROMOS --- */}
          {activeTab === 'promos' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus size={20} className="text-blue-600"/> Créer un code promo</h3>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Code (ex: VIP2026)" 
                    className="flex-1 border-2 border-gray-200 rounded-lg p-3 font-bold uppercase focus:border-blue-600 outline-none"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                  />
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4">
                     <span className="font-bold text-gray-500">-</span>
                     <input type="number" className="w-12 bg-transparent font-bold outline-none text-center" value={newPercent} onChange={(e) => setNewPercent(Number(e.target.value))} />
                     <span className="font-bold text-gray-500">%</span>
                  </div>
                  <button onClick={handleAddPromo} className="bg-[#0A1128] text-white px-6 rounded-lg font-bold hover:bg-blue-900 transition">AJOUTER</button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gray-400 text-sm uppercase ml-1">Codes actifs ({promoCodes.length})</h3>
                {promoCodes.map((promo, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 text-blue-800 p-2 rounded-lg"><Tag size={20}/></div>
                      <div>
                        <span className="block font-black text-lg">{promo.code}</span>
                        <span className="text-sm text-green-600 font-bold">-{promo.percent}%</span>
                      </div>
                    </div>
                    <button onClick={() => handleDeletePromo(promo.code)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* FOOTER */}
        <div className="p-4 bg-white border-t flex justify-end gap-4">
           <button onClick={onClose} className="bg-gray-100 text-[#0A1128] px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition flex items-center gap-2">
             <Save size={18} /> FERMER
           </button>
        </div>
      </div>
    </div>
  );
}