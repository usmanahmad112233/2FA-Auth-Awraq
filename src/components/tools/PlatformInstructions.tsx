import React from 'react';
import { Card } from '../UI';
import { Laptop, Smartphone, Globe, ArrowRight, ExternalLink } from 'lucide-react';

export const PlatformInstructions = () => {
  const platforms = [
    {
      name: "Google / Gmail",
      icon: Globe,
      color: "text-blue-600 bg-blue-50",
      path: "Security > 2-Step Verification > Authenticator app",
      url: "https://myaccount.google.com/security"
    },
    {
      name: "Facebook / Meta",
      icon: Smartphone,
      color: "text-indigo-600 bg-indigo-50",
      path: "Settings > Security and Login > Use two-factor authentication",
      url: "https://facebook.com/settings?tab=security"
    },
    {
      name: "Microsoft / Outlook",
      icon: Laptop,
      color: "text-sky-600 bg-sky-50",
      path: "Security > Advanced security options > Two-step verification",
      url: "https://account.microsoft.com/security"
    },
    {
      name: "GitHub",
      icon: Laptop,
      color: "text-slate-900 bg-slate-100",
      path: "Settings > Password and authentication > Two-factor authentication",
      url: "https://github.com/settings/security"
    }
  ];

  return (
    <div className="space-y-8">
      <Card title="Platform Instructions" description="Step-by-step setup for popular online services">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {platforms.map((platform, i) => (
            <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-brand-300 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${platform.color} rounded-xl flex items-center justify-center`}>
                  <platform.icon size={20} />
                </div>
                <a href={platform.url} target="_blank" rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">
                  <ExternalLink size={18} /></a>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{platform.name}</h4>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Setup Path</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {platform.path}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
        <h4 className="font-bold text-slate-900 mb-2">Can't find your service?</h4>
        <p className="text-sm text-slate-500 mb-4">Most services follow a similar pattern. Look for "Security" or "Privacy" in your account settings.</p>
        <button className="text-brand-600 font-bold text-sm flex items-center gap-2 mx-auto hover:gap-3 transition-all">Request a new guide<ArrowRight size={16} /></button>
      </div>
    </div>
  );
};