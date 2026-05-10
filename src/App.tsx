/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import LibraryView from './components/LibraryView';
import SpeechLab from './components/SpeechLab';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, HelpCircle, Menu, X, Clock, AlertCircle } from 'lucide-react';
import { cn } from './lib/utils';
import { Reminder } from './constants';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', text: 'Constituent Meeting: Tinkune Road', time: new Date(Date.now() + 3600000).toISOString(), completed: false, notified: false }
  ]);
  const [activeNotification, setActiveNotification] = useState<Reminder | null>(null);

  // Reminder Checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setReminders(prev => {
        let changed = false;
        const next = prev.map(r => {
          if (!r.notified && !r.completed) {
            const rTime = new Date(r.time);
            if (rTime <= now) {
              setActiveNotification(r);
              confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
              changed = true;
              return { ...r, notified: true };
            }
          }
          return r;
        });
        return changed ? next : prev;
      });
    }, 10000); // Check every 10s

    return () => clearInterval(interval);
  }, []);

  const addReminder = (text: string, timeStr: string) => {
    let targetTime = new Date();
    
    // Simple HH:mm parsing for today
    if (timeStr.includes(':')) {
        const [h, m] = timeStr.split(':').map(n => parseInt(n));
        if (!isNaN(h) && !isNaN(m)) {
            targetTime.setHours(h, m, 0, 0);
            // If it already passed today, set for tomorrow
            if (targetTime < new Date()) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
        }
    }
    
    const newR: Reminder = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      time: targetTime.toISOString(),
      completed: false,
      notified: false
    };
    setReminders(prev => [...prev, newR]);
  };

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView key="dashboard" />;
      case 'simulator': return <WhatsAppSimulator key="simulator" onAddReminder={addReminder} />;
      case 'library': return <LibraryView key="library" />;
      case 'speech': return <SpeechLab key="speech" />;
      case 'reminders': return (
        <div className="space-y-6">
           <div className="flex justify-between items-end">
              <div>
                 <h1 className="text-3xl font-black text-text-main tracking-tight">Task Reminders</h1>
                 <p className="text-sm text-text-muted font-medium">Automatic schedule generated from your parliamentary assistant chat.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
             {reminders.map(r => (
               <motion.div 
                 key={r.id} 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={cn(
                   "p-5 bg-white border border-line rounded-xl flex flex-col justify-between shadow-sm",
                   r.completed && "opacity-50 grayscale"
                 )}
               >
                 <div className="flex items-start gap-4 mb-4">
                    <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0", 
                        r.notified ? "bg-accent/10 text-accent animate-pulse" : "bg-primary/10 text-primary"
                    )}>
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-text-main leading-tight truncate">{r.text}</p>
                        <p className="text-[10px] uppercase font-black text-text-muted mt-1 tracking-widest">
                           {new Date(r.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(r.time).toLocaleDateString()}
                        </p>
                    </div>
                 </div>
                 <div className="flex gap-2 mt-2">
                    <button 
                        onClick={() => setReminders(prev => prev.map(x => x.id === r.id ? { ...x, completed: !x.completed } : x))}
                        className="flex-1 py-2 text-[10px] font-black uppercase bg-slate-50 text-text-muted rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-line/20"
                    >
                        {r.completed ? 'Reopen' : 'Task Complete'}
                    </button>
                    <button 
                        onClick={() => setReminders(prev => prev.filter(x => x.id !== r.id))}
                        className="px-3 py-2 text-[10px] font-black uppercase bg-slate-50 text-accent/60 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors border border-line/20"
                    >
                        Remove
                    </button>
                 </div>
               </motion.div>
             ))}
             
             {reminders.length === 0 && (
                <div className="lg:col-span-3 py-20 text-center bg-slate-50 border-2 border-dashed border-line rounded-3xl">
                   <Clock className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                   <p className="text-text-muted font-bold">No active reminders. Ask Samsad AI to remind you of something!</p>
                </div>
             )}
           </div>
        </div>
      );
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
    <div className="flex h-screen bg-bg-app font-sans selection:bg-primary selection:text-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar activeTab={activeTab} setActiveTab={(id) => { setActiveTab(id); setIsSidebarOpen(false); }} />
      </div>

      {/* Global Notification Alert */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-full max-w-sm px-4"
          >
            <div className="bg-primary text-white p-5 rounded-2xl shadow-2xl border-4 border-accent flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce shadow-lg ring-4 ring-white/20">
                <Bell className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Samsad AI Alert</p>
                <p className="font-bold text-sm leading-tight mt-0.5">{activeNotification.text}</p>
              </div>
              <button 
                onClick={() => setActiveNotification(null)}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-primary text-white border-b-4 border-accent flex items-center justify-between px-4 lg:px-6 z-10 shrink-0">
          <div className="flex items-center gap-3 lg:gap-4 flex-1">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
             >
               {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
             <div className="flex items-center gap-2">
                <span className="font-extrabold text-base lg:text-lg tracking-widest uppercase truncate max-w-[120px] lg:max-w-none">Samsad AI</span>
                <span className="opacity-60 text-[10px] font-bold border-l border-white/20 pl-2 uppercase tracking-widest hidden sm:inline-block">Parliamentary Assistant</span>
             </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6">
             <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold leading-none">Hon. Sangam P.</span>
                <span className="text-[10px] opacity-70 font-medium mt-1">District 4 | MP</span>
             </div>
             <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold border-2 border-white/40 shadow-inner text-xs lg:text-sm shrink-0">
                SP
             </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Dynamic Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-5 custom-scrollbar bg-[#f8fafc]">
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

