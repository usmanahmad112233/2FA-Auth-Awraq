import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from '../UI';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FAQ_ITEMS = [
  {
    q: "What is a 2FA code?",
    a: "**2FA (Two-Factor Authentication)** is an extra layer of security added to your account. After entering your password, you must provide a **2FA verification code** to complete the login or confirm important actions."
  },
  {
    q:"How do I receive a 2FA code?",
    a:"2FA codes can be delivered via:",
    list: [
      "Authentication apps (Google Authenticator, Authy, Microsoft Authenticator, etc.)",
      "SMS messages",
      "Email (less secure)",
      "Physical security keys (less common)"
    ]
  },
  {
    q:"How long is a 2FA code valid?",
    a:"Typically:",
    list: [
      "A 2FA code is valid for **30-60 seconds**",
      "After that, the code **expires automatically**"
    ]
  },
  {
    q:"Why didn't I receive my 2FA code?",
    a:"Common reasons include:",
    list: [
      "Incorrect phone number or email",
      "Poor mobile signal or no internet connection",
      "Authenticator app time not synchronized",
      "Too many requests in a short period",
      "Email filtered into the **Spam/Junk** folder",
      "**👉 Solution:**",
      "Double-check your information, sync your device time, or try again after a few minutes."
    ]
  },
  {
    q:"Can a 2FA code be reused?",
    a:"❌ **No.**",
    list: [
      "Each 2FA code:",
      "Can only be used **once**",
      "Is valid for a **very short time**"
    ]
  },
  {
    q:"Will my 2FA still work if I change my phone?",
    a:"❌ Not automatically.",
    list: [
      "You must:",
      "Transfer your authenticator app to the new device, or",
      "Use **backup/recovery codes**, or",
      "Contact support to reset 2FA after identity verification"
    ]
  },
  {
    q:"What should I do if I lose my 2FA device?",
    a:"You should:",
    list: [
      "Use your **backup/recovery codes**, if available",
      "Contact customer support",
      "Verify your identity to **temporarily disable or reset 2FA**"
    ]
  },
  {
    q:"Why should I enable 2FA?",
    a:"2FA helps:",
    list: [
      "Protect your account even if your password is compromised",
      "Prevent unauthorized access and brute-force attacks",
      "Secure sensitive actions and transactions"
    ]
  },
  {
    q:"Should I share my 2FA code with anyone?",
    a:"❌ **Never.**",
    list: [
      "Support staff will **never** ask for:",
      "Your 2FA code",
      "Your password",
      "Your recovery codes"
    ]
  },
  {
    q:"Can I disable 2FA?",
    a:"Yes, but **it is strongly discouraged.**",
    list: [
      "Disabling 2FA significantly reduces your account security."
    ]
  },
  {
    q:"What's the difference between a password and a 2FA code?",
    a:"**Password vs 2FA Code**",
    list: [
      "Password: Static, long-term use, can be guessed",
      "2FA Code: Changes frequently, short-lived, extremely hard to guess"
    ]
  },
  {
    q:"Should I save my 2FA codes?",
    a:"❌ **No.**",
    list: [
      "Instead, securely store your **backup/recovery codes** in a safe place."
    ]
  }
];

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Helmet>
        <title>FAQs | AuthGuard Pro - 2FA Authenticator Help</title>
        <meta name="description" content="Find answers to common questions about 2FA authentication, OTP codes, security, and AuthGuard Pro. Learn how to protect your account effectively."/>
        <meta name="keywords" content="2FA FAQs, authentication help, OTP questions, AuthGuard Pro support, two factor authentication guide, security questions"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="http://localhost:3000/faqs"/>
      </Helmet>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-slate-500">Everything you need to know about AuthGuard Pro and 2FA.</p>
      </div>

      {FAQ_ITEMS.map((item, idx) => (
        <Card
          key={idx}
          className="cursor-pointer"
          onClick={() => toggleFAQ(idx)}>
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-800 flex items-center gap-3">
              <HelpCircle size={18} className="text-brand-600" />
              {item.q}
            </h4>

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                openIndex === idx ? 'rotate-180 text-brand-600' : 'text-slate-400'
              }`}
            />
          </div>

          {openIndex === idx && (
            <div className="mt-4 text-sm text-slate-1000 leading-relaxed space-y-2">
              
              <ReactMarkdown>{item.a}</ReactMarkdown>
              {item.list && (
                <ul className="ml-5 space-y-1">
                  {item.list.map((point, i) => {
                    const isSolution =
                      point.includes("👉 Solution:") ||
                      item.list[i - 1]?.includes("👉 Solution:");

                    return isSolution ? (
                      <div key={i} className="mt-2 text-slate-700">
                        <ReactMarkdown>{point}</ReactMarkdown>
                      </div>
                    ) : (
                      <li key={i} className="list-disc">
                        <ReactMarkdown>{point}</ReactMarkdown>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};