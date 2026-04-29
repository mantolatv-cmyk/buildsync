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
  
  // Actions
  updateKpi: (key: keyof DashboardState['kpis'], value: number | string) => void;
  addCostData: (data: { month: string; orcado: number; realizado: number }) => void;
  updateSpiEtapa: (etapa: string, spi: number, cpi: number) => void;
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
    }),
    {
      name: 'buildsync-dashboard-storage',
    }
  )
);
