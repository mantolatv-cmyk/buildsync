"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, TrendingUp, CheckCircle2, DollarSign, BarChart3, ChevronRight, ChevronLeft } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface SupplyEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupplyEntryModal({ isOpen, onClose }: SupplyEntryModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { supplyData, updateSupplyItem } = useDashboardStore();

  const [formData, setFormData] = useState({
    item: "Aço (Ton)",
    preco: "",
    fornecedor: ""
  });

  const handleNext = () => { if (step < 2) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (formData.preco) {
        updateSupplyItem(formData.item, parseFloat(formData.preco));
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setStep(1);
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-[60]" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f172a] border border-white/10 shadow-2xl z-[70] flex flex-col rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#020617]/50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg"><Package className="w-5 h-5 text-blue-400" /></div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Atualizar Insumo</h2>
                  <p className="text-xs text-slate-400">Curva A - Gestão de Preços</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors border border-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cotação Atualizada!</h3>
                  <p className="text-slate-400 text-sm">O preço atualizado refletirá nos índices de inflação interna do portfólio.</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {step === 1 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Insumo Crítico</label>
                        <select 
                          value={formData.item}
                          onChange={(e) => setFormData({...formData, item: e.target.value})}
                          className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          {supplyData.map(s => <option key={s.item} value={s.item}>{s.item}</option>)}
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
                          Preço da Nova Cotação (R$)
                          <span className="text-[10px] text-blue-400 normal-case font-medium">Orçado: R$ {supplyData.find(s => s.item === formData.item)?.orcado.toLocaleString('pt-BR')}</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="number"
                            value={formData.preco}
                            onChange={(e) => setFormData({...formData, preco: e.target.value})}
                            placeholder="0,00"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Fornecedor / Origem</label>
                        <input 
                          type="text"
                          value={formData.fornecedor}
                          onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                          placeholder="Ex: Gerdau, Votorantim..."
                          className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start space-x-3">
                        <TrendingUp className="w-4 h-4 text-amber-500 mt-1" />
                        <p className="text-[11px] text-amber-200/80 leading-relaxed">
                          <strong>Aviso de Mercado:</strong> O preço inserido é 12% superior à última cotação. Isso impactará o KPI de Eficiência de Compra.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {!isSuccess && (
              <div className="p-6 border-t border-white/10 bg-[#020617]/50 flex justify-between items-center">
                <button onClick={handlePrev} disabled={step === 1} className={`text-sm font-bold text-slate-400 hover:text-white transition-colors ${step === 1 ? 'opacity-0' : ''}`}>
                  Voltar
                </button>
                
                {step < 2 ? (
                  <button onClick={handleNext} className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                    Detalhes <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                    {isSubmitting ? "Sincronizando..." : "Confirmar Cotação"}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
