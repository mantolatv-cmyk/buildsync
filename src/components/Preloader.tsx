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
      
      {/* Background Animated SVG Blueprint (Complex Abstract House) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-25 pointer-events-none">
        <svg viewBox="0 0 1200 900" className="w-full h-full text-blue-400" preserveAspectRatio="xMidYMid slice">
          {/* Horizon & Perspective Grid - Expanded */}
          <motion.path 
            d="M0,750 L1200,750 M600,0 L600,900 M0,450 L1200,450 M0,150 L1200,150" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="4 12" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.2 }} 
            transition={{ duration: 2 }} 
          />
          
          {/* Main Structural Block (Larger) */}
          {/* Multi-Level Roof Structure */}
          <motion.path 
            d="M 600 100 L 250 350 L 950 350 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 400 250 L 150 450 L 400 450" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 800 250 L 1050 450 L 800 450" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
          />

          {/* Foundation & Floors (Multi-level) */}
          <motion.path 
            d="M 300 350 L 300 750 M 900 350 L 900 750 M 300 750 L 900 750" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
          />
          
          {/* Intermediate Floor Levels */}
          <motion.path 
            d="M 300 550 L 900 550" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.8"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
          />

          {/* Internal Structural Grid (Columns) */}
          <motion.path 
            d="M 400 350 L 400 750 M 500 350 L 500 750 M 600 350 L 600 750 M 700 350 L 700 750 M 800 350 L 800 750" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }}
          />

          {/* Architectural Details - Window/Door Blocks */}
          <motion.path 
            d="M 350 400 L 450 400 L 450 500 L 350 500 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.3 }}
          />
          <motion.path 
            d="M 750 400 L 850 400 L 850 500 L 750 500 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.4 }}
          />
          <motion.path 
            d="M 550 600 L 650 600 L 650 750 L 550 750" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          />

          {/* Measurement / Reference Lines */}
          <motion.path 
            d="M 200 750 L 200 350 M 180 750 L 220 750 M 180 350 L 220 350" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path 
            d="M 300 800 L 900 800 M 300 780 L 300 820 M 900 780 L 900 820" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.7 }}
          />

          {/* Deep Perspective Lines (Artistic) */}
          <motion.path 
            d="M 0 900 L 300 750 M 1200 900 L 900 750 M 600 100 L 600 0 M 250 350 L 50 350 M 950 350 L 1150 350" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
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
