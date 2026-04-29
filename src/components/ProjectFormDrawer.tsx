"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Building2, Wallet, HardHat, Camera, UploadCloud, CheckCircle2 } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface ProjectFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editProject?: any;
}

export default function ProjectFormDrawer({ isOpen, onClose, editProject }: ProjectFormDrawerProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const addProject = useDashboardStore(state => state.addProject);
  const updateProject = useDashboardStore(state => state.updateProject);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    budget: "",
    deadline: "2027",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000",
  });

  useEffect(() => {
    if (editProject) {
      setFormData({
        name: editProject.name,
        location: editProject.location,
        budget: editProject.budget.replace(/[^0-9.]/g, ''),
        deadline: editProject.deadline,
        image: editProject.image
      });
    } else {
      setFormData({
        name: "",
        location: "",
        budget: "",
        deadline: "2027",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000",
      });
    }
  }, [editProject, isOpen]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    const projectData = {
      name: formData.name || "Novo Empreendimento",
      location: formData.location || "Local não informado",
      progress: editProject ? editProject.progress : 0,
      status: editProject ? editProject.status : "on_track",
      image: formData.image,
      deadline: formData.deadline || "2027",
      projectedDeadline: formData.deadline || "2027",
      budget: formData.budget ? `R$ ${parseFloat(formData.budget).toLocaleString('pt-BR')}M` : "R$ 0M",
      eac: formData.budget ? `R$ ${parseFloat(formData.budget).toLocaleString('pt-BR')}M` : "R$ 0M"
    };

    setTimeout(() => {
      if (editProject) {
        updateProject(editProject.id, projectData);
      } else {
        addProject(projectData);
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const InputField = ({ label, placeholder, name, type = "text" }: any) => (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input 
        type={type} 
        value={(formData as any)[name] || ""}
        onChange={(e) => setFormData({...formData, [name]: e.target.value})}
        placeholder={placeholder}
        className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
      />
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
            <InputField label="Nome do Empreendimento" name="name" placeholder="Ex: Residencial Alpha" />
            <InputField label="Endereço / Cidade" name="location" placeholder="Rua, Número, Bairro, Cidade - UF" />
            <InputField label="CNPJ da SPE" placeholder="00.000.000/0000-00" />
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
            <InputField label="Orçamento Direto (Milhões R$)" name="budget" placeholder="Ex: 12.5" type="number" />
            <InputField label="Data de Entrega" name="deadline" placeholder="Ex: Nov 2026" />
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Área Construída (m²)" placeholder="0 m²" type="number" />
              <InputField label="Área do Terreno (m²)" placeholder="0 m²" type="number" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Área da Piscina (m²)" placeholder="0 m²" type="number" />
              <InputField label="Engenheiro Resp." placeholder="Nome Completo" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Data de Início" placeholder="DD/MM/AAAA" type="date" />
              <InputField label="Previsão de Entrega" placeholder="DD/MM/AAAA" type="date" />
            </div>
            <InputField label="CREA / Registro Profissional" placeholder="Ex: CREA-SP 123456" />
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Upload de Mídia <span className="text-slate-600 font-normal text-xs">(Opcional)</span></label>
            <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-800/30 rounded-2xl h-64 flex flex-col items-center justify-center transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-slate-300 font-medium">Arraste a imagem de fachada ou Render 3D</p>
              <p className="text-slate-500 text-sm mt-1">PNG, JPG ou PDF (Máx. 10MB)</p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#0f172a] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#020617]/50 backdrop-blur-md">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{editProject ? 'Editar Obra' : 'Registro de Nova Obra'}</h2>
                <p className="text-sm text-slate-400">{editProject ? 'Atualize os dados do empreendimento' : 'Preencha os dados (todos os campos são opcionais)'}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar & Steps indicator */}
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full z-0" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
                
                {[
                  { id: 1, icon: Building2, label: "Institucional" },
                  { id: 2, icon: Wallet, label: "Financeiro" },
                  { id: 3, icon: HardHat, label: "Engenharia" },
                  { id: 4, icon: Camera, label: "Mídia" }
                ].map((s) => (
                  <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${step >= s.id ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] uppercase font-bold mt-2 tracking-wider ${step >= s.id ? 'text-blue-400' : 'text-slate-500'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar overflow-x-hidden">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                   <h3 className="text-2xl font-bold text-white mb-2">{editProject ? 'Obra Atualizada!' : 'Obra Registrada!'}</h3>
                  <p className="text-slate-400 text-center max-w-sm">O portfólio foi atualizado e os KPIs já estão sincronizados.</p>
                </motion.div>
              ) : (
                <div className="py-4">
                  <AnimatePresence mode="wait">
                    {renderStepContent()}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer / Controls */}
            {!isSuccess && (
              <div className="p-6 border-t border-white/10 bg-[#020617]/50 backdrop-blur-md flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={step === 1 || isSubmitting}
                  className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/5 ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
                </button>
                
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Próxima Etapa <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center px-8 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> 
                        Salvando...
                      </span>
                    ) : (
                      "Confirmar Registro"
                    )}
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
