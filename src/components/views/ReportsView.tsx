"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FileText, Download, Calendar, Filter, FileBarChart, Presentation, PieChart, Loader2, CheckCircle2, TrendingUp, AlertTriangle, DollarSign, Target, ChevronLeft, Printer } from "lucide-react";
import ExecutiveReport from "../ExecutiveReport";

const reportTemplates = [
  { id: 1, type: 'exec', title: "Resumo Executivo YTD", icon: Presentation, desc: "Avanço físico, financeiro e principais milestones.", color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: 2, type: 'cash', title: "Fechamento de Caixa", icon: FileBarChart, desc: "Fluxo de caixa detalhado, DRE e mapa de pagamentos.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: 3, type: 'portfolio', title: "Análise de Portfólio", icon: PieChart, desc: "Comparativo de ROI, YOC e alocação de capital entre obras.", color: "text-purple-400", bg: "bg-purple-500/10" }
];

const historicalReports = [
  { id: 1, name: "Resumo Executivo - Outubro 2026", date: "31 Out 2026", size: "2.4 MB", type: "PDF" },
  { id: 2, name: "Fechamento de Caixa Q3", date: "15 Out 2026", size: "1.1 MB", type: "CSV" },
  { id: 3, name: "Resumo Executivo - Setembro 2026", date: "30 Set 2026", size: "2.3 MB", type: "PDF" },
  { id: 4, name: "Relatório de Sustentabilidade", date: "10 Set 2026", size: "5.8 MB", type: "PDF" },
];

export default function ReportsView() {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [activeReport, setActiveReport] = React.useState<string | null>(null);
  const [genProgress, setGenProgress] = React.useState(0);
  const [genText, setGenText] = React.useState("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const handleGenerate = (type: string) => {
    setIsGenerating(true);
    setGenProgress(0);
    
    const texts = [
      "Coletando dados financeiros do ERP...",
      "Processando avanços físicos das obras...",
      "Calculando ROI e VPL projetado...",
      "Cruzando dados de suprimentos e inflação...",
      "Consolidando dados BuildSync...",
      "Finalizando relatório executivo..."
    ];

    let currentTextIdx = 0;
    const interval = setInterval(() => {
      setGenProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setActiveReport(type);
          }, 800);
          return 100;
        }
        
        // Update text every 20%
        const textIdx = Math.floor(prev / 20);
        if (textIdx !== currentTextIdx && texts[textIdx]) {
          setGenText(texts[textIdx]);
          currentTextIdx = textIdx;
        }
        
        return prev + 2;
      });
    }, 40);
  };

  if (isGenerating) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative z-10" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Gerando Análise de Portfólio</h2>
        <p className="text-slate-400 mb-8 max-w-xs">{genText || "Iniciando motores de análise..."}</p>
        
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden relative border border-white/5">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400"
            style={{ width: `${genProgress}%` }}
          />
        </div>
        <span className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{genProgress}% COMPLETO</span>
      </div>
    );
  }

  if (activeReport === 'portfolio') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveReport(null)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">Relatório: Análise de Portfólio</h2>
              <p className="text-sm text-slate-400">Consolidado Geral BuildSync • Outubro 2026</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center hover:bg-slate-700 transition-colors border border-white/5">
              <Printer className="w-4 h-4 mr-2" /> Imprimir
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold flex items-center hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
              <Download className="w-4 h-4 mr-2" /> PDF Export
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Executive Health Score */}
          <div className="md:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset="44" className="text-blue-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">88</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Score Global</span>
              </div>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Saúde Excelente</h4>
            <p className="text-xs text-slate-500">O portfólio apresenta desvio financeiro controlado e margem em expansão.</p>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
              <TrendingUp className="w-6 h-6 text-green-400 mb-4" />
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">ROI Projetado</p>
              <h3 className="text-2xl font-bold text-white">24.8%</h3>
              <p className="text-[10px] text-green-400 mt-2 font-medium">+1.2% vs. mês anterior</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
              <DollarSign className="w-6 h-6 text-blue-400 mb-4" />
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Capital em Risco</p>
              <h3 className="text-2xl font-bold text-white">R$ 1.4M</h3>
              <p className="text-[10px] text-blue-400 mt-2 font-medium">Equivale a 3.2% do total</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
              <Target className="w-6 h-6 text-purple-400 mb-4" />
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Taxa de Ocupação</p>
              <h3 className="text-2xl font-bold text-white">92.5%</h3>
              <p className="text-[10px] text-purple-400 mt-2 font-medium">Acima da média do setor (85%)</p>
            </div>
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-6">Pontos de Atenção (Insights Executivos)</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-red-400">Torre Horizonte: Atraso Crítico</h5>
                  <p className="text-xs text-slate-400 mt-1">Gargalo identificado na entrega de elevadores. Impacto projetado de 15 dias no cronograma final.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <TrendingUp className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-amber-400">Inflação de Insumos: Aço</h5>
                  <p className="text-xs text-slate-400 mt-1">Aumento de 5.2% no custo de armação. Recomenda-se antecipação de compras do Q4.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white mb-2">BuildSync Vision</h3>
            <p className="text-sm text-slate-400 mb-6">Análise preditiva para os próximos 90 dias.</p>
            <div className="space-y-6">
              {[
                { label: "Probabilidade de Entrega no Prazo", value: 92 },
                { label: "Margem de Lucro Estável", value: 88 },
                { label: "Capacidade de Investimento (Novas Obras)", value: 65 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-white font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (activeReport === 'exec') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
        <div className="flex items-center justify-between border-b border-white/10 pb-6 print:hidden">
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveReport(null)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Executive Strategy Report</h2>
              <p className="text-sm text-slate-400">Preview para Exportação e Impressão</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => window.print()}
              className="px-6 py-3 bg-white text-slate-950 rounded-xl text-sm font-bold flex items-center hover:bg-slate-200 transition-all shadow-xl shadow-white/10"
            >
              <Printer className="w-4 h-4 mr-2" /> GERAR PDF / IMPRIMIR
            </button>
          </div>
        </div>

        <div className="flex justify-center py-8">
          <ExecutiveReport />
        </div>
      </motion.div>
    );
  }

  if (activeReport === 'cash') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveReport(null)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">Fechamento de Caixa</h2>
              <p className="text-sm text-slate-400">Fluxo de Disponibilidades • Outubro 2026</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold flex items-center hover:bg-emerald-500 transition-colors">
            <Download className="w-4 h-4 mr-2" /> Conciliação Bancária
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Saldo em Conta</p>
            <h3 className="text-2xl font-black text-white">R$ 18.42M</h3>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Entradas (Out)</p>
            <h3 className="text-2xl font-black text-emerald-400">+ R$ 4.10M</h3>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Saídas (Out)</p>
            <h3 className="text-2xl font-black text-red-400">- R$ 2.85M</h3>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-white">Principais Desembolsos da Semana</h3>
            <span className="text-xs text-slate-500 font-medium">Próximos 7 dias</span>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { prov: "Gerdau S.A.", desc: "Aço Vergalhão CA-50", val: "R$ 412.000", date: "05 Nov", status: "scheduled" },
              { prov: "Votorantim", desc: "Concreto Usinado 30MPa", val: "R$ 185.200", date: "06 Nov", status: "pending" },
              { prov: "Enel SP", desc: "Instalação Cabine Primária", val: "R$ 54.100", date: "08 Nov", status: "pending" },
              { prov: "Folha Pagto", desc: "Mão de Obra Própria + Encargos", val: "R$ 1.2M", date: "05 Nov", status: "scheduled" }
            ].map((p, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{p.prov}</p>
                    <p className="text-xs text-slate-500">{p.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">{p.val}</p>
                  <p className="text-xs text-slate-500">{p.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Central de Relatórios</h2>
          <p className="text-sm text-slate-400 mt-1">Gere novos documentos ou acesse o histórico</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Templates Section */}
        <section>
          <h3 className="text-lg font-semibold text-white mb-4">Templates Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTemplates.map(template => (
              <motion.div 
                key={template.id}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate(template.type)}
                className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex flex-col items-start cursor-pointer hover:bg-slate-800/60 transition-colors group relative overflow-hidden shadow-lg"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                  <template.icon className="w-24 h-24 text-white transform rotate-12" />
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${template.bg}`}>
                  <template.icon className={`w-6 h-6 ${template.color}`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{template.title}</h4>
                <p className="text-sm text-slate-400 mb-6">{template.desc}</p>
                <button className="mt-auto flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  Gerar Agora <FileText className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Historical Reports */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Histórico de Downloads</h3>
            <div className="flex space-x-3">
              <button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-white/5 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filtrar
              </button>
            </div>
          </div>
          
          <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-slate-800/30 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <div className="col-span-6 md:col-span-5">Nome do Arquivo</div>
              <div className="col-span-4 md:col-span-3 hidden md:block">Data de Geração</div>
              <div className="col-span-3 md:col-span-2 hidden md:block text-right">Tamanho</div>
              <div className="col-span-6 md:col-span-2 text-right">Ação</div>
            </div>
            <div className="divide-y divide-white/5">
              {historicalReports.map((report) => (
                <div key={report.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                  <div className="col-span-6 md:col-span-5 flex items-center">
                    <FileText className="w-5 h-5 text-slate-500 mr-3" />
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{report.name}</span>
                  </div>
                  <div className="col-span-4 md:col-span-3 hidden md:block text-sm text-slate-400 flex items-center">
                    <Calendar className="w-4 h-4 inline mr-2 text-slate-500" />
                    {report.date}
                  </div>
                  <div className="col-span-3 md:col-span-2 hidden md:block text-sm text-slate-400 text-right">
                    {report.size}
                  </div>
                  <div className="col-span-6 md:col-span-2 text-right">
                    <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors ml-auto flex items-center text-sm font-medium">
                      <Download className="w-4 h-4 mr-2" /> <span className="hidden xl:inline">Baixar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
