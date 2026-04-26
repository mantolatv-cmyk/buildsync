"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, FolderKanban, Wallet, FileText, ShieldCheck, Headset,
  TrendingUp, AlertCircle, Clock, ArrowUpRight, ArrowDownRight, Sparkles,
  ChevronDown, X, BarChart3, PieChart as PieChartIcon
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- Extended Mock Data for Time Filters ---
const mockDataSets: any = {
  month: {
    kpis: {
      capital: "R$ 850.000",
      yoc: "14.2%",
      costPerSqm: "R$ 3.900",
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
      capital: "R$ 2.450.000",
      yoc: "14.5%",
      costPerSqm: "R$ 3.880",
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
      capital: "R$ 4.250.000",
      yoc: "14.8%",
      costPerSqm: "R$ 3.850",
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

const complianceData = [
  { name: "Compliant", value: 92 },
  { name: "Pending", value: 8 },
];

const spiData = [
  { etapa: "Fundação", spi: 1.05 },
  { etapa: "Alvenaria", spi: 0.95 },
  { etapa: "Cobertura", spi: 1.10 },
  { etapa: "Instalações", spi: 0.88 },
  { etapa: "Acabamento", spi: 1.00 },
];

const timelineEvents = [
  { id: 1, title: "Nota fiscal de cimento aprovada", time: "Hoje, 10:30", type: "success" },
  { id: 2, title: "Alvará de construção anexado", time: "Ontem, 15:45", type: "success" },
  { id: 3, title: "Atraso na entrega do aço", time: "2 dias atrás", type: "alert" },
  { id: 4, title: "Relatório de qualidade emitido", time: "3 dias atrás", type: "info" },
];

const materialLossData = [
  { name: "Blocos de Concreto", loss: 4.5, limit: 5 },
  { name: "Aço", loss: 2.1, limit: 3 },
  { name: "Cimento", loss: 6.2, limit: 5 }, 
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
    ? count.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : count.toFixed(1);

  return <span>{prefix}{displayValue}{suffix}</span>;
};

// --- Main Component ---

export default function InvestorDashboard() {
  const [activeMenu, setActiveMenu] = useState("Visão Geral");
  const [timeFilter, setTimeFilter] = useState("ytd");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeKpiDetail, setActiveKpiDetail] = useState<any>(null); // State for Drill-down Drawer

  const currentData = mockDataSets[timeFilter];

  const menuItems = [
    { name: "Visão Geral", icon: LayoutDashboard },
    { name: "Projetos", icon: FolderKanban },
    { name: "Financeiro", icon: Wallet },
    { name: "Relatórios", icon: FileText },
    { name: "Compliance", icon: ShieldCheck },
    { name: "Suporte", icon: Headset },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex h-screen text-slate-200 font-sans overflow-hidden bg-[#020617] relative selection:bg-blue-500/30">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-2xl border-r border-white/5 flex flex-col z-10 relative">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
            BuildSync
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className="relative w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden"
            >
              {activeMenu === item.name && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 mr-3 relative z-10 transition-colors ${activeMenu === item.name ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
              <span className={`relative z-10 font-medium transition-colors ${activeMenu === item.name ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar">
        <header className="h-20 flex items-center justify-between px-8 bg-[#020617]/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold text-white tracking-tight flex items-center"
          >
            Dashboard Executivo
            
            {/* Global Time Filter */}
            <div className="relative ml-6">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 text-sm font-medium bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-slate-200">
                  {timeFilter === 'month' ? 'Este Mês' : timeFilter === 'quarter' ? 'Último Trimestre' : 'Acumulado (YTD)'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-1 z-50 overflow-hidden"
                  >
                    {[
                      { id: 'month', label: 'Este Mês' },
                      { id: 'quarter', label: 'Último Trimestre' },
                      { id: 'ytd', label: 'Acumulado (YTD)' }
                    ].map(option => (
                      <button
                        key={option.id}
                        onClick={() => { setTimeFilter(option.id); setIsFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${timeFilter === option.id ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.h1>

          <div className="flex items-center space-x-5">
            <button className="group relative px-5 py-2.5 bg-white text-slate-950 text-sm font-semibold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Relatório
              </span>
            </button>
          </div>
        </header>

        <motion.div 
          key={timeFilter} // Trigger re-animation when filter changes
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-8 max-w-7xl mx-auto space-y-8"
        >
          {/* Top Cards (KPIs Executivos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard 
              id="capital"
              title="Capital Total Investido" 
              value={<AnimatedCounter value={currentData.kpis.capital} />}
              trend={currentData.kpis.capitalTrend} 
              trendUp={true} 
              subtitle="vs. período anterior"
              onClick={() => setActiveKpiDetail({ id: 'capital', title: 'Composição de Capital Investido', value: currentData.kpis.capital })}
            />
            <KpiCard 
              id="yoc"
              title="YOC Projetado" 
              value={<AnimatedCounter value={currentData.kpis.yoc} />}
              trend={currentData.kpis.yocTrend} 
              trendUp={true} 
              subtitle="Yield on Cost"
              onClick={() => setActiveKpiDetail({ id: 'yoc', title: 'Análise de Yield on Cost', value: currentData.kpis.yoc })}
            />
            <KpiCard 
              id="cost"
              title="Custo por m² Atual" 
              value={<AnimatedCounter value={currentData.kpis.costPerSqm} />} 
              trend={currentData.kpis.costTrend} 
              trendUp={true} 
              subtitle="Abaixo da média"
              onClick={() => setActiveKpiDetail({ id: 'cost', title: 'Detalhamento de Custo por m²', value: currentData.kpis.costPerSqm })}
            />
            <KpiCard 
              id="status"
              title="Status do Prazo" 
              value="No Prazo" 
              icon={<Clock className="w-8 h-8 text-indigo-400 opacity-80" />}
              subtitle="142 dias para entrega"
              neutral={true}
              onClick={() => setActiveKpiDetail({ id: 'status', title: 'Cronograma Detalhado', value: '142 Dias' })}
            />
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
                  <LineChart data={currentData.costData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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

            {/* Compliance Score (Radial) */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col justify-between hover:bg-slate-900/50 transition-colors relative overflow-hidden">
               <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
              <div>
                <h2 className="text-lg font-semibold text-white">Compliance Score</h2>
                <p className="text-sm text-slate-400">Conformidade documental</p>
              </div>
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <PieChart>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={10}
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "url(#scoreGradient)" : "#1e293b"} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white tracking-tighter">
                    <AnimatedCounter value="92" suffix="%" />
                  </span>
                  <span className="text-xs font-semibold text-indigo-400 uppercase mt-1 tracking-widest">Excelente</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Drill-down Drawer / Slide-over */}
      <AnimatePresence>
        {activeKpiDetail && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveKpiDetail(null)}
              className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-40"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">{activeKpiDetail.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">Análise aprofundada do indicador</p>
                </div>
                <button 
                  onClick={() => setActiveKpiDetail(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* Main Value Highlight */}
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-6 text-center">
                  <div className="text-sm text-blue-200 mb-2">Valor Total Atual</div>
                  <div className="text-4xl font-bold text-white">{activeKpiDetail.value}</div>
                </div>

                {/* Breakdown Chart Placeholder */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center">
                    <PieChartIcon className="w-4 h-4 mr-2" /> Distribuição / Composição
                  </h4>
                  <div className="h-48 bg-slate-800/50 rounded-xl border border-white/5 flex items-center justify-center text-slate-500 text-sm">
                    {/* Placeholder for actual drill-down chart */}
                    [Gráfico Detalhado de Composição]
                  </div>
                </div>

                {/* Sub-metrics List */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" /> Detalhamento Operacional
                  </h4>
                  <div className="space-y-3">
                    {['Material', 'Mão de Obra', 'Administrativo', 'Equipamentos'].map((item, idx) => (
                      <div key={item} className="bg-slate-800/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                        <span className="text-slate-300">{item}</span>
                        <span className="font-semibold text-white">
                          {25 - idx * 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="p-6 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <button className="w-full py-3 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors shadow-lg">
                  Baixar Relatório Detalhado (CSV)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Component for KPI Cards (Interactive)
function KpiCard({ title, value, trend, trendUp, subtitle, icon, neutral = false, onClick }: any) {
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
      className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 flex flex-col justify-center transition-all hover:bg-slate-900/70 hover:border-blue-500/30 relative overflow-hidden group cursor-pointer shadow-lg w-full text-left"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:text-blue-400 transition-all pointer-events-none">
        {icon || <ArrowUpRight className="w-8 h-8" />}
      </div>
      <div className="flex justify-between items-start mb-2 relative z-10 w-full">
        <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{title}</h3>
        {!icon && (
          <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-md bg-opacity-20 backdrop-blur-sm ${
            neutral ? 'bg-slate-500 text-slate-300' : 
            trendUp ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'
          }`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <div className="mt-1 relative z-10">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
      </div>
      <p className="text-sm text-slate-500 mt-2 relative z-10">{subtitle}</p>
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-xs font-medium text-blue-400">
        Ver detalhes
      </div>
      
      {/* Subtle bottom glow line */}
      <div className={`absolute bottom-0 left-0 h-0.5 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${neutral ? 'bg-slate-500' : trendUp ? 'bg-blue-500' : 'bg-red-500'}`} />
    </motion.button>
  );
}
