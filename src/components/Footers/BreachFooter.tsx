import React from "react";
import { QrCode, Scan, Shield, EyeOff, Key, ShieldCheck, Clock, Smartphone, Database, KeyRound, Lock } from "lucide-react";

type FooterLink = {
  name: string;
  url: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Security Tools",
    links: [
      { name: "Breach Checker", url: "/breach-checker" },
      { name: "Password Manager", url: "/password-manager" },
      { name: "Security Score", url: "/security-score" },
      { name: "2FA Authenticator", url: "/2fa-authenticator" }
    ]
  },
  {
    title: "Account Protection",
    links: [
      { name: "How Data Breaches Happen", url: "/how-data-breaches-happen" },
      { name: "Protect Your Passwords", url: "/password-security-guide" },
      { name: "Enable Two-Factor Authentication", url: "/enable-2fa" },
      { name: "Backup Recovery Codes", url: "/backup-codes" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Security Blog", url: "/blog" },
      { name: "Help Center", url: "/help" },
      { name: "FAQ", url: "/faq" },
      { name: "Contact Support", url: "/contact" }
    ]
  }
];

export const BreachFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
          
        <div className="max-w-7xl mx-auto py-10">
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <ShieldCheck size={22} />2FA Generator
          </div>
  
          <p className="text-gray-400 text-sm mt-3 max-w-3xl leading-relaxed">
            The <strong>2FA Generator</strong> creates secure
            <strong> Time-Based One-Time Passwords (TOTP)</strong> used for
            <strong> Two-Factor Authentication (2FA)</strong>. These authentication
            codes add an extra layer of protection to your online accounts by
            requiring a temporary verification code in addition to your password.
            Use our tool to generate secure codes and protect your accounts from
            unauthorized access.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <Key size={20} />
                <h4 className="font-bold uppercase tracking-wider text-sm">{section.title}</h4>
              </div>
  
              <ul className="space-y-2 text-xs text-gray-300">
                {section.links.map((link, i) => (
                  <li key={i}><a href={link.url}className="hover:text-white transition">{link.name}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-white font-semibold mb-3">Security Benefits</h3>

            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Database size={14}/> Breach Database Monitoring</li>
              <li className="flex items-center gap-2"><Lock size={14}/> Secure Account Protection</li>
              <li className="flex items-center gap-2"><Key size={14}/> Strong Password Practices</li>
            </ul>
          </div>
  
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Clock size={20} />
              <h4 className="font-bold uppercase tracking-wider text-sm">Time Sync</h4>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              TOTP tokens rely on accurate time. If your codes aren't working,
              ensure your device clock is synchronized with network time.
            </p>
          </div>
        </div>
  
        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center text-[10px] font-medium text-gray-400 uppercase tracking-widest">
          <span>AuthGuard TOTP Engine v2.0</span>
          <span>© {year} Secure Auth Systems</span>
        </div>
      </div>
    </footer>
  );
};
