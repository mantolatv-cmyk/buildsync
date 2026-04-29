"use client";

import React from "react";
import { Zap, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

export default function ActionPlanReport() {
  return (
    <div className="bg-white text-slate-950 p-12 max-w-[800px] mx-auto shadow-2xl print:shadow-none print:p-0" id="action-plan-report">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">BuildSync</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Inteligência Preditiva em Engenharia</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">RELATÓRIO DE MITIGAÇÃO</p>
          <p className="text-xs text-slate-500">Gerado em: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {/* Título do Documento */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-black uppercase text-slate-900">Plano de Ação: Recuperação de Cronograma</h2>
        <p className="text-slate-600 mt-2 font-medium">Obra: Edifício Horizonte • São Paulo, SP</p>
      </div>

      {/* Diagnóstico */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Atraso Projetado</p>
          <p className="text-4xl font-black text-red-600">18 Dias</p>
          <p className="text-[11px] text-slate-500 mt-2">Baseado no SPI Acumulado de 0.94</p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Causa Raiz</p>
          <p className="text-lg font-bold text-slate-900 leading-tight">Instalações Elétricas & Vedações</p>
          <p className="text-[11px] text-slate-500 mt-2">Folga Zero (CPM) no caminho crítico.</p>
        </div>
      </div>

      {/* Atividades Críticas */}
      <div className="mb-10">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" /> Atividades Críticas Identificadas
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 border-t border-b border-slate-200">
              <th className="py-3 px-4 text-left text-[10px] font-black uppercase text-slate-600">Atividade</th>
              <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-slate-600">Progresso</th>
              <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-slate-600">Folga</th>
              <th className="py-3 px-4 text-right text-[10px] font-black uppercase text-slate-600">Impacto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {[
              { task: "Instalações Elétricas (Prumada Central)", progress: "45%", slack: "0d", impact: "Crítico" },
              { task: "Revestimento Fachada Sul", progress: "10%", slack: "0d", impact: "Crítico" },
              { task: "Elevadores (Montagem Guias)", progress: "0%", slack: "2d", impact: "Alto" },
            ].map((row, i) => (
              <tr key={i}>
                <td className="py-4 px-4 text-xs font-bold text-slate-900">{row.task}</td>
                <td className="py-4 px-4 text-center text-xs text-slate-600">{row.progress}</td>
                <td className="py-4 px-4 text-center text-xs font-bold text-red-600">{row.slack}</td>
                <td className="py-4 px-4 text-right text-[10px] font-black uppercase text-slate-500">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medidas Mitigadoras */}
      <div className="mb-10 p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl">
        <h3 className="text-sm font-black uppercase tracking-widest text-blue-900 mb-6 flex items-center">
          <Zap className="w-4 h-4 mr-2 text-blue-600" /> Medidas Mitigadoras (Plano de Recuperação)
        </h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">1</div>
            <div>
              <p className="text-sm font-bold text-slate-900">Aceleração de Equipe (Overtime)</p>
              <p className="text-xs text-slate-600 mt-1">Implementar turno estendido (até 22h) para a equipe de elétrica nas prumadas críticas. Meta: Recuperar 5 dias em 15 dias corridos.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">2</div>
            <div>
              <p className="text-sm font-bold text-slate-900">Logística Antecipada de Elevadores</p>
              <p className="text-xs text-slate-600 mt-1">Garantir a descarga total dos componentes de tração no canteiro até o dia 05/11. Evitar espera por transporte vertical.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">3</div>
            <div>
              <p className="text-sm font-bold text-slate-900">Paralelismo de Vedações</p>
              <p className="text-xs text-slate-600 mt-1">Iniciar alvenaria interna em pavimentos tipo 12 e 14 simultaneamente, aproveitando a liberação das formas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Assinaturas */}
      <div className="mt-20 grid grid-cols-2 gap-20">
        <div className="border-t border-slate-400 pt-4 text-center">
          <p className="text-[10px] font-bold text-slate-900 uppercase">Engenheiro Responsável</p>
          <p className="text-xs text-slate-500 mt-1">CREA/SC 123.456-7</p>
        </div>
        <div className="border-t border-slate-400 pt-4 text-center">
          <p className="text-[10px] font-bold text-slate-900 uppercase">Gestor de Portfólio</p>
          <p className="text-xs text-slate-500 mt-1">BuildSync Analysis Engine</p>
        </div>
      </div>

      {/* Disclaimer de Impressão */}
      <div className="mt-12 text-[8px] text-slate-400 text-center uppercase tracking-[0.2em] print:hidden">
        Pressione Ctrl + P para salvar este documento como PDF
      </div>
    </div>
  );
}
