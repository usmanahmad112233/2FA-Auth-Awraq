import React from "react";
import { QrCode, Scan, Shield, EyeOff, Key, ShieldCheck, Clock, Smartphone, KeyRound, BarChart3, Lock } from "lucide-react";

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
      { name: "Security Score Checker", url: "/security-score" },
      { name: "Password Manager", url: "/password-manager" },
      { name: "2FA Authenticator", url: "/2fa-authenticator" },
      { name: "Backup Codes Generator", url: "/backup-codes" }
    ]
  },
  {
    title: "Account Protection",
    links: [
      { name: "How Security Score Works", url: "/how-security-score-works" },
      { name: "Improve Your Security Score", url: "/improve-security-score" },
      { name: "Password Strength Guide", url: "/password-security-guide" },
      { name: "Enable Two-Factor Authentication", url: "/enable-2fa" }
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

export const SecurityFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto py-10">
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <ShieldCheck size={22}/>Security Score
          </div>

          <p className="text-gray-400 text-sm mt-3 max-w-3xl leading-relaxed">
          Check your <strong>Security Score</strong> to understand how well your
          accounts are protected. A security score analyzes your password strength,
          authentication settings, and security practices. Improve your score by
          enabling <strong>two-factor authentication (2FA)</strong>, using strong
          passwords, and managing your credentials securely with a password manager.
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

          {/* Static Sections from Code2 */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-3">Security Benefits</h3>
            <ul className="space-y-2 text-sm" >
              <li className="flex items-center gap-2"><Lock size={14} />Strong Password Protection</li>
              <li className="flex items-center gap-2"><KeyRound size={14}/>Two-Factor Authentication Support</li>
              <li className="flex items-center gap-2"><BarChart3 size={14}/> Security Score Monitoring</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center text-[10px] font-medium text-gray-400 uppercase tracking-widest">
          <span>AuthGuard TOTP Engine v2.0</span>
        </div>
      </div>
    </footer>
  );
};
