"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, ShieldCheck, Camera, Calculator, AlertCircle, 
  CheckCircle2, FileWarning, ArrowUpRight, TrendingDown,
  Lock, Landmark, Smartphone, MapPin, FileCheck, Plus, Settings
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, LineChart, Line, AreaChart, Area
} from "recharts";
import { GlossaryTooltip } from "../GlossaryTooltip";
import { useDashboardStore } from "../../store/useDashboardStore";

// --- Mock Data for the PCI Translation Engine ---
const pciComparisonData = [
  { item: "Infra", planejado: 100, realizado: 92 },
  { item: "Super", planejado: 80, realizado: 65 },
  { item: "Vedações", planejado: 40, realizado: 15 },
  { item: "Instal.", planejado: 20, realizado: 5 },
];

// --- Mock Data for Cash Flow (The Valley of Death) ---
const valleyOfDeathData = [
  { day: "Dia 1", balance: 500000, threshold: 450000 },
  { day: "Dia 5", balance: 420000, threshold: 450000 },
  { day: "Dia 10", balance: 350000, threshold: 450000 },
  { day: "Dia 15", balance: 280000, threshold: 450000 },
  { day: "Dia 20", balance: 210000, threshold: 450000 },
  { day: "Gatilho", balance: 150000, threshold: 450000 },
];

