"use client";

import React from "react";
import { TrendingUp, ShieldCheck, MapPin, Calendar, Award, Landmark } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

export default function ExecutiveReport() {
  const { kpis, spiData, complianceDocs } = useDashboardStore();
  const date = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white text-slate-950 p-12 max-w-[800px] mx-auto shadow-2xl print:shadow-none print:p-0 min-h-[1100px] flex flex-col border border-slate-200 print:border-none rounded-3xl print:rounded-none">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-1">BuildSync</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Executive Strategy Report</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-black uppercase">{date}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Ref: BS-2024-PORTFOLIO</p>
        </div>
      </div>

      {/* Grid de KPIs Financeiros */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        <div className="border-l-4 border-slate-900 pl-4">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Capital Investido</p>
          <p className="text-2xl font-black">R$ {kpis.capital.toLocaleString('pt-BR')}</p>
        </div>
        <div className="border-l-4 border-slate-900 pl-4">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Yield on Cost (YOC)</p>
          <p className="text-2xl font-black">{kpis.yoc}%</p>
        </div>
        <div className="border-l-4 border-slate-900 pl-4">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">ROI Realizado</p>
          <p className="text-2xl font-black text-emerald-600">16.1%</p>
        </div>
      </div>

      {/* Seção Principal: Saúde do Portfólio */}
      <div className="space-y-8 flex-1">
        <div>
          <h2 className="text-lg font-black uppercase mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" /> Performance de Engenharia (SPI)
          </h2>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-4">
              {spiData.map((item) => (
                <div key={item.etapa} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-bold">{item.etapa}</span>
                      <span className={`text-xs font-black ${item.spi >= 1 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {item.spi.toFixed(2)} SPI
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.spi >= 1 ? 'bg-emerald-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(item.spi * 80, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-black uppercase mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-emerald-600" /> Compliance Bancário
            </h2>
            <div className="space-y-3">
              {complianceDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700">{doc.doc}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${doc.status === 'Validado' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col justify-center">
            <Landmark className="w-8 h-8 mb-4 text-blue-400" />
            <h3 className="text-xl font-black mb-2">Parecer do Gestor</h3>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "Portfólio apresenta resiliência frente à inflação de insumos. O avanço físico de 1.05 SPI na média consolidada garante a liberação das próximas parcelas de financiamento conforme planejado."
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <span>BuildSync Platform • Intelligence for Real Estate</span>
        <span>Generated by BuildSync AI</span>
      </div>
    </div>
  );
}
