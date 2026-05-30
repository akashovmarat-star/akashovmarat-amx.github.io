import React from 'react';
import { ViewTab } from '../types';
import { ShieldAlert, Globe, Camera, PhoneCall, Key, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ViewTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="w-full bg-[#041920] text-[#81969e] font-sans border-t border-[#364a51] pt-16 pb-8 transition-colors duration-200">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#364a51]/50">
        
        {/* Col-5: Brand identity & description */}
        <div className="md:col-span-5 space-y-6 text-left">
          {/* Logo signature */}
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-white">
              AMX
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-[#ffdea7]">
              REAL ESTATE
            </span>
          </div>

          <p className="text-xs text-[#81969e] font-sans max-w-sm leading-relaxed">
            Dubai's premier boutique real estate agency, specializing in high-end residential acquisitions, certified RERA compliance, and strategic investment management across the Arabian Gulf.
          </p>

          {/* Socials connections badge links */}
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full border border-[#364a51] flex items-center justify-center text-[#ffdea7] hover:text-[#ffdea7] hover:bg-white/10 transition-colors" aria-label="Website">
              <Globe className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-[#364a51] flex items-center justify-center text-[#ffdea7] hover:text-[#ffdea7] hover:bg-white/10 transition-colors" aria-label="Instagram">
              <Camera className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Col-3: Catalog Exploration */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="font-label text-[10px] text-[#ffdea7] uppercase tracking-[0.25em] font-semibold">
            Explore
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('buy')} className="hover:text-white transition-colors cursor-pointer text-left">
                Buy Properties
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('rent')} className="hover:text-white transition-colors cursor-pointer text-left">
                Rent Properties
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('off-plan')} className="hover:text-white transition-colors cursor-pointer text-left">
                Off-Plan Ventures
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('mortgage')} className="hover:text-white transition-colors cursor-pointer text-left">
                Mortgage Calculator
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('kyc')} className="hover:text-white transition-colors cursor-pointer text-left">
                KYC Registry Form
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('wordpress')} className="hover:text-[#ffdea7] text-[#ffdea7]/95 font-semibold transition-colors cursor-pointer text-left">
                WordPress Integration
              </button>
            </li>
          </ul>
        </div>

        {/* Col-2: Advisory Services */}
        <div className="md:col-span-2 space-y-4 text-left">
          <h4 className="font-label text-[10px] text-[#ffdea7] uppercase tracking-[0.25em] font-semibold">
            Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <span className="text-slate-400">Valuation Appraisal</span>
            </li>
            <li>
              <span className="text-slate-400">RERA Compliance</span>
            </li>
            <li>
              <span className="text-slate-400">Mortgage advisory</span>
            </li>
            <li>
              <span className="text-slate-400">Maybach Chauffeur</span>
            </li>
          </ul>
        </div>

        {/* Col-2: Company */}
        <div className="md:col-span-2 space-y-4 text-left">
          <h4 className="font-label text-[10px] text-[#ffdea7] uppercase tracking-[0.25em] font-semibold">
            Company
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                About AMX.ae
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                Contact Desk
              </button>
            </li>
            <li className="text-slate-400">Careers</li>
            <li className="text-slate-400">Agency License</li>
          </ul>
        </div>

      </div>

      {/* Lower Footer terms & copyright notice */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#81969e]/80">
        <p>© 2026 AMX.ae Dubai Real Estate. RERA Registration #4059. All Rights Reserved.</p>
        <div className="flex gap-6 font-medium">
          <span className="hover:text-white cursor-pointer">Terms &amp; Conditions</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Cookie Statement</span>
          <span className="hover:text-white cursor-pointer">Sitemap</span>
        </div>
      </div>

    </footer>
  );
}
