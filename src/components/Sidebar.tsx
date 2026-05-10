import React from 'react';
import { Calendar, FileText, LayoutDashboard, MessageCircle, BookOpen, Users, Bell, Search, Menu, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'simulator', label: 'Samsad AI (WhatsApp)', icon: MessageCircle },
  { id: 'speech', label: 'Speech Lab', icon: FileText },
  { id: 'library', label: 'Legislative Library', icon: BookOpen },
  { id: 'constituents', label: 'Constituent Portal', icon: Users },
  { id: 'calendar', label: 'Session Calendar', icon: Calendar },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-72 lg:w-60 h-screen bg-white text-text-muted flex flex-col border-r border-line relative z-20 shrink-0">
      <div className="p-6 lg:p-4 py-8 lg:py-6">
        <div className="flex items-center justify-between mb-8 lg:hidden">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <Smartphone className="text-white w-5 h-5" />
                </div>
                <span className="font-extrabold text-primary uppercase tracking-tighter">SAMSAD AI</span>
            </div>
        </div>

        <label className="text-[10px] font-black uppercase text-text-muted tracking-[0.1em] mb-4 block">Core Services</label>
        
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group text-left",
                activeTab === item.id 
                  ? "bg-slate-100 text-primary font-bold shadow-sm" 
                  : "hover:bg-slate-50 hover:text-text-main"
              )}
            >
              <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-primary" : "text-text-muted group-hover:text-text-main")} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-line">
        <div className="text-[10px] font-black uppercase text-text-muted tracking-widest mb-2">System Status</div>
        <div className="flex items-center gap-2 text-xs font-bold text-text-main">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Secure (WhatsApp API)
        </div>
        <div className="text-[11px] text-text-muted mt-3 font-medium">Version 1.0 Draft - May 2026</div>
      </div>
    </div>
  );
}

// Fixed import in the file itself (using lucide-react Smartphone)
import { Smartphone } from 'lucide-react';
