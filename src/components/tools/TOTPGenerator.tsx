import React, { useState, useEffect, useRef } from 'react';
import * as OTPAuth from 'otpauth';
import { Key, Plus, Trash2, Copy, Check, RefreshCw, Clock, X, Camera, Upload, Scan, LayoutGrid, Share, Link, Pencil, Save, Info, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Html5Qrcode } from 'html5-qrcode';
import { SavedAccount } from '../../types';
import { Helmet } from "react-helmet-async";

export default function TOTPGenerator() {
  const [secret, setSecret] = useState('');
  const [accountName, setAccountName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [period, setPeriod] = useState<number>(30);
  const [accounts, setAccounts] = useState<SavedAccount[]>([]);
  const [currentOTP, setCurrentOTP] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [showScanMenu, setShowScanMenu] = useState(false);
  const [activeShareLinkId, setActiveShareLinkId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editIssuer, setEditIssuer] = useState('');
  const [editPeriod, setEditPeriod] = useState<number>(30);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('authguard_accounts');
    if (saved) setAccounts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('authguard_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (!secret) {
      setCurrentOTP(null);
      setIsAdding(false);
    }
  }, [secret]);

  useEffect(() => {
    const timer = setInterval(() => {
      const seconds = Math.floor(Date.now() / 1000);
      setTimeLeft(30 - (seconds % 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secret && currentOTP && currentOTP !== 'ERROR') {
      const newOTP = generateOTP(secret, period);
      if (newOTP !== currentOTP) {
        setCurrentOTP(newOTP);
      }
    }
  }, [timeLeft, secret, currentOTP, period]);

  const generateOTP = (secretKey: string, customPeriod?: number) => {
    try {
      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(secretKey.replace(/\s/g, '').toUpperCase()),
        period: customPeriod || 30,
      });
      return totp.generate();
    } catch (e) {
      return 'ERROR';
    }
  };

  const handleGeneratePreview = () => {
    if (!secret) return;
    setCurrentOTP(generateOTP(secret, period));
  };

  const handleAddAccount = () => {
    const cleanSecret = secret.replace(/\s/g, '').toUpperCase();
    if (!cleanSecret || !accountName || currentOTP === 'ERROR') return;

    const newAccount: SavedAccount = {
      id: crypto && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      name: accountName,
      secret: cleanSecret,
      issuer: issuer || undefined,
      period: period || 30
    };
    setAccounts(prev => [...prev, newAccount]);
    handleClear();
  };

  const handleClear = () => {
    setSecret('');
    setAccountName('');
    setIssuer('');
    setPeriod(30);
    setCurrentOTP(null);
    setIsAdding(false);
    setScanError(null);
  };

  const parseOTPAuthURI = (uri: string) => {
    try {
      const url = new URL(uri);
      if (url.protocol !== 'otpauth:') return null;
      
      const label = decodeURIComponent(url.pathname.substring(1));
      const secret = url.searchParams.get('secret');
      const issuer = url.searchParams.get('issuer');
      const period = url.searchParams.get('period');
      
      let account = label;
      let issuerFromLabel = '';
      
      if (label.includes(':')) {
        [issuerFromLabel, account] = label.split(':').map(s => s.trim());
      }
      
      return {
        secret: secret || '',
        account: account,
        issuer: issuer || issuerFromLabel,
        period: period ? parseInt(period) : 30
      };
    } catch (e) {
      return null;
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    const result = parseOTPAuthURI(decodedText);
    if (result) {
      setSecret(result.secret);
      setAccountName(result.account);
      setIssuer(result.issuer);
      setPeriod(result.period);
      setIsScanning(false);
      setScanError(null);
      const otp = generateOTP(result.secret, result.period);
      setCurrentOTP(otp);
      if (scannerRef.current) {
        scannerRef.current.stop();
      }
    } else {
      setScanError("Invalid QR Code. Please scan a valid 2FA setup QR.");
    }
  };

  const startScanner = async () => {
    setIsScanning(true);
    setScanError(null);
    setTimeout(async () => {
      try {
        const html5QrCode = new Html5Qrcode("scanner-container");
        scannerRef.current = html5QrCode;
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          handleScanSuccess,
          () => {}
        );
      } catch (err) {
        setScanError("Could not start camera. Please check permissions.");
        setIsScanning(false);
      }
    }, 100);
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {}
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let container = document.getElementById("file-qr-reader");
    if (!container) {
      container = document.createElement("div");
      container.id = "file-qr-reader";
      container.style.display = "none";
      document.body.appendChild(container);
    }

    const html5QrCode = new Html5Qrcode("file-qr-reader", false);
    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      handleScanSuccess(decodedText);
    } catch (err) {
      setScanError("Could not find a QR code in this image.");
    }
  };

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  const startEditing = (account: SavedAccount) => {
    setEditingId(account.id);
    setEditName(account.name);
    setEditIssuer(account.issuer || '');
    setEditPeriod(account.period || 30);
  };

  const saveEdit = () => {
    if (!editingId || !editName) return;
    setAccounts(accounts.map(a => a.id === editingId ? { ...a, name: editName, issuer: editIssuer || undefined, period: editPeriod } : a
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateShareLink = (secretKey: string, name: string, issuerName?: string, customPeriod?: number) => {
    const cleanSecret = secretKey.replace(/\s/g, '').toUpperCase();
    const encodedName = encodeURIComponent(name);
    const encodedIssuer = issuerName ? encodeURIComponent(issuerName) : '';
    const label = encodedIssuer ? `${encodedIssuer}:${encodedName}` : encodedName;
    let uri = `otpauth://totp/${label}?secret=${cleanSecret}`;
    if (encodedIssuer) uri += `&issuer=${encodedIssuer}`;
    if (customPeriod) uri += `&period=${customPeriod}`;
    return uri;
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>TOTP & OTP Generator | 2FA Authenticator App</title>
        <meta name="description" content="Generate secure Time-based One-Time Passwords (TOTP) for your accounts. Enhance login security using our 2FA authenticator app with TOTP codes."/>
        <link rel="canonical" href="http://localhost:3000/2fa-generator"/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content="TOTP generator, 2FA codes, two-factor authentication, authenticator app, time-based OTP, account security, login protection, digital security"/>
      </Helmet>
      <h1 className="text-4xl font-bold flex items-center gap-2">2FA Generator</h1>
      
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">Secure Your Accounts Instantly with 2FA Authenticator</h2>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden"/>
          <div className="space-y-4">
            <div id="scanner-container" className={`${isScanning ? 'block' : 'hidden'} rounded-xl overflow-hidden bg-black aspect-square mb-4`}/>
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden">
                  <button onClick={stopScanner}
                    className="w-full py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-all mb-4">Cancel Scanning</button>
                </motion.div>
              )}
            </AnimatePresence>

            {scanError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium flex items-center gap-2"><X className="w-4 h-4" />{scanError}</div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">2FA Secret Key</label>
              <textarea placeholder="Enter base32 secret" value={secret} onChange={(e) => setSecret(e.target.value)}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-mono text-sm resize-none" rows={5}/>
            </div>

            <div className="relative">
              <div className="flex flex-wrap justify-end gap-2">
                <button onClick={handleGeneratePreview} disabled={!secret}
                  className="flex-1 sm:flex-none min-w-[140px] bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4"/>OTP Generate</button>

                <button onClick={() => { startScanner(); setShowScanMenu(false); }}
                  className="flex-1 sm:flex-none min-w-[140px] bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"><Camera className="w-4 h-4"/>Camera Scan</button>

                <button onClick={() => { fileInputRef.current?.click(); setShowScanMenu(false); }}
                  className="flex-1 sm:flex-none min-w-[140px] bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"><Upload className="w-4 h-4"/>Upload Image</button>
            </div>
          </div>
            
            {currentOTP && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4">

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-500 mb-1">2FA Secret Key & Current OTP</label>
                  </div>
                  
                  <div className="relative">
                    <textarea readOnly value={secret ? `${secret}|${currentOTP || 'Not generated'}` : ''}
                      className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-mono text-sm resize-none"rows={5}/>
                    
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button onClick={() => copyToClipboard(currentOTP, 'preview-otp')}
                        className="flex items-center justify-center gap-2 px-2.5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all" title="Copy OTP">
                        {copiedId === 'preview-otp' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>

                      {/* Direct Shareable Link */}
                      <button onClick={() => copyToClipboard(generateShareLink(secret, accountName || 'Unnamed', issuer, period), 'preview-link')}
                        className="flex items-center justify-center gap-2 px-2.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium transition-all" title="Copy Shareable Quick Link"> {copiedId === 'preview-link' ? <Check className="w-4 h-4 text-emerald-500" /> : <Link className="w-4 h-4 text-slate-400" />}</button>
                    </div>
                  </div>
                </div>

                {/* Other sections */}
                <div className="space-y-3 pt-2">
                  {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }}animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 px-1 overflow-hidden">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Details (To Save)</p>
                      <div>
                        <input type="text" value={accountName}onChange={(e) => setAccountName(e.target.value)}placeholder="Account Name (e.g. Google)"
                          className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"/>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Issuer</p>
                        <input type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Issuer (Optional)"
                          className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"/>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-1">Period (Seconds)</label>
                        <input type="number" value={period} onChange={(e) => setPeriod(parseInt(e.target.value) || 30)} placeholder="Period (e.g. 30)"
                          className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm font-mono"/>
                      </div>
                    </motion.div>
                  )}

                  {/* Buttons(Cancel and Save Account) */}
                  <div className="flex justify-end gap-3">
                    <button onClick={handleClear}
                      className="bg-slate-200 hover:bg-slate-300 p-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2">Cancel</button>
                    <button onClick={() => {
                      if (!isAdding) { setIsAdding(true); }
                      else { handleAddAccount(); }}}
                      disabled={(isAdding && !accountName) || currentOTP === 'ERROR'} 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2">Save Account</button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">Advantages</h2>
              <ul className="space-y-3">
                {[
                  { icon: Shield, title: "Extra Security", desc: "Protects accounts from hackers." },
                  { icon: Check, title: "Easy Setup", desc: "Quick and simple to use." },
                  { icon: Key, title: "No SMS Needed", desc: "Works safer than text codes." },
                  { icon: RefreshCw, title: "Fast Login", desc: "Instant OTP generation." },
                  { icon: LayoutGrid, title: "Multiple Accounts", desc: "Manage many apps easily." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      {/* Accounts List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Accounts</h3>

        {accounts.length === 0 ? (
          <div className="text-center py-12 bg-slate-100 rounded-2xl border border-dashed border-slate-300 px-6">
            <h3 className="h-12 text-lg font-semibold">No 2FA accounts yet</h3>
            <p className="h-12 text-slate-500 text-sm">Protect your logins by adding your first account for two-factor authentication.</p>
             
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <button onClick={startScanner}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all shadow-sm"><Camera className="w-4 h-4" />Camera Scan</button>
              <button onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-medium transition-all shadow-sm"><Upload className="w-4 h-4 text-emerald-500"/>Upload Image</button>
            </div>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => {
              const otp = generateOTP(account.secret, account.period);
              const accountPeriod = account.period || 30;
              const accountTimeLeft = accountPeriod - (Math.floor(Date.now() / 1000) % accountPeriod);
              
              return (
                <div key={account.id} className="bg-white p-5 rounded-2xl border border-slate-200 group hover:border-emerald-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      {editingId === account.id ? (
                        <div className="space-y-2 pr-4">
                          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Account Name"/>
                          <input type="text" value={editIssuer} onChange={(e) => setEditIssuer(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Issuer (Optional)"/>
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] text-slate-500 uppercase font-bold">Period:</label>
                            <input type="number" value={editPeriod} onChange={(e) => setEditPeriod(parseInt(e.target.value) || 30)}
                              className="w-20 bg-slate-100 border-none rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500 font-mono"/>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-bold text-lg leading-tight">{account.name}</h4>
                          <div className="flex items-center gap-2">
                            {account.issuer && <p className="text-xs text-slate-500">{account.issuer}</p>}
                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 font-mono">{accountPeriod}s</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      {editingId === account.id ? (
                        <>
                          <button onClick={saveEdit}
                            className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all"
                            title="Save Changes"><Save className="w-4 h-4"/></button>
                          <button onClick={cancelEdit}
                            className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"
                            title="Cancel"><X className="w-4 h-4"/></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(account)}
                            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all"
                            title="Edit Account"><Pencil className="w-4 h-4"/></button>
                          <button onClick={() => removeAccount(account.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete Account"><Trash2 className="w-4 h-4"/></button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center justify-between bg-slate-100 p-4 rounded-xl group/code">
                    <span className="text-3xl font-mono font-bold tracking-widest text-emerald-500">{otp}</span>
                    <div className="flex gap-1">
                      <button onClick={() => copyToClipboard(otp, account.id)}
                        className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all"title="Copy OTP">
                        {copiedId === account.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5 text-slate-400 group-hover/code:text-emerald-500 transition-colors" />
                        )}
                      </button>

                      {/* Shareable Quick link Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveShareLinkId(activeShareLinkId === account.id ? null : account.id);
                        }}
                        className={`p-2 rounded-lg transition-all ${activeShareLinkId === account.id ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500'}`}
                        title="Show Share Link">
                        <Share className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Sahreable Quick Link */}
                  <AnimatePresence>
                    {activeShareLinkId === account.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3">
                        <div className="p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2">
                          <input readOnly value={generateShareLink(account.secret, account.name, account.issuer, account.period)}
                            className="flex-1 bg-transparent border-none text-[10px] font-mono text-slate-500 outline-none"
                            onClick={(e) => (e.target as HTMLInputElement).select()}/>
                          <button onClick={(e) => { e.stopPropagation();
                              copyToClipboard(generateShareLink(account.secret, account.name, account.issuer, account.period), `share-${account.id}`);
                            }}
                            className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0" title="Copy Link">
                            {copiedId === `share-${account.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Time Period Line */}
                  <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500" initial={false}
                      animate={{ width: `${(accountTimeLeft / accountPeriod) * 100}%` }}
                      transition={{ duration: 1, ease: "linear" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}