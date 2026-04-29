"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Clock, ArrowUpRight, ArrowDownRight, ShieldCheck, ChevronDown
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, ComposedChart, Area
} from "recharts";
import { useDashboardStore } from "../../store/useDashboardStore";

// --- Extended Mock Data for Time Filters ---
const mockDataSets: any = {
  month: {
    kpis: {
      capital: "850000.00",
      yoc: "14.2",
      costPerSqm: "3900.00",
      capitalTrend: "+2%",
      yocTrend: "+0.1%",
      costTrend: "-0.5%"
    },
    costData: [
      { month: "Sem 1", orcado: 200000, realizado: 195000 },
      { month: "Sem 2", orcado: 400000, realizado: 410000 },
      { month: "Sem 3", orcado: 600000, realizado: 620000 },
      { month: "Sem 4", orcado: 850000, realizado: 840000 },
    ]
  },
  quarter: {
    kpis: {
      capital: "2450000.00",
      yoc: "14.5",
      costPerSqm: "3880.00",
      capitalTrend: "+8%",
      yocTrend: "+0.3%",
      costTrend: "-1.2%"
    },
    costData: [
      { month: "Out", orcado: 700000, realizado: 710000 },
      { month: "Nov", orcado: 1500000, realizado: 1480000 },
      { month: "Dez", orcado: 2500000, realizado: 2450000 },
    ]
  },
  ytd: {
    kpis: {
      capital: "4250000.00",
      yoc: "14.8",
      costPerSqm: "3850.00",
      capitalTrend: "+12%",
      yocTrend: "+0.5%",
      costTrend: "-2.1%"
    },
    costData: [
      { month: "Jan", orcado: 150000, realizado: 145000 },
      { month: "Fev", orcado: 300000, realizado: 310000 },
      { month: "Mar", orcado: 450000, realizado: 460000 },
      { month: "Abr", orcado: 600000, realizado: 590000 },
      { month: "Mai", orcado: 750000, realizado: 780000 },
      { month: "Jun", orcado: 900000, realizado: 920000 },
    ]
  }
};

const roiData = [
  { ano: "2024", projetado: 12.5, realizado: 12.5 },
  { ano: "2025", projetado: 14.0, realizado: 14.2 },
  { ano: "2026", projetado: 15.5, realizado: 16.1 },
  { ano: "2027", projetado: 17.0, realizado: null },
];

const spiData = [
  { etapa: "Fundação", spi: 1.05, cpi: 1.02, status: "Adiantado" },
  { etapa: "Alvenaria", spi: 0.95, cpi: 0.98, status: "Atraso Leve" },
  { etapa: "Cobertura", spi: 1.10, cpi: 1.05, status: "Eficiente" },
  { etapa: "Instalações", spi: 0.88, cpi: 0.92, status: "Crítico" },
  { etapa: "Acabamento", spi: 1.00, cpi: 1.00, status: "No Prazo" },
];

// --- Sub-components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-2xl z-50">
        <p className="text-slate-300 text-sm mb-1">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: R$ {(p.value).toLocaleString('pt-BR')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnimatedCounter = ({ value, prefix = "", suffix = "", isCurrency = false }: any) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const targetValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    if (isNaN(targetValue)) return;

    const duration = 1000; 
    const steps = 30;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(targetValue * easeProgress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(targetValue);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);

  const displayValue = isCurrency 
    ? count.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : count.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return <span>{prefix}{displayValue}{suffix}</span>;
};

// Helper Component for KPI Cards (Interactive)
function KpiCard({ title, value, trend, trendUp, subtitle, icon, neutral = false, onClick, children }: any) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.button 
      onClick={onClick}
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col justify-between transition-all hover:bg-slate-900/70 hover:border-blue-500/30 relative group cursor-pointer shadow-lg w-full text-left min-h-[160px]"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:text-blue-400 transition-all pointer-events-none">
        {icon || <ArrowUpRight className="w-8 h-8" />}
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-2 relative z-10 w-full">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{title}</h3>
          {!icon && (
            <div className={`flex items-center text-[10px] font-black px-2 py-0.5 rounded-full border ${
              neutral ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 
              trendUp ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {trend}
            </div>
          )}
        </div>
        <div className="mt-1 relative z-10">
          <span className="text-3xl font-black text-white tracking-tight leading-none">{value}</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-2 font-medium relative z-10">{subtitle}</p>
      </div>

      {/* Extra content (Charts/Progress) */}
      <div className="mt-4 relative z-10">
        {children}
      </div>
      
      {/* Subtle bottom glow line */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${neutral ? 'bg-slate-500' : trendUp ? 'bg-blue-500' : 'bg-red-500'}`} />
    </motion.button>
  );
}

