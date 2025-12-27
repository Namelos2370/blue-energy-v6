"use client";
import { usePromo } from "@/context/PromoContext";
import { useState } from "react";
import { Trash2, PlusCircle, Tag } from "lucide-react";

export default function AdminPromos() {
  const { promos, addPromo, deletePromo } = usePromo();
  const [newCode, setNewCode] = useState({ code: "", value: "", type: "percent" });

  const handleAdd = () => {
    if (!newCode.code || !newCode.value) return;
    addPromo({
      code: newCode.code,
      value: Number(newCode.value),
      type: newCode.type as "percent" | "fixed",
      active: true,
    });
    setNewCode({ ...newCode, code: "", value: "" });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl font-black mb-6">GESTION PROMOS 🏷️</h1>

      {/* AJOUTER */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 flex gap-4 flex-wrap">
        <input type="text" placeholder="Code (ex: NOEL)" className="border p-2 rounded uppercase" 
               value={newCode.code} onChange={(e) => setNewCode({ ...newCode, code: e.target.value })} />
        <select className="border p-2 rounded" value={newCode.type} onChange={(e) => setNewCode({ ...newCode, type: e.target.value })}>
          <option value="percent">Pourcentage (%)</option>
          <option value="fixed">Montant Fixe (FCFA)</option>
        </select>
        <input type="number" placeholder="Valeur" className="border p-2 rounded w-24" 
               value={newCode.value} onChange={(e) => setNewCode({ ...newCode, value: e.target.value })} />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded font-bold">AJOUTER</button>
      </div>

      {/* LISTE */}
      <div className="space-y-3">
        {promos.map((p) => (
          <div key={p.code} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <span className="font-bold text-lg mr-2">{p.code}</span>
              <span className="text-sm text-gray-500">(-{p.value}{p.type === 'percent' ? '%' : ' FCFA'})</span>
            </div>
            <button onClick={() => deletePromo(p.code)} className="text-red-500"><Trash2/></button>
          </div>
        ))}
      </div>
    </div>
  );
}