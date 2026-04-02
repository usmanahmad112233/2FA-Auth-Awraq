import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const Terms = () => {
  const content = `


**Effective Date: March 3, 2026**

By using AuthGuard, you agree to the following terms. Please read them carefully.

**1. Acceptance of Terms**
By creating an account, making a purchase, or otherwise using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
If you do not agree to these terms, please do not use our services.

**2. Description of Service**
AuthGuard provides security tools including TOTP generation, password auditing, and breach checking. The service is provided "as is" and "as available."

**3. User Responsibility**
- **Data Backup:** You are solely responsible for backing up your 2FA secret keys and backup codes. If you clear your browser data or lose your device, AuthGuard cannot recover your accounts.
- **Security:** You are responsible for maintaining the security of the device on which AuthGuard is used.

**4. Prohibited Uses**
You may not use AuthGuard for any illegal or unauthorized purpose. You agree to comply with all local laws regarding online conduct and acceptable content.

**5. Limitation of Liability**
AuthGuard and its creators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, including but not limited to loss of access to accounts.

**6. Intellectual Property**
The AuthGuard name, logo, and code are protected by copyright and other intellectual property laws.

**7. Modifications to Service**
We reserve the right to modify or discontinue the service at any time without notice.

**8. Governing Law**
These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the service operates.

**9. Account Registration**
You must provide accurate and complete information when creating an account.
You are responsible for maintaining the security of your account credentials.
You must be at least 13 years old to create an account.
One person may only maintain one account. Duplicate accounts may be suspended.
You are responsible for all activities that occur under your account.

**10. Services Description**
2fa-auth.com provides digital authentication products and services. The specific details, pricing, and availability of products are described on our website and may change at any time.

**11. Purchases and Payments**
All prices are displayed in the currency indicated on the website.
Payment must be completed before products/services are delivered.
We accept the payment methods listed on our website (cryptocurrency, PayPal, bank transfer, etc.).
All sales are final unless otherwise stated in our refund policy.

**12. Refund Policy**
Refund requests must be submitted within the timeframe specified for each product.
Refunds are evaluated on a case-by-case basis.
Digital products that have been accessed or used may not be eligible for refunds.
Refunds, if approved, will be processed using the original payment method.

**13. Prohibited Activities**
You agree not to:

Use our services for any illegal or unauthorized purpose
Attempt to gain unauthorized access to other users’ accounts
Interfere with or disrupt the integrity of our website or servers
Use automated tools (bots, scrapers) to access our services without permission
Resell or redistribute our products without authorization
Upload malicious code, viruses, or harmful content
Engage in fraudulent transactions or chargebacks
Violate any applicable laws or regulations

**14. Intellectual Property**
All content on our website, including text, graphics, logos, images, and software, is the property of 2fa-auth.com or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.

**15. Account Suspension and Termination**
We reserve the right to suspend or terminate your account at any time if:

You violate these Terms of Service
You engage in fraudulent or suspicious activity
Your account has been inactive for an extended period
Required by law or legal process

**16. Limitation of Liability**
To the maximum extent permitted by law:

Our services are provided “as is” without warranties of any kind.
We are not liable for any indirect, incidental, special, or consequential damages.
Our total liability shall not exceed the amount you paid for the specific product/service in question.

**17. Disclaimer**
We make no guarantees regarding the availability, accuracy, or reliability of our services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.

**18. Third-Party Services**
Our website may contain links to or integrate with third-party services. We are not responsible for the terms, privacy practices, or content of third-party services. Your use of third-party services is at your own risk.

**19. Governing Law**
These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through good-faith negotiation or, if necessary, through competent legal channels.

**20. Changes to Terms**
We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after any changes constitutes your acceptance of the new terms.`;
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        {/* title="Terms & Conditions | AuthGuard Pro - 2FA Authenticator"
        description="Read the Terms & Conditions of AuthGuard Pro to understand your rights, responsibilities, and usage policies for our 2FA authentication services."
        keywords="terms and conditions, 2FA terms, AuthGuard Pro legal, authentication service terms, user agreement, security app terms"
        canonical="http://localhost:3000/terms"
        robots="index, follow" */}

        <title>Terms & Conditions | AuthGuard Pro - 2FA Authenticator</title>
        <meta name="description" content="Read the Terms & Conditions of AuthGuard Pro to understand your rights, responsibilities, and usage policies for our 2FA authentication services."/>
        <meta name="keywords" content="terms and conditions, 2FA terms, AuthGuard Pro legal, authentication service terms, user agreement, security app terms"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="http://localhost:3000/terms"/>
      </Helmet>
      <h1 className="text-1.5xl text-2xl sm:text-3xl lg:text-4xl py-3 sm:py-4 font-bold flex items-center gap-2">Terms & Conditions</h1>
      
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 text-blue-500">
          <FileText size={24} className="sm:w-8 sm:h-8 md:w-10 md:h-10"/>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-black">Legal Terms</h2>
        </div>
        
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 mb-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-sm sm:text-base md:text-lg leading-relaxed mb-2" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-neutral-900 dark:text-black" {...props} />
              ),
            }}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};