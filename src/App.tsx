/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import LibraryView from './components/LibraryView';
import SpeechLab from './components/SpeechLab';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView key="dashboard" />;
      case 'simulator': return <WhatsAppSimulator key="simulator" />;
      case 'library': return <LibraryView key="library" />;
      case 'speech': return <SpeechLab key="speech" />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-text-muted space-y-4">
           <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
              <span className="text-4xl">🏗️</span>
           </div>
           <div className="text-center">
              <h2 className="text-2xl font-black text-text-main tracking-tight">Feature in Progress</h2>
              <p className="text-sm font-medium">The {activeTab} module is currently being optimized for parliamentary deployment.</p>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-bg-app font-sans selection:bg-primary selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-primary text-white border-b-4 border-accent flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
             <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-widest uppercase">Samsad AI</span>
                <span className="opacity-60 text-[10px] font-bold border-l border-white/20 pl-2 uppercase tracking-widest">Parliamentary Assistant</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold leading-none">Hon. Sangam P.</span>
                <span className="text-[10px] opacity-70 font-medium mt-1">District 4 | Member of Parliament</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold border-2 border-white/40 shadow-inner">
                SP
             </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Dynamic Content */}
          <main className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#f8fafc]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* High Density Stats Sidebar (Only on Dashboard) */}
          {activeTab === 'dashboard' && (
            <aside className="w-[300px] bg-white border-l border-line flex flex-col shrink-0 overflow-y-auto p-4 gap-4 hidden xl:flex">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-[10px] font-black uppercase text-accent tracking-widest mb-1">Urgent Action</div>
                    <div className="text-sm font-bold text-slate-900">Committee Meeting Rescheduled</div>
                    <div className="text-[11px] text-slate-500 mt-1">Room 4, Secretariat @ 15:30 today</div>
                </div>

                <div className="p-4 border border-line rounded-lg">
                    <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-1">Constituent Sentiment</div>
                    <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-text-main">82%</div>
                        <div className="text-xs font-mono text-emerald-600">+4.2% ↑</div>
                    </div>
                    <div className="h-1 bg-line mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                </div>

                <div className="p-4 border border-line rounded-lg flex-1">
                    <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-3">Pending Documents</div>
                    <div className="space-y-4">
                        <div className="border-l-2 border-primary pl-3 py-1">
                            <div className="text-xs font-mono font-bold text-text-main">ACT-2026-04.pdf</div>
                            <div className="text-[10px] text-text-muted">Impact Analysis Ready</div>
                        </div>
                        <div className="border-l-2 border-slate-300 pl-3 py-1">
                            <div className="text-xs font-mono font-bold text-text-main">SPEECH_MAY13.docx</div>
                            <div className="text-[10px] text-text-muted">Drafting in Progress</div>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-primary text-white rounded-lg">
                    <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Support Hotkey</div>
                    <div className="text-sm font-bold">Voice Command Enabled</div>
                    <div className="text-[10px] opacity-70 mt-2">Press and hold spacebar to talk directly to Assistant</div>
                </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

