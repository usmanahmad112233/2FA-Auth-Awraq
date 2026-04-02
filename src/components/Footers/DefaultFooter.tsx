import React from "react";
import { Shield } from "lucide-react";

export const DefaultFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 text-slate-400 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-600 font-bold">
          <Shield size={18} className="text-emerald-500" />
          AuthGuard
        </div>
        <div className="text-xs font-medium uppercase tracking-widest">
          © {year} AuthGuard Security • All Rights Reserved
        </div>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-tighter">
          <a href="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="/contact-us" className="hover:text-slate-900 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};
