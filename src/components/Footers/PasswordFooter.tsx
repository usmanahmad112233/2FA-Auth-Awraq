import React from "react";
import { QrCode, Scan, Shield, EyeOff, Key, ShieldCheck, Clock, Smartphone, Lock, HelpCircle } from "lucide-react";

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
    title: "Password Tools",
    links: [
      { name: "Password Generator", url: "/password-generator" },
      { name: "Password Vault", url: "/password-vault" },
      { name: "Secure Notes", url: "/secure-notes" },
      { name: "Import Passwords", url: "/import-passwords" },
    ],
  },
  {
    title: "Security",
    links: [
      { name: "How Password Managers Work", url: "/how-password-manager-works" },
      { name: "Encryption & Security", url: "/security" },
      { name: "Privacy Policy", url: "/privacy-policy" },
      { name: "Terms of Service", url: "/terms" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Password Security Guide", url: "/guide" },
      { name: "Security Blog", url: "/blog" },
      { name: "FAQ", url: "/faq" },
      { name: "Contact Support", url: "/contact" },
    ],
  },
];
export const PasswordFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="max-w-7xl mx-auto py-10">
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <Lock size={22}/>Password Manager
          </div>

          <p className="text-gray-400 text-sm mt-3 max-w-3xl leading-relaxed">
            Our <strong>Password Manager</strong> helps you securely store,
          manage, and protect your passwords in an encrypted vault. Generate
          strong passwords, organize login credentials, and keep your accounts
          safe with advanced <strong>encryption and security tools</strong>.
          Access your passwords quickly while maintaining maximum protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Dynamic Sections from Code1 */}
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
          <h3 className="text-white font-semibold mb-3">Trust & Protection</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><ShieldCheck size={14} /> Secure Password Storage</li>
            <li className="flex items-center gap-2"><Key size={14} /> Strong Password Encryption</li>
            <li className="flex items-center gap-2"><HelpCircle size={14} /> Easy Password Management</li>
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
