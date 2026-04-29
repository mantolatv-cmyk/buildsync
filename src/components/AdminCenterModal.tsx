"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Settings, Activity, CreditCard, LogOut, 
  Camera, Bell, Globe, Database, ShieldCheck, Check
} from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface AdminCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminCenterModal({ isOpen, onClose, activeTab, setActiveTab }: AdminCenterModalProps) {
  const { activityLog } = useDashboardStore();
  
  const tabs = [
    { id: 'Meu Perfil', icon: User },
    { id: 'Configurações', icon: Settings },
    { id: 'Atividade', icon: Activity },
    { id: 'Faturamento', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Meu Perfil':
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-1">
                  <div className="w-full h-full bg-[#0f172a] rounded-[22px] flex items-center justify-center text-4xl font-black text-blue-400">
                    M
                  </div>
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-xl text-white shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Eng. Martins</h3>
                <p className="text-slate-400">martins@buildsync.com</p>
                <div className="flex space-x-2 mt-2">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-full border border-blue-500/20 uppercase tracking-widest">Super Admin</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">Verificado</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nome Completo</label>
                <p className="text-sm text-white font-medium">Martins Construction Management</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Registro Profissional</label>
                <p className="text-sm text-white font-medium">CREA-SP 123456789</p>
              </div>
            </div>
          </div>
        );
      case 'Configurações':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center">
                <Bell className="w-4 h-4 mr-2 text-blue-400" /> Notificações
              </h4>
              {[
                { label: 'Alertas de Preço de Insumos', active: true },
                { label: 'Relatórios Mensais Automáticos', active: true },
                { label: 'Atrasos em Cronograma', active: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${item.active ? 'bg-blue-600' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h4 className="text-sm font-bold text-white flex items-center">
                <Globe className="w-4 h-4 mr-2 text-indigo-400" /> Preferências do Sistema
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Idioma</label>
                  <p className="text-sm text-white font-medium">Português (Brasil)</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Moeda</label>
                  <p className="text-sm text-white font-medium">BRL (R$)</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Atividade':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-bold text-white">Log de Ações</h4>
              <button className="text-[10px] text-blue-400 font-bold uppercase hover:underline">Limpar Log</button>
            </div>
            {activityLog.length === 0 ? (
              <div className="text-center py-10 opacity-20">Nenhuma atividade registrada</div>
            ) : (
              activityLog.slice(0, 5).map((log, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{log.action}</p>
                    <p className="text-[11px] text-slate-500">{log.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case 'Faturamento':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Check className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase opacity-80 mb-1">Plano Atual</p>
                <h4 className="text-3xl font-black mb-4">Enterprise Pro</h4>
                <div className="flex items-center space-x-2 text-sm font-bold bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                  <Check className="w-4 h-4" />
                  <span>Ativo até Out 2026</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Últimas Faturas</h4>
              {[
                { date: 'Set 2026', amount: 'R$ 850,00', status: 'Pago' },
                { date: 'Ago 2026', amount: 'R$ 850,00', status: 'Pago' },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">{inv.date}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{inv.amount}</p>
                    <span className="text-[10px] text-emerald-400 font-black uppercase">{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-[600px] bg-[#020617] border border-white/10 rounded-[40px] shadow-2xl z-[70] overflow-hidden flex"
          >
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-slate-900/40 p-8 flex flex-col">
              <h2 className="text-xl font-bold text-white mb-8 tracking-tight">Admin Center</h2>
              <nav className="flex-1 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-3" />
                    {tab.id}
                  </button>
                ))}
              </nav>

              <button className="flex items-center px-4 py-3 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-2xl transition-all">
                <LogOut className="w-4 h-4 mr-3" />
                Sair do App
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-2">BuildSync Management</h3>
                  <h2 className="text-3xl font-black text-white mb-8">{activeTab}</h2>
                  {renderContent()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
