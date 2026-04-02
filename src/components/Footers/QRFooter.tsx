import React from "react";
import { Link, Mail, Shield , QrCode, Scan, EyeOff, Key, ShieldCheck, Clock, Smartphone } from "lucide-react";

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
    title: "QR Tools",
    links: [
      { name: "Create QR Code", url: "/create-qr" },
      { name: "QR Code Scanner", url: "/qr-scanner" },
      { name: "WiFi QR Code", url: "/wifi-qr" },
      { name: "URL QR Code Generator", url: "/url-qr" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "How QR Codes Work", url: "/how-qr-works" },
      { name: "QR Code Guide", url: "/guide" },
      { name: "Blog", url: "/blog" },
      { name: "FAQ", url: "/faq" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Contact", url: "/contact" },
      { name: "Privacy Policy", url: "/privacy-policy" },
      { name: "Terms of Service", url: "/terms" }
    ]
  }
];

export const QRFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="max-w-7xl mx-auto py-10">
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            <QrCode size={22}/>QR Code Generator
          </div>

          <p className="text-gray-400 text-sm mt-3 max-w-3xl leading-relaxed">
            Our <strong>QR Code Generator</strong> allows you to quickly create
          free and secure QR codes for URLs, WiFi networks, emails, and more.
          Easily generate and share QR codes for business, marketing,
          and personal use. Fast, reliable, and user-friendly QR code creation
          for modern digital needs.
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
            <h3 className="text-white font-semibold mb-3">Trust & Security</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Shield size={14} /> Safe QR Code Generation</li>
              <li className="flex items-center gap-2"><Link size={14} /> Reliable QR Links</li>
              <li className="flex items-center gap-2"><Mail size={14} /> Fast Sharing Options</li>
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