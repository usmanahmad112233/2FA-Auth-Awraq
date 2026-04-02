import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { Shield, RefreshCw, Copy, Check, Eye, EyeOff, Lock, Zap, History, Trash2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from "react-helmet-async";

export default function PasswordTools() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<any>(null);
  const [customStrength, setCustomStrength] = useState({ score: 0, percentage: 0, label: '' });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [options, setOptions] = useState({
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('authguard_password_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('authguard_password_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (password) {
      setStrength(zxcvbn(password));
      calculateCustomStrength(password);
    } else {
      setStrength(null);
      setCustomStrength({ score: 0, percentage: 0, label: 'No Password' });
    }
  }, [password]);

  // Custom strength calculation based on your requirements
  const calculateCustomStrength = (pw: string) => {
    let percentage = 0;

    // Rule 1: 12 characters completed = 20%
    if (pw.length >= 8) {
      percentage += 20;
    }

    // Rule 2: Contains 3 uppercase = +20%
    const uppercaseCount = (pw.match(/[A-Z]/g) || []).length;
    if (uppercaseCount >= 1) {
      percentage += 20;
    }

    // Rule 3: Contains 3 lowercase = +20%
    const lowercaseCount = (pw.match(/[a-z]/g) || []).length;
    if (lowercaseCount >= 1) {
      percentage += 20;
    }

    // Rule 4: Contains 3 numbers = +20%
    const numberCount = (pw.match(/[0-9]/g) || []).length;
    if (numberCount >= 1) {
      percentage += 20;
    }

    // Rule 5: Contains 3 symbols = +20%
    const symbolCount = (pw.match(/[^A-Za-z0-9]/g) || []).length;
    if (symbolCount >= 1) {
      percentage += 20;
    }

    // Calculate score (0-4) based on percentage
    let score = 0;
    let label = '';

    if (percentage >= 100) {
      score = 4;
      label = 'Perfect';
    } else if (percentage >= 80) {
      score = 3;
      label = 'Strong';
    } else if (percentage >= 60) {
      score = 2;
      label = 'Fair';
    } else if (percentage >= 40) {
      score = 1;
      label = 'Weak';
    } else if (percentage >= 20) {
      score = 1;
      label = 'Very Weak';
    } else {
      score = 0;
      label = 'Very Weak';
    }

    setCustomStrength({ score, percentage, label });
  };

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) return;

    let result = '';
    for (let i = 0; i < options.length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedPassword(result);
    setHistory(prev => [result, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  const deletePasswordFromHistory = (passwordToDelete: string) => {
    setHistory(prev => prev.filter(pw => pw !== passwordToDelete));
  };

  const customRequirements = [
    { label: 'At least different 6 characters', test: (pw: string) => pw.length >= 6 },
    { label: 'Contains 1 uppercase letters', test: (pw: string) => (pw.match(/[A-Z]/g) || []).length >= 1 },
    { label: 'Contains 1 lowercase letters', test: (pw: string) => (pw.match(/[a-z]/g) || []).length >= 1 },
    { label: 'Contains 1 numbers', test: (pw: string) => (pw.match(/[0-9]/g) || []).length >= 1 },
    { label: 'Contains 1 symbols', test: (pw: string) => (pw.match(/[^A-Za-z0-9]/g) || []).length >= 1 },
  ];

  return (
    <div className="space-y-8">
      {/* <Helmet>
        <title>Password Manager | My App</title>
        <meta
          name="description"
          content="Learn how to enable 2FA on Google, Facebook, Instagram and more using authenticator apps."
        />
      </Helmet> */}
      <Helmet>
  <title>Password Manager & password generator | 2FA Tools</title>
  <meta name="description" content="Generate and check strong passwords using Password Manager and 2FA tools. Keep your accounts safe with custom password rules and history tracking."/>
  <link rel="canonical" href="http://localhost:3000/password-manager"/>
  <meta name="robots" content="index, follow"/>
  <meta name="keywords" content="password manager, 2FA, two-factor authentication, password generator, password strength checker, secure passwords, password history, online security, password tools"/>
</Helmet>
      <h1 className="text-4xl font-bold flex items-center gap-2">Password Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strength Checker */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500"/>Strength Checker</h3>
          
          <div className="space-y-6">
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password to check..."
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-4 pr-12 focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-mono"/>
              <button onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors">
                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button>
            </div>

            {password && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                {/* Custom Strength Meter */}
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Custom Security Score</span>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${customStrength.score >= 3 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {customStrength.label}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">({customStrength.percentage}%)</span>
                    </div>
                  </div>
                  
                  {/* Progress bar for percentage */}
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        customStrength.percentage >= 80 ? 'bg-emerald-500' : 
                        customStrength.percentage >= 60 ? 'bg-blue-500' : 
                        customStrength.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${customStrength.percentage}%` }}
                    />
                  </div>

                  {/* Custom requirements checklist */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] text-slate-500 uppercase font-bold px-1">Custom Security Checklist</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {customRequirements.map((req, i) => {
                        const isMet = req.test(password);
                        return (
                          <div key={i} className="flex items-center gap-2 px-1">
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                              isMet ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}>
                              {isMet && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                            <span className={`text-[11px] font-medium transition-colors ${
                              isMet ? 'text-emerald-600' : 'text-slate-400'
                            }`}>
                              {req.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-500" />Password Generator</h3>

          <div className="space-y-6">
            <div className="relative">
              <div className="w-full bg-slate-100 border-none rounded-xl px-4 py-4 pr-24 min-h-[56px] flex items-center font-mono text-emerald-500 break-all">
                {generatedPassword || 'Click generate...'}
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button onClick={() => copyToClipboard(generatedPassword)} disabled={!generatedPassword}
                  className="p-2 hover:bg-emerald-500/10 rounded-lg text-slate-400 hover:text-emerald-500 transition-all disabled:opacity-30">
                  {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}</button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">Length: {options.length}</span>
                </div>
                <input type="range" min="6" max="20" value={options.length}
                  onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'uppercase', label: 'Uppercase' },
                  { id: 'lowercase', label: 'Lowercase' },
                  { id: 'numbers', label: 'Numbers' },
                  { id: 'symbols', label: 'Symbols' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setOptions({...options, [opt.id]: !options[opt.id as keyof typeof options]})}
                    className={`flex items-center justify-between px-4 py-2 rounded-xl border transition-all ${
                      options[opt.id as keyof typeof options] 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-slate-200 text-slate-500'
                    }`}>
                    <span className="text-xs font-bold uppercase">{opt.label}</span>
                    {options[opt.id as keyof typeof options] && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button onClick={generatePassword}
                className="p-2 bg-emerald-500 rounded-lg text-white hover:bg-emerald-600 transition-all">Generate Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-500"/>Generation History</h3>
          {history.length > 0 && (
            <button onClick={clearHistory}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />Clear History</button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl">
            <p className="text-sm text-slate-400">No passwords generated yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence>
              {history.map((pw, i) => (
                <motion.div 
                  key={`${pw}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-slate-100 p-3 rounded-xl border border-transparent hover:border-emerald-500/30 transition-all">
                  <p className="font-mono text-xs text-slate-600 truncate pr-8">{pw}</p>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button onClick={() => setGeneratedPassword(pw)}
                      className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-500 transition-colors"
                      title="Restore to generator"><RefreshCw className="w-3.5 h-3.5" /></button>
                    <button onClick={() => copyToClipboard(pw)}
                      className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-500 transition-colors"
                      title="Copy to clipboard"><Copy className="w-3.5 h-3.5"/></button>
                      <button onClick={() => deletePasswordFromHistory(pw)}
                        className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-500 transition-colors"
                        title="Delete from history"><Trash2 className="w-3.5 h-3.5"/></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}