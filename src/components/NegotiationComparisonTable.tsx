"use client";

import React from "react";
import { Check, Star, AlertCircle, Info, TrendingDown, Clock, Wallet } from "lucide-react";

interface SupplierBid {
  name: string;
  price: number;
  deliveryTime: string;
  paymentTerms: string;
  score: number;
}

interface NegotiationComparisonTableProps {
  suppliers: SupplierBid[];
  targetPrice: number;
}

export default function NegotiationComparisonTable({ suppliers, targetPrice }: NegotiationComparisonTableProps) {
  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-full custom-scrollbar">
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex items-center space-x-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Info className="w-5 h-5 text-blue-400" />
        </div>
        <p className="text-xs text-slate-400">
          O comparativo abaixo destaca automaticamente o melhor custo-benefício considerando preço, prazo e confiabilidade técnica.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {suppliers.sort((a, b) => a.price - b.price).map((supplier, idx) => (
          <div 
            key={supplier.name}
            className={`relative p-5 rounded-2xl border transition-all ${idx === 0 ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-800/40 border-white/5'}`}
          >
            {idx === 0 && (
              <div className="absolute -top-3 right-4 px-3 py-1 bg-emerald-500 text-[10px] font-black text-white rounded-full shadow-lg shadow-emerald-500/20 uppercase tracking-tighter">
                Melhor Oferta
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-white/5">
                  {supplier.name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{supplier.name}</h4>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-bold text-slate-400">{supplier.score} Score</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-white">R$ {supplier.price.toLocaleString('pt-BR')}</p>
                <p className={`text-[10px] font-bold ${supplier.price <= targetPrice ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {supplier.price <= targetPrice ? 'ABAIXO DO BUDGET' : `+${((supplier.price/targetPrice - 1)*100).toFixed(1)}% vs. Budget`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Entrega</span>
                </div>
                <p className="text-xs font-bold text-slate-200">{supplier.deliveryTime}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                <div className="flex items-center space-x-2 mb-1">
                  <Wallet className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Pagamento</span>
                </div>
                <p className="text-xs font-bold text-slate-200">{supplier.paymentTerms}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingDown className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Economia</span>
                </div>
                <p className="text-xs font-bold text-emerald-400">R$ {(targetPrice - supplier.price).toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
