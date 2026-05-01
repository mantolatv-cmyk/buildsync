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
  notifications: Array<{ id: string; title: string; message: string; type: 'warning' | 'info' | 'success'; date: string; read: boolean }>;
  activityLog: Array<{ id: number; action: string; time: string; icon: string }>;
  evidences: Array<{ id: number; title: string; loc: string; status: string; date: string; type: string }>;
  negotiations: Array<any>;
  predictiveInsights: Array<{
    id: string;
    item: string;
    trend: 'up' | 'down' | 'stable';
    probability: number;
    impact: number;
    message: string;
    actionLabel: string;
  }>;
  whatsappConfig: {
    connected: boolean;
    phoneNumber: string;
    lastSync: string;
    battery: number;
  };
  whatsappLogs: Array<{
    id: string;
    contact: string;
    message: string;
    time: string;
    type: 'incoming' | 'outgoing' | 'ai_processed' | 'ai_processed_response';
    status: 'read' | 'delivered' | 'processing';
  }>;
  
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
  addNotification: (notification: any) => void;
  markNotificationRead: (id: string) => void;
  addSupplyItem: (item: any) => void;
  addMeasurement: (projectId: number, measurement: any) => void;
  triggerAIAction: (type: 'negotiation' | 'risk_mitigation', data: any) => void;
  setEvidences: (evidences: any[]) => void;
  addEvidence: (evidence: any) => void;
  updateEvidence: (id: number, updates: any) => void;
  removeEvidence: (id: number) => void;
  addNegotiation: (negotiation: any) => void;
  updateNegotiation: (id: string, updates: any) => void;
  finalizeNegotiation: (negotiationId: string, supplierName: string) => void;
  addSupplier: (supplier: any) => void;
  toggleWhatsAppSync: () => void;
  addWhatsAppLog: (log: any) => void;
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
        { id: 1, name: "Gerdau S.A.", category: "Aço & Estrutura", volume: "R$ 1.2M", stability: 98, score: 4.9, benchmark: -4.2, email: "comercial@gerdau.com.br", phone: "(11) 3003-1234", location: "São Paulo, SP", status: "Homologado" },
        { id: 2, name: "Votorantim Cimentos", category: "Concreto & Agregados", volume: "R$ 850k", stability: 95, score: 4.8, benchmark: -2.1, email: "pedidos@votorantim.com", phone: "0800 701 2345", location: "Curitiba, PR", status: "Homologado" },
        { id: 3, name: "Tigre Tubos", category: "Instalações Hidrosanitárias", volume: "R$ 420k", stability: 92, score: 4.7, benchmark: +0.5, email: "vendas@tigre.com.br", phone: "(47) 3441-5000", location: "Joinville, SC", status: "Vencendo" },
        { id: 4, name: "Amanco Wavin", category: "Instalações Hidrosanitárias", volume: "R$ 380k", stability: 89, score: 4.5, benchmark: -1.2, email: "contato@amancowavin.com.br", phone: "0800 701 8770", location: "Sumaré, SP", status: "Homologado" },
        { id: 5, name: "Portobello", category: "Acabamentos & Pisos", volume: "R$ 610k", stability: 85, score: 4.6, benchmark: -5.8, email: "especificador@portobello.com.br", phone: "(48) 3279-2222", location: "Tijucas, SC", status: "Homologado" },
      ],
      marketIndices: [
        { name: "INCC-M", value: "4.85%", status: "up", desc: "Acumulado 12 meses" },
        { name: "SINAPI (SC)", value: "R$ 1.720,40", status: "stable", desc: "Custo médio m²" },
        { name: "CUB-SP", value: "R$ 1.942,12", status: "up", desc: "Padrão Médio R8-N" },
      ],
      notifications: [
        { id: '1', title: 'Alerta de Insumo', message: 'O preço do Aço (Ton) subiu 12% acima do orçado.', type: 'warning', date: 'Hoje, 10:30', read: false },
        { id: '2', title: 'Avanço de Obra', message: 'Torre Horizonte atingiu 42% de conclusão física.', type: 'info', date: 'Hoje, 09:15', read: false },
        { id: '3', title: 'Compliance OK', message: 'Certidão CNO validada para Residencial Alpha.', type: 'success', date: 'Ontem', read: true },
      ],
      activityLog: [
        { id: 1, action: 'Sistema BuildSync Iniciado', time: 'Há 1 hora', icon: 'Settings' }
      ],
      evidences: [
        { id: 1, title: "Ferragem Viga V102", loc: "Setor A", status: "Geolocalizado", date: "Hoje, 10:42", type: "Hidden" },
        { id: 2, title: "Impermeabilização", loc: "Banheiro 12", status: "Geolocalizado", date: "Hoje, 09:15", type: "Hidden" },
        { id: 3, title: "Tubulação Esgoto", loc: "Prumada 02", status: "Geolocalizado", date: "Ontem, 16:30", type: "Hidden" },
        { id: 4, title: "Revestimento Piso", loc: "Hall", status: "Geolocalizado", date: "Ontem, 14:20", type: "Standard" },
      ],
      negotiations: [
        {
          id: "neg-1",
          item: "Aço CA-50 (Ton)",
          status: "active",
          targetPrice: 4800,
          currentBest: "Gerdau S.A.",
          suppliers: [
            { 
              name: "Gerdau S.A.", 
              price: 4950, 
              deliveryTime: "4 dias", 
              paymentTerms: "30/60 dias",
              score: 4.9,
              messages: [
                { sender: 'supplier', text: "Nosso melhor preço para 50 toneladas é R$ 5.200.", time: "10:00" },
                { sender: 'ai', text: "Entendido. No entanto, o volume total do Residencial Alpha prevê mais 200 toneladas nos próximos meses. Conseguimos fechar em R$ 4.950 para pagamento à vista?", time: "10:05" },
                { sender: 'supplier', text: "Nesse caso, conseguimos os R$ 4.950.", time: "10:10" }
              ]
            },
            { name: "ArcelorMittal", price: 5100, deliveryTime: "7 dias", paymentTerms: "A vista", score: 4.7, messages: [] },
            { name: "Açotubo", price: 5050, deliveryTime: "3 dias", paymentTerms: "28 dias", score: 4.5, messages: [] }
          ],
          reasoning: "Gerdau é o fornecedor preferencial devido ao score técnico. Pressionando por 5% de desconto baseado no volume futuro do condomínio.",
        }
      ],
      whatsappConfig: {
        connected: true,
        phoneNumber: "+55 (11) 99876-5432",
        lastSync: "Agora",
        battery: 84
      },
      whatsappLogs: [
        { id: 'w1', contact: 'Fornecedor Gerdau', message: 'Tabela de preços atualizada enviada.', time: '10:15', type: 'incoming', status: 'read' },
        { id: 'w2', contact: 'Fornecedor Gerdau', message: 'CFO Digital analisando impacto no orçamento...', time: '10:16', type: 'ai_processed', status: 'processing' },
        { id: 'w3', contact: 'Eng. Ricardo', message: 'Comprovante de medição Setor B anexado.', time: '09:30', type: 'incoming', status: 'read' },
      ],
      predictiveInsights: [
        {
          id: "ins-1",
          item: "Aço CA-50",
          trend: "up",
          probability: 85,
          impact: 15400,
          message: "Alta de 4.85% no INCC-M sinaliza reajuste iminente nas usinas.",
          actionLabel: "Travar Preço Agora"
        },
        {
          id: "ins-2",
          item: "Cimento CP-II",
          trend: "down",
          probability: 60,
          impact: 4200,
          message: "Aumento de oferta regional pode reduzir preços em 15 dias.",
          actionLabel: "Aguardar Compra"
        },
        {
          id: "ins-3",
          item: "Cobre (Fios)",
          trend: "up",
          probability: 92,
          impact: 8900,
          message: "Volatilidade na LME (London Metal Exchange) impactando importados.",
          actionLabel: "Antecipar Lote"
        }
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

      updateSupplyItem: (item, novoPreco) => set((state) => {
        const itemData = state.supplyData.find(s => s.item === item);
        const threshold = itemData ? itemData.orcado * 1.1 : 0;
        
        const newNotifications = [...state.notifications];
        if (novoPreco > threshold) {
          newNotifications.unshift({
            id: Date.now().toString(),
            title: 'Alerta de Preço',
            message: `O item ${item} ultrapassou o limite de 10% de desvio.`,
            type: 'warning',
            date: 'Agora',
            read: false
          });
        }

        return {
          supplyData: state.supplyData.map(s => s.item === item ? { ...s, atual: novoPreco } : s),
          notifications: newNotifications
        };
      }),

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

      addNotification: (n) => set((state) => ({
        notifications: [{ ...n, id: Date.now().toString(), read: false, date: 'Agora' }, ...state.notifications]
      })),

      addSupplyItem: (item) => set((state) => ({
        supplyData: [...state.supplyData, { ...item, id: Date.now() }],
        notifications: [
          {
            id: Date.now().toString(),
            title: "Novo Pedido de Insumo",
            message: `Pedido de ${item.item} registrado com sucesso.`,
            type: "success",
            date: "Agora",
            read: false
          },
          ...state.notifications
        ],
        activityLog: [
          { id: Date.now(), action: `Registrou pedido de ${item.item}`, time: "Agora", icon: "Package" },
          ...state.activityLog
        ]
      })),

      addMeasurement: (projectId: number, measurement: any) => set((state) => {
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return state;

        // Simplified SPI calculation: 
        // If new progress > planned progress (using target 100% at deadline), SPI increases
        const deltaProgress = measurement.newProgress - project.progress;
        const spiDelta = deltaProgress > 0 ? 0.02 : -0.02;
        
        const updatedSpiData = state.spiData.map(s => {
          // Find the relevant stage for this measurement (defaulting to first critical or matching name)
          if (s.status === "Crítico" || s.etapa === "Fundação") {
            const newSpi = Math.max(0.5, Math.min(1.5, s.spi + spiDelta));
            return { ...s, spi: newSpi, status: newSpi >= 1 ? "Adiantado" : "Crítico" };
          }
          return s;
        });

        return {
          projects: state.projects.map(p => p.id === projectId ? {
            ...p,
            progress: measurement.newProgress,
            measurements: [...(p.measurements || []), { ...measurement, id: Date.now(), date: new Date().toLocaleDateString() }]
          } : p),
          spiData: updatedSpiData,
          activityLog: [
            { id: Date.now(), action: `Nova medição (${measurement.newProgress}%) - SPI atualizado`, time: "Agora", icon: "Activity" },
            ...state.activityLog
          ]
        };
      }),

      triggerAIAction: (type, data) => set((state) => {
        const newLogEntry = {
          id: Date.now(),
          action: type === 'negotiation' ? `CFO Digital: Iniciou negociação autônoma para ${data.item}` : `CFO Digital: Mitigação de risco para ${data.item}`,
          time: "Agora",
          icon: "Bot"
        };

        if (type === 'negotiation') {
          // Add to WhatsApp logs
          const newWhatsAppLog = {
            id: `w-ai-${Date.now()}`,
            contact: 'Fornecedor Gerdau',
            message: `Detectada tendência de alta em ${data.item}. Iniciando negociação para travar preço...`,
            time: 'Agora',
            type: 'ai_processed' as const,
            status: 'processing' as const
          };

          const newNeg = {
            id: `neg-${Date.now()}`,
            item: data.item,
            status: "active",
            targetPrice: data.targetPrice || 4800,
            currentBest: "Gerdau S.A.",
            suppliers: [
              { 
                name: "Gerdau S.A.", 
                price: data.targetPrice + 100, 
                deliveryTime: "3 dias", 
                paymentTerms: "30 dias",
                score: 4.9,
                messages: [
                  { sender: 'ai', text: `Detectei tendência de alta em ${data.item}. Podemos travar o preço em R$ ${data.targetPrice}?`, time: "Agora" }
                ]
              }
            ],
            reasoning: `Iniciado proativamente devido ao alerta de mercado.`,
          };

          return {
            negotiations: [newNeg, ...state.negotiations],
            activityLog: [newLogEntry, ...state.activityLog],
            whatsappLogs: [newWhatsAppLog, ...state.whatsappLogs]
          };
        }

        return {
          activityLog: [newLogEntry, ...state.activityLog]
        };
      }),

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      
      setEvidences: (evidences) => set({ evidences }),
      
      addEvidence: (evidence) => set((state) => ({
        evidences: [...state.evidences, { ...evidence, id: Date.now() }],
        activityLog: [
          { id: Date.now(), action: `Adicionou nova evidência: ${evidence.title}`, time: "Agora", icon: "Camera" },
          ...state.activityLog
        ]
      })),
      
      updateEvidence: (id, updates) => set((state) => ({
        evidences: state.evidences.map(e => e.id === id ? { ...e, ...updates } : e),
        activityLog: [
          { id: Date.now(), action: `Editou evidência ID ${id}`, time: "Agora", icon: "Edit3" },
          ...state.activityLog
        ]
      })),
      
      removeEvidence: (id) => set((state) => ({
        evidences: state.evidences.filter(e => e.id !== id),
        activityLog: [
          { id: Date.now(), action: `Removeu evidência ID ${id}`, time: "Agora", icon: "Trash2" },
          ...state.activityLog
        ]
      })),

      addNegotiation: (negotiation) => set((state) => ({
        negotiations: [negotiation, ...state.negotiations],
        activityLog: [
          { id: Date.now(), action: `Iniciou nova negociação IA para ${negotiation.item}`, time: "Agora", icon: "Bot" },
          ...state.activityLog
        ]
      })),

      updateNegotiation: (id, updates) => set((state) => ({
        negotiations: state.negotiations.map(n => n.id === id ? { ...n, ...updates } : n)
      })),

      finalizeNegotiation: (negotiationId, supplierName) => set((state) => {
        const negotiation = state.negotiations.find(n => n.id === negotiationId);
        if (!negotiation) return state;

        const supplier = negotiation.suppliers.find((s: any) => s.name === supplierName);
        if (!supplier) return state;

        // Update supplyData price
        const updatedSupplyData = state.supplyData.map(s => 
          s.item === negotiation.item || negotiation.item.includes(s.item.split(' ')[0])
            ? { ...s, atual: supplier.price }
            : s
        );

        // Add to log
        const newLogEntry = {
          id: Date.now(),
          action: `Acordo fechado para ${negotiation.item} com ${supplierName} (R$ ${supplier.price})`,
          time: "Agora",
          icon: "CheckCircle"
        };

        return {
          supplyData: updatedSupplyData,
          negotiations: state.negotiations.filter(n => n.id !== negotiationId),
          activityLog: [newLogEntry, ...state.activityLog],
          notifications: [{
            id: Date.now().toString(),
            title: "CFO Digital: Acordo Fechado",
            message: `Economia de R$ ${(negotiation.targetPrice - supplier.price) * 50} projetada para ${negotiation.item}.`,
            type: "success",
            date: "Agora",
            read: false
          }, ...state.notifications]
        };
      }),

      toggleWhatsAppSync: () => set((state) => ({
        whatsappConfig: { ...state.whatsappConfig, connected: !state.whatsappConfig.connected }
      })),

      addWhatsAppLog: (log) => set((state) => ({
        whatsappLogs: [{ ...log, id: Date.now().toString() }, ...state.whatsappLogs]
      })),

      addSupplier: (supplier) => set((state) => ({
        suppliers: [...state.suppliers, { ...supplier, id: Date.now() }],
        activityLog: [
          { id: Date.now(), action: `Novo parceiro homologado: ${supplier.name}`, time: "Agora", icon: "ShieldCheck" },
          ...state.activityLog
        ],
        notifications: [
          {
            id: Date.now().toString(),
            title: "Parceiro Homologado",
            message: `${supplier.name} foi adicionado à rede BuildSync.`,
            type: "success",
            date: "Agora",
            read: false
          },
          ...state.notifications
        ]
      })),
    }),
    {
      name: 'buildsync-dashboard-storage',
    }
  )
);
