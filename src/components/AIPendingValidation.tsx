"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Check, X, Camera, Mic, MapPin, DollarSign, Activity } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

export default function AIPendingValidation() {
  const { pendingAIValidations, confirmAIValidation, rejectAIValidation } = useDashboardStore();

  if (pendingAIValidations.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <Bot className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Validação CFO Digital</h3>
          <p className="text-[10px] text-slate-500 font-medium">Itens detectados via WhatsApp aguardando aprovação</p>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {pendingAIValidations.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-indigo-500/20 p-4 rounded-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                {item.type === 'cost' ? <DollarSign className="w-12 h-12 text-white" /> : <Activity className="w-12 h-12 text-white" />}
              </div>

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 p-2 rounded-xl ${item.type === 'cost' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {item.type === 'cost' ? <Camera className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter bg-indigo-500/10 px-1.5 py-0.5 rounded">Detecção Automática</span>
                      <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                    </div>
                    
                    {item.type === 'cost' ? (
                      <div className="mt-2">
                        <p className="text-sm font-bold text-white">{item.data.description}</p>
                        <p className="text-lg font-black text-emerald-400">R$ {item.data.amount.toLocaleString('pt-BR')}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Categoria: {item.data.category}</p>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <p className="text-sm font-bold text-white">{item.data.stage}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden w-24">
                            <div className="h-full bg-blue-500" style={{ width: `${item.data.progress}%` }} />
                          </div>
                          <span className="text-[10px] font-black text-white">{item.data.progress}%</span>
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">{item.data.project}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => confirmAIValidation(item.id)}
                    className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
                    title="Confirmar e Lançar"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => rejectAIValidation(item.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"
                    title="Descartar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
