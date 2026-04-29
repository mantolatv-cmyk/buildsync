"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, HardHat, Ruler, Calendar, Image as ImageIcon, Camera, ChevronRight, ChevronLeft } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";
import { GlossaryTooltip } from "./GlossaryTooltip";

interface EngineeringProgressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EngineeringProgressDrawer({ isOpen, onClose }: EngineeringProgressDrawerProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { spiData, updateSpiEtapa } = useDashboardStore();

  const [formData, setFormData] = useState({
    etapa: "Fundação",
    progresso: "",
    custoReal: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleNext = () => { if (step < 2) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    if (!formData.progresso) return alert("Por favor, informe o progresso.");
    
    setIsSubmitting(true);
    setTimeout(() => {
      // Cálculo simplificado de SPI/CPI para o MVP
      const progressoNum = parseFloat(formData.progresso);
      const spiNovo = 0.8 + ((progressoNum/100) * 0.4); 
      const cpiNovo = 0.9 + (Math.random() * 0.2);
      
      updateSpiEtapa(formData.etapa, spiNovo, cpiNovo);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setStep(1);
        setFormData({ ...formData, progresso: "" });
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-[60]" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#0f172a] border-l border-white/10 shadow-2xl z-[70] flex flex-col">
            <div className="p-6 border-b border-white/10 bg-[#020617]/50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Medição de Obra</h2>
                <p className="text-sm text-slate-400">Atualize o avanço físico e custo real</p>
              </div>
              <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors border border-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Medição Concluída!</h3>
                  <p className="text-slate-400 max-w-xs">Os índices SPI e CPI foram recalculados para a etapa selecionada.</p>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-400 mb-2 flex items-center">
                          <HardHat className="w-4 h-4 mr-2 text-blue-500" /> Etapa da Obra
                        </label>
                        <select 
                          value={formData.etapa}
                          onChange={(e) => setFormData({...formData, etapa: e.target.value})}
                          className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
                        >
                          {spiData.map(s => <option key={s.etapa} value={s.etapa}>{s.etapa}</option>)}
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-400 mb-2 flex items-center">
                          <Ruler className="w-4 h-4 mr-2 text-emerald-500" /> Avanço Físico (%)
                        </label>
                        <input 
                          type="number"
                          value={formData.progresso}
                          onChange={(e) => setFormData({...formData, progresso: e.target.value})}
                          placeholder="Ex: 85%"
                          className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-semibold text-slate-400 mb-2 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-amber-500" /> Data da Medição
                        </label>
                        <input 
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4">Evidências de Campo</h4>
                      <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-800/30 rounded-2xl h-48 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                        <Camera className="w-8 h-8 text-slate-500 group-hover:text-blue-400 mb-3" />
                        <p className="text-sm text-slate-300 font-medium">Capturar ou Anexar Fotos</p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase">Obrigatório para validação CEF</p>
                      </div>
                      
                      <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl">
                        <p className="text-[11px] text-blue-400 leading-relaxed">
                          <strong>Dica BuildSync:</strong> Itens ocultos (ferragem, tubulação) devem ser fotografados antes da concretagem para garantir o <GlossaryTooltip term="Cofre de Conformidade">Cofre de Conformidade</GlossaryTooltip>.
                        </p>
                      </div>
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
                
                {step < 2 ? (
                  <button onClick={handleNext} className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
                    Evidências <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                    {isSubmitting ? "Enviando..." : "Confirmar Medição"}
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


