import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, BookOpen, FileText, Download, Share2, ExternalLink } from 'lucide-react';
import { MOCK_BILLS } from '../constants';
import { cn } from '../lib/utils';

export default function LibraryView() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBills = MOCK_BILLS.filter(bill => 
    bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Legislative Library</h1>
        <p className="text-slate-500 mt-2 font-medium">Search and analyze all bills, acts, and parliamentary records of Nepal.</p>
      </div>

      {/* Search Header */}
      <div className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
           <input 
             type="text" 
             placeholder="Search by bill number, title, or keyword..."
             className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-parliament-blue/20 focus:border-parliament-blue transition-all"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
          <Filter className="w-4 h-4" /> Filter Results
        </button>
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBills.map((bill, i) => (
          <motion.div
            key={bill.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-parliament-blue/30 transition-all flex flex-col"
          >
             <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-parliament-blue group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                   <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg bg-slate-50"><Share2 className="w-4 h-4" /></button>
                   <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-lg bg-slate-50"><Download className="w-4 h-4" /></button>
                </div>
             </div>
             
             <div className="flex items-center gap-2 mb-3">
                <span className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider",
                  bill.status === 'Passed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  bill.status === 'Committee' ? "bg-amber-50 text-amber-600 border-amber-100" :
                  "bg-slate-50 text-slate-500 border-slate-200"
                )}>
                  {bill.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bill.category}</span>
             </div>

             <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-parliament-blue transition-colors line-clamp-2">
               {bill.title}
             </h3>
             <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">
               Registered on: {bill.lastUpdated}<br/>
               Section: Legislative Secretariat, Section 4A
             </p>

             <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <button className="text-xs font-black text-parliament-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                  Deep Analyze <ExternalLink className="w-3 h-3" />
                </button>
                <div className="flex -space-x-2">
                   {[1, 2, 3].map(j => (
                     <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 text-[8px] flex items-center justify-center font-bold text-slate-500 uppercase">SB</div>
                   ))}
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {filteredBills.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
           <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <p className="text-slate-500 font-bold">No documents found matching your search. Try broadening your keywords.</p>
        </div>
      )}
    </div>
  );
}
