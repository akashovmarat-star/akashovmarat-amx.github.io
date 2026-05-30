import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Award, Check } from 'lucide-react';

interface BookViewingModalProps {
  onClose: () => void;
  initialPropertyName?: string;
}

export default function BookViewingModal({ onClose, initialPropertyName }: BookViewingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: initialPropertyName || 'Contemporary Waterfront Villa - Palm Jumeirah',
    date: '2026-05-25',
    time: '14:00',
    transport: 'Chauffeur Pick-up Requested',
    specialReqs: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in Name, Email and Phone Number for your VIP reservation.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="relative bg-white text-[#1b1c1c] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl hairline-border flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#041920] text-white p-6 flex justify-between items-center border-b border-[#364a51]">
          <div>
            <span className="text-[10px] font-label text-[#ffdea7] uppercase tracking-[0.2em] block mb-1">
              VIP EXPERIENCES
            </span>
            <h3 className="font-serif text-xl font-medium tracking-tight">Private Viewing Registry</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-500 font-sans mb-4">
                Arrange a bespoke face-to-face showing. Our luxury portfolio services include complimentary Mercedes-Maybach private transport to and from the site.
              </p>

              {/* Passenger Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Marcus Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24] transition-all"
                  />
                </div>
              </div>

              {/* Private Email / Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                    Private Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="client@exec.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                    Secure Telephone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+971 50..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Selected Property / Showcase */}
              <div className="space-y-1">
                <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                  Selected Asset
                </label>
                <select
                  value={formData.property}
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24] transition-all"
                >
                  <option>Contemporary Waterfront Villa - Palm Jumeirah</option>
                  <option>The Address Sky Views Penthouse - Downtown</option>
                  <option>Fairway Vistas Mansion - Dubai Hills</option>
                  <option>Luxury Modern Townhouse - Jumeirah Village Circle</option>
                  <option>Luxury Marina Vista Apt - Dubai Marina</option>
                  <option>Desert Oasis Retreat - Arabian Ranches III</option>
                  <option>Garden Villa - Emirates Hills</option>
                  <option>Burj Vista Apartment - Downtown</option>
                  <option>Beachfront Haven - Palm Jumeirah</option>
                </select>
              </div>

              {/* Date & Time slot Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                    Preferred Hour
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#755a24] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Private Chauffeur Options */}
              <div className="space-y-1">
                <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                  Maybach Chauffeur Service
                </label>
                <select
                  value={formData.transport}
                  onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                >
                  <option>Chauffeur Pick-up Requested (Complementary)</option>
                  <option>I Will Arrive Independently</option>
                  <option>Helicopter Heliport Transfer (Palm/Burj Residences only)</option>
                </select>
              </div>

              {/* Special requirements */}
              <div className="space-y-1">
                <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-medium">
                  Bespoke Notes / Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="E.g., NDA documents to sign, English-Arabic translator needed..."
                  value={formData.specialReqs}
                  onChange={(e) => setFormData({ ...formData, specialReqs: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#755a24] rounded-lg p-3 text-sm focus:outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#041920] hover:bg-[#1a2e35] text-white py-4 rounded-xl font-label text-xs uppercase tracking-widest font-bold transition-all mt-4 text-center select-none cursor-pointer"
              >
                Register Private Viewing
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200 shadow-sm animate-pulse">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-[#041920]">Appointment Certified</h4>
                <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your private tour of <strong className="text-slate-800">{formData.property}</strong> is registered on <strong className="text-[#755a24]">{formData.date}</strong> at <strong className="text-[#755a24]">{formData.time}</strong>.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-left max-w-sm mx-auto text-xs space-y-2">
                <p className="text-[10px] uppercase font-label text-[#755a24] tracking-widest">Next Steps:</p>
                <p className="text-slate-600">1. A dedicated lifestyle officer is dialing you within 15 minutes.</p>
                <p className="text-slate-600">2. Confirmation details will be wired securely to: <strong className="text-slate-800">{formData.email}</strong>.</p>
                <p className="text-slate-600">3. Your chauffeur will coordinate arrival timing directly on WhatsApp.</p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#755a24] text-white font-label text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-[#5b430e] transition-all"
              >
                Return to Gallery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
