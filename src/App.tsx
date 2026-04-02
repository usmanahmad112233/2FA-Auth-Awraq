import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Key, QrCode, Lock, Activity, AlertTriangle, FileText, BookOpen, Clock, Menu, X, ShieldCheck, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// import { PlatformInstructions } from './components/tools/PlatformInstructions';
import TOTPGenerator from './components/tools/TOTPGenerator';
import PasswordTools from './components/tools/PasswordTools';
import QRTools from './components/tools/QRTools';
import SecurityScore from './components/tools/SecurityScore';
import BreachChecker from './components/tools/BreachChecker';
import BackupGenerator from './components/tools/BackupGenerator';
import TimeDrift from './components/tools/TimeDrift';
import HowToEnable from './components/tools/HowToEnable';
import Guides from './components/Guides';
import Blogs from './components/BlogSection';
import { PrivacyPolicy } from './components/info/PrivacyPolicy';
import { Terms } from './components/info/Terms';
import { AboutUs } from './components/info/AboutUs';
import ContactUs from './components/info/ContactUs';
import { FAQs } from './components/info/FAQs';
import { BreachFooter } from './components/Footers/BreachFooter';
import { BackupFooter } from './components/Footers/BackupFooter';
import { PasswordFooter } from './components/Footers/PasswordFooter';
import { TOTPFooter } from './components/Footers/TOTPFooter';
import { QRFooter } from './components/Footers/QRFooter';
import { SecurityFooter } from './components/Footers/SecurityFooter';
import { LegalFooter } from './components/Footers/LegalFooter';
import { AboutFooter } from './components/Footers/AboutFooter';
import { ContactFooter } from './components/Footers/ContactFooter';
import { FAQFooter } from './components/Footers/FAQFooter';
import { DefaultFooter } from './components/Footers/DefaultFooter';
import { GuidesFooter } from './components/Footers/GuidesFooter';
import { BlogFooter } from './components/Footers/BlogFooter';
import { TimeSyncFooter } from './components/Footers/TimeSyncFooter';
import { EnableFooter } from './components/Footers/EnableFooter';

const allTools = [
  { path: '/2fa-generator', icon: Key, label: '2FA Generator' },
  { path: '/how-to-enable', icon: Shield, label: 'How to Enable' },
  { path: '/qr-tools', icon: QrCode, label: 'QR Generator' },
  { path: '/password-manager', icon: Lock, label: 'Password Manager' },
  { path: '/security-score', icon: Activity, label: 'Security Score' },
  { path: '/breach-checker', icon: AlertTriangle, label: 'Breach Checker' },
  { path: '/guides', icon: BookOpen, label: 'Guides' },
  { path: '/security-blog', icon: FileText, label: 'Blog' },
  { path: '/backup-codes', icon: ShieldCheck, label: 'Backup Codes' },
  { path: '/time-sync', icon: Clock, label: 'Time Sync' },
//   { path: '/contact', icon: Mail, label: 'Contact' },
];

const companyItems = [
  { path: '/about-us', icon: Shield, label: 'About Us' },
  { path: '/faqs', icon: BookOpen, label: 'FAQs' },
  { path: '/contact-us', icon: Mail, label: 'Contact Us' },
  { path: '/privacy-policy', icon: FileText, label: 'Privacy Policy' },
  { path: '/terms', icon: FileText, label: 'Terms & Conditions' },
  // { path: '/PlatformInstructions', icon: Shield, label: 'PlatformInstructions' }
];

