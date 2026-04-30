"use client";

import React from "react";

const globalGlossary: Record<string, string> = {
  // Investimentos
  "YOC": "Yield on Cost: Rendimento anual calculado sobre o custo total investido, não sobre o valor de mercado atual.",
  "ROI": "Return on Investment: Percentual de retorno sobre o capital investido após descontados todos os custos.",
  "CAPEX": "Capital Expenditure: Montante total de recursos investidos na aquisição de bens de capital (o investimento inicial).",
  
  // Engenharia e Performance
  "SPI": "Schedule Performance Index: Índice que mede a eficiência do cronograma. > 1 significa que a obra está adiantada.",
  "EAC": "Estimate at Completion: Estimativa de custo total da obra ao final, baseada na performance atual.",
  "Curva S": "Representação gráfica do progresso acumulado (físico ou financeiro) ao longo do tempo.",
  "SINAPI": "Sistema Nacional de Pesquisa de Custos e Índices: Tabela de referência de preços da construção civil no Brasil.",
  
  // Financeiro
  "VGV": "Valor Geral de Vendas: Soma do valor potencial de venda de todas as unidades do empreendimento.",
  "Burn Rate": "Taxa de Queima: Ritmo mensal de consumo do capital disponível para cobrir despesas operacionais e de obra.",
  "Runway": "Autonomia: Estimativa de quantos meses o caixa atual suporta mantendo o ritmo de gastos atual.",
  "DRE": "Demonstração do Resultado do Exercício: Relatório que resume receitas e custos para calcular o lucro líquido.",
  "Waterfall": "Gráfico de Cascata: Visualização que mostra a progressão dos custos retirados do VGV até a margem final.",
  
  // Suprimentos
  "Curva ABC": "Método de categorização de insumos onde 'A' são os itens de maior valor e impacto financeiro.",
  "Lead Time": "Tempo decorrido entre o pedido de compra e a entrega efetiva do material no canteiro.",
  
  // Financiamento CEF
  "PCI": "Planilha de Levantamento de Custos: Documento da Caixa que detalha o orçamento e cronograma para financiamento.",
  "PFUI": "Proposta de Financiamento de Unidade Isolada: Formulário padrão para solicitação de crédito para construção.",
  "CNO": "Cadastro Nacional de Obras: Registro obrigatório na Receita Federal para controle de contribuições previdenciárias.",
  "CND": "Certidão Negativa de Débitos: Documento que prova a regularidade fiscal da obra, essencial para liberação de parcelas."
};

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
}

export const GlossaryTooltip = ({ term, children }: GlossaryTooltipProps) => {
  const explanation = globalGlossary[term] || "Definição não encontrada para este termo.";

  return (
    <span className="group relative inline-block">
      <span className="cursor-help border-b border-dotted border-blue-500/50 hover:border-blue-400 transition-colors">
        {children}
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-[#0f172a] border border-white/20 rounded-2xl text-[11px] text-slate-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-[9999] shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-1 ring-white/10 block">
        <span className="flex items-center space-x-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-black text-white uppercase tracking-wider text-[10px]">{term}</span>
        </span>
        <span className="leading-relaxed font-semibold text-slate-300 antialiased block">{explanation}</span>
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0f172a]" />
      </span>
    </span>
  );
};