export default function OverviewView({ timeFilter, setActiveKpiDetail }: { timeFilter: string, setActiveKpiDetail: (kpi: any) => void }) {
  const store = useDashboardStore();
  
  // No mundo real, teríamos conjuntos diferentes por filtro. 
  // Para este MVP, usaremos a store e aplicaremos variações simples baseadas no filtro.
  const currentKpis = {
    ...store.kpis,
    capital: timeFilter === 'month' ? store.kpis.capital : timeFilter === 'quarter' ? store.kpis.capital * 2.8 : store.kpis.capital * 5,
  };

  const costData = store.costData;
  const spiData = store.spiData;
  const roiData = store.roiData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      key={timeFilter} // Trigger re-animation when filter changes
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Top Cards (KPIs Executivos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          id="capital"
          title="Capital Total Investido" 
          value={<AnimatedCounter value={currentKpis.capital.toString()} prefix="R$ " isCurrency={true} />}
          trend={currentKpis.capitalTrend} 
          trendUp={true} 
          subtitle="Composto por 3 obras ativas"
          onClick={() => setActiveKpiDetail({ id: 'capital', title: 'Composição de Capital Investido', value: currentKpis.capital })}
        >
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold">
            <span className="text-slate-500 uppercase">Utilizado</span>
            <span className="text-blue-400">68% do CAPEX</span>
          </div>
        </KpiCard>

        <KpiCard 
          id="yoc"
          title="YOC Projetado" 
          value={<AnimatedCounter value={currentKpis.yoc.toString()} suffix="%" />}
          trend={currentKpis.yocTrend} 
          trendUp={true} 
          subtitle="Rendimento médio anual"
          onClick={() => setActiveKpiDetail({ id: 'yoc', title: 'Análise de Yield on Cost', value: currentKpis.yoc })}
        >
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-1 bg-slate-800 rounded-full relative">
              <div className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full w-[85%]" />
              <div className="absolute left-[60%] top-[-4px] h-3 w-0.5 bg-white/20" title="Benchmark Mercado" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold">
            <span className="text-slate-500 uppercase">vs. Mercado (9.5%)</span>
            <span className="text-emerald-400">+5.3% Alpha</span>
          </div>
        </KpiCard>

        <KpiCard 
          id="cost"
          title="Custo por m² Atual" 
          value={<AnimatedCounter value={currentKpis.costPerSqm.toString()} prefix="R$ " isCurrency={true} />} 
          trend={currentKpis.costTrend} 
          trendUp={false} 
          subtitle="Média ponderada portfólio"
          onClick={() => setActiveKpiDetail({ id: 'cost', title: 'Detalhamento de Custo por m²', value: currentKpis.costPerSqm })}
        >
          <div className="flex items-center justify-between bg-blue-500/5 rounded-lg p-2 border border-blue-500/10">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold text-blue-400 uppercase">Eficiência SINAPI</span>
            </div>
            <span className="text-[10px] font-black text-white">-4.2%</span>
          </div>
        </KpiCard>

        <KpiCard 
          id="status"
          title="Status do Prazo" 
          value="No Prazo" 
          icon={<Clock className="w-8 h-8 text-indigo-400 opacity-80" />}
          subtitle="Entrega: Nov 2026"
          neutral={true}
          onClick={() => setActiveKpiDetail({ id: 'status', title: 'Cronograma Detalhado', value: '142 Dias' })}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[8px] font-bold text-slate-400">
                OB{i}
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-[#020617] flex items-center justify-center text-[8px] font-bold text-white">
              +2
            </div>
          </div>
        </KpiCard>
      </div>

      {/* Middle Layer (Gráficos Principais) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Linha - Desvio de Custo */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative group hover:bg-slate-900/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h2 className="text-lg font-semibold text-white">Desvio de Custo</h2>
              <p className="text-sm text-slate-400">Orçado vs Realizado ({timeFilter === 'ytd' ? 'Últimos 6 meses' : timeFilter === 'quarter' ? 'Últimos 3 meses' : 'Mensal'})</p>
            </div>
          </div>
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={costData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" name="Orçado" dataKey="orcado" stroke="#475569" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#475569', stroke: '#0f172a' }} />
                <Line type="monotone" name="Realizado" dataKey="realizado" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2 }} filter="url(#glow)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Retorno do Investidor (ROI) */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative group hover:bg-slate-900/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-white">Retorno (ROI)</h2>
            <p className="text-sm text-slate-400">Projetado vs. Realizado</p>
          </div>
          <div className="h-72 w-full mt-4 relative z-10">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={roiData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="ano" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip 
                  cursor={{fill: '#1e293b'}} 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="projetado" name="Proj." fill="#475569" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar dataKey="realizado" name="Real." fill="#10b981" radius={[4, 4, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Gráfico Composto - SPI & CPI */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Análise de Eficiência Operacional</h2>
              <p className="text-sm text-slate-400">Comparativo entre Prazo (SPI) e Custo (CPI)</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SPI</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">CPI</span>
              </div>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <ComposedChart data={spiData} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="etapa" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} domain={[0.8, 1.2]} />
                <RechartsTooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Bar dataKey="spi" name="SPI" radius={[4, 4, 0, 0]} barSize={40}>
                  {spiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.spi >= 1 ? '#3b82f6' : '#ef4444'} fillOpacity={0.8} />
                  ))}
                </Bar>
                <Line type="monotone" dataKey="cpi" name="CPI" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                <Area type="monotone" dataKey="cpi" fill="#10b981" fillOpacity={0.05} stroke="none" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Predictive Impact Panel */}
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Clock className="w-12 h-12 text-blue-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-6">Projeção de Impacto</h3>
          
          <div className="space-y-6 flex-1">
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Atraso Estimado</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white">+18</span>
                <span className="text-sm font-bold text-slate-400">Dias Corridos</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic">Cálculo baseado no SPI acumulado de 0.94</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gargalos Críticos</h4>
              {[
                { label: "Instalações Elétricas", impact: "Forte", delay: "+12d" },
                { label: "Vedações Internas", impact: "Médio", delay: "+6d" }
              ].map((gargalo, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-white">{gargalo.label}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Impacto: {gargalo.impact}</p>
                  </div>
                  <span className="text-xs font-black text-red-400">{gargalo.delay}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
            ANALISAR CAMINHO CRÍTICO
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