function Layout() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const location  = useLocation();
  const navigate  = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    if (!navContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      
      let count = Math.floor(width / 150);
      if (count < 1) count = 1;
      if (count > allTools.length) count = allTools.length;
      
      setVisibleCount(count);
    });

    observer.observe(navContainerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const go = (path: string) => { navigate(path); };

  const visibleTools = allTools.slice(0, visibleCount);
  const overflowTools = allTools.slice(visibleCount);
  
  const isOverflowActive = overflowTools.some(i => i.path === location.pathname) || 
                          companyItems.some(i => i.path === location.pathname);

  const renderFooter = () => {
    switch (location.pathname) {
    //   case '/':
      case '/2fa-generator': return <TOTPFooter />;
      case '/how-to-enable': return <EnableFooter />;
      case '/qr-tools': return <QRFooter />;
      case '/security-score': return <SecurityFooter />;
      case '/breach-checker': return <BreachFooter />;
      case '/backup-codes': return <BackupFooter />;
      case '/password-manager': return <PasswordFooter />;
      case '/privacy-policy':
      case '/terms': return <LegalFooter />;
      case '/about-us': return <AboutFooter />;
      case '/contact-us': return <ContactFooter />;
      case '/faqs': return <FAQFooter />;
      case '/guides': return <GuidesFooter />;
      case '/security-blog': return <BlogFooter />;
      case '/time-sync': return <TimeSyncFooter />;
      // case '/PlatformInstructions': return <PlatformInstructions/>;
      default: return <DefaultFooter />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 bg-white sticky top-0 z-40 gap-8">
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => go('/')}>
          <div className="bg-emerald-500 p-2 rounded-xl">
            <Shield className="w-5 h-5 text-black"/>
          </div>
          <span className="font-bold text-lg">AuthGuard</span>
        </div>

        <nav ref={navContainerRef} className="hidden lg:flex flex-1 items-center gap-4 justify-center">
          {visibleTools.map(item => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => go(item.path)}
                className={`flex items-center gap-1.5 text-sm py-1.5 px-3 rounded-lg whitespace-nowrap transition-all
                  ${active ? 'bg-emerald-500/10 text-black font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
                <item.icon className="w-4 h-4 shrink-0"/>{item.label}</button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(o => !o)}
              className={`flex items-center gap-1.5 text-sm py-1.5 px-3 rounded-lg transition-all border
                ${dropdownOpen || isOverflowActive ? 'bg-emerald-500 text-black border-emerald-500' : 'text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
              <Menu className="w-4 h-4"/>More
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden max-h-[80vh] overflow-y-auto">
                  {overflowTools.length > 0 && (
                    <div>
                      <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">More Tools</p>
                      {overflowTools.map(item => {
                        const active = location.pathname === item.path;
                        return (
                          <button key={item.path} onClick={() => go(item.path)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors
                              ${active ? 'bg-emerald-50 text-black font-medium' : 'text-black hover:bg-slate-50'}`}>
                            <item.icon className="w-4 h-4 shrink-0"/> {item.label}</button>
                        );
                      })}
                    </div>
                  )}

                  <div>
                    <p className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Company</p>
                    {companyItems.map(item => {
                      const active = location.pathname === item.path;
                      return (
                        <button key={item.path} onClick={() => go(item.path)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors
                            ${active ? 'bg-emerald-50 text-black font-medium' : 'text-black hover:bg-slate-50'}`}>
                          <item.icon className="w-4 h-4 shrink-0"/> {item.label}</button>
                      );
                    })}
                  </div>
                  <div className="h-2"/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-all" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b overflow-hidden z-30">
            <div className="px-4 py-3 space-y-1">
              <p className="px-2 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Tools</p>
              {allTools.map(item => {
                const active = location.pathname === item.path;
                return (
                  <button key={item.path} onClick={() => go(item.path)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
                      ${active ? 'bg-emerald-500/10 text-black font-medium' : 'text-black hover:bg-slate-100'}`}>
                    <item.icon className="w-4 h-4 shrink-0"/>{item.label}
                  </button>
                );
              })}

              <p className="px-2 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Company</p>
              {companyItems.map(item => {
                const active = location.pathname === item.path;
                return (
                  <button key={item.path} onClick={() => go(item.path)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
                      ${active ? 'bg-emerald-500/10 text-black font-medium' : 'text-black hover:bg-slate-100'}`}>
                    <item.icon className="w-4 h-4 shrink-0"/>{item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <Routes>
                <Route path="/" element={<TOTPGenerator/>}/>
                <Route path="/2fa-generator" element={<TOTPGenerator/>}/>
                <Route path="/how-to-enable" element={<HowToEnable/>}/>
                <Route path="/qr-tools" element={<QRTools/>}/>
                <Route path="/password-manager" element={<PasswordTools/>}/>
                <Route path="/security-score" element={<SecurityScore/>}/>
                <Route path="/breach-checker" element={<BreachChecker/>}/>
                <Route path="/backup-codes" element={<BackupGenerator/>}/>
                <Route path="/time-sync" element={<TimeDrift/>}/>
                <Route path="/guides" element={<Guides/>}/>
                <Route path="/security-blog" element={<Blogs/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/terms" element={<Terms/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route path="/faqs" element={<FAQs/>}/>
                {/* <Route path="/platform-instructions" element={<PlatformInstructions/>}/> */}
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        {renderFooter()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}