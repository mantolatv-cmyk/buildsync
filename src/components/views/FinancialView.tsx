"use client";

import React from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { TrendingDown, ArrowRightLeft, Wallet, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cashflowData = [
  { month: "Jan", entrada: 0, saida: 150, acumulado: -150 },
  { month: "Fev", entrada: 500, saida: 200, acumulado: 150 },
  { month: "Mar", entrada: 0, saida: 300, acumulado: -150 },
  { month: "Abr", entrada: 0, saida: 250, acumulado: -400 },
  { month: "Mai", entrada: 800, saida: 100, acumulado: 300 },
  { month: "Jun", entrada: 0, saida: 350, acumulado: -50 },
];

export default function FinancialView() {
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
      </motion.div>
    </div>
  );
}
