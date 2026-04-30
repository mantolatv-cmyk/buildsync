"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, RefreshCcw, Wifi, Battery, 
  ExternalLink, Smartphone, Bot, AlertCircle 
} from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface WhatsAppSyncCardProps {
  onOpenModal: () => void;
}

export default function WhatsAppSyncCard({ onOpenModal }: WhatsAppSyncCardProps) {
  const { whatsappConfig, whatsappLogs, toggleWhatsAppSync } = useDashboardStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[60px] rounded-full transition-colors duration-500 ${whatsappConfig.connected ? 'bg-emerald-500/20' : 'bg-red-500/20'}`} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${whatsappConfig.connected ? 'bg-emerald-500/10 text-emerald-400 shadow-emerald-500/10' : 'bg-slate-800 text-slate-500'}`}>
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-tight">CFO Digital <span className="text-slate-500 font-normal">| WA Sync</span></h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`w-2 h-2 rounded-full animate-pulse ${whatsappConfig.connected ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {whatsappConfig.connected ? 'Operacional via WhatsApp' : 'Desconectado'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onOpenModal}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
          title="Ver Conversas"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center space-x-2 text-slate-500 mb-1">
              <Wifi className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">Status</span>
            </div>
            <p className="text-xs font-bold text-white">{whatsappConfig.connected ? 'Excelente' : 'Sem Sinal'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center space-x-2 text-slate-500 mb-1">
              <Battery className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">Dispositivo</span>
            </div>
            <p className="text-xs font-bold text-white">{whatsappConfig.battery}% de Bateria</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Inteligência Ativa (Logs)</p>
          {whatsappLogs.slice(0, 2).map((log) => (
            <div key={log.id} className="flex items-start space-x-3 bg-white/5 p-2.5 rounded-lg border border-white/5 group/log hover:bg-white/10 transition-colors">
              <div className={`mt-1 flex-shrink-0 ${log.type === 'ai_processed' ? 'text-blue-400' : 'text-emerald-400'}`}>
                {log.type === 'ai_processed' ? <Bot className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between">
                  <span className="text-[10px] font-black text-white/70 truncate">{log.contact}</span>
                  <span className="text-[9px] text-slate-500">{log.time}</span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1 italic">"{log.message}"</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={toggleWhatsAppSync}
          className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter flex items-center justify-center space-x-2 transition-all ${whatsappConfig.connected ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400'}`}
        >
          {whatsappConfig.connected ? (
            <>
              <AlertCircle className="w-3 h-3" />
              <span>Interromper Sincronização</span>
            </>
          ) : (
            <>
              <RefreshCcw className="w-3 h-3" />
              <span>Conectar WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
