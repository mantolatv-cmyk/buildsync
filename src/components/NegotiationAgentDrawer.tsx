"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Bot, User, Send, TrendingDown, 
  CheckCircle2, AlertCircle, Clock, Star,
  MessageSquare, Zap, Scale, BrainCircuit, FileDown
} from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";
import NegotiationComparisonTable from "./NegotiationComparisonTable";
import { generatePurchaseOrder } from "../utils/pdfService";

interface NegotiationAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  negotiationId: string | null;
}

export default function NegotiationAgentDrawer({ isOpen, onClose, negotiationId }: NegotiationAgentDrawerProps) {
  const { negotiations, updateNegotiation, finalizeNegotiation } = useDashboardStore();
  const negotiation = negotiations.find(n => n.id === negotiationId);
  const [activeSupplier, setActiveSupplier] = useState(0);
  const [activeTab, setActiveTab] = useState<'chat' | 'comparison'>('chat');
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDealClosed, setIsDealClosed] = useState(false);

  if (!negotiation && isOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/50 backdrop-blur-sm">
        <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white font-bold">Iniciando Agente de Negociação...</p>
        </div>
      </div>
    );
  }

  if (!negotiation) return null;

  const currentSupplier = negotiation.suppliers[activeSupplier];

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || newMessage;
    if (!textToSend.trim() || isTyping) return;

    const currentSupplier = negotiation.suppliers[activeSupplier];
    const updatedMessages = [
      ...currentSupplier.messages,
      { sender: 'ai', text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];

    const updatedSuppliers = [...negotiation.suppliers];
    updatedSuppliers[activeSupplier] = { ...currentSupplier, messages: updatedMessages };
    updateNegotiation(negotiation.id, { suppliers: updatedSuppliers });
    setNewMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.sender === 'ai' ? 'user' : 'assistant', content: m.text })),
          context: {
            item: negotiation.item,
            targetPrice: negotiation.targetPrice,
            currentPrice: currentSupplier.price,
            supplierName: currentSupplier.name
          }
        })
      });

      const data = await response.json();
      
      const supplierResponse = {
        sender: 'supplier',
        text: data.content || "Desculpe, tive um problema na conexão. Pode repetir?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalSuppliers = [...updatedSuppliers];
      finalSuppliers[activeSupplier] = { 
        ...finalSuppliers[activeSupplier], 
        messages: [...updatedMessages, supplierResponse] 
      };
      updateNegotiation(negotiation.id, { suppliers: finalSuppliers });
    } catch (error) {
      console.error("Negotiation Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDownloadPO = () => {
    const s = negotiation.suppliers[activeSupplier];
    generatePurchaseOrder({
      poNumber: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      item: negotiation.item,
      supplier: s.name,
      price: s.price,
      quantity: "Lote Integral",
      paymentTerms: s.paymentTerms,
      deliveryTime: s.deliveryTime
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-slate-900 border-l border-white/10 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <BrainCircuit className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">CFO Digital <span className="text-slate-500 font-normal">| Agent</span></h3>
                  <div className="flex items-center space-x-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">IA Analisando: {negotiation.item}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5 mr-4">
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat Log</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('comparison')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'comparison' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Scale className="w-4 h-4" />
                    <span>Comparativo</span>
                  </button>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden bg-[#020617]">
              {/* Left Side: Reasoning & Suppliers */}
              <div className="w-72 border-r border-white/5 flex flex-col">
                {/* Reasoning Panel */}
                <div className="p-6 bg-blue-500/5 border-b border-white/5">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Estratégia do CFO</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "{negotiation.reasoning}"
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="p-4 bg-slate-900/50">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fornecedores em Pauta</p>
                  </div>
                  {negotiation.suppliers.map((s: any, idx: number) => (
                    <button
                      key={s.name}
                      onClick={() => { setActiveSupplier(idx); setActiveTab('chat'); }}
                      className={`w-full p-5 border-b border-white/5 text-left transition-all relative ${activeSupplier === idx && activeTab === 'chat' ? 'bg-blue-600/10' : 'hover:bg-white/5'}`}
                    >
                      {activeSupplier === idx && activeTab === 'chat' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />}
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-white truncate pr-2">{s.name}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-black text-white">R$ {s.price}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase">{s.paymentTerms}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{s.deliveryTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                          <span className="text-[10px] font-bold text-slate-400">{s.score}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center: Main Content */}
              <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-900/20">
                {activeTab === 'chat' ? (
                  <>
                    {/* Chat Log */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  {currentSupplier.messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-10">
                      <MessageSquare className="w-12 h-12 mb-4" />
                      <p className="text-sm font-medium">Inicie a conversa para ver a negociação da IA com este fornecedor.</p>
                    </div>
                  ) : (
                    <>
                      {currentSupplier.messages.map((msg: any, i: number) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={i}
                          className={`flex ${msg.sender === 'ai' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex max-w-[85%] space-x-3 ${msg.sender === 'ai' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-800 border border-white/10'}`}>
                              {msg.sender === 'ai' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-400" />}
                            </div>
                            <div>
                              <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'ai' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'}`}>
                                {msg.text}
                              </div>
                              <p className={`text-[10px] text-slate-500 mt-1 ${msg.sender === 'ai' ? 'text-right' : ''}`}>{msg.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                          <div className="bg-slate-800 border border-white/5 p-3 rounded-2xl rounded-tl-none flex space-x-1 items-center">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-white/10 bg-slate-900">
                  <div className="relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Instruir IA na negociação..."
                      className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={() => handleSendMessage()}
                      className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleSendMessage("Solicitar desconto adicional de 2% para fechamento hoje.")}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-400 rounded-lg transition-colors border border-white/5"
                        >
                          Pedir Desconto 5%
                        </button>
                        <button 
                          onClick={() => handleSendMessage("Qual o melhor prazo de entrega se confirmarmos o pedido agora?")}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-400 rounded-lg transition-colors border border-white/5"
                        >
                          Questionar Prazo
                        </button>
                      </div>
                      
                      {!isDealClosed ? (
                        <button 
                          onClick={() => {
                            finalizeNegotiation(negotiation.id, currentSupplier.name);
                            setIsDealClosed(true);
                          }}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-tighter"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Fechar com {currentSupplier.name}</span>
                        </button>
                      ) : (
                        <button 
                          onClick={handleDownloadPO}
                          className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-tighter animate-bounce"
                        >
                          <FileDown className="w-4 h-4" />
                          <span>Baixar Ordem de Compra</span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <NegotiationComparisonTable 
                  suppliers={negotiation.suppliers} 
                  targetPrice={negotiation.targetPrice} 
                />
              )}
            </div>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
