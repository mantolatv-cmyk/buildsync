import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  kpis: {
    capital: number;
    yoc: number;
    costPerSqm: number;
    capitalTrend: string;
    yocTrend: string;
    costTrend: string;
  };
  costData: Array<{ month: string; orcado: number; realizado: number }>;
  spiData: Array<{ etapa: string; spi: number; cpi: number; status: string }>;
  roiData: Array<{ ano: string; projetado: number; realizado: number | null }>;
  supplyData: Array<{ item: string; orcado: number; atual: number; market: number }>;
  complianceDocs: Array<{ id: string; doc: string; status: string; date: string; type: string }>;
  
  // Actions
  updateKpi: (key: keyof DashboardState['kpis'], value: number | string) => void;
  addCostData: (data: { month: string; orcado: number; realizado: number }) => void;
  updateSpiEtapa: (etapa: string, spi: number, cpi: number) => void;
  updateSupplyItem: (item: string, novoPreco: number) => void;
  updateDocStatus: (id: string, status: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      kpis: {
        capital: 850000,
        yoc: 14.2,
        costPerSqm: 3900,
        capitalTrend: "+2%",
        yocTrend: "+0.1%",
        costTrend: "-0.5%"
      },
      costData: [
        { month: "Sem 1", orcado: 200000, realizado: 195000 },
        { month: "Sem 2", orcado: 400000, realizado: 410000 },
        { month: "Sem 3", orcado: 600000, realizado: 620000 },
        { month: "Sem 4", orcado: 850000, realizado: 840000 },
      ],
      spiData: [
        { etapa: "Fundação", spi: 1.05, cpi: 1.02, status: "Adiantado" },
        { etapa: "Alvenaria", spi: 0.95, cpi: 0.98, status: "Atraso Leve" },
        { etapa: "Cobertura", spi: 1.10, cpi: 1.05, status: "Eficiente" },
        { etapa: "Instalações", spi: 0.88, cpi: 0.92, status: "Crítico" },
        { etapa: "Acabamento", spi: 1.00, cpi: 1.00, status: "No Prazo" },
      ],
      roiData: [
        { ano: "2024", projetado: 12.5, realizado: 12.5 },
        { ano: "2025", projetado: 14.0, realizado: 14.2 },
        { ano: "2026", projetado: 15.5, realizado: 16.1 },
        { ano: "2027", projetado: 17.0, realizado: null },
      ],
      supplyData: [
        { item: 'Aço (Ton)', orcado: 4200, atual: 5100, market: 5350 },
        { item: 'Concreto (m³)', orcado: 350, atual: 380, market: 375 },
        { item: 'Cimento (Sc)', orcado: 28, atual: 32, market: 35 },
        { item: 'Cobre (kg)', orcado: 45, atual: 52, market: 58 },
        { item: 'Esquadrias (m²)', orcado: 800, atual: 780, market: 850 },
      ],
      complianceDocs: [
        { id: "1", doc: "Guia de INSS (GPS)", status: "Validado", date: "30/04/2024", type: "Mensal" },
        { id: "2", doc: "Recolhimento FGTS", status: "Validado", date: "30/04/2024", type: "Mensal" },
        { id: "3", doc: "Alvará de Construção", status: "Validado", date: "Vence em 2026", type: "Permanente" },
        { id: "4", doc: "Certidão CNO", status: "Pendente", date: "Atrasado 2 dias", type: "Mensal" },
      ],

      updateKpi: (key, value) => set((state) => ({
        kpis: { ...state.kpis, [key]: value }
      })),

      addCostData: (data) => set((state) => ({
        costData: [...state.costData, data]
      })),

      updateSpiEtapa: (etapa, spi, cpi) => set((state) => ({
        spiData: state.spiData.map(s => 
          s.etapa === etapa ? { ...s, spi, cpi, status: spi >= 1 ? "Adiantado" : "Crítico" } : s
        )
      })),

      updateSupplyItem: (item, novoPreco) => set((state) => ({
        supplyData: state.supplyData.map(s => 
          s.item === item ? { ...s, atual: novoPreco } : s
        )
      })),

      updateDocStatus: (id, status) => set((state) => ({
        complianceDocs: state.complianceDocs.map(d => 
          d.id === id ? { ...d, status, date: new Date().toLocaleDateString('pt-BR') } : d
        )
      })),
    }),
    {
      name: 'buildsync-dashboard-storage',
    }
  )
);
