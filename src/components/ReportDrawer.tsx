"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Download, CheckCircle2 } from "lucide-react";

export default function ReportDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [reportText, setReportText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const fullReport = `Resumo Executivo (BuildSync Copilot):\n\nO portfólio encontra-se 92% aderente às normas de compliance. O Capital Total Investido atingiu R$ 4.250.000 (YTD), apresentando um desvio de custo 2% abaixo do orçado, o que é um indicador muito positivo.\n\nDestaques Operacionais:\n- O Custo por m² está estabilizado em R$ 3.850.\n- A taxa de desperdício de Cimento (6.2%) ultrapassou o limite de tolerância (5%), exigindo ação da equipe de suprimentos.\n- Nenhuma Chamada de Capital pendente para os próximos 30 dias.`;

  useEffect(() => {
    if (isOpen) {
      setReportText("");
      setIsGenerating(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullReport.length) {
          setReportText(fullReport.substring(0, currentIndex));
          currentIndex += 2;
        } else {
          setIsGenerating(false);
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isOpen, fullReport]);

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
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center mr-3 border border-blue-500/30">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Copilot Executivo</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Gerado por IA Baseado no Dashboard</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 min-h-[300px] font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap relative shadow-inner">
                {reportText}
                {isGenerating && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle"
                  />
                )}
              </div>

              {!isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-start space-x-3 bg-green-500/10 border border-green-500/20 p-4 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-green-400">Análise Concluída</h4>
                    <p className="text-xs text-slate-400 mt-1">O relatório reflete os dados atuais do período YTD. Você pode exportar uma via PDF formatada para conselhos de administração.</p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl flex space-x-4">
              <button className="flex-1 py-3 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors shadow-lg flex justify-center items-center disabled:opacity-50" disabled={isGenerating}>
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF Oficial
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
