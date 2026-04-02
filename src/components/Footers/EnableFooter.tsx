import React from "react";
import { ShieldCheck, KeyRound, Clock, Lock, BookOpen } from "lucide-react";

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
    title: "2FA Guides",
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

export const EnableFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 mt-16">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 text-white text-xl font-semibold">
          <ShieldCheck size={22} />
          2FA Generator
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

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-white font-semibold mb-3">{section.title}</h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, i) => (
                <li key={i}><a href={link.url}className="hover:text-white transition duration-200">{link.name}</a></li>
              ))}
            </ul>
          </div>
        ))}

        {/* Security Benefits Section */}
        <div>
          <h3 className="text-white font-semibold mb-3">Security Benefits</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Lock size={14} /> Strong Account Protection</li>
            <li className="flex items-center gap-2"><KeyRound size={14} /> Secure One-Time Passwords</li>
            <li className="flex items-center gap-2"><Clock size={14} /> Time-Based Authentication Codes</li>
            <li className="flex items-center gap-2"><BookOpen size={14} /> Easy Step-by-Step Guide</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 text-center text-gray-500 text-sm py-4 px-6">
        © {year} 2FA Generator. Generate secure TOTP authentication codes and
        protect your accounts with two-factor authentication.
      </div>
    </footer>
  );
};