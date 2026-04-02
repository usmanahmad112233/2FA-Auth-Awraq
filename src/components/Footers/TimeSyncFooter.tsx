import React from "react";
import { Clock, ShieldCheck, KeyRound, RefreshCw } from "lucide-react";

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
      { name: "Backup Codes", url: "/backup-codes" },
      { name: "Password Manager", url: "/password-manager" },
      { name: "Security Score", url: "/security-score" }
    ]
  },
  {
    title: "Authentication Help",
    links: [
      { name: "Fix Time Sync Issues", url: "/time-sync" },
      { name: "How TOTP Codes Work", url: "/totp-guide" },
      { name: "Enable Two-Factor Authentication", url: "/enable-2fa" },
      { name: "Recover Authenticator Access", url: "/recover-2fa" }
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

export const TimeSyncFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 text-white text-xl font-semibold">
          <Clock size={22}/>Time Sync for Authenticator
        </div>

        <p className="text-gray-400 text-sm mt-3 max-w-3xl leading-relaxed">
          If your authentication codes are not working, the issue may be caused by
          incorrect device time. Our <strong>Time Sync tool</strong> helps ensure
          your device clock matches the correct server time used for
          <strong> Time-based One-Time Passwords (TOTP)</strong>. Keeping your
          device time synchronized ensures your
          <strong> two-factor authentication codes</strong> generate correctly
          and keeps your accounts secure.
        </p>
      </div>

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

        <div>
          <h3 className="text-white font-semibold mb-3">Security Benefits</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><RefreshCw size={14} /> Accurate Time Synchronization</li>
            <li className="flex items-center gap-2"><KeyRound size={14} /> Correct TOTP Code Generation</li>
            <li className="flex items-center gap-2"><ShieldCheck size={14} /> Strong Account Protection</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-gray-500 text-sm py-4 px-6">
        © {year} Time Sync Tool. Fix authenticator time issues and ensure
        accurate two-factor authentication codes.
      </div>
    </footer>
  );
};
