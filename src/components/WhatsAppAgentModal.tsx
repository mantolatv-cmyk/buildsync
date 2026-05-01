"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Phone, Video, MoreVertical, Search, 
  Smile, Paperclip, Mic, Send, CheckCheck,
  User, Bot, ShieldCheck, Zap
} from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";

interface WhatsAppAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppAgentModal({ isOpen, onClose }: WhatsAppAgentModalProps) {
  const { whatsappLogs, whatsappConfig } = useDashboardStore();
  const [activeChat, setActiveChat] = useState(0);
  const [typedMessage, setTypedMessage] = useState("");

  const contacts = [
    { id: 1, name: "Fornecedor Gerdau", lastMsg: "Tabela de preços atualizada...", time: "10:15", online: true, avatar: "G" },
    { id: 2, name: "Eng. Ricardo (Obras)", lastMsg: "Comprovante de medição...", time: "09:30", online: false, avatar: "R" },
    { id: 3, name: "Diretoria BuildSync", lastMsg: "Relatório de custos aprovado.", time: "Ontem", online: true, avatar: "D" },
    { id: 4, name: "Votorantim Suporte", lastMsg: "Pedido #442 em rota.", time: "Ontem", online: false, avatar: "V" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#111b21] rounded-2xl shadow-2xl overflow-hidden border border-white/10 flex"
        >
          {/* Sidebar */}
          <div className="w-80 border-r border-[#222d34] flex flex-col bg-[#111b21]">
            <div className="p-4 bg-[#202c33] flex justify-between items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                CFO
              </div>
              <div className="flex space-x-5 text-[#aebac1]">
                <ShieldCheck className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Zap className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            <div className="p-2 bg-[#111b21]">
              <div className="relative">
                <Search className="absolute left-4 top-2.5 w-4 h-4 text-[#8696a0]" />
                <input 
                  type="text" 
                  placeholder="Pesquisar ou começar uma nova conversa"
                  className="w-full bg-[#202c33] rounded-lg py-2 pl-12 pr-4 text-sm text-white placeholder-[#8696a0] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {contacts.map((contact, idx) => (
                <div 
                  key={contact.id}
                  onClick={() => setActiveChat(idx)}
                  className={`flex items-center p-3 cursor-pointer transition-colors border-b border-[#222d34]/50 ${activeChat === idx ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'}`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111b21] rounded-full" />
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-medium text-[#e9edef] truncate">{contact.name}</h4>
                      <span className="text-[10px] text-[#8696a0]">{contact.time}</span>
                    </div>
                    <p className="text-xs text-[#8696a0] truncate">{contact.lastMsg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-[#0b141a] relative">
            {/* Chat Header */}
            <div className="p-3 bg-[#202c33] flex justify-between items-center z-10">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                  {contacts[activeChat].avatar}
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-[#e9edef]">{contacts[activeChat].name}</h4>
                  <p className="text-[10px] text-[#8696a0]">
                    {contacts[activeChat].online ? 'online' : 'visto por último hoje às 09:12'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-6 text-[#aebac1]">
                <Search className="w-5 h-5 cursor-pointer" />
                <MoreVertical className="w-5 h-5 cursor-pointer" />
              </div>
            </div>

            {/* Background Pattern Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/580/650/HD-wallpaper-whatsapp-pattern-whatsapp-texture.jpg")', backgroundSize: '400px' }} 
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 custom-scrollbar flex flex-col-reverse">
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <span className="bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1 rounded-md uppercase tracking-wider font-bold">HOJE</span>
                </div>

                {whatsappLogs
                  .filter(log => log.contact === contacts[activeChat].name)
                  .map((log) => (
                    <div key={log.id}>
                      {log.type === 'incoming' && (
                        <div className="flex justify-start">
                          <div className="bg-[#202c33] rounded-lg rounded-tl-none p-3 max-w-[70%] shadow-sm relative">
                            <p className="text-sm text-[#e9edef] leading-relaxed">{log.message}</p>
                            <div className="flex justify-end items-center mt-1">
                              <span className="text-[9px] text-[#8696a0]">{log.time}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {log.type === 'ai_processed' && (
                        <div className="flex justify-center my-2">
                          <div className="bg-blue-900/20 border border-blue-500/30 rounded-full px-4 py-1.5 flex items-center space-x-2">
                            <Bot className="w-3 h-3 text-blue-400 animate-pulse" />
                            <span className="text-[10px] text-blue-300 font-bold uppercase tracking-tight">{log.message}</span>
                          </div>
                        </div>
                      )}

                      {(log.type === 'outgoing' || log.type === 'ai_processed_response') && (
                        <div className="flex justify-end">
                          <div className={`bg-[#005c4b] rounded-lg rounded-tr-none p-3 max-w-[70%] shadow-sm relative ${log.type === 'ai_processed_response' ? 'border-l-4 border-emerald-400' : ''}`}>
                            {log.type === 'ai_processed_response' && (
                              <div className="flex items-center space-x-2 mb-1">
                                <Bot className="w-3 h-3 text-emerald-300" />
                                <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-tighter">Resposta Autônoma BuildSync</span>
                              </div>
                            )}
                            <p className="text-sm text-[#e9edef] leading-relaxed">{log.message}</p>
                            <div className="flex justify-end items-center mt-1 space-x-1">
                              <span className="text-[9px] text-[#cfdfdb]">{log.time}</span>
                              <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#202c33] flex items-center space-x-4 z-10">
              <Smile className="w-6 h-6 text-[#8696a0] cursor-pointer" />
              <Paperclip className="w-6 h-6 text-[#8696a0] cursor-pointer" />
              <div className="flex-1">
                <input 
                  type="text" 
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  placeholder="Intervir na negociação ou enviar instrução..."
                  className="w-full bg-[#2a3942] rounded-lg py-2.5 px-4 text-sm text-white placeholder-[#8696a0] focus:outline-none"
                />
              </div>
              {typedMessage ? (
                <Send className="w-6 h-6 text-[#8696a0] cursor-pointer" onClick={() => setTypedMessage("")} />
              ) : (
                <Mic className="w-6 h-6 text-[#8696a0] cursor-pointer" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
