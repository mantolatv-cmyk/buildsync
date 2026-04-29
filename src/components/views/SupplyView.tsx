"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Package, ArrowRight, Star, Award, TrendingUp, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { GlossaryTooltip } from "../GlossaryTooltip";

const supplyPriceData = [
  { item: 'Aço (Ton)', orcado: 4200, atual: 5100, market: 5350 },
  { item: 'Concreto (m³)', orcado: 350, atual: 380, market: 375 },
  { item: 'Cimento (Sc)', orcado: 28, atual: 32, market: 35 },
  { item: 'Cobre (kg)', orcado: 45, atual: 52, market: 58 },
  { item: 'Esquadrias (m²)', orcado: 800, atual: 780, market: 850 },
];

const marketIndices = [
  { name: "INCC-M", value: "4.85%", status: "up", desc: "Acumulado 12 meses" },
  { name: "SINAPI (SC)", value: "R$ 1.720,40", status: "stable", desc: "Custo médio m²" },
  { name: "CUB-SP", value: "R$ 1.942,12", status: "up", desc: "Padrão Médio R8-N" },
];

const supplierRankingData = [
  { id: 1, name: "Gerdau S.A.", category: "Aço & Estrutura", volume: "R$ 1.2M", stability: 98, score: 4.9, benchmark: -4.2 },
  { id: 2, name: "Votorantim Cimentos", category: "Concreto & Agregados", volume: "R$ 850k", stability: 95, score: 4.8, benchmark: -2.1 },
  { id: 3, name: "Tigre Tubos", category: "Instalações Hidrosanitárias", volume: "R$ 420k", stability: 92, score: 4.7, benchmark: +0.5 },
  { id: 4, name: "Amanco Wavin", category: "Instalações Hidrosanitárias", volume: "R$ 380k", stability: 89, score: 4.5, benchmark: -1.2 },
  { id: 5, name: "Portobello", category: "Acabamentos & Pisos", volume: "R$ 610k", stability: 85, score: 4.6, benchmark: -5.8 },
];

export default function SupplyView() {
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
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Cadeia de Suprimentos</h2>
          <p className="text-sm text-slate-400 mt-1">Gestão de insumos críticos (<GlossaryTooltip term="Curva ABC">Curva ABC</GlossaryTooltip>)</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-semibold hover:bg-blue-600/20 transition-colors">
            Gerar Relatório ABC
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            Adicionar Insumo
          </button>
        </div>
      </div>

      {/* Market Intelligence Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {marketIndices.map((idx, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-2xl relative group hover:bg-slate-800/50 transition-colors"
          >
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{idx.name.includes('SINAPI') ? <GlossaryTooltip term="SINAPI">SINAPI</GlossaryTooltip> : idx.name}</p>
            <div className="flex items-end justify-between">
              <h4 className="text-xl font-bold text-white">{idx.value}</h4>
              <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${idx.status === 'up' ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'}`}>
                {idx.status === 'up' ? 'ALTA' : 'ESTÁVEL'}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">{idx.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-8"
      >
        {/* Gráfico de Variação de Preços (Inflação Interna) */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="mb-6 relative z-10 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white">Variação de Custo: Insumos <GlossaryTooltip term="Curva ABC">Curva A</GlossaryTooltip></h3>
              <p className="text-sm text-slate-400">Preço Orçado (Base) vs. Preço Atual de Mercado</p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold text-red-400 uppercase">Inflação Portfólio: +4.2%</span>
            </div>
          </div>
          
          <div className="h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={supplyPriceData} margin={{ top: 20, right: 20, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="item" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `R$${val}`} />
                <RechartsTooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#f8fafc', fontSize: '14px', fontWeight: 500 }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
                  formatter={(value: any, name: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, name]}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} iconType="circle" />
                <Bar dataKey="orcado" name="Orçado" fill="#334155" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="atual" name="Preço Atual" radius={[4, 4, 0, 0]} barSize={30}>
                  {supplyPriceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.atual > entry.orcado ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tabela de Ranking de Fornecedores */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ranking de Performance: Fornecedores</h3>
                <p className="text-sm text-slate-400">Avaliação por Volume, Estabilidade e Pontualidade</p>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center transition-colors">
              Gerenciar Parceiros <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 pb-4">
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Parceiro</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Macro Categoria</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Volume Negociado</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Estabilidade de Preço</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">vs. Mercado</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">BuildSync Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {supplierRankingData.map((supplier) => (
                  <tr key={supplier.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                          {supplier.name.substring(0, 2)}
                        </div>
                        <span className="text-sm font-semibold text-white">{supplier.name}</span>
                        {supplier.score >= 4.8 && <ShieldCheck className="w-4 h-4 text-blue-400" />}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {supplier.category}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-sm font-medium text-slate-300">{supplier.volume}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${supplier.stability}%` }} 
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-400">{supplier.stability}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${supplier.benchmark < 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                        {supplier.benchmark > 0 ? '+' : ''}{supplier.benchmark}%
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-white">{supplier.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
