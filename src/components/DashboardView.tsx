import React from 'react';
import { motion } from 'motion/react';
import { Calendar, FileText, CheckCircle2, AlertCircle, Clock, ExternalLink, TrendingUp, Users } from 'lucide-react';
import { MOCK_BILLS, MOCK_RECORDS } from '../constants';

export default function DashboardView() {
  return (
    <div className="space-y-4 lg:space-y-5">
      {/* Top Banner Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        <div className="p-4 bg-white border border-line rounded-lg shadow-sm">
           <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-1">Active Session</div>
           <div className="text-base lg:text-lg font-bold text-text-main">House of Representatives</div>
           <div className="text-[10px] lg:text-xs font-bold text-accent mt-1">Next Voting: Bill on Agriculture @ 14:00</div>
        </div>
        <div className="p-4 bg-white border border-line rounded-lg shadow-sm">
           <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-1">Language Mode</div>
           <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] lg:text-[11px] font-bold">Nepali</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-text-main text-[10px] lg:text-[11px] font-bold">English</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-text-main text-[10px] lg:text-[11px] font-bold">Nepanglish</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Main Content Info */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-5">
           <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col h-full min-h-[350px] lg:min-h-[400px]">
              <div className="px-4 py-3 bg-slate-50 border-b border-line flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-main">AI Session: Recent Speech Analysis</span>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">● Encrypted</span>
                 </div>
                 <span className="text-[11px] text-text-muted font-medium">Tuesday, 12 May</span>
              </div>
              <div className="flex-1 p-4 lg:p-5 space-y-4 lg:space-y-6 overflow-y-auto">
                 <div className="max-w-[90%] sm:max-w-[85%] self-end ml-auto bg-[#dcf8c6] p-3 rounded-xl rounded-br-none text-sm text-text-main shadow-sm border border-emerald-100">
                   Draft a speech for tomorrow's session regarding the rural electrification project in Karnali. Highlight budget gaps.
                 </div>
                 <div className="max-w-[85%] self-start bg-slate-50 p-4 rounded-xl rounded-bl-none border border-line shadow-sm">
                    <div className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">Samsad AI Assistant</div>
                    <p className="text-sm font-medium">Namaste Hon. Sangam. I have prepared a draft addressing the Karnali electrification gaps.</p>
                    <div className="mt-3 space-y-2">
                        <p className="text-xs font-bold text-text-main italic">Key Points:</p>
                        <ul className="text-xs text-text-muted space-y-1 list-disc pl-4">
                            <li>Only 45% coverage in Karnali (lowest national average).</li>
                            <li>15% budget shortfall in 2025/26 allocation.</li>
                            <li>Proposed amendment: Infrastructure Bond inclusion.</li>
                        </ul>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-text-main rounded-md text-[11px] font-bold transition-colors">Download PDF</button>
                        <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-text-main rounded-md text-[11px] font-bold transition-colors">Translate to English</button>
                    </div>
                 </div>
              </div>
              <div className="p-3 border-t border-line bg-white flex gap-3">
                 <div className="flex-1 bg-slate-50 border border-line rounded-full px-4 py-2 text-sm text-text-muted italic">Type a message or use quick command...</div>
                 <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md">➤</button>
              </div>
           </div>
        </div>

        {/* Secondary Info Column */}
        <div className="space-y-5">
           <div className="p-4 bg-white border border-line rounded-lg shadow-sm">
              <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-3">Legislative Watchlist</div>
              <div className="space-y-3">
                 {MOCK_BILLS.slice(0, 3).map(bill => (
                    <div key={bill.id} className="p-3 bg-slate-50 rounded-lg border border-line group hover:border-primary transition-colors">
                       <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-black text-primary uppercase">{bill.category}</span>
                          <span className="text-[9px] font-bold text-text-muted">{bill.status}</span>
                       </div>
                       <div className="text-xs font-bold text-text-main line-clamp-1">{bill.title}</div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-4 bg-white border border-line rounded-lg shadow-sm">
              <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-3">Upcoming Schedules</div>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-10 h-10 shrink-0 bg-slate-100 rounded flex flex-col items-center justify-center border border-line">
                       <span className="text-sm font-bold text-text-main">12</span>
                       <span className="text-[8px] font-black text-text-muted uppercase">MAY</span>
                    </div>
                    <div>
                       <div className="text-xs font-bold text-text-main">Budget Discussion</div>
                       <div className="text-[10px] text-text-muted">Floor • 13:00</div>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="w-10 h-10 shrink-0 bg-slate-100 rounded flex flex-col items-center justify-center border border-line">
                       <span className="text-sm font-bold text-text-main">15</span>
                       <span className="text-[8px] font-black text-text-muted uppercase">MAY</span>
                    </div>
                    <div>
                       <div className="text-xs font-bold text-text-main">Education Committee</div>
                       <div className="text-[10px] text-text-muted">Hall B • 11:00</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight, MessageCircle, Smartphone } from 'lucide-react';
