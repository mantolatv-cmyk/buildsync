"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Mail, Phone, MapPin, Tag, ShieldCheck, Star } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface NewPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewPartnerModal({ isOpen, onClose }: NewPartnerModalProps) {
  const { addSupplier } = useDashboardStore();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    phone: "",
    location: "",
    rating: 4.5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    addSupplier({
      ...formData,
      id: Date.now(),
      volume: "R$ 0",
      stability: 100,
      score: formData.rating,
      benchmark: 0,
      status: "Homologado"
    });
    
    setFormData({
      name: "",
      category: "",
      email: "",
      phone: "",
      location: "",
      rating: 4.5,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-800/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400">
                  <PlusIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Novo Parceiro</h3>
                  <p className="text-xs text-slate-400">Cadastrar novo fornecedor no ecossistema</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Dados Principais</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome da Empresa / Razão Social" 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Tag className="absolute left-4 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      required
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      placeholder="Categoria (ex: Aço, Concreto, Elétrica)" 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Contato & Localização</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="E-mail" 
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="Telefone" 
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      placeholder="Cidade, UF" 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-tight">Status de Homologação</p>
                      <p className="text-[10px] text-slate-400 font-medium">Fornecedor entrará como "Homologado" por padrão.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-white">{formData.rating}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      step="0.1" 
                      value={formData.rating}
                      onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})}
                      className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-2xl transition-all uppercase tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-2xl transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest"
                >
                  Cadastrar Parceiro
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
