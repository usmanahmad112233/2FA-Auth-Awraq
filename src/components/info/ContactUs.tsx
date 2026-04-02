import React, { useState } from "react";
import { Shield, Mail, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <Helmet>
        <title>Contact Us, contact 2FA authenticator | 2FA Authenticator App </title>
        <meta
          name="description"
          content="Get in touch with the 2FA Authenticator support team. Send feedback, ask questions, or report issues to ensure your account security is always protected."
        />
        <link rel="canonical" href="http://localhost:3000/contact-us" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="contact 2FA authenticator, support, feedback, security questions, report issues, two-factor authentication help, 2FA app support"
        />
      </Helmet>
      {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold px-30 pt-6 md:pt-10">Contact Us</h1> */}
      <div className="flex justify-center items-center px-4 py-10">
        <div className="max-w-3xl w-full bg-[#f9fafc] rounded-2xl shadow-xl p-10 border border-gray-300">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <Shield className="text-yellow-500" size={28} />
            </div>
            {/* <h2 className="text-3xl font-bold text-black">Contact Us</h2> */}
            <h1 className="text-3xl font-bold text-black">Contact Us</h1>
            {/* <h1 className="text-3xl font-bold text-black">Contact Us</h1> */}
          </div>

          <p className="text-center text-black mb-6">We'd love to hear from you! Your feedback helps us improve.</p>
          <p className="text-black leading-relaxed mb-6">
            If you have any questions, suggestions, feature requests, or encounter
            any issues with the 2Fa Live application, please don’t hesitate to
            reach out to our support team.
          </p>

          <h2 className="text-xl font-semibold text-black mb-4">Send us a message</h2>
          {submitted && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-100 text-emerald-700">
              ✅ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Your full name"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="you@example.com"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Message</label>
              <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none" placeholder="Write your message here..."/>
            </div>
            <button type="submit"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"><Send className="w-4 h-4"/>Send Message</button>
          </form>

          {/* Email Section */}
          <p className="text-black leading-relaxed">Or email us directly at{" "}
            <a href="mailto:contact.2falive@ozoneapps.com" className="text-blue-500 hover:text-blue-600 underline">contact.2falive@ozoneapps.com</a></p>
          <p className="text-black mt-6 text-center">Thank you for being part of the 2Fa Live community.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-500/20 p-2 rounded-full">
              <Shield className="text-yellow-500" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-black">2Fa Live</h3>
          </div>

          <p className="text-gray-600 mb-6">Secure, simple, and private two-factor authentication right in your browser.</p>
          <div className="border-t border-gray-300 pt-4 text-center text-gray-500 text-sm">
            © 2026 2Fa Live. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;



// import React, { useState } from 'react';
// import { Card, Button, Input } from '../UI';
// import { Mail, MessageSquare, Send, Check, ShieldCheck, RefreshCw } from 'lucide-react';
// import { motion } from 'motion/react';

// export const Contact = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSubmitted(true);
//     }, 1500);
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-8">
//       <Card title="Security Support" description="Get expert help with your authentication setup">
//         {submitted ? (
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="py-12 text-center space-y-4"
//           >
//             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
//               <Check size={32} />
//             </div>
//             <h3 className="text-xl font-bold text-slate-900">Message Received</h3>
//             <p className="text-slate-500">Our security team will get back to you within 24 hours.</p>
//             <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
//           </motion.div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</label>
//                 <Input placeholder="Your name" required />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
//                 <Input type="email" placeholder="email@example.com" required />
//               </div>
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</label>
//               <Input placeholder="How can we help?" required />
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
//               <textarea 
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all min-h-[120px] text-sm"
//                 placeholder="Describe your issue or question..."
//                 required
//               />
//             </div>
//             <Button type="submit" disabled={loading} className="w-full h-12 gap-2">
//               {loading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
//               Send Security Inquiry
//             </Button>
//           </form>
//         )}
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
//           <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
//             <Mail size={20} />
//           </div>
//           <div>
//             <p className="text-xs font-bold text-slate-900">Email Support</p>
//             <p className="text-[10px] text-slate-500">support@authguard.pro</p>
//           </div>
//         </div>
//         <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-4">
//           <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
//             <ShieldCheck size={20} />
//           </div>
//           <div>
//             <p className="text-xs font-bold text-slate-900">Pro Hotline</p>
//             <p className="text-[10px] text-slate-500">Priority for enterprise users</p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };