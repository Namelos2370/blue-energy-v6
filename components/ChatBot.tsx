"use client";
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Bonjour ! Bienvenue chez Blue Energy. Comment puis-je vous aider ?", isBot: true }
  ]);

  const questions = [
    "Où êtes-vous situés ?",
    "Quels sont les délais de livraison ?",
    "Comment commander ?",
    "Parler à un humain"
  ];

  const handleQuestion = (q: string) => {
    // 1. Ajouter la question de l'utilisateur
    setMessages(prev => [...prev, { text: q, isBot: false }]);

    // 2. Réponse du Bot (Simulation)
    setTimeout(() => {
      let answer = "";
      if (q.includes("situés")) answer = "Nous sommes basés à Yaoundé, Cameroun. Nous livrons partout dans le pays et à l'international.";
      else if (q.includes("délais")) answer = "Yaoundé/Douala : 24h. Autres villes : 48h-72h.";
      else if (q.includes("commander")) answer = "Ajoutez vos articles au panier, cliquez sur 'Commander' et validez via WhatsApp.";
      else if (q.includes("humain")) answer = "Vous pouvez nous écrire directement sur WhatsApp au 658 98 00 51.";
      else answer = "Je n'ai pas compris. Essayez de nous contacter sur WhatsApp.";

      setMessages(prev => [...prev, { text: answer, isBot: true }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-20 right-4 z-[90] flex flex-col items-end font-sans">
      {/* Fenêtre de Chat */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl mb-4 border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-[#0A1128] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-sm">Assistant Blue Energy</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={16}/></button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
                <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.isBot ? 'bg-white text-gray-800 shadow-sm' : 'bg-blue-600 text-white'}`}>
                        {m.text}
                    </div>
                </div>
            ))}
          </div>

          <div className="p-2 bg-white border-t">
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {questions.map((q, i) => (
                    <button key={i} onClick={() => handleQuestion(q)} className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-blue-900 hover:bg-blue-100 transition">
                        {q}
                    </button>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Bouton Flottant */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 bg-[#0A1128] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition duration-300"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}