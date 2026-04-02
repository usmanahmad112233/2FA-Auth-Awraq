import React, { useState } from 'react';
import { Shield, CheckCircle2, AlertCircle, Info, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from "react-helmet-async";

export default function SecurityScore() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  
  const questions = [
    { id: 1, text: "Do you use a unique password for every account?", weight: 25 },
    { id: 2, text: "Is 2FA enabled on your primary email account?", weight: 25 },
    { id: 3, text: "Do you use a password manager?", weight: 20 },
    { id: 4, text: "Have you checked your accounts for recent breaches?", weight: 15 },
    { id: 5, text: "Do you keep your recovery codes in a safe place?", weight: 15 },
  ];

  const score = questions.reduce((acc, q) => acc + (answers[q.id] ? q.weight : 0), 0);

  const getStatus = () => {
    if (score >= 80) return { label: 'Excellent', color: 'text-emerald-500', bg: 'bg-emerald-500' };
    if (score >= 50) return { label: 'Moderate', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { label: 'Critical', color: 'text-red-500', bg: 'bg-red-500' };
  };

  const status = getStatus();

  return (
    <div className="space-y-8">
      {/* <Helmet>
        <title>Security Score | My App</title>
        <meta
          name="description" content="Learn how to enable 2FA on Google, Facebook, Instagram and more using authenticator apps."
        />
      </Helmet> */}
      <Helmet>
        <title>Security Score & Password Manager | My App</title>
        <meta name="description" content="Evaluate your account security and improve your 2FA setup. Use our Security Score tool to follow best practices and protect your online accounts."/>
        <link rel="canonical" href="http://localhost:3000/security-score"/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content="security score, 2FA, two-factor authentication, account security, password management, online security, security checklist, cybersecurity, secure accounts"/>
      </Helmet>
      <h1 className="text-4xl font-bold flex items-center gap-2">Account Security</h1>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-48 h-48 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-100"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={553}
                initial={{ strokeDashoffset: 553 }}
                animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={status.color}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${status.color}`}>{score}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Score</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-bold">Your Security Posture</h3>
            <p className="text-slate-500 max-w-md">
              Based on your current habits, your security score is <span className={`font-bold ${status.color}`}>{status.label}</span>. 
              Follow the checklist below to improve your protection.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${status.bg} text-white`}>
                <Activity className="w-4 h-4" />
                {status.label} Status
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2 px-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Security Checklist
          </h4>
          <div className="space-y-2">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => setAnswers({ ...answers, [q.id]: !answers[q.id] })}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  answers[q.id] 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500/30'
                }`}
              >
                <span className="text-sm font-medium text-left">{q.text}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[q.id] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                }`}>
                  {answers[q.id] && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2 px-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Recommendations
          </h4>
          <div className="space-y-4">
            {questions.filter(q => !answers[q.id]).map((q) => (
              <div key={q.id} className="p-5 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex gap-4">
                <div className="bg-orange-500/10 p-2 rounded-lg h-fit">
                  <Info className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h5 className="font-bold text-sm mb-1">Improvement Needed</h5>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {q.text.replace('Do you', 'Start using').replace('Is', 'Enable').replace('?', '.')} This significantly reduces risk of unauthorized access.
                  </p>
                  <button className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:gap-2 transition-all">
                    Learn how <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            {Object.keys(answers).length === questions.length && score === 100 && (
              <div className="p-12 text-center bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-3xl">
                <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h5 className="font-bold text-emerald-500">Maximum Security!</h5>
                <p className="text-xs text-slate-500">You are following all best practices. Keep it up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}








// SecurityDashboard.tsx
// import React, { useState } from 'react';
// import { Card, Button, Input } from '../UI';
// import { ShieldCheck, Clock, Key, Link as LinkIcon, RefreshCw, Check, Copy,  AlertTriangle,  ArrowRight,  Smartphone, History} from 'lucide-react';
// import { motion } from 'motion/react';
// import { cn } from '../../utils/cn';


// export const SecurityDashboard = () => {
//   const [score, setScore] = useState(85);
//   const [timeDrift, setTimeDrift] = useState<number | null>(null);
//   const [isCheckingTime, setIsCheckingTime] = useState(false);
//   const [quickLink, setQuickLink] = useState('');
//   const [generatedLink, setGeneratedLink] = useState('');
//   const [backupCodes, setBackupCodes] = useState<string[]>([]);

//   const checkTimeDrift = () => {
//     setIsCheckingTime(true);
//     setTimeout(() => {
//       setTimeDrift(Math.random() * 0.5);
//       setIsCheckingTime(false);
//     }, 1500);
//   };

//   const generateQuickLink = () => {
//     if (!quickLink) return;
//     setGeneratedLink(`https://authguard.pro/q/${Math.random().toString(36).substring(7)}`);
//   };

//   const generateBackupCodes = () => {
//     const codes = Array.from({ length: 8 }, () => 
//       Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
//       Math.random().toString(36).substring(2, 6).toUpperCase()
//     );
//     setBackupCodes(codes);
//   };

//   return (
//     <div className="space-y-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Security Score */}
//         <Card className="lg:col-span-2">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h3 className="text-xl font-bold text-slate-900">Security Health Score</h3>
//               <p className="text-sm text-slate-500">Overall protection level of your accounts</p>
//             </div>
//             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
//               <ShieldCheck size={14} />
//               Excellent
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row items-center gap-12">
//             <div className="relative w-48 h-48">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <circle
//                   className="text-slate-100 stroke-current"
//                   strokeWidth="8"
//                   fill="transparent"
//                   r="40"
//                   cx="50"
//                   cy="50"
//                 />
//                 <motion.circle
//                   className="text-brand-600 stroke-current"
//                   strokeWidth="8"
//                   strokeLinecap="round"
//                   fill="transparent"
//                   r="40"
//                   cx="50"
//                   cy="50"
//                   initial={{ strokeDasharray: "0 251.2" }}
//                   animate={{ strokeDasharray: `${(score / 100) * 251.2} 251.2` }}
//                   transition={{ duration: 1.5, ease: "easeOut" }}
//                   style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className="text-4xl font-black text-slate-900">{score}</span>
//                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
//               </div>
//             </div>

//             <div className="flex-1 space-y-4 w-full">
//               {[
//                 { label: '2FA Enabled', status: 'Secure', color: 'text-emerald-600' },
//                 { label: 'Password Strength', status: 'Strong', color: 'text-emerald-600' },
//                 { label: 'Recent Breaches', status: 'None Found', color: 'text-emerald-600' },
//                 { label: 'Backup Codes', status: 'Not Generated', color: 'text-amber-600' },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
//                   <span className="text-sm font-medium text-slate-700">{item.label}</span>
//                   <span className={cn("text-xs font-bold", item.color)}>{item.status}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Time Drift Checker */}
//         <Card title="Time Sync Status" description="Ensure your device time matches the server">
//           <div className="flex flex-col items-center justify-center py-6 text-center">
//             <div className={cn(
//               "p-4 rounded-full mb-4 transition-colors",
//               timeDrift === null ? "bg-slate-100 text-slate-400" : "bg-emerald-100 text-emerald-600"
//             )}>
//               <Clock size={32} />
//             </div>
//             {timeDrift === null ? (
//               <p className="text-sm text-slate-500 mb-6">Device time has not been verified yet.</p>
//             ) : (
//               <div className="mb-6">
//                 <p className="text-2xl font-bold text-slate-900">-{timeDrift.toFixed(2)}s</p>
//                 <p className="text-xs text-emerald-600 font-bold">Synchronized</p>
//               </div>
//             )}
//             <Button 
//               onClick={checkTimeDrift} 
//               disabled={isCheckingTime}
//               className="w-full gap-2"
//             >
//               {isCheckingTime ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
//               Verify Sync
//             </Button>
//           </div>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Quick Link Generator */}
//         <Card title="Quick Link Generator" description="Create secure, temporary links for setup">
//           <div className="space-y-4">
//             <div className="flex gap-2">
//               <Input 
//                 placeholder="Enter destination URL..." 
//                 value={quickLink}
//                 onChange={(e) => setQuickLink(e.target.value)}
//               />
//               <Button onClick={generateQuickLink}>Generate</Button>
//             </div>
//             {generatedLink && (
//               <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 flex items-center justify-between">
//                 <code className="text-xs text-brand-700 font-mono truncate mr-4">{generatedLink}</code>
//                 <button 
//                   onClick={() => navigator.clipboard.writeText(generatedLink)}
//                   className="p-2 text-brand-600 hover:bg-brand-100 rounded-lg transition-colors"
//                 >
//                   <Copy size={16} />
//                 </button>
//               </div>
//             )}
//             <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
//               <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
//               <p className="text-[11px] text-amber-800 leading-relaxed">
//                 Quick links expire after 24 hours or after the first successful access. Use them only for initial setup.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Backup Code Generator */}
//         <Card title="Backup Codes" description="Emergency access when 2FA is unavailable">
//           <div className="space-y-4">
//             {backupCodes.length > 0 ? (
//               <div className="grid grid-cols-2 gap-2">
//                 {backupCodes.map((code, i) => (
//                   <div key={i} className="p-2 bg-slate-50 rounded-lg text-center font-mono text-xs text-slate-700 border border-slate-100">
//                     {code}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
//                 <Smartphone className="mx-auto text-slate-300 mb-2" size={32} />
//                 <p className="text-xs text-slate-500">No backup codes generated yet.</p>
//               </div>
//             )}
//             <div className="flex gap-2">
//               <Button onClick={generateBackupCodes} className="flex-1 gap-2">
//                 <RefreshCw size={16} />
//                 {backupCodes.length > 0 ? 'Regenerate' : 'Generate Codes'}
//               </Button>
//               {backupCodes.length > 0 && (
//                 <Button variant="outline" className="px-3">
//                   <Copy size={16} />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       </div>
//     </div>
//   );
// };