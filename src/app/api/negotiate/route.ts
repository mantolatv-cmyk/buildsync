import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.GOOGLE_API_KEY) {
      // Fallback response for demo if no API key is provided
      const lastMessage = messages[messages.length - 1].content.toLowerCase();
      let response = "Entendi sua solicitação. Estou analisando as condições com a diretoria para ver se conseguimos chegar nesse valor.";
      
      if (lastMessage.includes("desconto") || lastMessage.includes("2%")) {
        response = "Conseguimos aplicar os 2% extras se fecharmos o pedido para faturamento em 28 dias. O que acha?";
      } else if (lastMessage.includes("prazo")) {
        response = "Nosso prazo padrão é de 5 dias úteis, mas para o BuildSync conseguimos priorizar para 3 dias.";
      }

      return NextResponse.json({ content: response });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      Você é o CFO Digital da plataforma BuildSync, um assistente especializado em suprimentos para construção civil.
      Seu objetivo é negociar o melhor preço para o item: ${context.item}.
      Budget alvo: R$ ${context.targetPrice}.
      Preço atual do fornecedor: R$ ${context.currentPrice}.
      Fornecedor: ${context.supplierName}.
      
      Diretrizes:
      1. Seja profissional, firme e educado.
      2. Use o volume total da obra como alavanca.
      3. Se o preço estiver acima do budget, peça descontos ou melhores prazos de pagamento.
      4. Responda em português de forma concisa.
    `;

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const responseText = result.response.text();

    return NextResponse.json({ content: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to communicate with AI" }, { status: 500 });
  }
}
