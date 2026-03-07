"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Bonjour ! Bienvenue chez Blue Energy ⚡️. Que cherchez-vous aujourd'hui ?", isBot: true }
  ]);

  // Les boutons rapides
  const quickQuestions = [
    "Nouveautés ?",
    "Délais de livraison ?",
    "Qualité des vêtements ?",
    "Parler à un humain"
  ];

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // LE "CERVEAU" DU BOT (Reconnaissance de mots-clés)
  const generateResponse = (input: string) => {
    const text = input.toLowerCase();

    if (text.match(/(bonjour|salut|coucou|hello)/)) 
      return "Salut ! Prêt à élever vos standards avec notre collection Vision 2026 ?";
    
    if (text.match(/(prix|combien|tarif)/)) 
      return "Nos prix sont étudiés pour offrir un luxe accessible. Vous trouverez les tarifs exacts de chaque pièce dans la section 'Collection'. Psst... utilisez le code VISION2026 au panier !";
    
    if (text.match(/(qualité|tissu|matière|gsm|lourd)/)) 
      return "C'est notre point fort ! Nous utilisons du coton premium très lourd (220 GSM et plus) et des broderies HD. Le vêtement ne bouge pas, même après plusieurs lavages.";
    
    if (text.match(/(livraison|délai|expédier|recevoir)/)) 
      return "Livraison en 24h sur Yaoundé et Douala. Comptez 48h à 72h pour les autres villes. Bonus : La livraison est offerte dès 20.000 FCFA d'achats ! 🚚";
    
    if (text.match(/(où|situé|adresse|boutique|localisation)/)) 
      return "Blue Energy est une marque digitale basée à Yaoundé (Designed in Cameroon). Nous n'avons pas de boutique physique pour l'instant, tout se passe ici et la livraison vient à vous.";
    
    if (text.match(/(nouveau|polo|jogging|casquette|collection)/)) 
      return "Le Drop 2026 est là ! Nouveaux polos aux tons pastel, t-shirts premium et nos casquettes BE signature. Allez vite voir dans la section Collection avant la rupture de stock.";
    
    if (text.match(/(humain|whatsapp|contact|parler|téléphone)/)) 
      return "Je passe le relais ! Vous pouvez cliquer sur le bouton WhatsApp en bas du site ou nous écrire sur nos réseaux (@blueenergy237). L'équipe vous répondra très vite.";
    
    if (text.match(/(merci|thanks)/)) 
      return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Elevate Your Standard. 🦅";

    // Réponse par défaut
    return "Je ne suis qu'un bot en apprentissage... Mais si vous cherchez du style, vous êtes au bon endroit ! Écrivez-nous sur WhatsApp pour une question très précise.";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // 1. Affiche le message de l'utilisateur
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInputText("");
    setIsTyping(true);

    // 2. Simule un délai de réflexion du bot (1.5 secondes)
    setTimeout(() => {
      const answer = generateResponse(text);
      setMessages(prev => [...prev, { text: answer, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* FENÊTRE DU CHATBOT */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          
          {/* HEADER */}
          <div className="bg-[#0A1128] text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                 <Bot size={18} />
               </div>
               <div>
                 <span className="font-bold block text-sm leading-tight">Assistant Blue Energy</span>
                 <span className="text-[10px] text-blue-200 flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> En ligne</span>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition"><X size={18}/></button>
          </div>
          
          {/* ZONE DE MESSAGES */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
                <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.isBot ? 'bg-white text-gray-800 rounded-tl-sm border border-gray-100' : 'bg-blue-600 text-white rounded-tr-sm'}`}>
                        {m.text}
                    </div>
                </div>
            ))}
            
            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTIONS RAPIDES */}
          {messages.length < 3 && !isTyping && (
            <div className="px-4 pb-2 bg-white">
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickQuestions.map((q, i) => (
                      <button key={i} onClick={() => handleSend(q)} className="whitespace-nowrap px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-900 hover:bg-blue-100 transition">
                          {q}
                      </button>
                  ))}
               </div>
            </div>
          )}

          {/* ZONE DE SAISIE */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
             <input 
               type="text" 
               placeholder="Écrivez votre question..." 
               className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
             />
             <button 
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-[#0A1128] text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition disabled:opacity-50 disabled:hover:bg-[#0A1128]"
             >
               <Send size={16} className="ml-1" />
             </button>
          </div>
        </div>
      )}

      {/* BOUTON FLOTTANT D'OUVERTURE */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-[#0A1128] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition duration-300 z-40 border-2 border-white"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}