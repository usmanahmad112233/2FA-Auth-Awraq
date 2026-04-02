import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPolicy = () => {
  const content = `
**Privacy Policy**

Last Updated: March 3, 2026

At AuthGuard, we take your privacy seriously. This policy explains how we handle your data.

## 1. Data Collection
AuthGuard is designed to be a "privacy-first" application. 
- **Local Storage:** All your 2FA accounts, secret keys, and settings are stored locally on your device using browser LocalStorage. We do not transmit this data to our servers.
- **No Account Required:** You can use all features of AuthGuard without creating an account or providing an email address (except for the Breach Explorer tool which requires an email to check against public databases).

## 2. Breach Explorer
When you use the Breach Explorer, the email address you enter is sent to our backend to query public breach databases. We do not store these email addresses or associate them with your identity.

## 3. Camera Access
The QR Scanner requires camera access. This access is only used locally within your browser to decode QR codes. No video or images are ever uploaded or stored.

## 4. Third-Party Services
We use Google Gemini AI to generate security guides and blog content. No personal data is shared with these services.

## 5. Security
Since your data is stored locally, the security of your 2FA codes depends on the security of your device. We recommend using device-level encryption and screen locks.

## 6. Changes to This Policy
We may update this policy from time to time. Any changes will be reflected on this page.

## Contact Us
If you have questions about this policy, please visit our Contact page.
`;

  return (
    <>
    <Helmet>
      <title>Privacy Policy | AuthGuard Pro - 2FA Authenticator</title>
      <meta name="description" content="Read the Privacy Policy of AuthGuard Pro to understand how your data is handled, stored locally, and protected with privacy-first 2FA security practices."/>
      <meta name="keywords" content="privacy policy, 2FA security, AuthGuard Pro privacy, data protection, authentication security, user privacy"/>
      <meta name="robots" content="index, follow"/>
      <link rel="canonical" href="http://localhost:3000/privacy-policy"/>
    </Helmet>
    <div className="max-w-4xl mx-auto">
      {/* <h1 className="text-3xl font-bold flex p-8 items-center gap-2"><Shield size={35} />Privacy Policy</h1> */}
      <div className="p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <h1 className="text-3xl font-bold flex py-8 items-center gap-2"><Shield size={30} />Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
    </>
  );
};
