"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ArrowRight, CheckCircle2, Clock, Zap, Target } from "lucide-react";

interface CriticalPathDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const criticalTasks = [
  { id: 1, task: "Instalações Elétricas (Prumada Central)", progress: 45, slack: 0, status: "Critico", impact: "Alto", delay: "12 dias" },
  { id: 2, task: "Revestimento Fachada Sul", progress: 10, slack: 0, status: "Critico", impact: "Alto", delay: "8 dias" },
  { id: 3, task: "Elevadores (Montagem Guias)", progress: 0, slack: 2, status: "Atenção", impact: "Médio", delay: "2 dias" },
  { id: 4, task: "Impermeabilização Áreas Molhadas", progress: 85, slack: 5, status: "Normal", impact: "Baixo", delay: "0 dias" },
];

export default function CriticalPathDrawer({ isOpen, onClose }: CriticalPathDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-slate-900 border-l border-white/10 shadow-2xl z-[60] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Caminho Crítico (CPM)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Análise de Gargalos e Folga Zero</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Resumo do Impacto */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <AlertTriangle className="w-16 h-16 text-red-500" />
                </div>
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4">Diagnóstico de Atraso</h4>
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-black text-white">18d</span>
                  <span className="text-sm font-medium text-slate-400 italic">Desvio projetado no Marco Final</span>
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  Identificamos 2 tarefas com **folga zero**. O atraso na prumada elétrica está segurando o início dos acabamentos finos.
                </p>
              </div>

              {/* Lista de Tarefas Críticas */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                  <Target className="w-4 h-4 mr-2" /> Sequência de Atividades
                </h4>
                {criticalTasks.map((item) => (
                  <div key={item.id} className={`p-5 rounded-2xl border ${item.slack === 0 ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/5'} transition-all group`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-[70%]">
                        <h5 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.task}</h5>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Impacto: {item.impact} • Folga: {item.slack} dias</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-[9px] font-black uppercase ${item.slack === 0 ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {item.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-500 uppercase">Progresso Atual</span>
                        <span className="text-white">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          className={`h-full ${item.slack === 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Plano de Recuperação */}
              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center">
                  <Zap className="w-4 h-4 mr-2" /> Plano de Recuperação
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300">Dobrar equipe de instalações elétricas (Turno Noturno).</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300">Antecipar compra de elevadores para evitar logística concorrente.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <button 
                onClick={() => {
                  // Aqui simulamos a abertura do PDF ou o print do navegador
                  window.print();
                }}
                className="w-full py-3 bg-white text-slate-950 text-xs font-black rounded-xl hover:bg-slate-200 transition-all uppercase tracking-widest shadow-xl shadow-white/5"
              >
                Gerar Plano de Ação (PDF)
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
