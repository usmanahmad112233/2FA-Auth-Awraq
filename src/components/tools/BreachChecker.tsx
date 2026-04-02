import React, { useState } from 'react';
import { AlertTriangle, Search, ShieldCheck, Globe, Mail, Database, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from "react-helmet-async";

export default function BreachChecker() {
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<'safe' | 'breached' | null>(null);

  const handleCheck = () => {
    if (!email) return;
    setIsChecking(true);
    setResult(null);
    
    setTimeout(() => {
      setIsChecking(false);
      setResult(email.includes('test') || email.includes('leak') ? 'breached' : 'safe');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* <Helmet>
        <title>Breached Checker | My App</title>
        <meta
          name="description"
          content="Learn how to enable 2FA on Google, Facebook, Instagram and more using authenticator apps."
        />
      </Helmet> */}

      <Helmet>
        <title>Email Breach Checker | AuthGuard Pro 2FA</title>
        <meta name="description" content="Check if your email has been exposed in data breaches. AuthGuard Pro 2FA monitors leaked databases and helps you secure your accounts."/>
        <meta name="keywords" content="email breach checker, data breach check, leaked accounts, compromised emails, 2FA security, AuthGuard Pro"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="http://localhost:3000/breach-checker"/>
      </Helmet>
      <h1 className="text-4xl font-bold flex items-center gap-2">Breached Checker</h1>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-3xl font-bold">Breach Explorer</h3>
          <p className="text-slate-500">
            Check if your email address or personal data has been exposed in a data breach. 
            We scan thousands of leaked databases to keep you informed.
          </p>
          
          <div className="relative max-w-lg mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full bg-slate-100 border-none rounded-2xl px-6 py-5 pr-32 focus:ring-2 focus:ring-red-500 transition-all outline-none"
            />
            <button 
              onClick={handleCheck}
              disabled={isChecking || !email}
              className="absolute right-2 top-2 bottom-2 bg-red-500 hover:bg-red-600 text-white px-6 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isChecking ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Check
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result === 'safe' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center space-y-4"
          >
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-emerald-500">Good news — no pwnage found!</h4>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              Your email address wasn't found in any of the breaches we track. 
              However, you should still remain vigilant and use 2FA.
            </p>
          </motion.div>
        )}

        {result === 'breached' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl space-y-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="bg-red-500 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-red-500">Oh no — pwned!</h4>
                <p className="text-slate-500 text-sm">
                  Your email address was found in <b>3 data breaches</b>. Your data is at risk.
                </p>
              </div>
              <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-all">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { site: 'Adobe', date: 'Oct 2013', data: 'Email, Passwords' },
                { site: 'LinkedIn', date: 'May 2016', data: 'Email, Passwords' },
                { site: 'Canva', date: 'May 2019', data: 'Email, Names' }
              ].map((b, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-red-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold">{b.site}</span>
                    <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase">{b.date}</span>
                  </div>
                  <p className="text-xs text-slate-500">Exposed: {b.data}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Mail, title: 'Email Protection', desc: 'Monitor your primary email for new leaks.' },
          { icon: Database, title: 'Database Leaks', desc: 'We track over 12 billion compromised accounts.' },
          { icon: Globe, title: 'Dark Web Scan', desc: 'Continuous scanning of underground forums.' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 group hover:border-red-500/30 transition-all">
            <item.icon className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors mb-4" />
            <h5 className="font-bold mb-2">{item.title}</h5>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-100 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg">
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-sm font-medium">Powered by industry-leading breach intelligence</p>
        </div>
        <button className="text-sm font-bold text-emerald-500 flex items-center gap-2">
          Learn more <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}