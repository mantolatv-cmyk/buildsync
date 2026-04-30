"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown, Zap, ArrowUpRight, ShieldCheck, Radar } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

export default function PredictiveRiskRadar() {
  const { predictiveInsights, addNegotiation } = useDashboardStore();

  const handleAnticipate = (insight: any) => {
    const newNeg = {
      id: `neg-${Date.now()}`,
      item: insight.item,
      status: "active",
      targetPrice: 4500, // Mock target price
      currentBest: null,
      suppliers: [
        { 
          name: "Fornecedor Alfa", 
          price: 4700, 
          deliveryTime: "5 dias", 
          paymentTerms: "30 dias",
          score: 4.5,
          messages: [] 
        },
        { 
          name: "Fornecedor Beta", 
          price: 4800, 
          deliveryTime: "3 dias", 
          paymentTerms: "A vista",
          score: 4.2,
          messages: [] 
        }
      ],
      reasoning: `Iniciando antecipação para ${insight.item} devido ao alerta de ${insight.trend === 'up' ? 'alta' : 'volatilidade'} detectado pelo Radar de Risco.`
    };
    addNegotiation(newNeg);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Radar Graphic Container */}
      <div className="lg:col-span-1 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative w-40 h-40 mb-4">
          {/* Animated Radar Rings */}
          <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" />
          <div className="absolute inset-4 border border-blue-500/20 rounded-full" />
          <div className="absolute inset-10 border border-blue-500/20 rounded-full" />
          
          {/* Radar Sweep */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full origin-center"
            style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
          />

          {/* Risk Dots */}
          {predictiveInsights.map((insight, idx) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className={`absolute w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] border-2 border-white/20 z-10 ${
                insight.trend === 'up' ? 'bg-red-500 shadow-red-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
              }`}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`
              }}
            >
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 bg-slate-900 border border-white/10 rounded text-[8px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {insight.item}
              </div>
            </motion.div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Radar className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Risk Scan</h4>
          <p className="text-xl font-black text-white leading-none">ATIVO</p>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictiveInsights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-all"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${insight.trend === 'up' ? 'text-red-500' : 'text-emerald-500'}`}>
              {insight.trend === 'up' ? <TrendingUp className="w-12 h-12" /> : <TrendingDown className="w-12 h-12" />}
            </div>

            <div className="flex justify-between items-start mb-4">
              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                insight.trend === 'up' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {insight.trend === 'up' ? 'Risco de Alta' : 'Oportunidade'}
              </div>
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-slate-500">{insight.probability}% Prob.</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white mb-2">{insight.item}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4 line-clamp-2">
              {insight.message}
            </p>

            <div className="flex items-end justify-between pt-2 border-t border-white/5">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Impacto Est.</p>
                <p className={`text-sm font-black ${insight.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                  R$ {insight.impact.toLocaleString('pt-BR')}
                </p>
              </div>
              <button 
                onClick={() => handleAnticipate(insight)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-lg transition-all shadow-lg shadow-blue-500/20 uppercase tracking-tighter"
              >
                <span>{insight.actionLabel}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
