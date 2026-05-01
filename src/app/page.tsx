"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, FolderKanban, Wallet, FileText, ShieldCheck,
  TrendingUp, Clock, Sparkles, ChevronDown, X, PieChart as PieChartIcon, BarChart3, Menu, Package, Landmark, Bell, AlertCircle, CheckCircle2,
  Settings, LogOut, User, Activity as ActivityIcon, CreditCard, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { useDashboardStore } from "@/store/useDashboardStore";

import OverviewView from "@/components/views/OverviewView";
import ProjectsView from "@/components/views/ProjectsView";
import FinancialView from "@/components/views/FinancialView";
import ReportsView from "@/components/views/ReportsView";
import SupplyView from "@/components/views/SupplyView";
import FinancingAidView from "@/components/views/FinancingAidView";
import Preloader from "@/components/Preloader";
import AdminCenterModal from "@/components/AdminCenterModal";
import ActionPlanReport from "@/components/ActionPlanReport";

export default function InvestorDashboard() {
  const [activeMenu, setActiveMenu] = useState("Visão Geral");
  const [timeFilter, setTimeFilter] = useState("ytd");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeKpiDetail, setActiveKpiDetail] = useState<any>(null); // State for Drill-down Drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for Mobile Sidebar
  const [isLoading, setIsLoading] = useState(true); // State for Initial Preloader
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminCenterOpen, setIsAdminCenterOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("Meu Perfil");
  const [notifFilter, setNotifFilter] = useState<'all' | 'warning' | 'success'>('all');
  
  const { notifications, markNotificationRead } = useDashboardStore();
  
  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload(); // Simple simulation of logout/reset
    }, 2000);
  };
  
  const filteredNotifications = notifications.filter(n => 
    notifFilter === 'all' ? true : n.type === notifFilter
  );
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Keep preloader for 2.6 seconds to allow animation to complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { name: "Visão Geral", icon: LayoutDashboard },
    { name: "Projetos", icon: FolderKanban },
    { name: "Financeiro", icon: Wallet },
    { name: "Suprimentos", icon: Package },
    { name: "Relatórios", icon: FileText },
    { name: "Auxílio Financiamento", icon: Landmark },
  ];

  return (
    <div className="flex h-screen text-slate-200 font-sans overflow-hidden bg-[#020617] relative selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`w-64 bg-slate-900/90 lg:bg-slate-900/50 backdrop-blur-2xl border-r border-white/5 flex flex-col z-10 fixed lg:relative h-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              BuildSync
            </span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setActiveMenu(item.name); setIsMobileMenuOpen(false); }}
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
      <main className="flex-1 overflow-y-auto overflow-x-visible relative scroll-smooth custom-scrollbar flex flex-col w-full lg:w-auto z-20 pb-24 lg:pb-0">
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 bg-[#020617]/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="mr-3 text-slate-400 hover:text-white lg:hidden transition-colors p-2 bg-slate-800/50 rounded-xl border border-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg lg:text-2xl font-bold text-white tracking-tight flex items-center"
            >
              <span className="lg:inline hidden">{activeMenu}</span>
              <span className="lg:hidden inline text-blue-400 font-black tracking-tighter mr-2">BS</span>
              
              {/* Global Time Filter (Only show on Visão Geral and Financeiro) */}
              {(activeMenu === "Visão Geral" || activeMenu === "Financeiro") && (
                <div className="relative ml-2 lg:ml-6">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm font-medium bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 px-2 lg:px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400 hidden sm:block" />
                    <span className="text-slate-200">
                      {timeFilter === 'month' ? 'Este Mês' : timeFilter === 'quarter' ? 'Último Trimestre' : 'Acumulado'}
                    </span>
                    <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400" />
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
          </div>
          <div className="flex items-center space-x-2 lg:space-x-5">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all relative group"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-[#020617] rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-80 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 bg-slate-800/30">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Alertas Inteligentes</span>
                        <button 
                          onClick={() => notifications.forEach(n => markNotificationRead(n.id))}
                          className="text-[10px] text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase"
                        >
                          Marcar tudo como lido
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        {['all', 'warning', 'success'].map((f) => (
                          <button
                            key={f}
                            onClick={() => setNotifFilter(f as any)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${notifFilter === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                          >
                            {f === 'all' ? 'Todos' : f === 'warning' ? 'Avisos' : 'Sucesso'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {filteredNotifications.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                          <ActivityIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
                          <p className="text-xs italic">Sem alertas para este filtro</p>
                        </div>
                      ) : (
                        filteredNotifications.map(n => (
                          <motion.div 
                            layout
                            key={n.id} 
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer relative ${!n.read ? 'bg-blue-500/5' : ''}`}
                          >
                            {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg mt-0.5 ${
                                n.type === 'warning' ? 'bg-red-500/20 text-red-400' : 
                                n.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {n.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white mb-0.5">{n.title}</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed mb-1">{n.message}</p>
                                <span className="text-[9px] text-slate-500 font-medium uppercase">{n.date}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="w-px h-8 bg-white/5 hidden sm:block" />
            
            {/* Refined User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-1.5 hover:bg-white/5 rounded-2xl transition-all group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white">Eng. Martins</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#020617] rounded-[10px] flex items-center justify-center text-blue-400 font-black">
                    M
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 bg-slate-800/30">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Assinatura</p>
                      <div className="flex items-center text-emerald-400">
                        <Sparkles className="w-3 h-3 mr-1.5" />
                        <span className="text-xs font-bold uppercase">Plano Enterprise</span>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      {[
                        { label: 'Meu Perfil', icon: User },
                        { label: 'Configurações', icon: Settings },
                        { label: 'Atividade', icon: ActivityIcon },
                        { label: 'Faturamento', icon: CreditCard },
                      ].map((item) => (
                        <button 
                          key={item.label}
                          onClick={() => {
                            setAdminTab(item.label);
                            setIsAdminCenterOpen(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        >
                          <item.icon className="w-4 h-4 mr-3 opacity-60" />
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-white/5">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Encerrar Sessão
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            {activeMenu === "Financeiro" && <FinancialView timeFilter={timeFilter} />}
            {activeMenu === "Suprimentos" && <SupplyView />}
            {activeMenu === "Relatórios" && <ReportsView />}
            {activeMenu === "Auxílio Financiamento" && <FinancingAidView />}
            {activeMenu !== "Visão Geral" && activeMenu !== "Projetos" && activeMenu !== "Financeiro" && activeMenu !== "Suprimentos" && activeMenu !== "Relatórios" && activeMenu !== "Auxílio Financiamento" && (
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
                  <div className="text-sm text-blue-200 mb-2">Valor Atual</div>
                  <div className="text-4xl font-bold text-white">
                    {typeof activeKpiDetail.value === 'number' ? 
                      (activeKpiDetail.id === 'yoc' ? `${activeKpiDetail.value}%` : `R$ ${activeKpiDetail.value.toLocaleString('pt-BR')}`) : 
                      activeKpiDetail.value}
                  </div>
                </div>

                {/* Dynamic Chart based on KPI */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" /> Composição por Projeto
                  </h4>
                  <div className="h-64 bg-slate-800/50 rounded-xl border border-white/5 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={useDashboardStore.getState().projects.map(p => ({
                        name: p.name,
                        value: activeKpiDetail.id === 'yoc' ? parseFloat(p.progress) || 12 : parseFloat(p.budget.replace(/[^0-9.]/g, ''))
                      }))}>
                        <XAxis dataKey="name" hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detailed Breakdown List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-300 flex items-center">
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Ranking de Alocação
                  </h4>
                  {useDashboardStore.getState().projects.map((p, idx) => (
                    <div key={idx} className="bg-slate-800/30 p-4 rounded-xl border border-white/5 flex justify-between items-center transition-all hover:bg-slate-800/50">
                      <div>
                        <p className="text-sm font-bold text-white">{p.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{p.location}</p>
                      </div>
                      <span className="font-bold text-blue-400">
                        {activeKpiDetail.id === 'yoc' ? `${(12 + idx * 1.5).toFixed(1)}%` : p.budget}
                      </span>
                    </div>
                  ))}
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

      <AdminCenterModal 
        isOpen={isAdminCenterOpen} 
        onClose={() => setIsAdminCenterOpen(false)} 
        activeTab={adminTab}
        setActiveTab={setAdminTab}
      />

      {/* Bottom Navigation (Mobile Only) - Overhauled for PWA */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-slate-900/80 backdrop-blur-2xl border border-white/10 flex items-center justify-around px-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveMenu(item.name)}
            className="relative flex flex-col items-center justify-center space-y-1 w-12 transition-all active:scale-90"
          >
            {activeMenu === item.name && (
              <motion.div 
                layoutId="activeMobileTab"
                className="absolute -inset-2 bg-blue-500/10 rounded-2xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon className={`w-5 h-5 relative z-10 ${activeMenu === item.name ? "text-blue-400" : "text-slate-500"}`} />
            <span className={`text-[9px] font-black uppercase tracking-tighter relative z-10 ${activeMenu === item.name ? "text-white" : "text-slate-500"}`}>
              {item.name.split(' ')[0]}
            </span>
          </button>
        ))}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center space-y-1 w-12 text-slate-500 active:scale-90"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Mais</span>
        </button>
      </nav>

      {/* Reports hidden from screen, shown on print */}
      <div className="hidden print:block">
        <ActionPlanReport />
      </div>

    </div>
  );
}
