import React from 'react';
import { ShieldCheck, Key, Lock, HelpCircle } from "lucide-react";

type FooterLink = {
  name: string;
  url: string;
};

type BackupFooter = {
  title: string;
  links: FooterLink[];
};

const BackupFooters: BackupFooter[] = [
  {
    title: "Security Tools",
    links: [
      { name: "Generate Backup Codes", url: "/backup-codes-generator" },
      { name: "2FA Authenticator", url: "/2fa-authenticator" },
      { name: "QR Code Generator", url: "/qr-generator" },
      { name: "Password Manager", url: "/password-manager" }
    ]
  },
  {
    title: "Authentication",
    links: [
      { name: "How Backup Codes Work", url: "/how-backup-codes-work" },
      { name: "Two-Factor Authentication Guide", url: "/2fa-guide" },
      { name: "Security Best Practices", url: "/security" },
      { name: "Privacy Policy", url: "/privacy-policy" }
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

export const BackupFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 w-full">
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

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {BackupFooters.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-3">{section.title}</h3>

              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}><a href={link.url}className="hover:text-white transition duration-200">{link.name}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-white font-semibold mb-3">Security Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Key size={14} /> One-Time Recovery Codes</li>
              <li className="flex items-center gap-2"><Lock size={14} /> Strong Account Protection</li>
              <li className="flex items-center gap-2"><HelpCircle size={14} /> Easy Recovery Process</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm py-4 px-6">
          © {year} Backup Codes Security. Protect your accounts with
          secure recovery codes and two-factor authentication.
        </div>
      </div>
      </div>
    </footer>
  );
};
