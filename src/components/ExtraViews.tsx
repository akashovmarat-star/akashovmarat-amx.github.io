import React, { useState, useRef } from 'react';
import { ViewTab } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { FileText, Shield, Award, Key, MapPin, Phone, Mail, CheckCircle, Upload, ArrowRight, CornerDownRight, Loader2 } from 'lucide-react';

interface ExtraViewsProps {
  tab: ViewTab;
  onBookViewing: () => void;
}

export default function ExtraViews({ tab, onBookViewing }: ExtraViewsProps) {
  // KYC State
  const [kycStep, setKycStep] = useState(1);
  const [isSubmittingKYC, setIsSubmittingKYC] = useState(false);
  const kycFormRef = useRef<HTMLDivElement>(null);
  const [kycForm, setKycForm] = useState({
    fullName: '',
    passportNumber: '',
    nationality: 'United Kingdom',
    fundSource: 'Corporate Dividends',
    estimatedInvestment: 'AED 10M - AED 25M',
    fileMock: 'passport_scan_certified.pdf'
  });
  const [kycCertified, setKycCertified] = useState(false);

  // Contact State
  const [contactSubject, setContactSubject] = useState('Acquisition Inquiry');
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });

  // KYC submit
  const handleKycNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (kycStep < 3) {
      setKycStep(kycStep + 1);
    } else {
      if (!kycFormRef.current) return;
      setIsSubmittingKYC(true);
      
      try {
        // Build PDF from form DOM
        const canvas = await html2canvas(kycFormRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const pdfBase64 = pdf.output('datauristring'); // The base64 string
        
        // Send to backend
        const response = await fetch('/api/send-kyc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pdfBase64,
            fullName: kycForm.fullName || 'Sir Richard Kensington',
            emailTo: 'marat@amx.ae'
          })
        });
        
        if (!response.ok) {
           console.error("KYC Send failed. Please ensure SMTP is configured if sending real email.");
        }
      } catch (err) {
        console.error("Error generating KYC PDF:", err);
      } finally {
        setIsSubmittingKYC(false);
        setKycCertified(true);
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setMessageSubmitted(true);
    }
  };

  if (tab === 'kyc') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 animate-fade-in-up">
        {/* Title */}
        <div className="text-center space-y-2 pb-6 border-b border-slate-200">
          <span className="font-label text-xs uppercase tracking-[0.25em] text-[#755a24] block">
            DLD REGULATORY REQUIREMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black">
            Client KYC Verification Portal
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-sans">
            In compliance with the Dubai Land Department and anti-money laundering regulations, certified clients must complete this secure initial Know Your Customer onboarding verification.
          </p>
        </div>

        {!kycCertified ? (
          <div ref={kycFormRef} className="bg-[#f5f3f3] rounded-2xl border border-[#c2c7ca] p-8 space-y-6">
            
            {/* Step navigation bar */}
            <div className="flex justify-between items-center text-xs font-label">
              <span className={`pb-2 border-b-2 tracking-wide ${kycStep >= 1 ? 'border-[#755a24] text-[#041920] font-bold' : 'border-transparent text-slate-400'}`}>
                1. IDENTITY FACTS
              </span>
              <span className={`pb-2 border-b-2 tracking-wide ${kycStep >= 2 ? 'border-[#755a24] text-[#041920] font-bold' : 'border-transparent text-slate-400'}`}>
                2. FUNDS DISCLOSURE
              </span>
              <span className={`pb-2 border-b-2 tracking-wide ${kycStep >= 3 ? 'border-[#755a24] text-[#041920] font-bold' : 'border-transparent text-slate-400'}`}>
                3. SIGNATURE CONSENT
              </span>
            </div>

            <form onSubmit={handleKycNext} className="space-y-5">
              
              {/* Step 1 Content */}
              {kycStep === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
                        Passport Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sir Richard Kensington"
                        value={kycForm.fullName}
                        onChange={(e) => setKycForm({ ...kycForm, fullName: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-[#755a24]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
                        Passport / ID Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="L8495034-UK"
                        value={kycForm.passportNumber}
                        onChange={(e) => setKycForm({ ...kycForm, passportNumber: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-[#755a24]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
                      Country of Citizenship
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="United Kingdom"
                      value={kycForm.nationality}
                      onChange={(e) => setKycForm({ ...kycForm, nationality: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-[#755a24]"
                    />
                  </div>

                  {/* Drag and Drop File Upload Area */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
                      Certified Passport Scan
                    </label>
                    <div className="border border-dashed border-[#c2c7ca] rounded-xl p-8 bg-white text-center cursor-pointer hover:bg-slate-50/50 transition-colors">
                      <Upload className="h-8 w-8 text-[#755a24] mx-auto mb-2" />
                      <p className="text-xs text-slate-700 font-bold">certified_passport_kensington.pdf</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Certified photocopy or high-quality scan securely uploaded (Max 24MB)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Content */}
              {kycStep === 2 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
                      Primary Source of Acclaimed Funds
                    </label>
                    <select
                      value={kycForm.fundSource}
                      onChange={(e) => setKycForm({ ...kycForm, fundSource: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800"
                    >
                      <option>Corporate Dividends &amp; Equities</option>
                      <option>Inherited Family Estate</option>
                      <option>Real Estate Portfolio Liquidity</option>
                      <option>Tech Equity Handover Proceeds</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
                      Estimated Investment Allocation (AED)
                    </label>
                    <select
                      value={kycForm.estimatedInvestment}
                      onChange={(e) => setKycForm({ ...kycForm, estimatedInvestment: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800"
                    >
                      <option>AED 2M — AED 5M</option>
                      <option>AED 5M — AED 10M</option>
                      <option>AED 10M — AED 25M</option>
                      <option>AED 25M — AED 100M+</option>
                    </select>
                  </div>

                  <div className="bg-white/80 p-4 border rounded-xl space-y-2 text-xs text-slate-600 font-sans border-slate-100">
                    <p className="text-[10px] uppercase font-label tracking-widest text-[#755a24] font-bold">Safe AML Notice:</p>
                    <p>
                      All submissions are strictly processed under anti-money laundering protocols (UAE Federal Decree-Law No. 20 of 2018). Data is cached layout direct end-to-end encryption.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3 Content */}
              {kycStep === 3 && (
                <div className="space-y-4 animate-fade-in-up">
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    By submitting this verification registry, I certify that all passport credentials, financial estimates, and RERA disclosures submitted in this form are accurate and correspond strictly to my certified identity scan.
                  </p>

                  <div className="border border-slate-200 rounded-xl p-4 bg-white font-serif text-sm italic text-slate-500">
                    Signed Digitally by: <strong className="text-slate-800 not-italic font-sans">{kycForm.fullName || 'Sir Richard Kensington'}</strong>
                  </div>

                  <div className="flex items-center gap-3 text-xs leading-snug">
                    <input type="checkbox" required className="h-4 w-4 text-[#755a24] rounded focus:ring-[#755a24]" />
                    <span className="text-slate-700 select-none">
                      I register dynamic consent to let AMX Real Estate advisors confirm passports with RERA officials.
                    </span>
                  </div>
                </div>
              )}

              {/* Step Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                {kycStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setKycStep(kycStep - 1)}
                    className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-label uppercase tracking-widest cursor-pointer hover:bg-slate-50"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingKYC}
                  className="bg-[#041920] text-[#ffdea7] px-8 py-2.5 rounded-lg font-label text-xs uppercase tracking-widest font-black cursor-pointer hover:bg-[#1a2e35] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingKYC ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#755a24]" />
                      Generating File & Sending...
                    </>
                  ) : (
                    kycStep === 3 ? 'Certify Profile' : 'Continue'
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-6 shadow-xl animate-fade-in-up">
            <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm animate-pulse">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#041920]">KYC Certification Secured</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                AMX client ID ledger registered successfully for passport holder: <strong className="text-[#041920]">{kycForm.fullName}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl text-left text-xs max-w-md mx-auto space-y-3 font-sans relative border border-slate-100">
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                COMPLIANT
              </div>
              <p className="text-[10px] font-label uppercase tracking-widest text-[#755a24]">Registry Dossier Summary:</p>
              <p className="text-slate-600">Verification Ledger ID: <strong className="text-slate-800 font-mono">KYC-DXB-940285-L</strong></p>
              <p className="text-slate-600">Country of citizenship: <strong className="text-slate-800">{kycForm.nationality}</strong></p>
              <p className="text-slate-600">Source of capital: <strong className="text-slate-800">{kycForm.fundSource}</strong></p>
            </div>

            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your certified compliant status is now locked with your private advisor. You can now bid and purchase premium properties directly.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (tab === 'about') {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16 animate-fade-in-up">
        {/* Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24] block">
            OUR HERITAGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black tracking-tight leading-tight">
            A boutique legacy of structural integrity and premium advocacy.
          </h1>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            At AMX.ae, we don’t just broker real estate; we consult high-net-worth families on residential wealth preservation throughout the Dubai land ecosystem.
          </p>
        </div>

        {/* Story details layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#041920]">
              Dubai's Trusted Capital Advisors
            </h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Founded on the pillars of absolute transparency and architectural precision, AMX has overseen over AED 8B in private residential transactions across Palm Jumeirah, Emirates Hills, and Downtown Dubai.
            </p>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              We maintain close relationships with senior planners, premier architects, and RERA registrars to guarantee that every acquisition is structurally sound, legally verified, and financially optimized.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="space-y-1">
                <p className="font-serif text-2xl font-bold text-[#755a24]">AED 1.2B</p>
                <p className="text-[9px] uppercase font-label tracking-widest text-slate-400">Annual transaction trade</p>
              </div>
              <div className="space-y-1 border-l border-slate-200 pl-4">
                <p className="font-serif text-2xl font-bold text-[#755a24]">100%</p>
                <p className="text-[9px] uppercase font-label tracking-widest text-slate-400">RERA Verified listings</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw0m0EAyfXkhMiwmnlFD7per1yyrM6YDdAnPy17X8amhsC7suG0AdTkYvYOee9aLlg_uHObzTAqX6g7NlaKaWeEzwc97wwTWDAWDR1P0tQBzstMKYWbsrOeQLl78Ab7q0e-N3sR1imhijXGsD21dBle_SJZdyW-Ijk3VsDVbzwmGc-JwXdwe9DK3OrGHf8JokbjLMD7l9s-qWlnEAhY_D3Q_gdna02sy6XvqAR2iw35PouHM2B7OzxvCDESne0lDvD2KsKifz9MYCR" 
              alt="Boutique executive office lounge" 
              className="w-full h-80 object-cover rounded-xl border border-slate-200 shadow-md"
            />
          </div>
        </div>

        {/* Corporate standards cards */}
        <div className="bg-[#1a2e35] text-white p-8 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2">
            <h4 className="text-[#ffdea7] font-semibold text-sm uppercase font-label tracking-widest">Architectural Vetting</h4>
            <p className="text-xs text-[#81969e] leading-relaxed">Every listed villa is checked for soil settlement, glass load, HVAC, and structure before we dispatch invitations.</p>
          </div>
          <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#364a51] pt-4 md:pt-0 md:pl-6">
            <h4 className="text-[#ffdea7] font-semibold text-sm uppercase font-label tracking-widest">Global Sourcing</h4>
            <p className="text-xs text-[#81969e] leading-relaxed">Our portfolio is synchronized anonymously with family offices across Riyadh, Doha, Geneva, London, and Tokyo.</p>
          </div>
          <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#364a51] pt-4 md:pt-0 md:pl-6">
            <h4 className="text-[#ffdea7] font-semibold text-sm uppercase font-label tracking-widest">Confidential Lock</h4>
            <p className="text-xs text-[#81969e] leading-relaxed">All clients are onboarding under non-disclosure agreements, locking purchase pricing and title records confidentially.</p>
          </div>
        </div>

      </div>
    );
  }

  if (tab === 'contact') {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16 animate-fade-in-up">
        {/* Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24] block">
            SECURE ACCESS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black">
            Bespoke Communications Desk
          </h1>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            Connect securely with our Dubai Marina executive suite. Our advisors are available 24/7 to coordinate VIP viewings and acquisitions layout private signature.
          </p>
        </div>

        {/* Contact info vs form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Info col-4 */}
          <div className="md:col-span-4 space-y-6 bg-[#f5f3f3] p-6 rounded-2xl border border-[#c2c7ca] text-[#041920]">
            <div>
              <p className="text-[10px] font-label text-slate-400 uppercase tracking-widest">EXECUTIVE HEADQUARTERS</p>
              <p className="font-bold text-sm mt-1">AMX Real Estate Dubai</p>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mt-0.5">
                Level 28, Al Habtoor Tower,<br />
                Dubai Marina Gateway, Dubai, UAE
              </p>
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-4 text-xs font-sans">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#755a24]" />
                <span>+971 4 456 7000 (Exec Line)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#755a24]" />
                <span>concierge@amx.ae</span>
              </p>
            </div>

            <div className="space-y-1 border-t border-slate-200 pt-4 text-xs font-sans text-slate-500 leading-relaxed">
              <p className="text-[10px] font-label text-[#755a24] uppercase tracking-widest block font-bold">RERA Licensed Office:</p>
              <p>RERA Registration Number: #4059-DXB</p>
              <p>Licensed Broker ID: #23580-RERA</p>
            </div>
          </div>

          {/* Form col-8 */}
          <div className="md:col-span-8">
            {!messageSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sir Richard"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-[#755a24]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971..."
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-[#755a24]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="richard@kensington.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 focus:outline-[#755a24]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold font-sans">Inquiry Topic</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800"
                  >
                    <option>Asset Acquisition Portfolio</option>
                    <option>Free Appraiser Valuation Request</option>
                    <option>Off-Plan Assignment Allocations</option>
                    <option>Broker Partnership Proposal</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">Private Message</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your desired neighborhood, bedroom preferences and budget constraints..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-[#755a24] font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#041920] hover:bg-[#1a2e35] text-white py-3.5 rounded-lg font-label text-xs uppercase tracking-widest font-black transition-all cursor-pointer w-full text-center"
                >
                  Dispatch Secure Message
                </button>
              </form>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-xl">
                <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#041920]">Corporate Message Dispatched</h3>
                <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{contactForm.name}</strong>. Your inquiry regarding <strong className="text-slate-800">{contactSubject}</strong> is securely queued on: info@amx.ae.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg inline-block text-slate-600 text-xs text-left max-w-xs space-y-1">
                  <p>• Expected review duration: 15 minutes.</p>
                  <p>• Private dossier will be dispatch securely.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  return null;
}
