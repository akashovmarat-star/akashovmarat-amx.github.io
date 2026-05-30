import React, { useState } from 'react';
import { ViewTab } from '../types';
import { Menu, X, Search, Calendar, ChevronDown, CheckCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onBookViewingClick: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, onBookViewingClick, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navItems: { label: string; tab: ViewTab }[] = [
    { label: 'Buy', tab: 'buy' },
    { label: 'Rent', tab: 'rent' },
    { label: 'Off-Plan', tab: 'off-plan' },
    { label: 'Mortgage', tab: 'mortgage' },
    { label: 'KYC Form', tab: 'kyc' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
    // Switch to buy tab to view search results
    setActiveTab('buy');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#041920] text-white border-b border-[#364a51] shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo & Signature */}
        <div 
          onClick={() => { setActiveTab('home'); }} 
          className="flex items-center gap-2 cursor-pointer group"
          id="logo-container"
        >
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-[0.2em] group-hover:text-[#ffdea7] transition-colors">
              AMX
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-[#ffdea7]">
              REAL ESTATE
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                setSearchVal('');
              }}
              className={`font-label text-xs uppercase tracking-[0.15em] transition-all pb-1 ${
                activeTab === item.tab
                  ? 'text-[#ffdea7] font-bold border-b-2 border-[#ffdea7]'
                  : 'text-white opacity-80 hover:text-[#ffdea7] hover:opacity-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search & Actions block */}
        <div className="flex items-center gap-4">
          {/* Quick Search Input */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center border-b border-[#81969e]/50 px-2 py-1 focus-within:border-[#ffdea7] transition-all">
            <Search className="h-4 w-4 text-[#81969e]" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-[#81969e] w-32 focus:outline-none focus:ring-0 px-2 font-sans"
            />
          </form>

          {/* Book Viewing Action */}
          <button
            onClick={onBookViewingClick}
            className="hidden sm:flex bg-[#ffdea7] text-[#041920] px-5 py-2.5 rounded-lg font-label text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all duration-150 shadow-md"
            id="book-viewing-btn"
          >
            Book a Viewing
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-[#ffdea7] transition-colors p-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a2e35] border-t border-[#364a51] px-6 py-6 space-y-4 animate-fade-in-up">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#041920] rounded-lg px-3 py-2 border border-[#364a51]">
            <Search className="h-4 w-4 text-[#81969e]" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 w-full px-2"
            />
          </form>

          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setSearchVal('');
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2.5 rounded-lg text-sm font-label uppercase tracking-widest transition-colors ${
                  activeTab === item.tab
                    ? 'bg-[#041920] text-[#ffdea7] font-semibold'
                    : 'text-white/90 hover:bg-[#041920]/45 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onBookViewingClick();
            }}
            className="w-full bg-[#ffdea7] text-[#041920] py-3 rounded-lg font-label text-xs font-bold uppercase tracking-wider text-center block mt-4 hover:bg-white transition-colors"
          >
            Book a Viewing
          </button>
        </div>
      )}
    </header>
  );
}
