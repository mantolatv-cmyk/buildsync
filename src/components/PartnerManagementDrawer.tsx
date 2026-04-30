"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Filter, Plus, ExternalLink, Mail, Phone, MapPin, ShieldCheck, Star } from "lucide-react";

import { useDashboardStore } from "../store/useDashboardStore";
import NewPartnerModal from "./NewPartnerModal";

interface PartnerManagementDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerManagementDrawer({ isOpen, onClose }: PartnerManagementDrawerProps) {
  const { suppliers } = useDashboardStore();
  const [isNewPartnerModalOpen, setIsNewPartnerModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPartners = suppliers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NewPartnerModal 
        isOpen={isNewPartnerModalOpen} 
        onClose={() => setIsNewPartnerModalOpen(false)} 
      />
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
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-slate-900 border-l border-white/10 shadow-2xl z-[60] flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold text-white">Gestão de Parceiros</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Ecossistema de Fornecedores Homologados</p>
                </div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 border-b border-white/5 bg-slate-800/20 flex space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Buscar parceiro ou categoria..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <button className="p-2 bg-slate-800 border border-white/10 rounded-xl text-slate-400 hover:text-white">
                  <Filter className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsNewPartnerModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {filteredPartners.map((partner) => (
                  <motion.div 
                    key={partner.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-slate-800/30 border border-white/5 rounded-2xl p-5 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-lg font-black text-blue-400">
                          {partner.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{partner.name}</h4>
                            <ShieldCheck className={`w-4 h-4 ${partner.status === 'Homologado' ? 'text-blue-400' : 'text-amber-400'}`} />
                          </div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{partner.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 px-2 py-1 bg-slate-950 rounded-lg border border-white/5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-white">{partner.score || partner.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3.5 h-3.5 text-slate-600" />
                        <span className="truncate">{partner.email || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3.5 h-3.5 text-slate-600" />
                        <span>{partner.phone || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-600" />
                        <span>{partner.location || 'Não informado'}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-bold text-white uppercase transition-all">
                        Ver Contratos
                      </button>
                      <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <p className="text-[10px] text-slate-500 uppercase font-black text-center tracking-widest">
                  BuildSync Partner Program v2.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