export default function FinancingAidView() {
  const [activeSubModule, setActiveSubModule] = useState("translation");
  const [evidences, setEvidences] = useState<any>([
    { id: 1, title: "Ferragem Viga V102", loc: "Setor A", status: "Geolocalizado", date: "Hoje, 10:42", type: "Hidden" },
    { id: 2, title: "Impermeabilização", loc: "Banheiro 12", status: "Geolocalizado", date: "Hoje, 09:15", type: "Hidden" },
    { id: 3, title: "Tubulação Esgoto", loc: "Prumada 02", status: "Geolocalizado", date: "Ontem, 16:30", type: "Hidden" },
    { id: 4, title: "Revestimento Piso", loc: "Hall", status: "Geolocalizado", date: "Ontem, 14:20", type: "Standard" },
  ]);
  const { complianceDocs, updateDocStatus } = useDashboardStore();
  
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (id: string) => {
    setIsUploading(true);
    setTimeout(() => {
      updateDocStatus(id, "Validado");
      setIsUploading(false);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header com Contexto Bancário */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-8 rounded-3xl border border-blue-500/20">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg"><Landmark className="text-blue-400 w-5 h-5" /></div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Conciliação Bancária (<GlossaryTooltip term="PCI">PCI</GlossaryTooltip>/<GlossaryTooltip term="PFUI">PFUI</GlossaryTooltip>)</span>
          </div>
          <h2 className="text-3xl font-black text-white">Auxílio Financiamento</h2>
          <p className="text-slate-400 mt-2 max-w-xl">
            Motor de tradução e algoritmo de liquidez para gestão de crédito imobiliário (CEF).
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase">Status de Medição</p>
            <p className="text-xl font-bold text-amber-400">Gatilho #04 Pendente</p>
            <p className="text-xs text-slate-500 mt-1">Próxima liberação: R$ 450.000,00</p>
          </div>
        </div>
      </div>

      {/* Sub-Module Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-white/5 pb-1">
        {[
          { id: "translation", label: "Motor de Tradução", icon: Calculator },
          { id: "predictive", label: "Fluxo Preditivo", icon: BarChart3 },
          { id: "evidence", label: "Gestão de Evidências", icon: Smartphone },
          { id: "compliance", label: "Cofre de Conformidade", icon: ShieldCheck },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubModule(tab.id)}
            className={`flex items-center space-x-2 pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${activeSubModule === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {activeSubModule === tab.id && (
              <motion.div layoutId="aidTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeSubModule === "translation" && (
            <motion.div 
              key="translation" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Calculator className="w-24 h-24 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10"><GlossaryTooltip term="PCI">PCI</GlossaryTooltip> Traduzida vs. Realidade</h3>
                <p className="text-sm text-slate-400 mb-8 relative z-10">Desvio entre o planejado no banco e o avanço físico real no canteiro.</p>
                
                <div className="h-72 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pciComparisonData} layout="vertical" margin={{ left: 20, right: 30 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#60a5fa" stopOpacity={1}/>
                        </linearGradient>
                        <filter id="barGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" opacity={0.5} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        dataKey="item" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
                        width={80}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        allowEscapeViewBox={{ x: true, y: true }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#0f172a] border border-blue-500/30 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-[100] min-w-[200px]">
                                <div className="absolute inset-0 bg-blue-500/5 rounded-xl pointer-events-none" />
                                <p className="text-[10px] font-black text-blue-400 uppercase mb-3 tracking-widest border-b border-white/5 pb-2">{label}</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Planejado (PCI):</span>
                                    <span className="text-xs font-bold text-white">{payload[0].value}%</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-blue-400">Realizado (Campo):</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs font-black text-blue-400">{payload[1].value}%</span>
                                      <div className={`w-2 h-2 rounded-full ${Number(payload[1].value) >= Number(payload[0].value) ? 'bg-emerald-500' : 'bg-red-500'} shadow-sm`} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {/* Background bar for Planejado */}
                      <Bar dataKey="planejado" name="Planejado (PCI)" fill="#1e293b" barSize={16} radius={[0, 8, 8, 0]} />
                      {/* Foreground bar for Realizado with Gradient and Glow */}
                      <Bar dataKey="realizado" name="Realizado (Campo)" fill="url(#barGradient)" barSize={16} radius={[0, 8, 8, 0]} filter="url(#barGlow)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest px-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-1 bg-[#1e293b] rounded-full" />
                    <span className="text-slate-500">Benchmark Bancário</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <span className="text-blue-400">Avanço Físico Real</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Mapeamento de Microtarefas</h4>
                  <div className="space-y-4">
                    {[
                      { pci: "2.1 Infraestrutura", task: "Armação Vigas Baldrame", status: "85%", sync: "Ok" },
                      { pci: "3.2 Superestrutura", task: "Concretagem Pilar P12", status: "10%", sync: "Atrasado" },
                      { pci: "4.1 Alvenaria", task: "Elevação 1º Pavimento", status: "0%", sync: "Ok" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                        <div>
                          <p className="text-xs font-bold text-blue-400"><GlossaryTooltip term="PCI">PCI</GlossaryTooltip> {item.pci.split(' ')[1]}</p>
                          <p className="text-sm text-white font-medium">{item.task}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">{item.status}</p>
                          <p className={`text-[10px] font-bold uppercase ${item.sync === 'Atrasado' ? 'text-red-400' : 'text-emerald-400'}`}>{item.sync}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubModule === "predictive" && (
            <motion.div 
              key="predictive" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl">
                  <div className="flex items-center space-x-2 text-red-400 mb-2">
                    <TrendingDown className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Vale da Morte</span>
                  </div>
                  <h3 className="text-3xl font-black text-white">R$ -142.000</h3>
                  <p className="text-sm text-slate-400 mt-2">Déficit projetado para atingir o próximo gatilho bancário.</p>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Burn Rate Diário</span>
                  <h3 className="text-3xl font-black text-white mt-2">R$ 8.400</h3>
                  <p className="text-sm text-slate-400 mt-2">Baseado no ritmo atual da obra.</p>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Distância do Gatilho</span>
                  <h3 className="text-3xl font-black text-white mt-2">12 Dias</h3>
                  <p className="text-sm text-slate-400 mt-2">Faltam 8% de avanço físico.</p>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6">Projeção de Escassez de Liquidez</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={valleyOfDeathData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `R$${val/1000}k`} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                      <Area type="monotone" dataKey="balance" name="Saldo em Caixa" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBalance)" />
                      <Line type="monotone" dataKey="threshold" name="Custo do Gatilho" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-slate-400">Capital Próprio em Queima</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-slate-400">Meta de Liberação Bancária</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubModule === "evidence" && (
            <motion.div 
              key="evidence" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Evidence Checklist */}
              <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center">
                    <Camera className="w-5 h-5 mr-3 text-blue-400" /> Dossiê de Pré-Medição
                  </h3>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => {
                        const newTitle = prompt("Título do Material/Evidência:");
                        if (newTitle) {
                          setEvidences([...evidences, {
                            id: Date.now(),
                            title: newTitle,
                            loc: "Novo Setor",
                            status: "Geolocalizado",
                            date: new Date().toLocaleDateString('pt-BR'),
                            type: "Standard"
                          }]);
                        }
                      }}
                      className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-500 transition-all flex items-center uppercase tracking-widest"
                    >
                      <Plus className="w-3 h-3 mr-2" /> Adicionar Material
                    </button>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20 uppercase tracking-widest flex items-center">Aprovado</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {evidences.map((img: any) => (
                    <div key={img.id} className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all">
                      <div className="h-40 bg-slate-700/30 flex items-center justify-center relative">
                        <Camera className="w-8 h-8 text-slate-600 group-hover:text-blue-500 transition-colors" />
                        <button 
                          onClick={() => {
                            const updatedTitle = prompt("Novo título:", img.title);
                            if (updatedTitle) {
                              setEvidences(evidences.map((e: any) => e.id === img.id ? { ...e, title: updatedTitle } : e));
                            }
                          }}
                          className="absolute top-2 right-2 p-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        {img.type === 'Hidden' && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded uppercase">Item Oculto</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-bold text-white">{img.title}</h4>
                        <div className="flex items-center mt-2 text-[10px] text-slate-500">
                          <MapPin className="w-3 h-3 mr-1" /> {img.loc} • {img.date}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-bold uppercase">
                            <ShieldCheck className="w-3 h-3" /> <span>VERIFICADO</span>
                          </div>
                          <button 
                            onClick={() => {
                              if (confirm("Remover esta evidência?")) {
                                setEvidences(evidences.filter((e: any) => e.id !== img.id));
                              }
                            }}
                            className="text-[10px] font-black text-red-500/50 hover:text-red-400 uppercase transition-colors"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspector Preview */}
              <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Painel do Fiscal CEF</h4>
                <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                  <p className="text-xs text-blue-300 font-bold uppercase mb-4 text-center">Resumo da Medição Atual</p>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total PCI Acumulado</span>
                      <span className="text-white font-bold">34.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Avanço Reclamado</span>
                      <span className="text-white font-bold">R$ 125k</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Evidências Incontestáveis</span>
                      <span className="text-emerald-400 font-bold">14 fotos</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="w-full mt-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                  >
                    GERAR DOSSIÊ PDF (PADRÃO CEF)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubModule === "compliance" && (
            <motion.div 
              key="compliance" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Lock className="w-5 h-5 mr-3 text-emerald-400" /> Cofre de Conformidade - Trava dos 5%
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">Gestão de documentação obrigatória para liberação da parcela final.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-bold uppercase">Saúde Documental</p>
                    <p className="text-2xl font-black text-emerald-400">92%</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {complianceDocs.map((doc, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${doc.status === 'Pendente' ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/5'} flex items-center justify-between transition-all`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${doc.status === 'Pendente' ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                          {doc.status === 'Pendente' ? <FileWarning className="w-5 h-5 text-red-400" /> : <FileCheck className="w-5 h-5 text-emerald-400" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{doc.doc}</p>
                          <p className="text-[10px] text-slate-500">{doc.type} • {doc.date}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${doc.status === 'Pendente' ? 'bg-red-500 text-white' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-white">Trava de Segurança Ativa</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                      A Certidão CNO do mês de Maio não foi anexada. O sistema **bloqueou** o envio da medição #05 para o banco. 
                      A conformidade contínua evita o bloqueio da última parcela (5% do valor total do contrato).
                    </p>
                    {complianceDocs.some(d => d.status === "Pendente") && (
                      <button 
                        onClick={() => handleUpload(complianceDocs.find(d => d.status === "Pendente")?.id || "4")}
                        disabled={isUploading}
                        className="mt-4 px-6 py-2 bg-white text-slate-950 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-lg disabled:opacity-50"
                      >
                        {isUploading ? "VALIDANDO ARQUIVO..." : "ANEXAR DOCUMENTAÇÃO AGORA"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
