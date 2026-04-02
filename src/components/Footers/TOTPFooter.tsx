import React from "react";
import { Key, ShieldCheck, Clock, Smartphone } from "lucide-react";

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
      { name: "2FA Authenticator", url: "/2fa-authenticator" },
      { name: "Backup Codes Generator", url: "/backup-codes" },
      { name: "Password Manager", url: "/password-manager" },
      { name: "Security Score Checker", url: "/security-score" }
    ]
  },
  {
    title: "Authentication Guides",
    links: [
      { name: "How 2FA Works", url: "/how-2fa-works" },
      { name: "Enable Two-Factor Authentication", url: "/enable-2fa" },
      { name: "Fix Time Sync Issues", url: "/time-sync" },
      { name: "Recover 2FA Access", url: "/recover-2fa" }
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

export const TOTPFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto py-10">
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <ShieldCheck size={22}/>2FA Generator
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