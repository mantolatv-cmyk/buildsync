"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { TrendingDown, ArrowRightLeft, Wallet, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts";
import { GlossaryTooltip } from "../GlossaryTooltip";
import FinancialDataDrawer from "../FinancialDataDrawer";
import { Plus, Bot, MessageSquare } from "lucide-react";
import WhatsAppSyncCard from "../WhatsAppSyncCard";
import WhatsAppAgentModal from "../WhatsAppAgentModal";

const cashflowData = [
  { month: "Jan", entrada: 0, saida: 150, acumulado: -150 },
  { month: "Fev", entrada: 500, saida: 200, acumulado: 150 },
  { month: "Mar", entrada: 0, saida: 300, acumulado: -150 },
  { month: "Abr", entrada: 0, saida: 250, acumulado: -400 },
  { month: "Mai", entrada: 800, saida: 100, acumulado: 300 },
  { month: "Jun", entrada: 0, saida: 350, acumulado: -50 },
];

const waterfallData = [
  { name: 'VGV', bottom: 0, value: 50, fill: '#10b981', percent: 100 },
  { name: 'Terreno', bottom: 42, value: 8, fill: '#ef4444', percent: 16 },
  { name: 'Obras', bottom: 20, value: 22, fill: '#ef4444', percent: 44 },
  { name: 'Impostos', bottom: 16, value: 4, fill: '#ef4444', percent: 8 },
  { name: 'Comercial', bottom: 14, value: 2, fill: '#ef4444', percent: 4 },
  { name: 'Margem', bottom: 0, value: 14, fill: '#3b82f6', percent: 28 },
];

const costDistributionData = [
  { name: 'Estrutura', value: 35, color: '#3b82f6' },
  { name: 'Acabamentos', value: 28, color: '#8b5cf6' },
  { name: 'Instalações', value: 18, color: '#10b981' },
  { name: 'Esquadrias', value: 12, color: '#f59e0b' },
  { name: 'Projetos', value: 7, color: '#64748b' },
];



export default function FinancialView({ timeFilter }: { timeFilter?: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWAModalOpen, setIsWAModalOpen] = useState(false);
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
          <h2 className="text-2xl font-semibold text-white tracking-tight">Financeiro & Fluxo de Caixa</h2>
          <p className="text-sm text-slate-400 mt-1">Análise aprofundada de capital e previsibilidade</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-4 h-4 mr-2" />
          NOVO REGISTRO
        </button>
      </div>

      <FinancialDataDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <WhatsAppAgentModal isOpen={isWAModalOpen} onClose={() => setIsWAModalOpen(false)} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Top Financial KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 lg:p-6 flex items-center">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mr-3 lg:mr-4 shrink-0">
              <TrendingDown className="w-5 h-5 lg:w-6 lg:h-6 text-red-400" />
            </div>
            <div>
              <p className="text-[10px] lg:text-sm text-slate-400 font-bold uppercase tracking-wider lg:normal-case lg:font-medium">
                <GlossaryTooltip term="Burn Rate">Burn Rate</GlossaryTooltip> Médio
              </p>
              <h3 className="text-lg lg:text-2xl font-bold text-white mt-0.5 lg:mt-1">R$ 225k</h3>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 lg:p-6 flex items-center">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mr-3 lg:mr-4 shrink-0">
              <Wallet className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] lg:text-sm text-slate-400 font-bold uppercase tracking-wider lg:normal-case lg:font-medium">Caixa Disponível</p>
              <h3 className="text-lg lg:text-2xl font-bold text-white mt-0.5 lg:mt-1">R$ 1.25M</h3>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-4 lg:p-6 flex items-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer rounded-2xl pointer-events-none" />
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mr-3 lg:mr-4 shrink-0">
              <ArrowRightLeft className="w-5 h-5 lg:w-6 lg:h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] lg:text-sm text-slate-400 font-bold uppercase tracking-wider lg:normal-case lg:font-medium">
                <GlossaryTooltip term="Runway">Runway</GlossaryTooltip> Estimado
              </p>
              <h3 className="text-lg lg:text-2xl font-bold text-white mt-0.5 lg:mt-1">5.5 Meses</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Gráfico de Fluxo de Caixa (Area) */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 h-full">
              <h3 className="text-lg font-semibold text-white mb-6">Fluxo de Caixa Acumulado (R$ milhares)</h3>
              <div className="h-64 lg:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <AreaChart data={cashflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAcumulado" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 10}} 
                      dy={10}
                      interval={"preserveStartEnd"}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 10}}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="acumulado" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcumulado)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <WhatsAppSyncCard onOpenModal={() => setIsWAModalOpen(true)} />
          </div>
        </div>

        {/* Nova Seção: Rentabilidade e Custos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico Waterfall (DRE) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative">
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  <GlossaryTooltip term="DRE">DRE</GlossaryTooltip> Dinâmico (<GlossaryTooltip term="Waterfall">Waterfall</GlossaryTooltip>)
                </h3>
                <p className="text-sm text-slate-400">Análise de Composição do <GlossaryTooltip term="VGV">VGV</GlossaryTooltip></p>
              </div>
              <div className="flex space-x-2">
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Margem: 28%</span>
                </div>
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Custos: 72%</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: 70, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    tickFormatter={(val) => `R$${val}M`} 
                    domain={[0, 60]} 
                  />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.4}} 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '12px' }}
                    itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                    formatter={(value: any, name: any, props: any) => {
                      if (name === 'bottom') return null;
                      return [
                        <div key={props.payload.name} className="flex flex-col">
                          <span className="text-white text-lg">R$ {value}M</span>
                          <span className="text-slate-400 text-xs font-medium">{props.payload.percent}% do VGV</span>
                        </div>,
                        null
                      ];
                    }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Bar dataKey="bottom" stackId="a" fill="transparent" />
                  <Bar dataKey="value" stackId="a" barSize={40}>
                    {waterfallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut Chart (Distribuição de Custos) */}
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col relative overflow-hidden">
            <h3 className="text-lg font-semibold text-white mb-1">Distribuição de Custo (Obras)</h3>
            <p className="text-sm text-slate-400 mb-4">Composição por Macroetapa</p>
            <div className="flex-1 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                <PieChart>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                    formatter={(value: any) => [`${value}%`, 'Participação']}
                  />
                  <Pie
                    data={costDistributionData}
                    cx="50%"
                    cy="45%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {costDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Central text for Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-[40px]">
                <span className="text-xs text-slate-500 font-medium">Total</span>
                <span className="text-lg font-bold text-white">R$ 22M</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
