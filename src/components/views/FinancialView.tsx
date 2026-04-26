"use client";

import React from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { TrendingDown, ArrowRightLeft, Wallet, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from "recharts";

const cashflowData = [
  { month: "Jan", entrada: 0, saida: 150, acumulado: -150 },
  { month: "Fev", entrada: 500, saida: 200, acumulado: 150 },
  { month: "Mar", entrada: 0, saida: 300, acumulado: -150 },
  { month: "Abr", entrada: 0, saida: 250, acumulado: -400 },
  { month: "Mai", entrada: 800, saida: 100, acumulado: 300 },
  { month: "Jun", entrada: 0, saida: 350, acumulado: -50 },
];

const waterfallData = [
  { name: 'VGV', bottom: 0, value: 50, fill: '#10b981' },
  { name: 'Terreno', bottom: 42, value: 8, fill: '#ef4444' },
  { name: 'Obras', bottom: 20, value: 22, fill: '#ef4444' },
  { name: 'Impostos', bottom: 16, value: 4, fill: '#ef4444' },
  { name: 'Comercial', bottom: 14, value: 2, fill: '#ef4444' },
  { name: 'Margem', bottom: 0, value: 14, fill: '#3b82f6' },
];

const costDistributionData = [
  { name: 'Estrutura', value: 35, color: '#3b82f6' },
  { name: 'Acabamentos', value: 28, color: '#8b5cf6' },
  { name: 'Instalações', value: 18, color: '#10b981' },
  { name: 'Esquadrias', value: 12, color: '#f59e0b' },
  { name: 'Projetos', value: 7, color: '#64748b' },
];

export default function FinancialView({ timeFilter }: { timeFilter?: string }) {
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
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Top Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mr-4">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Burn Rate Mensal Médio</p>
              <h3 className="text-2xl font-bold text-white mt-1">R$ 225.000</h3>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mr-4">
              <Wallet className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Caixa Atual Disponível</p>
              <h3 className="text-2xl font-bold text-white mt-1">R$ 1.250.000</h3>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mr-4">
              <ArrowRightLeft className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Runway Estimado</p>
              <h3 className="text-2xl font-bold text-white mt-1">5.5 Meses</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Fluxo de Caixa (Waterfall / Area) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Fluxo de Caixa Acumulado (R$ milhares)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={cashflowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAcumulado" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10}/>
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}}/>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="acumulado" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcumulado)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Previsão de Chamadas de Capital */}
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-2">Chamadas de Capital</h3>
            <p className="text-sm text-slate-400 mb-6">Próximos aportes previstos (Capital Calls)</p>

            <div className="space-y-4 flex-1">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-xs font-bold text-amber-500 mb-1 tracking-wider uppercase">Chamada #04 - Pendente</div>
                <div className="text-2xl font-bold text-white mb-2">R$ 800.000</div>
                <div className="flex justify-between items-center text-sm text-slate-300">
                  <span>Vencimento:</span>
                  <span className="font-semibold text-amber-400">15 Ago 2026</span>
                </div>
                <button className="w-full mt-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm font-semibold rounded-lg transition-colors">
                  Autorizar Transferência
                </button>
              </div>

              <div className="bg-slate-800/30 border border-white/5 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Chamada #05 - Prevista</div>
                <div className="text-xl font-bold text-slate-300 mb-2">R$ 450.000</div>
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <span>Vencimento Estimado:</span>
                  <span>10 Nov 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nova Seção: Rentabilidade e Custos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico Waterfall (DRE) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-lg font-semibold text-white mb-1">DRE Dinâmico (Waterfall)</h3>
            <p className="text-sm text-slate-400 mb-6">Da Receita Bruta (VGV) à Margem Líquida (R$ Milhões)</p>
            <div className="h-72 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={waterfallData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `R$${val}M`} domain={[0, 'dataMax']} />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.4}} 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                    formatter={(value: any, name: any, props: any) => {
                      if (name === 'bottom') return [];
                      return [`R$ ${value}M`, props.payload.name];
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
