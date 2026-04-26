"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FileText, Download, Calendar, Filter, FileBarChart, Presentation, PieChart } from "lucide-react";

const reportTemplates = [
  { id: 1, title: "Resumo Executivo YTD", icon: Presentation, desc: "Avanço físico, financeiro e principais milestones.", color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: 2, title: "Fechamento de Caixa", icon: FileBarChart, desc: "Fluxo de caixa detalhado, DRE e mapa de pagamentos.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: 3, title: "Análise de Portfólio", icon: PieChart, desc: "Comparativo de ROI, YOC e alocação de capital entre obras.", color: "text-purple-400", bg: "bg-purple-500/10" }
];

const historicalReports = [
  { id: 1, name: "Resumo Executivo - Outubro 2026", date: "31 Out 2026", size: "2.4 MB", type: "PDF" },
  { id: 2, name: "Fechamento de Caixa Q3", date: "15 Out 2026", size: "1.1 MB", type: "CSV" },
  { id: 3, name: "Resumo Executivo - Setembro 2026", date: "30 Set 2026", size: "2.3 MB", type: "PDF" },
  { id: 4, name: "Relatório de Sustentabilidade", date: "10 Set 2026", size: "5.8 MB", type: "PDF" },
];

export default function ReportsView() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Central de Relatórios</h2>
          <p className="text-sm text-slate-400 mt-1">Gere novos documentos ou acesse o histórico</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Templates Section */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-4">Templates Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTemplates.map(template => (
              <motion.div 
                key={template.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex flex-col items-start cursor-pointer hover:bg-slate-800/60 transition-colors group relative overflow-hidden shadow-lg"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                  <template.icon className="w-24 h-24 text-white transform rotate-12" />
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${template.bg}`}>
                  <template.icon className={`w-6 h-6 ${template.color}`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{template.title}</h4>
                <p className="text-sm text-slate-400 mb-6">{template.desc}</p>
                <button className="mt-auto flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  Gerar Agora <FileText className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Historical Reports */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Histórico de Downloads</h3>
            <div className="flex space-x-3">
              <button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-white/5 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filtrar
              </button>
            </div>
          </div>
          
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-slate-800/30 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <div className="col-span-6 md:col-span-5">Nome do Arquivo</div>
              <div className="col-span-4 md:col-span-3 hidden md:block">Data de Geração</div>
              <div className="col-span-3 md:col-span-2 hidden md:block text-right">Tamanho</div>
              <div className="col-span-6 md:col-span-2 text-right">Ação</div>
            </div>
            <div className="divide-y divide-white/5">
              {historicalReports.map((report) => (
                <div key={report.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                  <div className="col-span-6 md:col-span-5 flex items-center">
                    <FileText className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{report.name}</span>
                  </div>
                  <div className="col-span-4 md:col-span-3 hidden md:block text-sm text-slate-400 flex items-center">
                    <Calendar className="w-4 h-4 inline mr-2 text-slate-500" />
                    {report.date}
                  </div>
                  <div className="col-span-3 md:col-span-2 hidden md:block text-sm text-slate-400 text-right">
                    {report.size}
                  </div>
                  <div className="col-span-6 md:col-span-2 text-right">
                    <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors ml-auto flex items-center text-sm font-medium">
                      <Download className="w-4 h-4 mr-2" /> <span className="hidden xl:inline">Baixar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
