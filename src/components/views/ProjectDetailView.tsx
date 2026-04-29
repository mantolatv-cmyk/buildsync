"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  ChevronLeft, MapPin, Calendar, Clock, Users, AlertTriangle, 
  TrendingUp, Camera, FileText, Download, CloudRain, ThermometerSun 
} from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from "recharts";

interface ProjectDetailViewProps {
  project: any;
  onBack: () => void;
}

const financeData = [
  { name: "Mão de Obra", value: 35 },
  { name: "Materiais", value: 45 },
  { name: "Impostos", value: 12 },
  { name: "Admin", value: 8 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

const timelineData = [
  { stage: "Fundação", status: "complete", date: "Jan 2026" },
  { stage: "Estrutura", status: "active", date: "Em andamento" },
  { stage: "Alvenaria", status: "pending", date: "Jun 2026" },
  { stage: "Instalações", status: "pending", date: "Ago 2026" },
  { stage: "Acabamento", status: "pending", date: "Out 2026" },
];

export default function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen pb-20"
    >
      {/* Premium Header with Image Overlay */}
      <div className="relative h-80 w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        
        <div className="absolute top-8 left-8 z-10">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-white/20 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Voltar para Portfólio</span>
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${project.status === 'on_track' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                {project.status === 'on_track' ? 'No Prazo' : 'Em Atenção'}
              </span>
              <span className="text-blue-400 font-bold text-sm">#ID-00{project.id}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{project.name}</h1>
            <p className="text-slate-300 flex items-center mt-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" /> {project.location}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
              <Camera className="w-6 h-6" />
            </button>
            <button className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
              <FileText className="w-6 h-6" />
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center">
              <Download className="w-5 h-5 mr-2" /> Baixar Relatório Mensal
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-8 mt-8">
        <div className="flex space-x-8 border-b border-white/5">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'schedule', label: 'Cronograma' },
            { id: 'finance', label: 'Financeiro' },
            { id: 'team', label: 'Equipe & Canteiro' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold tracking-wider uppercase transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeDetailTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Column: Quick Stats */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><Users className="w-5 h-5 text-blue-400" /></div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efetivo Hoje</span>
                      </div>
                      <h3 className="text-3xl font-black text-white">42 <span className="text-sm font-normal text-slate-500">operários</span></h3>
                      <p className="text-xs text-green-400 mt-2 font-medium">+5 vs. ontem</p>
                    </div>
                    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-amber-500/10 rounded-lg"><Clock className="w-5 h-5 text-amber-400" /></div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dias em Obra</span>
                      </div>
                      <h3 className="text-3xl font-black text-white">184 <span className="text-sm font-normal text-slate-500">dias</span></h3>
                      <p className="text-xs text-slate-500 mt-2 font-medium">Início: 15 Jan 2026</p>
                    </div>
                    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Incidentes</span>
                      </div>
                      <h3 className="text-3xl font-black text-white">0 <span className="text-sm font-normal text-slate-500">críticos</span></h3>
                      <p className="text-xs text-emerald-400 mt-2 font-medium">320 dias sem acidentes</p>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-white mb-4">Resumo da Situação</h3>
                    <p className="text-slate-400 leading-relaxed">
                      A obra do {project.name} segue em ritmo acelerado na fase de estrutura. A concretagem do 4º pavimento foi concluída dentro da janela climática favorável. 
                      O suprimento de aço está garantido para os próximos 60 dias, mitigando riscos de flutuação de preço no mercado.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Avanço Físico</p>
                        <p className="text-lg font-bold text-white">{project.progress}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Custo Acumulado</p>
                        <p className="text-lg font-bold text-white">R$ 4.2M</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Qualidade</p>
                        <p className="text-lg font-bold text-emerald-400">98.5%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Produtividade</p>
                        <p className="text-lg font-bold text-blue-400">1.08 SPI</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Weather & Contacts */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 p-6 rounded-3xl">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Clima no Canteiro</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <CloudRain className="w-10 h-10 text-blue-400" />
                        <div>
                          <p className="text-2xl font-black text-white">22°C</p>
                          <p className="text-xs text-blue-200">Chuva Fraca Intermitente</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-blue-300 uppercase">Impacto Obra</p>
                        <p className="text-sm font-bold text-amber-400">Moderado</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Responsáveis Técnicos</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Eng. Ricardo Santos", role: "Engenheiro Residente", initial: "RS" },
                        { name: "Ana Paula Melo", role: "Gestora de Suprimentos", initial: "AM" },
                        { name: "Carlos Oliveira", role: "Mestre de Obras", initial: "CO" },
                      ].map((person, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400">
                            {person.initial}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{person.name}</p>
                            <p className="text-[10px] text-slate-500">{person.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div 
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl"
              >
                <h3 className="text-xl font-bold text-white mb-8">Cronograma de Marcos (Milestones)</h3>
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800" />
                  
                  <div className="space-y-12 relative z-10">
                    {timelineData.map((item, i) => (
                      <div key={i} className="flex items-start ml-12 relative">
                        <div className={`absolute -left-12 mt-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#020617] ${
                          item.status === 'complete' ? 'bg-emerald-500' : 
                          item.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-slate-800'
                        }`}>
                          {item.status === 'complete' && <Clock className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className={`font-bold ${item.status === 'pending' ? 'text-slate-500' : 'text-white'}`}>{item.stage}</h4>
                            <span className="text-xs font-medium text-slate-500">{item.date}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {item.status === 'complete' ? 'Concluído conforme planejado' : 
                             item.status === 'active' ? 'Execução: 65% concluída' : 'Previsão de início em breve'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'finance' && (
              <motion.div 
                key="finance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-6">Composição de Custos</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {financeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                          itemStyle={{ color: '#f8fafc' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {financeData.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                        <span className="text-xs text-slate-400">{item.name}: <span className="text-white font-bold">{item.value}%</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-white mb-2">Resumo Financeiro</h3>
                  <p className="text-sm text-slate-400 mb-8">Performance econômica da unidade</p>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-300">Orçamento Consumido</span>
                        <span className="text-white font-bold">R$ 4.2M / {project.budget}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '34%' }} />
                      </div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2 text-emerald-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Eficiência de Compra</span>
                      </div>
                      <p className="text-lg font-bold text-white">-R$ 150k vs. Orçado</p>
                      <p className="text-[10px] text-slate-400">Economia gerada por antecipação de insumos.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
