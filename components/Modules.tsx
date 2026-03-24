'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code2, Users, BarChart3, ArrowRight } from 'lucide-react';

const modules = [
  { 
    name: "Aibiz™", 
    desc: "Strategic enterprise automation for scale and efficiency.",
    icon: <BarChart3 className="text-blue-400" size={24} />,
    color: "from-blue-500/20"
  },
  { 
    name: "AiOffice™", 
    desc: "Next-gen workspace orchestration for high-performance teams.",
    icon: <Box className="text-purple-400" size={24} />,
    color: "from-purple-500/20"
  },
  { 
    name: "AiDesk™", 
    desc: "Intelligent customer experience and autonomous resolution.",
    icon: <Users className="text-cyan-400" size={24} />,
    color: "from-cyan-500/20"
  },
  { 
    name: "Aisales™", 
    desc: "Predictive revenue pipelines and conversion optimization.",
    icon: <Code2 className="text-indigo-400" size={24} />,
    color: "from-indigo-500/20"
  }
];

export default function Modules() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden" id="modules">
      {/* 🔮 Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* 📝 Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/3 pt-4"
          >
            <span className="text-blue-500 text-xs font-black uppercase tracking-[0.4em] mb-6 block">
              Execution Layer
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
              Intelligent <br />
              <span className="text-white/40">Performance.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              A distributed network of AI agents designed to handle the complexity of modern business operations with zero latency.
            </p>
            
            <motion.button 
              whileHover={{ x: 10 }}
              className="text-white font-bold flex items-center gap-3 group"
            >
              System Documentation <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* 🃏 Card Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {modules.map((mod, i) => (
              <ModuleCard key={i} mod={mod} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ mod, index }: { mod: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl overflow-hidden cursor-pointer hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
    >
      {/* Card Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-12 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
          {mod.icon}
        </div>
        
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
          {mod.name}
        </h3>
        
        <p className="text-white/40 group-hover:text-white/60 transition-colors duration-500 leading-relaxed">
          {mod.desc}
        </p>

        {/* Hover Arrow */}
        <div className="mt-8 flex justify-end">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Subtle Bottom Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
