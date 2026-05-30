import React, { useState } from 'react';
import { Property, Agent } from '../types';
import { AGENTS } from '../data';
import { X, Bed, Bath, Square, MapPin, Check, Phone, Mail, FileText } from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property;
  onClose: () => void;
  onBookViewing: (propertyName: string) => void;
  onContactAgent: (agentId: string) => void;
}

export default function PropertyDetailsModal({ property, onClose, onBookViewing, onContactAgent }: PropertyDetailsModalProps) {
  const agent = AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', phone: '', message: `I am interested in acquiring the "${property.title}" listed for AED ${property.price.toLocaleString()}. Please dispatch the brochure and coordinate timing.` });

  // Additional mock slides for gallery
  const galleryImages = [
    property.image,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC4e2ozSMda6gfgdZ44C0Rw8hSunWBYnzvMEpp5AfNBKEiBepwUgcYFEYjPSpzcFaXxDHoR4LAmDSr4-qDvFUvKChjCp8goF3s7OTDQTEJyQOeqNxVd4AmmQe9HKmoD2zg9QuxkEj2xi0JYlHsOgSSMEO_DH2KJt3pzaqZhDlpvu95ovKzN3muwjFwgdNSjjJVF4T00GyRGoGhnW_FZ4Y_lj3OJ1sJOF0j8UmnvpC8OUQhj-ddzs59Dj7gzE1p6cxXDrRJjtSc5fKcr' // gorgeous kitchen
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.phone) {
      alert('Please fill in your Name and Telephone number to send your luxury inquiry.');
      return;
    }
    setInquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-[#fbf9f9] text-[#1b1c1c] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-8 animate-fade-in-up">
        
        {/* Top Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-[#041920]/80 hover:bg-[#041920] text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label="Close details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Structure: Grid layout for presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[90vh]">
          
          {/* Left Block: Photo slider and main info (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col bg-slate-900 text-white">
            {/* Gallery Image Slider */}
            <div className="relative h-64 sm:h-96 w-full bg-slate-800 flex items-center justify-center overflow-hidden">
              <img 
                src={galleryImages[activeSlide]} 
                alt={`${property.title} - View ${activeSlide + 1}`} 
                className="w-full h-full object-cover select-none"
              />
              
              {/* Badge Overlay */}
              {property.badge && (
                <span className="absolute top-4 left-4 bg-[#755a24] text-white font-label text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-semibold shadow-md">
                  {property.badge}
                </span>
              )}

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === idx ? 'w-6 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="p-3 bg-black flex gap-2 items-center overflow-x-auto border-t border-slate-800">
              {galleryImages.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeSlide === i ? 'border-[#ffdea7]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail review" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* General Specs Overlay block */}
            <div className="p-6 space-y-4 bg-[#0a2129]">
              <div className="space-y-1">
                <span className="text-[#ffdea7] font-serif text-lg tracking-wide uppercase">
                  {property.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">{property.title}</h3>
                <p className="text-[#81969e] text-xs flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {property.address}
                </p>
              </div>

              {/* Layout structural metrics */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#364a51]/50 text-center">
                <div className="space-y-1 text-center">
                  <div className="flex justify-center items-center gap-1.5 text-[#ffdea7]">
                    <Bed className="h-4 w-4" />
                    <span className="font-bold text-sm">{property.beds}</span>
                  </div>
                  <p className="text-[10px] text-[#81969e] uppercase tracking-wider">Bedrooms</p>
                </div>

                <div className="space-y-1 text-center border-x border-[#364a51]/50">
                  <div className="flex justify-center items-center gap-1.5 text-[#ffdea7]">
                    <Bath className="h-4 w-4" />
                    <span className="font-bold text-sm">{property.baths}</span>
                  </div>
                  <p className="text-[10px] text-[#81969e] uppercase tracking-wider">Bathrooms</p>
                </div>

                <div className="space-y-1 text-center">
                  <div className="flex justify-center items-center gap-1.5 text-[#ffdea7]">
                    <Square className="h-3.5 w-3.5" />
                    <span className="font-bold text-sm">{property.sqft.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-[#81969e] uppercase tracking-wider">Sqft Area</p>
                </div>
              </div>

              {/* RERA permit registration code */}
              <div className="flex items-center gap-2 text-[10px] text-[#81969e] tracking-widest uppercase">
                <span className="bg-[#1a2e35] px-2.5 py-1 rounded inline-block">
                  RERA Permitted Asset
                </span>
                <span>Permit Code: #7124958-DXB</span>
              </div>
            </div>
          </div>

          {/* Right Block: Acquisition Desk, verified facts & Form (col-span-5) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between text-slate-800">
            <div className="space-y-6">
              {/* Financial block */}
              <div className="space-y-1 pb-4 border-b border-slate-200">
                <p className="text-[10px] font-label text-slate-400 uppercase tracking-widest font-semibold">
                  ASKING PRICE
                </p>
                <h4 className="font-serif text-3xl font-black text-[#041920]">
                  AED {property.price.toLocaleString()}
                </h4>
                <p className="text-xs text-slate-500 font-sans">
                  Estimated US ${(Math.round(property.price / 3.67)).toLocaleString()} (Transaction Index Stable)
                </p>
              </div>

              {/* Verified details / Description segment */}
              <div className="space-y-2 text-xs font-sans leading-relaxed text-slate-600">
                <p className="font-medium text-slate-800">Aesthetic Description:</p>
                <p>
                  This magnificent {property.type} captures the summit of Dubai's {property.location} elegance. Designed with custom oversized glass modules and natural Calacatta marble elements, it integrates scenic light seamlessly with state-of-the-art home integrations.
                </p>
              </div>

              {/* Verified premium amenities list */}
              <div className="space-y-2">
                <p className="text-[10px] font-label text-slate-400 uppercase tracking-widest font-bold">
                  AMENITIES INCLUDED
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {property.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-emerald-600" />
                      </div>
                      <span>{a}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-emerald-600" />
                    </div>
                    <span>Private Car Deck</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-emerald-600" />
                    </div>
                    <span>Concierge 24/7</span>
                  </div>
                </div>
              </div>

              {/* Direct Inquiry Desk with listings Agent */}
              <div className="bg-[#f5f3f3] p-4 rounded-xl border border-[#c2c7ca] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#ffdea7] flex-shrink-0">
                    <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#041920]">{agent.name}</h5>
                    <p className="text-[10px] text-slate-500 font-label">{agent.role}</p>
                  </div>
                </div>

                {!inquirySent ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#755a24]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#755a24]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#041920] hover:bg-[#1a2e35] text-white py-2 rounded-lg font-label text-[10px] uppercase tracking-wider font-bold transition-all text-center"
                    >
                      Secure Direct Brochure
                    </button>
                    <button
                      type="button"
                      onClick={() => onContactAgent(agent.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-label text-[10px] uppercase tracking-wider font-bold transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12.012 2C6.48 2 2.012 6.48 2.012 12c0 1.91.53 3.69 1.45 5.23L2 22l4.94-1.3c1.47.81 3.16 1.3 4.97 1.3 5.53 0 10-4.48 10-10S17.542 2 12.012 2zm6.61 14.5c-.27.75-1.57 1.4-2.14 1.47-.57.07-1.12.09-3.23-.78a10.02 10.02 0 01-4.22-3.71 8.35 8.35 0 01-1.63-3.66c0-.99.52-1.53.84-1.85.32-.32.69-.4 1.01-.4.32 0 .58.01.81.02.26.01.53-.1.74.4.27.65.92 2.22 1 2.38.08.16.14.35.03.56s-.19.32-.38.53c-.19.21-.39.38-.56.57-.18.2-.38.41-.16.8.22.37.95 1.57 2.04 2.54.91.81 1.63 1.05 2.04 1.25.41.22.61.16.83-.07.22-.24.93-.99 1.18-1.34.25-.35.5-.29.83-.16.33.13 2.1.99 2.46 1.17.36.18.61.27.69.42.09.15.09.87-.18 1.62z"/></svg>
                      Simulate live WeChat / WhatsApp
                    </button>
                  </form>
                ) : (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-150 text-center space-y-1">
                    <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                      Inquiry Registered
                    </p>
                    <p className="text-[10px] text-slate-500 font-sans">
                      Thank you. {agent.name} is preparing your secure prospectus code directly.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Book Walkthrough bottom bar */}
            <div className="pt-6 border-t border-slate-200 mt-6 flex gap-3">
              <button
                onClick={() => onBookViewing(property.title)}
                className="flex-1 bg-[#755a24] hover:bg-[#5b430e] text-on-secondary px-4 py-3.5 rounded-lg font-label text-xs uppercase tracking-widest font-black text-center cursor-pointer transition-all"
              >
                Book Walkthrough
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
