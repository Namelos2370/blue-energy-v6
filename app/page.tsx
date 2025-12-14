"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ArrowRight, Menu, X, Trash2, CheckCircle, 
  Truck, CreditCard, Star, Plus, Lock 
} from 'lucide-react';
import Image from 'next/image';

// IMPORTATIONS
import { Product, CartItem, INITIAL_PRODUCTS } from '../data/store';
import ProductModal from '../components/ProductModal';
import CheckoutForm from '../components/CheckoutForm';
import AdminDashboard from '../components/AdminDashboard';
import ChatBot from '../components/ChatBot';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hoodie' | 't-shirt' | 'accessoire'>('all');
  
  // États UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [siteViews, setSiteViews] = useState(0);

  // --- SAUVEGARDE & LOGIQUE ---
  useEffect(() => {
    const savedProducts = localStorage.getItem('be-stock');
    const savedCart = localStorage.getItem('be-cart');
    
    const savedViews = localStorage.getItem('be-views');
    let currentViews = savedViews ? parseInt(savedViews) : 5420;
    currentViews += 1;
    localStorage.setItem('be-views', currentViews.toString());
    setSiteViews(currentViews);

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedCart) setCart(JSON.parse(savedCart));
    setIsLoaded(true);
  }, []);

  useEffect(() => { if (isLoaded) localStorage.setItem('be-stock', JSON.stringify(products)); }, [products, isLoaded]);
  useEffect(() => { if (isLoaded) localStorage.setItem('be-cart', JSON.stringify(cart)); }, [cart, isLoaded]);

  // Logique Panier
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product, size: string, color: string) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) return prev.map(item => (item.id === product.id && item.selectedSize === size && item.selectedColor === color) ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    updateStock(product.id, -1);
    setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove: number) => {
    const itemToRemove = cart[indexToRemove];
    updateStock(itemToRemove.id, itemToRemove.quantity);
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const updateStock = (id: number, change: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + change) } : p));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  if (!isLoaded) return <div className="min-h-screen bg-white flex items-center justify-center text-[#0A1128] font-bold animate-pulse">Chargement 2026...</div>;

  return (
    <div className="min-h-screen bg-white text-[#0A1128] font-sans selection:bg-blue-100 overflow-x-hidden pt-8"> 
      
      <ProductModal isOpen={!!selectedProduct} product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
      <CheckoutForm isOpen={isCheckoutOpen} cart={cart} total={cartTotal} onClose={() => setIsCheckoutOpen(false)} onSuccess={() => { setCart([]); setIsCheckoutOpen(false); }} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} products={products} setProducts={setProducts} views={siteViews} />
      
      {/* --- CHATBOT --- */}
      <ChatBot />

      {/* --- TOP BAR DEFILANTE (INFO HEADER) --- */}
      <div className="fixed top-0 left-0 w-full h-8 bg-[#0A1128] text-white z-[60] flex items-center overflow-hidden border-b border-white/10">
          {/* @ts-ignore */}
          <marquee scrollamount="6" className="text-xs font-bold uppercase tracking-widest">
              <span className="mx-4">⚡ Profitez de 10% de réduction sur vos commandes de 10.000fr maximum</span>
              <span className="mx-4">•</span>
              <span className="mx-4">🚚 Livraison gratuite pour les commandes de plus de 20.000fr</span>
              <span className="mx-4">•</span>
              <span className="mx-4">🔒 Paiement sécurisé à la livraison</span>
              <span className="mx-4">•</span>
              <span className="mx-4">🌍 Expédition internationale disponible</span>
          </marquee>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full top-8 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* LOGO CORRIGE */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-10 h-10 shadow-md rounded-full overflow-hidden group-hover:scale-110 transition duration-300">
               {/* CHEMIN MIS A JOUR ICI */}
               <Image src="/image/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">BLUE ENERGY</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <a href="#philosophie" className="hover:text-[#0A1128] transition">L'Esprit</a>
              <a href="#collection" className="hover:text-[#0A1128] transition">Collection</a>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition group">
                <ShoppingBag size={24} className="text-[#0A1128]" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm animate-bounce">{cartCount}</span>}
              </button>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 absolute w-full shadow-xl">
             <a href="#philosophie" onClick={() => setIsMenuOpen(false)} className="font-bold text-lg">L'Esprit</a>
             <a href="#collection" onClick={() => setIsMenuOpen(false)} className="font-bold text-lg">Collection</a>
          </div>
        )}
      </nav>

      {/* VOLET PANIER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-[#0A1128]/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300 mt-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
               <h2 className="text-2xl font-black tracking-tight">VOTRE PANIER</h2>
               <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4"><ShoppingBag size={48} opacity={0.2} /><p>Votre panier est vide.</p><button onClick={() => setIsCartOpen(false)} className="text-blue-600 font-bold hover:underline">Continuer mes achats</button></div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl relative overflow-hidden border border-gray-100 shrink-0"><Image src={item.images[0]} alt={item.title} fill className="object-cover" /></div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                        <p className="text-gray-500 text-xs mt-1"><span className="bg-gray-100 px-2 py-0.5 rounded text-black font-bold mr-2">{item.selectedSize}</span><span className="text-gray-400">{item.selectedColor}</span></p>
                      </div>
                      <div className="flex justify-between items-center"><span className="text-blue-700 font-bold text-sm">{item.price.toLocaleString()} FCFA</span><button onClick={() => removeFromCart(idx)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button></div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t pt-6 mt-4">
               <div className="flex justify-between text-xl font-black mb-6"><span>Total</span><span>{cartTotal.toLocaleString()} FCFA</span></div>
               <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} disabled={cart.length === 0} className="w-full bg-[#0A1128] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center gap-2 shadow-xl disabled:opacity-50">Passer la commande</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION 2026 */}
      <section className="pt-48 pb-16 px-4 text-center max-w-5xl mx-auto relative">
         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] -z-10 opacity-50"></div>
         <div className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-1.5 rounded-full mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"><span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span><span className="text-xs font-bold text-blue-900 tracking-widest uppercase">Collection Vision 2026</span></div>
         <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tighter text-[#0A1128] animate-in fade-in zoom-in duration-1000">ELEVATE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500">YOUR STANDARD</span></h1>
         <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">Blue Energy redéfinit l'essentiel. Coupes oversize, matières lourdes (200gsm+). Le luxe n'a jamais été aussi simple.</p>
         <div className="flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300"><a href="#collection" className="bg-[#0A1128] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition flex items-center gap-2 shadow-xl hover:-translate-y-1">Découvrir le Drop 2026 <ArrowRight size={18} /></a></div>
      </section>

      {/* MARQUEE RALENTI */}
      <div className="w-full bg-[#0A1128] text-white overflow-hidden py-4 border-y border-blue-900">
        {/* @ts-ignore */}
        <marquee scrollamount="6" loop="infinite" direction="left"><div className="flex gap-12 items-center font-bold tracking-[0.2em] uppercase text-sm"><span className="text-gray-300">Blue Energy</span><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="text-white">Qualité Premium 2026</span><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="text-gray-300">Livraison internationale</span><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="text-white">Blue Energy</span><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="text-gray-300">Établi en 2025</span><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="text-white">Yaoundé</span></div></marquee>
      </div>

      <section id="philosophie" className="py-20 bg-white relative overflow-hidden">
         <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 h-[500px] bg-gray-100 rounded-3xl relative overflow-hidden group">
              <Image src="/images/hoodie.png" alt="Lifestyle" fill className="object-cover group-hover:scale-105 transition duration-700 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8"><div><p className="text-white font-bold text-2xl">Designed in Cameroon.</p><p className="text-gray-300 text-sm">Crafted for the world.</p></div></div>
           </div>
           <div className="order-1 md:order-2">
             <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-[#0A1128]">PLUS QU'UNE MARQUE,<br/>UNE EMPREINTE.</h2>
             <p className="text-gray-500 mb-8 text-lg leading-relaxed">Nous avons abandonné le superflu pour revenir à l'essentiel. Des coupes parfaites, des matières nobles et ce bleu profond qui nous caractérise.</p>
             <div className="space-y-4">{["Coton premium certifié (220 GSM)", "Finition broderie haute définition", "Design universel & intemporel"].map((item, i) => (<div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"><CheckCircle className="text-blue-600 shrink-0" size={20}/> <span className="font-bold text-gray-800">{item}</span></div>))}</div>
           </div>
         </div>
      </section>

      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start"><div className="bg-blue-100 p-3 rounded-2xl text-blue-800"><Truck size={24}/></div><div><h3 className="font-bold">Livraison Rapide</h3><p className="text-sm text-gray-500">Expédition 24h/48h</p></div></div>
              <div className="flex items-center gap-4 justify-center md:justify-start"><div className="bg-blue-100 p-3 rounded-2xl text-blue-800"><CheckCircle size={24}/></div><div><h3 className="font-bold">Qualité Premium</h3><p className="text-sm text-gray-500">Satisfait ou remboursé</p></div></div>
              <div className="flex items-center gap-4 justify-center md:justify-start"><div className="bg-blue-100 p-3 rounded-2xl text-blue-800"><CreditCard size={24}/></div><div><h3 className="font-bold">Paiement Sécurisé</h3><p className="text-sm text-gray-500">Paiement à la livraison</p></div></div>
         </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12"><h2 className="text-4xl font-black mb-2 tracking-tight text-[#0A1128]">LES ESSENTIELS 2026</h2><p className="text-gray-400 font-medium">3 pièces maîtresses pour refaire votre garde-robe.</p></div>
        <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {['all', 'hoodie', 't-shirt', 'accessoire'].map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat as any)} className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider transition whitespace-nowrap border ${selectedCategory === cat ? 'bg-[#0A1128] text-white border-[#0A1128]' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>{cat === 'all' ? 'Tout voir' : cat + 's'}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden mb-4 shadow-sm group-hover:shadow-2xl transition duration-500 border border-gray-100">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold rounded-full uppercase text-[#0A1128] shadow-sm">{product.tag}</div>
                {product.stock === 0 && <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full uppercase">Épuisé</div>}
                <Image src={product.images[0]} alt={product.title} fill className={`object-cover transition duration-700 ${product.stock === 0 ? 'grayscale' : 'group-hover:scale-105'}`} />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-6"><span className="w-full bg-white text-[#0A1128] py-3 rounded-xl font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition flex items-center justify-center gap-2"><Plus size={18} /> Voir détails</span></div>
              </div>
              <div className="px-2">
                 <div className="flex justify-between items-start mb-1"><h3 className="font-bold text-lg leading-tight">{product.title}</h3><p className="text-blue-700 font-bold">{product.price.toLocaleString()} FCFA</p></div>
                 <div className="flex gap-1 mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-yellow-400 text-yellow-400"/>)}<span className="text-xs text-gray-400 ml-1">(4.9)</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER AVEC LOGO CORRIGE */}
      <footer className="py-16 border-t border-gray-100 text-center bg-white relative">
        <div className="relative w-12 h-12 mx-auto mb-6 shadow-xl rounded-full overflow-hidden">
            {/* CHEMIN MIS A JOUR ICI */}
            <Image src="/image/logo.jpeg" alt="Logo" fill className="object-cover" />
        </div>
        <p className="font-black text-2xl tracking-tighter mb-6 text-[#0A1128]">BLUE ENERGY</p>
        
        <div className="flex justify-center gap-8 mb-8 text-sm font-bold text-gray-400 uppercase tracking-widest flex-wrap px-4">
            <a href="https://www.instagram.com/blueenergy237?igsh=ODlqdnkxb255YnA4&utm_source=qr" target="_blank" className="hover:text-[#0A1128] transition">Instagram</a>
            <a href="https://www.tiktok.com/@bluenergy237?_r=1&_t=ZN-92D2KTJMpQU" target="_blank" className="hover:text-[#0A1128] transition">TikTok</a>
            <a href="https://whatsapp.com/channel/0029VaR2SDvCxoAunCACDW1E" target="_blank" className="hover:text-[#0A1128] transition">WhatsApp</a>
        </div>
        
        <div className="text-gray-400 text-sm space-y-2">
            <p>© 2026 Blue Energy. All rights reserved.</p>
            <p className="text-xs opacity-60">Designed in Yaoundé, Cameroon.</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition z-10">
          <button onClick={() => setIsAdminOpen(true)} className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-[#0A1128]"><Lock size={12} /> Admin</button>
        </div>
      </footer>
    </div>
  );
}