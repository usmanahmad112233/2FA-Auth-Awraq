import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Scan, Download, Copy, Check, Info, Camera, RefreshCw } from 'lucide-react';
import { Helmet } from "react-helmet-async";

export default function QRTools() {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  const [qrValue, setQrValue] = useState('otpauth://totp/AuthGuard:User?secret=JBSWY3DPEHPK3PXP&issuer=AuthGuard');
  const [copied, setCopied] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const [accountName, setAccountName] = useState('User');
  const [issuer, setIssuer] = useState('AuthGuard');

  useEffect(() => {
    if (activeTab === 'scan') {
      const scanner = new Html5QrcodeScanner(
        "reader", 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          scanner.clear();
        },
        (error) => {
          console.warn(error);
        }
      );

      return () => {
        scanner.clear().catch(error => console.error("Failed to clear scanner", error));
      };
    }
  }, [activeTab]);

  useEffect(() => {
  if (!secretKey) return;

  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccount = encodeURIComponent(accountName);

  const uri = `otpauth://totp/${encodedIssuer}:${encodedAccount}?secret=${secretKey}&issuer=${encodedIssuer}`;

  setQrValue(uri);
}, [secretKey, accountName, issuer]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "authguard-qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        {/* <title>QR Tools - My Website</title>
        <meta name="description" content="This is the homepage of my React app." /> */}
        <title>QR Code Generator & Scanner | AuthGuard, 2FA Authentication</title>
        <meta name="description" content="Generate and scan QR codes online. Create secure 2FA QR codes, copy URI, download QR images, and scan instantly using your browser."/>
        <meta name="keywords" content="QR code generator, QR scanner, 2FA QR code, otpauth generator, QR tools online, AuthGuard"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="http://localhost:3000/qr-tools"/>
      </Helmet>
      
      <h1 className="text-4xl font-bold flex items-center gap-2">QR Code</h1>
      <div className="flex p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
        <button onClick={() => setActiveTab('generate')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'generate' ? 'bg-white shadow-sm text-emerald-500' : 'text-slate-500 hover:text-slate-700'
          }`}><QrCode className="w-4 h-4"/>Generate QR</button>
        <button onClick={() => setActiveTab('scan')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'scan' ? 'bg-white shadow-sm text-emerald-500' : 'text-slate-500 hover:text-slate-700'
          }`}><Scan className="w-4 h-4"/>Scan QR</button>
      </div>

      {activeTab === 'generate' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold">QR Generator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Secret Key</label>
                <textarea placeholder="Enter your Secret Key here" rows={4} value={secretKey} onChange={(e) => setSecretKey(e.target.value.trim())} className="w-full border rounded p-2"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">QR Content / URI</label>
                <textarea value={qrValue}onChange={(e) => setQrValue(e.target.value)}placeholder="Enter text or otpauth URI..."
                  className="w-full bg-slate-100 border-none rounded-2xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-mono text-sm h-32 resize-none"/>
              </div>
              <div className="flex gap-3">
                <button onClick={copyToClipboard}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}Copy URI</button>
                <button onClick={downloadQR}
                  className="px-3 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"><Download className="w-4 h-4" />Save Image</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
            <div className="bg-white p-4 rounded-3xl shadow-xl">
              <QRCodeSVG id="qr-svg" value={qrValue} size={200} level="H" includeMargin={true}/>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Preview</p>
              <p className="text-xs text-slate-500">Scan this code with any 2FA app</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div id="reader" className="overflow-hidden rounded-2xl border-none bg-slate-100" />
            <div className="mt-8 flex items-center gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <Camera className="w-6 h-6 text-blue-500" />
              <p className="text-xs text-slate-500 leading-relaxed">Position the QR code within the frame to scan. Your browser will request camera permissions.</p>
            </div>
          </div>

          {scanResult && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-emerald-500 flex items-center gap-2"><Check className="w-5 h-5"/>Scan Successful</h4>
                <button onClick={() => setScanResult(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3"/>Scan Again</button>
              </div>
              <div className="bg-white p-4 rounded-xl font-mono text-sm break-all border border-emerald-500/10">
                {scanResult}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(scanResult); alert('Copied to clipboard!'); }}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all">
                Copy Result</button>
            </div>
          )}
        </div>
      )}

      <div className="p-6 bg-slate-100 rounded-2xl flex items-center gap-4">
        <Info className="w-5 h-5 text-slate-400" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <b>Pro Tip:</b> Most 2FA setup codes follow the <code>otpauth://</code> URI scheme. 
          You can generate these manually or scan them from other devices to migrate accounts.
        </p>
      </div>
    </div>
  );
}