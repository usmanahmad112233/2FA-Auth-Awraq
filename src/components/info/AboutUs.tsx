import React from 'react';
import { Card } from '../UI';
import { Shield, Users, Target } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AboutUs = () => {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>About Us | AuthGuard Pro - 2FA Authenticator</title>
        <meta name="description" content="Learn about AuthGuard Pro, a secure and privacy-first 2FA authenticator app designed to protect your digital identity with advanced authentication tools."/>
        <meta name="keywords" content="2FA authenticator, security app, authentication, privacy, AuthGuard Pro, two factor authentication, OTP, secure login"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="http://localhost:3000/about-us"/>
      </Helmet>
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Securing the Digital World</h1>
        <p className="text-lg text-slate-600">AuthGuard Pro was founded with a single mission: to make high-grade security tools accessible to everyone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center">
          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Our Mission</h3>
          <p className="text-sm text-slate-500">To provide privacy-first security tools that protect users without compromising their data.</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Our Team</h3>
          <p className="text-sm text-slate-500">A global group of security researchers and developers dedicated to open security standards.</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target size={24} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Our Vision</h3>
          <p className="text-sm text-slate-500">A future where data breaches no longer mean compromised identities thanks to universal 2FA.</p>
        </Card>
      </div>
    </div>
  );
};