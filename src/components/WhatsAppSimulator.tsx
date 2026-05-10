import React, { useState, useRef, useEffect } from 'react';
import { Send, User, ChevronLeft, Mic, Paperclip, MoreVertical, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { chatWithSamsad } from '../services/geminiService';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
  timestamp: Date;
}

interface WhatsAppSimulatorProps {
  onAddReminder?: (text: string, time: string) => void;
}

export default function WhatsAppSimulator({ onAddReminder }: WhatsAppSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: "Namaste, Honourable Member. This is Samsad AI, your parliamentary assistant. How can I assist you today?\n\nप्रणाम, माननीय सदस्य। यो संसद् एआई हो। म आज तपाईलाई कसरी सहयोग गर्न सक्छु?" }],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: input }],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: m.parts
    }));

    const responseText = await chatWithSamsad(input, history);
    
    // Parse for reminder tags: [REMINDER: text | time]
    const reminderMatch = responseText.match(/\[REMINDER:\s*(.*?)\s*\|\s*(.*?)\s*\]/);
    if (reminderMatch && onAddReminder) {
      const [_, text, time] = reminderMatch;
      onAddReminder(text, time);
    }

    // Strip tags from visible message
    const cleanText = responseText.replace(/\[REMINDER:.*?\]/g, '').trim();

    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'model',
      parts: [{ text: cleanText }],
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border-x border-slate-200 bg-[#f0f2f5] shadow-2xl overflow-hidden rounded-xl">
      {/* WhatsApp Header */}
      <div className="bg-[#008069] text-white p-4 flex items-center gap-3 shadow-md">
        <Smartphone className="w-5 h-5 opacity-80" />
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
          S
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg leading-tight">Samsad AI (Assistant)</h2>
          <p className="text-[10px] opacity-80 font-mono tracking-widest uppercase">Secured by End-to-End Encryption</p>
        </div>
        <div className="flex gap-4">
          <Paperclip className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100" />
          <MoreVertical className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto whatsapp-bg p-4 flex flex-col gap-2 scroll-smooth" ref={scrollRef}>
        <div className="self-center bg-[#dcf8c6] text-[11px] py-1 px-3 rounded-lg shadow-sm mb-4 uppercase font-medium text-slate-600">
          Today
        </div>
        
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "max-w-[85%] p-3 rounded-xl shadow-sm text-sm relative mb-2",
              m.role === 'user' 
                ? "bg-[#dcf8c6] self-end rounded-tr-none text-slate-800" 
                : "bg-white self-start rounded-tl-none text-slate-800"
            )}
          >
            <div className="prose prose-sm max-w-none prose-slate">
               <ReactMarkdown>{m.parts[0].text}</ReactMarkdown>
            </div>
            <div className="text-[10px] text-right mt-1 opacity-50 font-medium">
              {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white self-start p-3 rounded-xl shadow-sm text-sm italic text-slate-400"
          >
            Samsad AI is typing...
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#f0f2f5] flex items-center gap-2 border-t border-slate-200">
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center shadow-sm">
          <input
            type="text"
            placeholder="Type a message / सन्देश लेख्नुहोस्..."
            className="flex-1 outline-none text-sm py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Mic className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#00a884] items-center justify-center flex rounded-full text-white shadow-md active:scale-95 transition-transform"
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
