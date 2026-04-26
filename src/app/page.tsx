"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Headset,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

// --- Mock Data ---

const costData = [
  { month: "Jan", orcado: 150000, realizado: 145000 },
  { month: "Fev", orcado: 300000, realizado: 310000 },
  { month: "Mar", orcado: 450000, realizado: 460000 },
  { month: "Abr", orcado: 600000, realizado: 590000 },
  { month: "Mai", orcado: 750000, realizado: 780000 },
  { month: "Jun", orcado: 900000, realizado: 920000 },
];

const complianceData = [
  { name: "Compliant", value: 92 },
  { name: "Pending", value: 8 },
];
const COLORS = ["#0ea5e9", "#e2e8f0"];

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
  { name: "Cimento", loss: 6.2, limit: 5 }, // Acima do limite
];

export default function InvestorDashboard() {
  const [activeMenu, setActiveMenu] = useState("Visão Geral");

  const menuItems = [
    { name: "Visão Geral", icon: LayoutDashboard },
    { name: "Projetos", icon: FolderKanban },
    { name: "Financeiro", icon: Wallet },
    { name: "Relatórios", icon: FileText },
    { name: "Compliance", icon: ShieldCheck },
    { name: "Suporte", icon: Headset },
  ];

  return (
    <div className="flex h-screen bg-blue-50/95 bg-[url('/bg-blueprint.png')] bg-cover bg-center bg-blend-soft-light text-slate-800 font-sans overflow-hidden relative">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 flex flex-col shadow-[4px_0_24px_rgb(0,0,0,0.02)] z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">BuildSync</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeMenu === item.name 
                  ? "bg-blue-50 text-blue-600 font-medium" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${activeMenu === item.name ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500"}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
              <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-800 truncate">Carlos Investidor</p>
              <p className="text-xs text-slate-500 truncate">carlos@exemplo.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white/50 backdrop-blur-xl border-b border-white/50 sticky top-0 z-20 shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Dashboard do Investidor
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <AlertCircle className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm shadow-blue-200">
              Gerar Relatório
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Top Cards (KPIs Executivos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard 
              title="Capital Total Investido" 
              value="R$ 4.250.000" 
              trend="+12%" 
              trendUp={true} 
              subtitle="vs. mês anterior"
            />
            <KpiCard 
              title="YOC Projetado" 
              value="14.8%" 
              trend="+0.5%" 
              trendUp={true} 
              subtitle="Yield on Cost"
            />
            <KpiCard 
              title="Custo por m² Atual" 
              value="R$ 3.850" 
              trend="-2.1%" 
              trendUp={true} 
              subtitle="Abaixo da média da região"
            />
            <KpiCard 
              title="Status do Prazo" 
              value="No Prazo" 
              icon={<Clock className="w-8 h-8 text-blue-500" />}
              subtitle="142 dias para entrega"
              neutral={true}
            />
          </div>

          {/* Middle Layer (Gráficos Principais) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Linha - Desvio de Custo */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Desvio de Custo (Orçado vs Realizado)</h2>
                  <p className="text-sm text-slate-500">Acompanhamento financeiro dos últimos 6 meses</p>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b' }}
                      tickFormatter={(value) => `R$ ${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" name="Custo Orçado" dataKey="orcado" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" name="Custo Realizado" dataKey="realizado" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico Radial - Compliance Score */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Compliance Score</h2>
                <p className="text-sm text-slate-500">Conformidade documental atual</p>
              </div>
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-800 tracking-tighter">92%</span>
                  <span className="text-xs font-medium text-green-500 uppercase mt-1 tracking-wider">Excelente</span>
                </div>
              </div>
              <div className="flex justify-center items-center text-sm text-slate-600 mt-2">
                <ShieldCheck className="w-4 h-4 text-green-500 mr-2" />
                <span>Todos os alvarás críticos em dia</span>
              </div>
            </div>
          </div>

          {/* Bottom Section (Métricas Operacionais) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Taxa de Perda de Material */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Perda de Material</h2>
              <p className="text-sm text-slate-500 mb-6">Métricas de desperdício em insumos críticos</p>
              
              <div className="space-y-5">
                {materialLossData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <span className={`font-semibold ${item.loss > item.limit ? 'text-red-500' : 'text-slate-700'}`}>
                        {item.loss}% <span className="text-slate-400 font-normal text-xs">(limite: {item.limit}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${item.loss > item.limit ? 'bg-red-500' : 'bg-blue-500'}`} 
                        style={{ width: `${Math.min((item.loss / item.limit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de Barras - SPI */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Índice de Desempenho (SPI)</h2>
              <p className="text-sm text-slate-500 mb-4">SPI por etapa da obra (&gt; 1 = Adiantado)</p>
              
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spiData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 1.2]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="etapa" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="spi" radius={[0, 4, 4, 0]}>
                      {spiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.spi >= 1 ? '#0ea5e9' : '#f59e0b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Timeline de Obras</h2>
                  <p className="text-sm text-slate-500">Últimos registros</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">Ver tudo</button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {timelineEvents.map((event) => (
                    <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {event.type === 'success' && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                        {event.type === 'alert' && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                        {event.type === 'info' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                      </div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-3 md:ml-0 bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <time className="text-xs font-medium text-slate-400">{event.time}</time>
                        </div>
                        <div className="text-sm font-medium text-slate-700">{event.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Component for KPI Cards
function KpiCard({ title, value, trend, trendUp, subtitle, icon, neutral = false }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-6 flex flex-col justify-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-default">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {icon && icon}
        {!icon && (
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-md ${
            neutral ? 'bg-slate-100 text-slate-600' : 
            trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <div className="mt-1">
        <span className="text-3xl font-bold text-slate-800 tracking-tight">{value}</span>
      </div>
      <p className="text-sm text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
}
