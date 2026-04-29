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
  projects: Array<any>;
  suppliers: Array<any>;
  marketIndices: Array<{ name: string; value: string; status: string; desc: string }>;
  
  // Actions
  updateKpi: (key: keyof DashboardState['kpis'], value: number | string) => void;
  addCostData: (data: { month: string; orcado: number; realizado: number }) => void;
  updateSpiEtapa: (etapa: string, spi: number, cpi: number) => void;
  updateSupplyItem: (item: string, novoPreco: number) => void;
  updateDocStatus: (id: string, status: string) => void;
  addProject: (project: any) => void;
  updateProject: (id: number, updates: any) => void;
  updateMarketIndex: (name: string, value: string, status: string) => void;
  updateSupplier: (id: number, updates: any) => void;
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
      projects: [
        {
          id: 1,
          name: "Residencial Alpha",
          location: "São Paulo, SP",
          progress: 78,
          status: "on_track",
          image: "/assets/projects/residencia-alpha.png",
          deadline: "Nov 2026",
          projectedDeadline: "Nov 2026",
          budget: "R$ 12.5M",
          eac: "R$ 12.4M"
        },
        {
          id: 2,
          name: "Torre Horizonte",
          location: "Curitiba, PR",
          progress: 42,
          status: "delayed",
          image: "/assets/projects/torre-horizonte.png",
          deadline: "Fev 2027",
          projectedDeadline: "Mai 2027",
          budget: "R$ 45.0M",
          eac: "R$ 49.2M"
        },
        {
          id: 3,
          name: "Condomínio Reserva",
          location: "Campinas, SP",
          progress: 15,
          status: "warning",
          image: "/assets/projects/condominio-reserva.png",
          deadline: "Ago 2027",
          projectedDeadline: "Out 2027",
          budget: "R$ 8.2M",
          eac: "R$ 8.7M"
        }
      ],
      suppliers: [
        { id: 1, name: "Gerdau S.A.", category: "Aço & Estrutura", volume: "R$ 1.2M", stability: 98, score: 4.9, benchmark: -4.2 },
        { id: 2, name: "Votorantim Cimentos", category: "Concreto & Agregados", volume: "R$ 850k", stability: 95, score: 4.8, benchmark: -2.1 },
        { id: 3, name: "Tigre Tubos", category: "Instalações Hidrosanitárias", volume: "R$ 420k", stability: 92, score: 4.7, benchmark: +0.5 },
        { id: 4, name: "Amanco Wavin", category: "Instalações Hidrosanitárias", volume: "R$ 380k", stability: 89, score: 4.5, benchmark: -1.2 },
        { id: 5, name: "Portobello", category: "Acabamentos & Pisos", volume: "R$ 610k", stability: 85, score: 4.6, benchmark: -5.8 },
      ],
      marketIndices: [
        { name: "INCC-M", value: "4.85%", status: "up", desc: "Acumulado 12 meses" },
        { name: "SINAPI (SC)", value: "R$ 1.720,40", status: "stable", desc: "Custo médio m²" },
        { name: "CUB-SP", value: "R$ 1.942,12", status: "up", desc: "Padrão Médio R8-N" },
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

      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now() }]
      })),

      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
      })),

      updateMarketIndex: (name, value, status) => set((state) => ({
        marketIndices: state.marketIndices.map(m => m.name === name ? { ...m, value, status } : m)
      })),

      updateSupplier: (id, updates) => set((state) => ({
        suppliers: state.suppliers.map(s => s.id === id ? { ...s, ...updates } : s)
      })),
    }),
    {
      name: 'buildsync-dashboard-storage',
    }
  )
);
