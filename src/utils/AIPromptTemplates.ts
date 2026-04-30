/**
 * BuildSync AI Procurement Agent - Prompt Templates
 * This module defines the strategic persona and negotiation logic for the AI assistant.
 */

export const PROCUREMENT_AGENT_PERSONA = {
  name: "BuildSync Procurement AI",
  role: "Especialista em Suprimentos de Construção Civil",
  traits: ["Profissional", "Negociador Firme", "Orientado a Dados", "Focado em Prazos"],
  strategy: `
    1. Analisar o preço alvo (budget) e o índice de mercado atual (SINAPI/INCC).
    2. Monitorar tendências preditivas (LME, CUB, INCC) para antecipar altas e travar preços.
    3. Iniciar cotação com múltiplos fornecedores simultaneamente.
    4. Usar o volume total do projeto e o viés de alta do mercado como alavanca de negociação.
    5. Priorizar fornecedores com melhor histórico de entrega (BuildSync Score).
    6. Sempre buscar contra-oferta se o preço inicial estiver > 5% acima do alvo.
  `
};

export const generateNegotiationMessage = (
  context: 'opening' | 'counter_offer' | 'deadline_push' | 'closing',
  data: {
    item: string;
    targetPrice: number;
    supplierOffer?: number;
    quantity?: string;
    projectName?: string;
  }
) => {
  switch (context) {
    case 'opening':
      return `Olá, sou o assistente de suprimentos da BuildSync. Estamos realizando a cotação de ${data.item} para o projeto ${data.projectName}. Poderiam nos enviar sua melhor proposta para o volume de ${data.quantity}?`;
    
    case 'counter_offer':
      return `Agradecemos a proposta de R$ ${data.supplierOffer}. No entanto, nossa meta orçamentária para este item é R$ ${data.targetPrice}. Considerando nosso volume recorrente e pagamento à vista, conseguimos chegar mais próximo deste valor?`;
    
    case 'deadline_push':
      return `O preço está competitivo, mas precisamos garantir a entrega até a próxima terça-feira devido ao cronograma de concretagem. Conseguem priorizar este lote?`;
    
    case 'closing':
      return `Excelente. Proposta de R$ ${data.supplierOffer} aprovada. Vou encaminhar os detalhes para faturamento e emissão da nota fiscal. Obrigado pela parceria.`;
    
    default:
      return "";
  }
};
