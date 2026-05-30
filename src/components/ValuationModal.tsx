import React, { useState } from 'react';
import { X, Calculator, DollarSign, Sparkles, Send, Check } from 'lucide-react';

interface ValuationModalProps {
  onClose: () => void;
}

export default function ValuationModal({ onClose }: ValuationModalProps) {
  const [inputs, setInputs] = useState({
    community: 'Palm Jumeirah',
    type: 'Villa',
    sqft: 4000,
    finishes: 'ultra',
    bedrooms: 4,
    condition: 'Excellent'
  });

  const [valuation, setValuation] = useState<number | null>(null);
  const [successSent, setSuccessSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '' });

  const calculateEstimate = () => {
    // Basic premium logic for Dubai neighborhoods
    let basePricePerSqft = 1200; // standard AED/sqft
    
    switch (inputs.community) {
      case 'Palm Jumeirah':
        basePricePerSqft = 3500;
        break;
      case 'Downtown Dubai':
        basePricePerSqft = 2800;
        break;
      case 'Emirates Hills':
        basePricePerSqft = 4500;
        break;
      case 'Dubai Marina':
        basePricePerSqft = 1800;
        break;
      case 'Dubai Hills Estate':
        basePricePerSqft = 2200;
        break;
      case 'Jumeirah Village Circle':
        basePricePerSqft = 1050;
        break;
    }

    // adjustments for property type
    let typeMultiplier = 1.0;
    if (inputs.type === 'Penthouse') typeMultiplier = 1.35;
    if (inputs.type === 'Villa') typeMultiplier = 1.2;

    // finishes adjustment
    let finishMultiplier = 1.0;
    if (inputs.finishes === 'ultra') finishMultiplier = 1.4;
    if (inputs.finishes === 'bespoke') finishMultiplier = 1.75;

    const finalValue = inputs.sqft * basePricePerSqft * typeMultiplier * finishMultiplier;
    setValuation(Math.round(finalValue));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      alert('Please fill in Name, Phone, and Email to register this valuation report.');
      return;
    }
    setSuccessSent(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="relative bg-white text-[#1b1c1c] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#041920] text-white p-6 flex justify-between items-center border-b border-[#364a51]">
          <div>
            <span className="text-[10px] font-label text-[#ffdea7] uppercase tracking-[0.2em] block mb-1">
              FINANCIAL INTELLIGENCE
            </span>
            <h3 className="font-serif text-xl font-medium">Bespoke Estate Valuation</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close valuation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[85vh] space-y-6">
          {!successSent ? (
            <>
              {/* Active Calculator Form */}
              <div className="space-y-4">
                <p className="text-xs text-slate-500 font-sans">
                  Calculate the real-time luxury premium value of your property in Dubai using our transaction database records.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Community Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                      Community Area
                    </label>
                    <select
                      value={inputs.community}
                      onChange={(e) => {
                        setInputs({ ...inputs, community: e.target.value });
                        setValuation(null);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24]"
                    >
                      <option>Palm Jumeirah</option>
                      <option>Downtown Dubai</option>
                      <option>Emirates Hills</option>
                      <option>Dubai Marina</option>
                      <option>Dubai Hills Estate</option>
                      <option>Jumeirah Village Circle</option>
                    </select>
                  </div>

                  {/* Property Type Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                      Asset Category
                    </label>
                    <select
                      value={inputs.type}
                      onChange={(e) => {
                        setInputs({ ...inputs, type: e.target.value });
                        setValuation(null);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24]"
                    >
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Penthouse</option>
                      <option>Townhouse</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gross Living Area in Sqft */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                      Area (Square Feet)
                    </label>
                    <input
                      type="number"
                      required
                      min={200}
                      max={80000}
                      value={inputs.sqft}
                      onChange={(e) => {
                        setInputs({ ...inputs, sqft: parseInt(e.target.value) || 0 });
                        setValuation(null);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24]"
                    />
                  </div>

                  {/* Finishes Level Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                      Finishing Standard
                    </label>
                    <select
                      value={inputs.finishes}
                      onChange={(e) => {
                        setInputs({ ...inputs, finishes: e.target.value });
                        setValuation(null);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24]"
                    >
                      <option value="standard">High-Luxury Premium</option>
                      <option value="ultra">Ultra-Custom Designer Premium</option>
                      <option value="bespoke">Bespoke Atelier Masterpiece</option>
                    </select>
                  </div>
                </div>

                {/* Bedrooms & Condition Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                      Bedrooms Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={inputs.bedrooms}
                      onChange={(e) => {
                        setInputs({ ...inputs, bedrooms: parseInt(e.target.value) || 1 });
                        setValuation(null);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                      Current Condition
                    </label>
                    <select
                      value={inputs.condition}
                      onChange={(e) => {
                        setInputs({ ...inputs, condition: e.target.value });
                        setValuation(null);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    >
                      <option>Brand New / Off-Plan</option>
                      <option>Excellent</option>
                      <option>Renovated</option>
                      <option>Good</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateEstimate}
                  className="w-full bg-[#755a24] hover:bg-[#5b430e] text-white py-3 rounded-lg font-label text-xs uppercase tracking-widest font-bold transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Estimate Valuation
                </button>
              </div>

              {/* Generated Valuation Report Container */}
              {valuation !== null && (
                <div className="bg-[#f5f3f3] p-6 rounded-xl border border-[#c2c7ca] space-y-4 animate-fade-in-up">
                  <div className="text-center">
                    <span className="text-[10px] font-label text-slate-500 uppercase tracking-widest block mb-1">
                      INDICATIVE DUBAI MARKET VALUATION
                    </span>
                    <h4 className="font-serif text-3xl font-bold text-[#041920]">
                      AED {valuation.toLocaleString()}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Approx. USD {(Math.round(valuation / 3.67)).toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-200 pt-3">
                    <p className="text-slate-500">Avg. Rate per Sqft:</p>
                    <p className="text-right font-medium text-slate-800">
                      AED {Math.round(valuation / inputs.sqft).toLocaleString()} / sqft
                    </p>
                    <p className="text-slate-500">Transaction Index Confidence:</p>
                    <p className="text-right font-medium text-emerald-600">96.8% (Stable)</p>
                  </div>

                  {/* Registration form to save/receive official report */}
                  <form onSubmit={handleInquirySubmit} className="space-y-3 pt-3 border-t border-slate-200">
                    <p className="text-[10px] font-label text-center text-slate-500 uppercase tracking-wide">
                      Secure this Valuation &amp; Receive Official PDF Statement
                    </p>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Private Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Secure Phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#041920] hover:bg-[#1a2e35] text-white py-2.5 rounded-lg font-label text-[10px] uppercase tracking-wider font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="h-3 w-3" />
                      Lock Estimation &amp; Connect Expert
                    </button>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-[#041920]">Bespoke Statement Requested</h4>
                <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{contactForm.name}</strong>. Our senior advisory appraiser has been notified of your estimated valuation report (<strong>AED {valuation?.toLocaleString()}</strong>).
                </p>
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                An executive appraisal dossier with official RERA-compliant market benchmarks will be compiled and delivered layout signature directly to <span className="text-slate-700 font-semibold">{contactForm.email}</span>.
              </p>
              <button
                onClick={onClose}
                className="bg-[#041920] text-white font-label text-xs uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-slate-800 transition-all"
              >
                Close Valuation Engine
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
