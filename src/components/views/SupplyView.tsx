"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const supplyPriceData = [
  { item: 'Aço (Ton)', orcado: 4200, atual: 5100 },
  { item: 'Concreto (m³)', orcado: 350, atual: 380 },
  { item: 'Cimento (Sc)', orcado: 28, atual: 32 },
  { item: 'Cobre (kg)', orcado: 45, atual: 52 },
  { item: 'Esquadrias (m²)', orcado: 800, atual: 780 },
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
          <p className="text-sm text-slate-400 mt-1">Gestão de insumos críticos (Curva ABC)</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            Adicionar Insumo
          </button>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
      >
        {/* Gráfico de Variação de Preços (Inflação Interna) */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="mb-6 relative z-10">
            <h3 className="text-lg font-semibold text-white">Variação de Custo: Insumos Curva A</h3>
            <p className="text-sm text-slate-400">Preço Orçado (Base) vs. Preço Atual de Mercado (R$)</p>
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
      </motion.div>
    </div>
  );
}
