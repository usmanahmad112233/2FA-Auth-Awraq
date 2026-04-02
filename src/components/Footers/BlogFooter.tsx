import React from "react";
import { QrCode, Scan, Shield, EyeOff, Key, ShieldCheck, Clock, Smartphone, Lock } from "lucide-react";

const year = new Date().getFullYear();
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

export const BlogFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-xl font-semibold text-white">MyBlog</h2>
          <p className="mt-3 text-sm text-gray-400">
            Sharing knowledge, tutorials, and insights about web development,
            programming, and technology.</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Follow</h3>
          <div className="flex space-x-4 text-sm">
            <a href="https://twitter.com" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://github.com" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {year} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};