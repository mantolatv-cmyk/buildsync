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
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
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

          {/* LEFT SIDE: Technical Floor Plan (Planta) */}
          <g transform="translate(100, 200) scale(0.8)">
            {/* Main Walls */}
            <motion.path 
              d="M 50,50 L 350,50 L 350,350 L 50,350 Z M 150,50 L 150,200 L 350,200"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Internal Doors/Details */}
            <motion.path 
              d="M 50,150 L 120,150 M 200,350 L 200,280 M 350,250 L 280,250"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* Measurement Lines */}
            <motion.path 
              d="M 30,50 L 30,350 M 20,50 L 40,50 M 20,350 L 40,350 M 50,370 L 350,370 M 50,360 L 50,380 M 350,360 L 350,380"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.text x="0" y="200" fill="currentColor" fontSize="10" className="font-mono opacity-40" style={{ rotate: -90 }}>32.45m</motion.text>
            <motion.text x="180" y="400" fill="currentColor" fontSize="10" className="font-mono opacity-40">48.12m</motion.text>
          </g>

          {/* RIGHT SIDE: Skyscraper Structure (Prédio) */}
          <g transform="translate(850, 100) scale(0.9)">
            {/* Main Building Frame */}
            <motion.path 
              d="M 50,700 L 50,100 L 200,50 L 200,700"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Floors / Windows */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.path 
                key={i}
                d={`M 50,${150 + i*60} L 200,${150 + i*60}`}
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.2, delay: 0.5 + i*0.1 }}
              />
            ))}
            {/* Crane / Construction Detail */}
            <motion.path 
              d="M 200,150 L 350,150 L 300,100 M 320,150 L 320,300"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
            <motion.circle cx="320" cy="300" r="3" fill="currentColor" className="opacity-60" />
          </g>
          
          {/* Main Central Structure (Existing House) */}
          <g transform="translate(0, 0)">
            <motion.path 
              d="M 600 150 L 350 400 L 850 400 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 400 400 L 400 750 L 800 750 L 800 400" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 400 550 L 800 550 M 400 650 L 800 650" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </g>

          {/* Deep Perspective Lines (Artistic) */}
          <motion.path 
            d="M 0 900 L 400 750 M 1200 900 L 800 750 M 600 150 L 600 0" 
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
