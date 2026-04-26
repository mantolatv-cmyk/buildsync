"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, FolderKanban, Wallet, FileText, ShieldCheck, Headset,
  TrendingUp, Clock, Sparkles, ChevronDown, X, PieChart as PieChartIcon, BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import Views
import OverviewView from "@/components/views/OverviewView";
import ProjectsView from "@/components/views/ProjectsView";
import FinancialView from "@/components/views/FinancialView";
import ReportDrawer from "@/components/ReportDrawer";

export default function InvestorDashboard() {
  const [activeMenu, setActiveMenu] = useState("Visão Geral");
  const [timeFilter, setTimeFilter] = useState("ytd");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeKpiDetail, setActiveKpiDetail] = useState<any>(null); // State for Drill-down Drawer
  const [isReportDrawerOpen, setIsReportDrawerOpen] = useState(false); // State for Report AI

  const menuItems = [
    { name: "Visão Geral", icon: LayoutDashboard },
    { name: "Projetos", icon: FolderKanban },
    { name: "Financeiro", icon: Wallet },
    { name: "Relatórios", icon: FileText },
    { name: "Compliance", icon: ShieldCheck },
    { name: "Suporte", icon: Headset },
  ];

  return (
    <div className="flex h-screen text-slate-200 font-sans overflow-hidden bg-[#020617] relative selection:bg-blue-500/30">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-2xl border-r border-white/5 flex flex-col z-10 relative">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
            BuildSync
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className="relative w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden"
            >
              {activeMenu === item.name && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 mr-3 relative z-10 transition-colors ${activeMenu === item.name ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
              <span className={`relative z-10 font-medium transition-colors ${activeMenu === item.name ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar">
        <header className="h-20 flex items-center justify-between px-8 bg-[#020617]/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold text-white tracking-tight flex items-center"
          >
            {activeMenu}
            
            {/* Global Time Filter (Only show on Visão Geral and Financeiro) */}
            {(activeMenu === "Visão Geral" || activeMenu === "Financeiro") && (
              <div className="relative ml-6">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 text-sm font-medium bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-200">
                    {timeFilter === 'month' ? 'Este Mês' : timeFilter === 'quarter' ? 'Último Trimestre' : 'Acumulado (YTD)'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-1 z-50 overflow-hidden"
                    >
                      {[
                        { id: 'month', label: 'Este Mês' },
                        { id: 'quarter', label: 'Último Trimestre' },
                        { id: 'ytd', label: 'Acumulado (YTD)' }
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => { setTimeFilter(option.id); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${timeFilter === option.id ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.h1>

          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsReportDrawerOpen(true)}
              className="group relative px-5 py-2.5 bg-white text-slate-950 text-sm font-semibold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                Gerar Relatório IA
              </span>
            </button>
          </div>
        </header>

        {/* View Router */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeMenu === "Visão Geral" && <OverviewView timeFilter={timeFilter} setActiveKpiDetail={setActiveKpiDetail} />}
            {activeMenu === "Projetos" && <ProjectsView />}
            {activeMenu === "Financeiro" && <FinancialView />}
            {activeMenu !== "Visão Geral" && activeMenu !== "Projetos" && activeMenu !== "Financeiro" && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
                <p>Módulo {activeMenu} em desenvolvimento</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Drill-down Drawer / Slide-over (For KPI details from Overview) */}
      <AnimatePresence>
        {activeKpiDetail && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveKpiDetail(null)}
              className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-40"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">{activeKpiDetail.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">Análise aprofundada do indicador</p>
                </div>
                <button 
                  onClick={() => setActiveKpiDetail(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* Main Value Highlight */}
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-6 text-center">
                  <div className="text-sm text-blue-200 mb-2">Valor Total Atual</div>
                  <div className="text-4xl font-bold text-white">{activeKpiDetail.value}</div>
                </div>

                {/* Breakdown Chart Placeholder */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center">
                    <PieChartIcon className="w-4 h-4 mr-2" /> Distribuição / Composição
                  </h4>
                  <div className="h-48 bg-slate-800/50 rounded-xl border border-white/5 flex items-center justify-center text-slate-500 text-sm">
                    {/* Placeholder for actual drill-down chart */}
                    [Gráfico Detalhado de Composição]
                  </div>
                </div>

                {/* Sub-metrics List */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" /> Detalhamento Operacional
                  </h4>
                  <div className="space-y-3">
                    {['Material', 'Mão de Obra', 'Administrativo', 'Equipamentos'].map((item, idx) => (
                      <div key={item} className="bg-slate-800/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                        <span className="text-slate-300">{item}</span>
                        <span className="font-semibold text-white">
                          {25 - idx * 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <button className="w-full py-3 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors shadow-lg">
                  Baixar Relatório Detalhado (CSV)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Report Drawer */}
      <ReportDrawer isOpen={isReportDrawerOpen} onClose={() => setIsReportDrawerOpen(false)} />
    </div>
  );
}
