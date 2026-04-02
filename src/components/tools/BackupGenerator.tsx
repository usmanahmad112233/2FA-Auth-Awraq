import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Download, Copy, Check, Printer, AlertTriangle } from 'lucide-react';
import { Helmet } from "react-helmet-async";

type BackupCode = {
  code: string;
  used: boolean;
};

export default function BackupGenerator() {
  const [codes, setCodes] = useState<BackupCode[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("backup_codes");
    if (saved) {
      setCodes(JSON.parse(saved));
    }
  }, []);

  const saveCodes = (data: BackupCode[]) => {
    setCodes(data);
    localStorage.setItem("backup_codes", JSON.stringify(data));
  };

  const generateSecureCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      const rand = crypto.getRandomValues(new Uint32Array(1))[0] % chars.length;
      code += chars[rand];
    }

    return code.slice(0,4) + "-" + code.slice(4,8);
  };

  const generateCodes = () => {
    if (codes.length > 0) {
      const confirmReset = confirm(
        "Generating new codes will invalidate the previous ones. Continue?"
      );
      if (!confirmReset) return;
    }

    const newCodes: BackupCode[] = Array.from({ length: 10 }, () => ({
      code: generateSecureCode(),
      used: false
    }));

    saveCodes(newCodes);
  };

  const markUsed = (index: number) => {
    const updated = [...codes];
    updated[index].used = true;
    saveCodes(updated);
  };

  const copyAll = () => {
    const text = codes.map(c => c.code).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([codes.map(c => c.code).join("\n")], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = "authguard-backup-codes.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-8">
      {/* <Helmet>
        <title>Backup Codes | My App</title>
        <meta name="description" content="Learn how to enable 2FA on Google, Facebook, Instagram and more using authenticator apps."/>
      </Helmet> */}
      <Helmet>
        <title>Backup Code Generator | AuthGuard Pro 2FA</title>
        <meta name="description" content="Generate secure one-time backup codes for your 2FA accounts. Protect your access with AuthGuard Pro's emergency recovery codes."/>
        <meta name="keywords" content="backup codes, 2FA backup codes, recovery codes, OTP backup, AuthGuard Pro, two factor authentication backup"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="http://localhost:3000/backup-codes"/>
      </Helmet>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-emerald-500"/>Backup Codes</h1>

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-emerald-500/10 w-24 h-24 rounded-3xl flex items-center justify-center">
            <ShieldCheck className="w-12 h-12 text-emerald-500"/>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold">Emergency Backup Codes</h3>
            <p className="text-slate-500 text-sm max-w-xl">
              Backup codes allow access to your account if your authenticator
              device is unavailable. Each code works only once.
            </p>
          </div>

          <button
            onClick={generateCodes}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2">
            <RefreshCw className="w-5 h-5"/>Generate Codes</button>
        </div>

        {codes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Codes List */}
            <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                {codes.map((item, i) => (

                <div key={i}
                  className={`p-4 rounded-xl flex items-center justify-between 
                  ${item.used ? "bg-red-100 text-red-400 line-through" : "bg-slate-100"}`}>
                  <span className="font-mono font-bold tracking-widest">{item.code}</span>

                  {!item.used && (
                    <button onClick={() => markUsed(i)}className="text-xs text-emerald-600 font-bold">Use</button>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button onClick={copyAll}
                className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
                {copied ? <Check className="w-4 h-4 text-emerald-500"/> : <Copy className="w-4 h-4"/>}Copy</button>

              <button
                onClick={downloadCodes}
                className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
                <Download className="w-4 h-4"/>Download</button>

              <button onClick={() => window.print()}
                className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold"><Printer className="w-4 h-4"/>Print</button>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-6">
            <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <AlertTriangle className="w-5 h-5"/>
                <span className="font-bold text-sm">Security Warning</span>
              </div>

              <p className="text-xs text-slate-600">
                Generating a new set will invalidate previous backup codes.
                Never share these codes with anyone.
              </p>
            </div>

            <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <h5 className="font-bold text-sm text-blue-500 mb-3">Best Practices</h5>

              <ul className="space-y-2 text-xs text-slate-600">
                <li>• Store in a physical safe</li>
                <li>• Save inside a password manager</li>
                <li>• Mark codes after using them</li>
                <li>• Regenerate if exposed</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (

        <div className="text-center py-24 bg-slate-100 rounded-3xl border border-dashed border-slate-300">
          <ShieldCheck className="w-16 h-16 text-slate-300 mx-auto mb-4"/>
          <h4 className="text-xl font-bold text-slate-400">No Backup Codes Yet</h4>
          <p className="text-sm text-slate-500">Generate a secure set of backup codes for emergency account access.</p>
        </div>
      )}
    </div>
  );
}