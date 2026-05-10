import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Wand2, Languages, Save, Copy, RotateCcw, Check } from 'lucide-react';
import { chatWithSamsad } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

export default function SpeechLab() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('both');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSpeech = async () => {
    if (!topic) return;
    setIsGenerating(true);
    
    const prompt = `Draft a parliamentary speech about: ${topic}. 
    Tone: ${tone}. 
    Language requested: ${language}.
    Include key talking points, relevant constitutional references if possible, and a professional opening/closing.`;
    
    const response = await chatWithSamsad(prompt, []);
    setDraft(response);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Speech Lab</h1>
        <p className="text-slate-500 mt-2 font-medium">Craft compelling parliamentary interventions with AI assistance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Speech Topic</label>
                 <textarea 
                   placeholder="e.g. Impact of climate change on Nepal's agriculture sector..."
                   className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-parliament-blue/20 transition-all text-sm resize-none"
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Primary Tone</label>
                 <div className="grid grid-cols-2 gap-2">
                    {['Formal', 'Urgent', 'Inspiring', 'Critical'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setTone(t.toLowerCase())}
                        className={cn(
                          "py-2 px-3 rounded-xl border text-xs font-bold transition-all",
                          tone === t.toLowerCase() ? "bg-parliament-blue text-white border-parliament-blue shadow-lg shadow-parliament-blue/20" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase text-slate-400 tracking-wider">Language Selection</label>
                 <div className="flex gap-2">
                    {[
                      { id: 'both', label: 'Mixed (NP/EN)' },
                      { id: 'nepali', label: 'नेपाली मात्र' },
                      { id: 'english', label: 'English Only' }
                    ].map(l => (
                      <button 
                        key={l.id}
                        onClick={() => setLanguage(l.id)}
                        className={cn(
                          "flex-1 py-3 px-2 rounded-xl border text-[10px] font-black uppercase transition-all flex flex-col items-center justify-center gap-1",
                          language === l.id ? "bg-parliament-red text-white border-parliament-red" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        )}
                      >
                         {language === l.id && <Check className="w-3 h-3" />}
                         {l.label}
                      </button>
                    ))}
                 </div>
              </div>

              <button 
                onClick={generateSpeech}
                disabled={isGenerating || !topic}
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-900/10"
              >
                {isGenerating ? (
                  <>
                    <RotateCcw className="w-5 h-5 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Draft Intervention
                  </>
                )}
              </button>
           </div>
           
           <div className="p-6 bg-parliament-blue/5 border border-parliament-blue/10 rounded-[2rem] flex items-start gap-4">
              <Languages className="w-6 h-6 text-parliament-blue shrink-0 mt-1" />
              <div>
                 <h4 className="font-bold text-parliament-blue text-sm uppercase tracking-tight">Pro Tip</h4>
                 <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">Specify "Minute Intervention" or "Zero Hour Speech" for targeted drafting that fits parliamentary time limits.</p>
              </div>
           </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] flex-1 flex flex-col shadow-sm overflow-hidden">
             <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-xs font-black uppercase text-slate-400 tracking-widest">AI Generated Draft</span>
                </div>
                {draft && (
                  <div className="flex items-center gap-2">
                     <button onClick={copyToClipboard} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                     </button>
                     <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <Save className="w-5 h-5" />
                     </button>
                  </div>
                )}
             </div>
             
             <div className="flex-1 p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]">
                {draft ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-slate max-w-none font-medium leading-[2] text-slate-800 selection:bg-parliament-red/20"
                  >
                    <ReactMarkdown>{draft}</ReactMarkdown>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
                     <div className="w-24 h-24 border-4 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center">
                        <FileText className="w-10 h-10 opacity-20" />
                     </div>
                     <p className="font-bold uppercase tracking-widest text-[10px]">Your speech draft will appear here</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
