"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Activity } from "lucide-react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Estabelecendo conexão segura...");

  useEffect(() => {
    // Animate progress to 100% over ~2.5s
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increments of 2% every 50ms = 2.5s total
      });
    }, 50);

    // Change text sequence
    const textTimeouts = [
      setTimeout(() => setLoadingText("Sincronizando portfólio de obras..."), 800),
      setTimeout(() => setLoadingText("Calculando DRE dinâmico e KPIs..."), 1600),
      setTimeout(() => setLoadingText("Iniciando BuildSync..."), 2200)
    ];

    return () => {
      clearInterval(progressInterval);
      textTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      key="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
    >
      <div className="absolute inset-0 bg-blue-500/5 blur-[120px] pointer-events-none z-0" />
      
      {/* Background Animated SVG Blueprint (Abstract House) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <svg viewBox="0 0 1000 800" className="w-full h-full max-w-5xl text-blue-400" preserveAspectRatio="xMidYMid slice">
          {/* Horizon & Perspective Grid */}
          <motion.path 
            d="M0,600 L1000,600 M500,0 L500,800 M0,400 L1000,400" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="4 8" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.3 }} 
            transition={{ duration: 2 }} 
          />
          
          {/* Architectural Lines - Abstract Roof */}
          <motion.path 
            d="M 500 200 L 300 400 L 700 400 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 500 150 L 250 400 L 750 400 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Architectural Lines - Walls & Foundation */}
          <motion.path 
            d="M 350 400 L 350 600 M 650 400 L 650 600 M 350 600 L 650 600" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Dynamic Growth Lines (Columns/Beams) */}
          <motion.path 
            d="M 400 400 L 400 600 M 450 400 L 450 600 M 550 400 L 550 600 M 600 400 L 600 600" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          />

          {/* Abstract Perspective / Extension Lines */}
          <motion.path 
            d="M 100 700 L 350 600 M 900 700 L 650 600 M 500 200 L 500 50 M 300 400 L 100 400 M 700 400 L 900 400" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Central Icon */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center mb-8"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
        <div className="w-20 h-20 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent" />
          <Building2 className="w-8 h-8 text-blue-400 mb-1" />
          <Activity className="w-4 h-4 text-blue-300 absolute bottom-3 right-3" />
        </div>
      </motion.div>

      {/* Brand Name */}
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-white tracking-widest mb-12"
      >
        BUILDSYNC
      </motion.h1>

      {/* Loader Wrapper */}
      <div className="w-64 flex flex-col items-center relative z-10">
        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-slate-800 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Loading Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs font-medium text-slate-500 tracking-wide uppercase"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
