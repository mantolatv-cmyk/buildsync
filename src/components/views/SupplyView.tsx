"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Bot, MessageSquare, Zap, Target, BrainCircuit, MessageCircle, AlertCircle, Package, ArrowRight, ShieldCheck, Star, Award, TrendingUp, TrendingDown 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { GlossaryTooltip } from "../GlossaryTooltip";
import { useDashboardStore } from "../../store/useDashboardStore";
import SupplyEntryModal from "../SupplyEntryModal";
import PartnerManagementDrawer from "../PartnerManagementDrawer";
import NegotiationAgentDrawer from "../NegotiationAgentDrawer";
import PredictiveRiskRadar from "../PredictiveRiskRadar";
import { exportToCSV } from "../../utils/exportUtils";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPartnerDrawerOpen, setIsPartnerDrawerOpen] = React.useState(false);
  const [activeNegotiationId, setActiveNegotiationId] = React.useState<string | null>(null);
  const { supplyData, negotiations, addNegotiation, isSimplifiedMode, deliveries } = useDashboardStore();

  const handleNewNegotiation = () => {
    // Find an item not currently in negotiation
    const itemsInNegotiation = negotiations.map(n => n.item);
    const availableItem = supplyData.find(s => !itemsInNegotiation.includes(s.item));
    
    if (availableItem) {
      const newNeg = {
        id: `neg-${Date.now()}`,
        item: availableItem.item,
        status: "active",
        targetPrice: availableItem.orcado,
        currentBest: null,
        suppliers: [
          { name: "Distribuidora Regional", price: availableItem.atual + 50, deliveryTime: "2 dias", paymentTerms: "A vista", score: 4.4, messages: [] },
          { name: "Atacadista Central", price: availableItem.atual - 10, deliveryTime: "5 dias", paymentTerms: "28 dias", score: 4.6, messages: [] }
        ],
        reasoning: `Iniciando cotação para ${availableItem.item} para otimizar custo atual de R$ ${availableItem.atual}.`
      };
      addNegotiation(newNeg);
      setActiveNegotiationId(newNeg.id);
    } else {
      // Se não houver itens novos, abre o primeiro item já existente para não deixar o usuário sem resposta
      if (negotiations.length > 0) {
        setActiveNegotiationId(negotiations[0].id);
      } else {
        alert("Não há insumos pendentes para nova cotação no momento.");
      }
    }
  };
  
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
          <h2 className="text-2xl font-semibold text-white tracking-tight">{isSimplifiedMode ? "Logística e Pedidos" : "Cadeia de Suprimentos"}</h2>
          <p className="text-sm text-slate-400 mt-1">{isSimplifiedMode ? "Acompanhamento de entregas e novos pedidos" : <>Gestão de insumos críticos (<GlossaryTooltip term="Curva ABC">Curva ABC</GlossaryTooltip>)</>}</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => exportToCSV(supplyData, 'Relatorio_ABC_Insumos')}
            className="px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-semibold hover:bg-blue-600/20 transition-colors"
          >
            Gerar Relatório ABC
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            Adicionar Insumo
          </button>
        </div>
      </div>

      <SupplyEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PartnerManagementDrawer isOpen={isPartnerDrawerOpen} onClose={() => setIsPartnerDrawerOpen(false)} />

      {/* CFO Digital: Predictive Intelligence Module */}
      {!isSimplifiedMode && (
        <>
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Inteligência Preditiva CFO</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Antecipação de Mercado & Gestão de Risco</p>
              </div>
            </div>
            <PredictiveRiskRadar />
          </section>

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
        </>
      )}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {isSimplifiedMode && (
          <motion.div variants={itemVariants} className="lg:col-span-3 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-6">Entregas Programadas</h3>
            <div className="space-y-4">
              {(deliveries || []).map(d => (
                <div key={d.id} className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{d.items}</p>
                      <p className="text-xs text-slate-500">{d.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">{d.time}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                        d.status === 'delayed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        d.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {d.status === 'delayed' ? 'Atrasado' : d.status === 'delivered' ? 'Entregue' : 'A Caminho'}
                      </span>
                      {d.status === 'delayed' && (
                        <a 
                          href={`https://wa.me/5511998765432?text=${encodeURIComponent(`Olá, sobre o pedido de ${d.items} para a obra Residencial Alpha que está atrasado. Poderia nos dar um status?`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!isSimplifiedMode && (
          <>
        {/* AI Negotiation Center */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bot className="w-24 h-24" />
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">AI Negotiation Center</h3>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              O assistente está analisando <span className="text-white font-bold">{negotiations.length}</span> cotações ativas. Economia projetada de <span className="text-emerald-400 font-bold">R$ 12.500</span> este mês.
            </p>
            
            <div className="space-y-3">
              {negotiations.map(neg => (
                <button 
                  key={neg.id}
                  onClick={() => setActiveNegotiationId(neg.id)}
                  className="w-full bg-slate-900/50 hover:bg-slate-900 border border-white/5 p-4 rounded-2xl text-left transition-all group/item"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-white group-hover/item:text-blue-400 transition-colors">{neg.item}</span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                      <Target className="w-3 h-3" />
                      <span>Alvo: R$ {neg.targetPrice}</span>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-400">
                      Melhor: R$ {neg.currentBest ? neg.suppliers.find((s: any) => s.name === neg.currentBest)?.price : '---'}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={handleNewNegotiation}
              className="w-full mt-6 py-3 bg-white text-slate-950 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all shadow-lg"
            >
              Nova Cotação Inteligente
            </button>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Insights de Negociação</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-amber-500/10 rounded-lg"><Zap className="w-4 h-4 text-amber-400" /></div>
                <p className="text-[11px] text-slate-400">Gerdau costuma aceitar redução de 3% se o volume for &gt; 100t.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-blue-500/10 rounded-lg"><TrendingDown className="w-4 h-4 text-blue-400" /></div>
                <p className="text-[11px] text-slate-400">Preço do Cimento tende a baixar 2% na próxima quinzena.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gráfico de Variação de Preços (Inflação Interna) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 relative">
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
          
          <div className="h-64 lg:h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={supplyData} margin={{ top: 20, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="item" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10 }} 
                  dy={10} 
                  interval={0}
                  tickFormatter={(val) => val.split(' ')[0]}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10 }} 
                  tickFormatter={(val) => `R$${val}`} 
                  width={40}
                />
                <RechartsTooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#f8fafc', fontSize: '12px', fontWeight: 500 }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, name]}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} iconType="circle" />
                <Bar dataKey="orcado" name="Orçado" fill="#334155" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="atual" name="Preço Atual" radius={[4, 4, 0, 0]} barSize={25}>
                  {supplyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.atual > entry.orcado ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
          </>
        )}

        {/* Tabela de Ranking de Fornecedores */}
        <motion.div variants={itemVariants} className="lg:col-span-3 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 p-6 overflow-hidden">
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
            <button 
              onClick={() => setIsPartnerDrawerOpen(true)}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center transition-colors"
            >
              Gerenciar Parceiros <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 pb-4">
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Parceiro</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Macro Categoria</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Volume Negociado</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Estabilidade</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">vs. Mercado</th>
                  <th className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Score</th>
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

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {supplierRankingData.map((supplier) => (
              <div key={supplier.id} className="bg-slate-800/30 rounded-2xl border border-white/5 p-4 active:bg-slate-800/50 transition-colors no-select">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-black text-blue-400 border border-white/5">
                      {supplier.name.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center">
                        {supplier.name}
                        {supplier.score >= 4.8 && <ShieldCheck className="w-3.5 h-3.5 text-blue-400 ml-1.5" />}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{supplier.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-amber-500/10 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-black text-amber-400">{supplier.score}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-white/5">
                  <div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Volume</p>
                    <p className="text-xs font-medium text-slate-200">{supplier.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">vs. Mercado</p>
                    <p className={`text-xs font-black ${supplier.benchmark < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {supplier.benchmark > 0 ? '+' : ''}{supplier.benchmark}%
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Estabilidade</span>
                      <span className="text-[10px] font-bold text-slate-300">{supplier.stability}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${supplier.stability}%` }} />
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/5511998765432?text=${encodeURIComponent(`Olá, gostaria de falar sobre o fornecimento para o Residencial Alpha.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <NegotiationAgentDrawer 
        isOpen={!!activeNegotiationId} 
        onClose={() => setActiveNegotiationId(null)} 
        negotiationId={activeNegotiationId}
      />
    </div>
  );
}
