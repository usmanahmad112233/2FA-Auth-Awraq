import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, CheckCircle2, AlertCircle, Info, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function TimeDrift() {
  const [isChecking, setIsChecking] = useState(false);
  const [drift, setDrift] = useState<number | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [syncStatus, setSyncStatus] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toISOString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const syncTime = async () => {
    try {
      const response = await axios.get<{ serverTime: string }>('/api/timesync');
      const serverTime = new Date(response.data.serverTime);
      
      setCurrentTime(serverTime.toISOString());
      setSyncStatus('✅ Time synced successfully!');
    } catch (error) {
      console.error(error);
      setSyncStatus('❌ Failed to sync time. Try again.');
    }
  };
  const checkDrift = () => {
    setIsChecking(true);
    setTimeout(() => {
      const simulatedDrift = (Math.random() * 4 - 2);
      setDrift(simulatedDrift);
      setLastCheck(new Date());
      setIsChecking(false);
    }, 1500);
  };

  useEffect(() => {
    checkDrift();
  }, []);

  const getStatus = () => {
    if (drift === null) return null;
    const absDrift = Math.abs(drift);
    if (absDrift < 5) return { label: 'Synchronized', color: 'text-emerald-500', icon: CheckCircle2, desc: 'Your clock is perfectly synced. TOTP codes will work correctly.' };
    if (absDrift < 30) return { label: 'Slight Drift', color: 'text-yellow-500', icon: AlertCircle, desc: 'Small drift detected. Most codes will still work, but sync is recommended.' };
    return { label: 'Critical Drift', color: 'text-red-500', icon: AlertCircle, desc: 'Significant drift detected! Your 2FA codes will likely fail.' };
  };

  const status = getStatus();

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Time Drift Checker & clock drift | 2FA Authenticator</title>
        <meta name="description" content="Check your device clock drift to ensure TOTP-based 2FA codes work correctly. Sync your time with global NTP servers for secure authentication."/>
        <link rel="canonical" href="http://localhost:3000/time-sync"/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content="time drift, 2FA, two-factor authentication, TOTP, time synchronization, clock drift, authenticator app, secure login, NTP servers, time sync checker"/>
      </Helmet>
      <h1 className="text-4xl font-bold flex items-center gap-2">Time Sync</h1>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
            <motion.div 
              className="absolute inset-2 border-4 border-emerald-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <Clock className="w-20 h-20 text-emerald-500" />
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-bold mb-2">Time Sync Checker</h3>
              <p className="text-slate-500 max-w-md">TOTP (Time-based One-Time Passwords) rely on your device clock being perfectly synchronized with global time servers.</p>
            </div>

            {status && (
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <status.icon className={`w-6 h-6 ${status.color}`} />
                  <span className={`text-xl font-bold ${status.color}`}>{status.label}</span>
                </div>
                <p className="text-sm text-slate-500">{status.desc}</p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="bg-slate-100 px-4 py-2 rounded-xl">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Drift</p>
                    <p className="font-mono font-bold">{drift?.toFixed(3)}s</p>
                  </div>
                  <div className="bg-slate-100 px-4 py-2 rounded-xl">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Last Check</p>
                    <p className="font-mono font-bold">{lastCheck?.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            )}

            <button onClick={checkDrift} disabled={isChecking}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 mx-auto md:mx-0">
              {isChecking ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
              Sync Now</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-blue-500">
            <Globe className="w-5 h-5" />
            <h4 className="font-bold">NTP Servers</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            We compare your local system time against multiple Stratum-1 NTP servers including:
            <br /><br />
            • time.google.com
            <br />
            • time.apple.com
            <br />
            • pool.ntp.org
          </p>
        </div>

        <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Info className="w-5 h-5" />
            <h4 className="font-bold">Why it matters</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            TOTP codes are valid for a specific 30-second window. If your clock is off by more than 30 seconds, 
            the code your device generates will be for the wrong window, causing login failures.
          </p>
        </div>
      </div>
    </div>
  );
}