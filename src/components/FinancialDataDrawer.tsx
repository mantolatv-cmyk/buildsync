"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Wallet, TrendingUp, Landmark, Calendar, CheckCircle2, DollarSign } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface FinancialDataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinancialDataDrawer({ isOpen, onClose }: FinancialDataDrawerProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const updateKpi = useDashboardStore((state) => state.updateKpi);

  const [formData, setFormData] = useState({
    capital: "",
    yoc: "",
    costPerSqm: "",
    revenue: "",
    expense: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleNext = () => { if (step < 3) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulação de atualização na store
    setTimeout(() => {
      if (formData.capital) updateKpi('capital', parseFloat(formData.capital));
      if (formData.yoc) updateKpi('yoc', parseFloat(formData.yoc));
      if (formData.costPerSqm) updateKpi('costPerSqm', parseFloat(formData.costPerSqm));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setStep(1);
      }, 2000);
    }, 1500);
  };

  const InputField = ({ label, placeholder, name, type = "text", icon: Icon }: any) => (
    <div className="flex flex-col mb-5">
      <label className="text-sm font-semibold text-slate-400 mb-2 flex items-center">
        {Icon && <Icon className="w-4 h-4 mr-2 text-blue-500/70" />}
        {label}
      </label>
      <input 
        type={type} 
        value={(formData as any)[name]}
        onChange={(e) => setFormData({...formData, [name]: e.target.value})}
        placeholder={placeholder}
        className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
      />
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-[60]" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#0f172a] border-l border-white/10 shadow-2xl z-[70] flex flex-col">
            <div className="p-6 border-b border-white/10 bg-[#020617]/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Lançamento Financeiro</h2>
                <p className="text-sm text-slate-400">Atualize os KPIs e fluxo de caixa</p>
              </div>
              <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors border border-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Dados Atualizados!</h3>
                  <p className="text-slate-400 max-w-xs">Os gráficos e indicadores foram recalculados com sucesso.</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-6">Indicadores de Capital</h4>
                      <InputField label="Capital Investido Total (R$)" name="capital" placeholder="Ex: 1500000" type="number" icon={Wallet} />
                      <InputField label="Yield on Cost Projetado (%)" name="yoc" placeholder="Ex: 14.5" type="number" icon={TrendingUp} />
                      <InputField label="Custo por m² Médio (R$)" name="costPerSqm" placeholder="Ex: 4100" type="number" icon={Landmark} />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <h4 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-6">Fluxo de Caixa (Mensal)</h4>
                      <InputField label="Data do Lançamento" name="date" type="date" icon={Calendar} />
                      <InputField label="Entrada / Aporte (R$)" name="revenue" placeholder="R$ 0,00" type="number" icon={DollarSign} />
                      <InputField label="Saída / Despesa (R$)" name="expense" placeholder="R$ 0,00" type="number" icon={TrendingUp} />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 text-center py-10">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Revisão Final</h4>
                      <p className="text-sm text-slate-400">Ao confirmar, os dados serão persistidos e todos os usuários do dashboard visualizarão a atualização.</p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {!isSuccess && (
              <div className="p-6 border-t border-white/10 bg-[#020617]/50 backdrop-blur-md flex justify-between items-center">
                <button onClick={handlePrev} disabled={step === 1} className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/5 ${step === 1 ? 'opacity-0' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                  <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
                </button>
                
                {step < 3 ? (
                  <button onClick={handleNext} className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
                    Continuar <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50">
                    {isSubmitting ? "Processando..." : "Confirmar Lançamento"}
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
