import React, { useState } from 'react';
import { DollarSign, Home, Percent, Calendar, Mail, User, Phone, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

export default function MortgageCalculatorView() {
  const [propertyPrice, setPropertyPrice] = useState<number>(3000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(25);

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const principalAmount = propertyPrice - downPaymentAmount;

  // Monthly Interest Rate
  const r = (interestRate / 100) / 12;
  // Number of monthly payments
  const n = loanTerm * 12;

  // Mortgage Payment Formula Calculation
  let monthlyPayment = 0;
  if (r > 0 && n > 0 && principalAmount > 0) {
    const factor = Math.pow(1 + r, n);
    monthlyPayment = principalAmount * ((r * factor) / (factor - 1));
  } else if (principalAmount > 0 && n > 0) {
    monthlyPayment = principalAmount / n;
  }

  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principalAmount;

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-mortgage-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          propertyPrice,
          downPaymentAmount,
          monthlyPayment: Math.round(monthlyPayment),
          loanTerm,
          interestRate,
          emailTo: 'marat@amx.ae'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsContactFormOpen(false);
          setSubmitSuccess(false);
          setContactForm({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      } else {
        console.error('Failed to send mortgage contact request');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-[#fbf9f9] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-12 animate-fade-in-up">
        
        <div className="text-center space-y-2">
          <span className="font-label text-xs uppercase tracking-[0.25em] text-[#755a24]">
            AMX Financial Services
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#041920]">
            Mortgage Calculator
          </h1>
          <p className="text-xs text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
            Estimate your monthly payments, interest rates, and total finance costs for premium real estate investments in Dubai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inputs Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DE] p-8 space-y-6">
            
            <div className="space-y-4">
              <label className="block">
                <span className="font-label text-[10px] uppercase font-bold text-[#041920] tracking-wider mb-2 block">
                  Property Value (AED)
                </span>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#81969e]" />
                  <input
                    type="number"
                    value={propertyPrice || ''}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full bg-[#fbf9f9] border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#755a24] font-sans font-bold"
                  />
                </div>
              </label>

              <label className="block">
                <div className="flex justify-between mb-2">
                  <span className="font-label text-[10px] uppercase font-bold text-[#041920] tracking-wider block">
                    Down Payment (%)
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold font-sans">
                    AED {downPaymentAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#81969e]" />
                  <input
                    type="number"
                    value={downPaymentPercent || ''}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full bg-[#fbf9f9] border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#755a24] font-sans font-bold"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full mt-3 accent-[#755a24]"
                />
              </label>

              <label className="block">
                <span className="font-label text-[10px] uppercase font-bold text-[#041920] tracking-wider mb-2 block">
                  Interest Rate (%)
                </span>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#81969e]" />
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-[#fbf9f9] border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#755a24] font-sans font-bold"
                  />
                </div>
              </label>

              <label className="block">
                <span className="font-label text-[10px] uppercase font-bold text-[#041920] tracking-wider mb-2 block">
                  Loan Term (Years)
                </span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#81969e]" />
                  <input
                    type="number"
                    value={loanTerm || ''}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full bg-[#fbf9f9] border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#755a24] font-sans font-bold"
                  />
                </div>
              </label>
            </div>
            
          </div>

          {/* Results Section */}
          <div className="bg-[#041920] rounded-2xl shadow-xl border border-[#364a51] p-8 text-white flex flex-col justify-center">
            
            <div className="text-center pb-8 border-b border-[#364a51]">
              <h3 className="font-label text-[10px] uppercase tracking-[0.25em] text-[#81969e] mb-2">Estimated Monthly Payment</h3>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-[#ffdea7]">
                AED {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#81969e]">Principal Amount</span>
                <span className="font-bold">AED {principalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#81969e]">Total Interest</span>
                <span className="font-bold">AED {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm pt-4 border-t border-[#364a51]">
                <span className="text-[#ffdea7] font-bold uppercase text-[10px] tracking-wider">Total Repayment</span>
                <span className="font-bold text-[#ffdea7]">AED {totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#364a51]">
              {!isContactFormOpen ? (
                <button
                  onClick={() => setIsContactFormOpen(true)}
                  className="w-full bg-[#ffdea7] text-[#041920] hover:bg-white px-6 py-3 rounded-lg font-label text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </button>
              ) : submitSuccess ? (
                <div className="bg-[#1a2e35] rounded-xl p-6 text-center border border-[#755a24]/30 animate-fade-in-up">
                  <CheckCircle className="h-10 w-10 text-[#ffdea7] mx-auto mb-3" />
                  <h4 className="font-serif font-bold text-lg text-white mb-2">Request Sent Successfully</h4>
                  <p className="text-slate-400 text-xs">Our financial consultants will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4 animate-fade-in-up">
                  <h4 className="font-serif font-black text-white text-lg mb-4 text-center">Consult with an Advisor</h4>
                  
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-[#1a2e35] border border-[#364a51] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#755a24]"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#1a2e35] border border-[#364a51] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#755a24]"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-[#1a2e35] border border-[#364a51] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#755a24]"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
                    <textarea
                      placeholder="Additional details or inquiries..."
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-[#1a2e35] border border-[#364a51] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#755a24] resize-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsContactFormOpen(false)}
                      className="flex-1 px-4 py-3 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] bg-[#ffdea7] text-[#041920] hover:bg-white px-4 py-3 rounded-lg font-label text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin text-[#755a24]" /> : <DollarSign className="h-4 w-4" />}
                      {isSubmitting ? 'Sending...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
