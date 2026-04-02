import React from 'react';
import { BookOpen, Smartphone, Shield, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";

export default function Guides() {
  const guides = [
    {
      title: "How to Enable 2FA",
      icon: Shield,
      color: "text-emerald-500",
      steps: [
        "Go to your account security settings",
        "Select 'Two-Factor Authentication' or '2FA'",
        "Choose 'Authenticator App' as your method",
        "Scan the QR code with AuthGuard",
        "Enter the 6-digit code to verify"
      ]
    },
    {
      title: "App Transfer Guide",
      icon: Smartphone,
      color: "text-blue-500",
      steps: [
        "Open AuthGuard on your old device",
        "Export your accounts or view secret keys",
        "Install AuthGuard on your new device",
        "Manually add accounts using secret keys",
        "Verify codes work on the new device before deleting"
      ]
    },
    {
      title: "Recovery Best Practices",
      icon: Key,
      color: "text-orange-500",
      steps: [
        "Generate backup codes immediately after setup",
        "Print codes and store in a physical safe",
        "Never store codes on your primary device",
        "Set up a secondary 2FA method if possible",
        "Update your recovery phone number regularly"
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* <Helmet>
        <title>Guidance | My App</title>
        <meta name="description" content="Learn how to enable 2FA on Google, Facebook, Instagram and more using authenticator apps."/>
      </Helmet> */}
      <Helmet>
        <title>2FA Authenticator Guides | Enable 2FA & Security Best Practices</title>
        <meta name="description" content="Step-by-step guides to enable 2FA, and follow recovery best practices. Protect your accounts with industry-standard authenticator app security."/>
        <link rel="canonical" href="http://localhost:3000/guides"/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content="2FA guide, two-factor authentication, authenticator app, security guides, account protection, recovery codes, app transfer, digital security best practices"/>
      </Helmet>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Security Guides</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Master your digital security with our step-by-step instructions and industry best practices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className={`${guide.color} bg-current/10 w-14 h-14 rounded-2xl flex items-center justify-center`}>
                <guide.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold">{guide.title}</h4>
            </div>
            <div className="space-y-4 flex-1">
              {guide.steps.map((step, si) => (
                <div key={si} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400">{si + 1}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <button className={`mt-8 flex items-center gap-2 text-sm font-bold ${guide.color} hover:gap-3 transition-all`}>Read Full Article <ArrowRight className="w-4 h-4"/></button>
          </div>
        ))}
      </div>

      <div className="bg-emerald-500 p-10 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-3xl font-bold">Ready to secure your life?</h4>
            <p className="opacity-90 max-w-md">Download our comprehensive security checklist and start protecting your digital identity today.</p>
          </div>
          <button className="bg-white text-emerald-500 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all shrink-0">Download PDF Checklist</button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
