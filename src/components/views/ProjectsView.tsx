"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { MapPin, Calendar, ArrowRight, Camera } from "lucide-react";

const projectsData = [
  {
    id: 1,
    name: "Residencial Alpha",
    location: "São Paulo, SP",
    progress: 78,
    status: "on_track",
    image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
    deadline: "Nov 2026",
    budget: "R$ 12.5M"
  },
  {
    id: 2,
    name: "Torre Horizonte",
    location: "Curitiba, PR",
    progress: 42,
    status: "delayed",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
    deadline: "Fev 2027",
    budget: "R$ 45.0M"
  },
  {
    id: 3,
    name: "Condomínio Reserva",
    location: "Campinas, SP",
    progress: 15,
    status: "on_track",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2000&auto=format&fit=crop",
    deadline: "Ago 2027",
    budget: "R$ 8.2M"
  }
];

export default function ProjectsView() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Portfólio de Obras</h2>
          <p className="text-sm text-slate-400 mt-1">Gestão de múltiplos empreendimentos ativos</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-white/5">
            Filtrar por Status
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            Adicionar Obra
          </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projectsData.map(project => (
          <motion.div 
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl hover:border-white/10 transition-all flex flex-col"
          >
            {/* Project Image Header */}
            <div className="h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img src={project.image} alt={project.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${project.status === 'on_track' ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                  {project.status === 'on_track' ? 'No Prazo' : 'Atrasado'}
                </span>
              </div>
              {/* Photo Gallery Indicator */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                <Camera className="w-3 h-3 text-slate-300" />
                <span className="text-xs text-slate-300">12 Fotos</span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{project.name}</h3>
              <p className="text-sm text-slate-400 flex items-center mb-6">
                <MapPin className="w-3.5 h-3.5 mr-1" /> {project.location}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Orçamento</p>
                  <p className="text-sm font-semibold text-white">{project.budget}</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">Entrega</p>
                  <p className="text-sm font-semibold text-white flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> {project.deadline}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-300">Avanço Físico</span>
                  <span className="font-bold text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                  />
                </div>
              </div>
            </div>
            
            <div className="px-5 py-3 border-t border-white/5 flex justify-between items-center text-sm text-slate-400 group-hover:text-white transition-colors bg-white/5">
              <span>Abrir dashboard da obra</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
