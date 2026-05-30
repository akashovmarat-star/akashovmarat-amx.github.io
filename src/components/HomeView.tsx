import React, { useState } from 'react';
import { Property, Agent, BlogArticle, Testimonial, ViewTab } from '../types';
import { PROPERTIES, AGENTS, OFF_PLAN_PROJECTS, BLOG_ARTICLES, TESTIMONIALS } from '../data';
import { Search, MapPin, Bed, Bath, Square, ArrowRight, Star, Plus, CheckCircle, ChevronLeft, ChevronRight, Mail } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ViewTab) => void;
  onBookViewing: (propertyName?: string) => void;
  onPropertyClick: (property: Property) => void;
  onContactAgent: (agent: Agent) => void;
  onValuationClick: () => void;
  setHeroFilters: (filters: { location: string; type: string }) => void;
}

export default function HomeView({
  setActiveTab,
  onBookViewing,
  onPropertyClick,
  onContactAgent,
  onValuationClick,
  setHeroFilters
}: HomeViewProps) {
  // Local state for sliders/inputs
  const [heroSearch, setHeroSearch] = useState({ location: '', type: 'Apartment' });
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter properties list for feature grid (take top 6)
  const featuredProperties = PROPERTIES.slice(0, 6);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroFilters({
      location: heroSearch.location,
      type: heroSearch.type
    });
    setActiveTab('buy');
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <div className="w-full">
      
      {/* 2. Hero Section */}
      <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEwlcyjBN91_TgcJOGbpbQpA3-qzMTifBsbmlCbrxh70thGm587rZMq8ScJ2LmC2D1x3xC-ux_52S846dIxRYbuvocGrk4epX4f0aahp-PpdoDJfl8xFI0MVSV0r8G7WOpCLlFYPDWXeNZ_Dnnv-TSqtpBQA6QO34GqDnfBkHsTfjfLJ_ZLvsELBRXt_mu3K5dFC68hDPlT7W4uLOs3siExF4BTNAHF-oHLIBWbA5rIfPI-xY3dFt-ZpX8_ZuN5uqJYUELbby7m1K8")`
          }}
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Hero Interactive Widget */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up w-full">
          <span className="inline-block font-label text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-[0.25em] text-[#ffdea7] max-w-full truncate sm:overflow-visible sm:whitespace-normal">
            Dubai's Premium Property Partner
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl leading-[1.1] font-bold text-white tracking-tight break-words">
            Move with Confidence.
          </h1>
          <p className="font-sans text-sm sm:text-lg text-white/95 max-w-[95%] sm:max-w-2xl mx-auto leading-relaxed">
            Acquire, rent, or invest in Dubai's most magnificent residences — guided by boutique architectural intelligence at every handover parameter.
          </p>

          {/* Luxury Search Engine Grid Box */}
          <div className="bg-white p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-[#E8E4DE] text-slate-800">
            <form onSubmit={handleHeroSearchSubmit}>
              {/* Type Category Selection bar */}
              <div className="flex flex-wrap gap-2 mb-3 border-b border-slate-100 pb-3 justify-center sm:justify-start">
                {['Apartment', 'Villa', 'Penthouse', 'Townhouse'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setHeroSearch({ ...heroSearch, type: t })}
                    className={`px-5 py-1.5 rounded-lg font-label text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      heroSearch.type === t
                        ? 'bg-[#041920] text-white font-bold'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Dynamic Location & Action inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center px-2">
                
                {/* Location Search Input */}
                <div className="flex flex-col text-left border-r border-slate-100 md:pr-4">
                  <span className="text-[10px] font-label text-slate-400 uppercase tracking-widest mb-1">
                    Select Location
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-[#755a24]" />
                    <input
                      type="text"
                      placeholder="Palm Jumeirah, Dubai Marina..."
                      value={heroSearch.location}
                      onChange={(e) => setHeroSearch({ ...heroSearch, location: e.target.value })}
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-slate-800 placeholder-slate-400 font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Constant Price Range */}
                <div className="flex flex-col text-left md:pl-4">
                  <span className="text-[10px] font-label text-slate-400 uppercase tracking-widest mb-1">
                    Target Price Range
                  </span>
                  <p className="text-sm font-semibold text-[#041920] font-sans">
                    AED 2M — AED 50M+
                  </p>
                </div>

                {/* Apply search parameter */}
                <button
                  type="submit"
                  className="w-full bg-[#755a24] hover:bg-[#041920] hover:text-[#ffdea7] text-white py-4.5 rounded-xl flex items-center justify-center gap-2 font-label text-xs uppercase tracking-widest font-black transition-all cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  Search Properties
                </button>

              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Stats Strip */}
      <section className="bg-[#1a2e35] py-12 px-6 border-y border-[#364a51]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="font-serif text-3xl sm:text-4xl text-[#ffdea7] font-bold">1200+</p>
            <p className="font-label text-[10px] text-[#81969e] uppercase tracking-widest">Verified Listings</p>
          </div>
          <div className="space-y-1 border-l border-[#364a51]/35">
            <p className="font-serif text-3xl sm:text-4xl text-[#ffdea7] font-bold">AED 1.2B+</p>
            <p className="font-label text-[10px] text-[#81969e] uppercase tracking-widest">Annual Trade Vol</p>
          </div>
          <div className="space-y-1 border-l border-[#364a51]/35">
            <p className="font-serif text-3xl sm:text-4xl text-[#ffdea7] font-bold">15+ Years</p>
            <p className="font-label text-[10px] text-[#81969e] uppercase tracking-widest">Dubai Track Record</p>
          </div>
          <div className="space-y-1 border-l border-[#364a51]/35">
            <p className="font-serif text-3xl sm:text-4xl text-[#ffdea7] font-bold">99.2%</p>
            <p className="font-label text-[10px] text-[#81969e] uppercase tracking-widest">Investor Satisfaction</p>
          </div>
        </div>
      </section>

      {/* 4. Featured Properties */}
      <section className="bg-white py-24 px-6 border-b border-slate-100" id="featured-section">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section title & view-all navigation header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24]">
                Handpicked For You
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black tracking-tight">
                Featured Premium Listings
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('buy')}
              className="text-[#041920] hover:text-[#755a24] font-label text-xs font-semibold uppercase tracking-widest border-b border-[#041920] hover:border-[#755a24] pb-1 transition-colors"
            >
              View Full Properties Portfolio
            </button>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => {
              const agent = AGENTS.find((a) => a.id === prop.agentId) || AGENTS[0];
              return (
                <article 
                  key={prop.id}
                  className="group bg-[#fbf9f9] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E8E4DE] transition-transform duration-300 hover:scale-[1.01]"
                >
                  {/* Photo area with active badge */}
                  <div className="relative h-64 overflow-hidden" onClick={() => onPropertyClick(prop)}>
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" 
                    />
                    
                    {/* Floating badge */}
                    {prop.badge && (
                      <span className="absolute top-4 left-4 bg-white/95 text-[#041920] font-label text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {prop.badge}
                      </span>
                    )}

                    {/* Asking Price Overlay tag */}
                    <div className="absolute bottom-4 left-4 bg-[#041920]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-[#364a51]">
                      <span className="font-sans font-bold text-sm">AED {prop.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Property Details text and RERA facts */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 
                        onClick={() => onPropertyClick(prop)}
                        className="font-serif text-lg text-[#041920] font-bold tracking-tight hover:text-[#755a24] cursor-pointer truncate"
                      >
                        {prop.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-sans flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#755a24]" />
                        {prop.address}
                      </p>
                    </div>

                    {/* Numeric facts row */}
                    <div className="flex gap-4 py-3 border-y border-slate-200/60 text-xs text-slate-500 justify-between font-sans">
                      <span className="flex items-center gap-1"><Bed className="h-4 w-4 text-[#755a24]" /> {prop.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-[#755a24]" /> {prop.baths} Baths</span>
                      <span className="flex items-center gap-1"><Square className="h-3.5 w-3.5 text-[#755a24]" /> {prop.sqft.toLocaleString()} Sqft</span>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <img src={agent.image} alt={agent.name} className="w-8 h-8 rounded-full object-cover border border-[#ffdea7]" />
                        <span className="text-xs font-medium text-slate-700 truncate max-w-[100px]">{agent.name}</span>
                      </div>
                      
                      <button
                        onClick={() => onPropertyClick(prop)}
                        className="text-[#755a24] hover:text-[#041920] font-label text-[10px] uppercase tracking-wider font-bold"
                      >
                        View Floorplans
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Sell/Rent Section - Strategic valuation CTA */}
      <section className="bg-slate-50 py-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left panel: Illustration with RERA volume statistics overlay */}
          <div className="w-full lg:w-1/2 relative">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4e2ozSMda6gfgdZ44C0Rw8hSunWBYnzvMEpp5AfNBKEiBepwUgcYFEYjPSpzcFaXxDHoR4LAmDSr4-qDvFUvKChjCp8goF3s7OTDQTEJyQOeqNxVd4AmmQe9HKmoD2zg9QuxkEj2xi0JYlHsOgSSMEO_DH2KJt3pzaqZhDlpvu95ovKzN3muwjFwgdNSjjJVF4T00GyRGoGhnW_FZ4Y_lj3OJ1sJOF0j8UmnvpC8OUQhj-ddzs59Dj7gzE1p6cxXDrRJjtSc5fKcr" 
              alt="Luxury Italian Calacatta marble kitchen" 
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl border border-[#E8E4DE]" 
            />
            {/* Hard-edge Overlay panel indicating RERA premiums */}
            <div className="absolute -bottom-6 -right-6 bg-[#041920] text-white p-6 rounded-xl border border-[#364a51] shadow-2xl space-y-1 max-w-[240px] hidden sm:block">
              <p className="font-serif text-3xl font-bold text-[#ffdea7]">2.5%</p>
              <p className="font-label text-[10px] uppercase tracking-widest text-[#81969e]">Higher Closing Vol</p>
              <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
                We manage bespoke lists of international HNW cash buyers waiting for handover.
              </p>
            </div>
          </div>

          {/* Right panel: text and strategic options */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24]">
              Maximize Your Asset
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black tracking-tight leading-tight">
              Listing your property requires a strategy — not just an advertisement.
            </h2>
            <p className="text-slate-600 font-sans text-sm leading-relaxed">
              At AMX.ae, we don't list properties statically. We construct cinematic stories utilizing professional architectural photography and targeted retargeting across London, Riyadh, Zurich, and Doha cash buyers to acquire maximum yields.
            </p>

            {/* Strategic benefits */}
            <ul className="space-y-3 pt-2 font-sans text-xs text-slate-700">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-[#755a24] flex-shrink-0" />
                <span>Bespoke custom-made architectural photography and cinematic 4k drone tours</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-[#755a24] flex-shrink-0" />
                <span>Exclusive off-market integration to high-net-worth investment circles and syndicates</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-[#755a24] flex-shrink-0" />
                <span>Strategic digital campaign syndication across Bloomberg, Financial Times property avenues</span>
              </li>
            </ul>

            <button
              onClick={onValuationClick}
              className="bg-[#041920] hover:bg-[#1a2e35] text-white px-8 py-4.5 rounded-xl font-label text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Get a Free Estate valuation
              <ArrowRight className="h-4 w-4 text-[#ffdea7]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Off-Plan Showcase */}
      <section className="bg-white py-24 px-6 border-b border-slate-100" id="off-plan-section">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24]">
              Future Investments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black tracking-tight">
              Off-Plan Early Stage Showcase
            </h2>
            <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto">
              Secure key positions on Dubai's upcoming architectural masterworks before public sales open.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFF_PLAN_PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                className="relative group h-[480px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-end"
              >
                {/* Photo backdrop */}
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
                
                {/* Black Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Content Box */}
                <div className="relative z-10 p-6 space-y-4 text-white">
                  <div>
                    <span className="text-[10px] font-label text-[#ffdea7] uppercase tracking-widest block mb-1">
                      {proj.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold">{proj.title}</h3>
                  </div>

                  <p className="text-[10px] text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {proj.desc}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-white/20 text-xs">
                    <span className="font-sans text-slate-300">Handover: <strong className="text-white">{proj.handover}</strong></span>
                    <span className="font-sans text-[#ffdea7]">Starting: <strong className="text-white">{proj.priceText}</strong></span>
                  </div>

                  <button
                    onClick={() => onBookViewing(proj.title)}
                    className="w-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white py-3 rounded-xl font-label text-[10px] uppercase tracking-wider font-bold transition-all text-center cursor-pointer select-none"
                  >
                    Register Early Allocation
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Services Section */}
      <section className="bg-[#041920] text-white py-24 px-6 border-b border-[#364a51]/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-[#ffdea7]">
              Our Expertise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Everything You Need. One Advisor Partner.
            </h2>
            <p className="text-xs text-[#81969e] max-w-sm mx-auto font-sans">
              Our specialists offer end-to-end guidance to navigate buy, lease, off-plan portfolio, and mortgage transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Buy Acquisition', icon: 'home', desc: 'Secure high-end residences with RERA-certified legal verification and direct title transfer coordination.' },
              { title: 'Rent Advisory', icon: 'key', desc: 'Personalized premium rental support inside Dubai’s most high-value communities.' },
              { title: 'Portfolio Liquidation', icon: 'sell', desc: 'High-yield marketing and global retargeting structures to maximize portfolio disinvestment returns.' },
              { title: 'Off-Plan Allocations', icon: 'apartment', desc: 'Direct access to Binghatti, Emaar, and Nakheel early stage allocations and floorplans.' },
              { title: 'Property Management', icon: 'settings_suggest', desc: 'Comprehensive residential tracking, tenant checks, and maintenance coordination for global owners.' },
              { title: 'Mortgage Advisory', icon: 'account_balance', desc: 'Facilitation of competitive financing and custom banking terms with premium local UAE institutions.' }
            ].map((srv, idx) => (
              <div 
                key={idx}
                className="bg-[#1a2e35]/45 hover:bg-[#1a2e35] p-8 rounded-2xl border border-[#364a51]/55 transition-all space-y-4"
              >
                <span className="material-symbols-outlined text-[#ffdea7] text-3xl">
                  {srv.icon}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">{srv.title}</h3>
                <p className="text-sm text-[#81969e] font-sans leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Featured Agents */}
      <section className="bg-white py-24 px-6 border-b border-slate-100" id="agents-section">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24]">
              Meet Our Experts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black tracking-tight">
              The Advisors Behind Your Handover
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AGENTS.map((agent) => (
              <div key={agent.id} className="group flex flex-col space-y-4 bg-[#fbf9f9] p-4 rounded-2xl border border-[#E8E4DE]">
                <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-slate-100 shadow-sm">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* WhatsApp Action Overlays on hover */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => onContactAgent(agent)}
                      className="w-full bg-[#25D366] text-white py-3 rounded-lg flex items-center justify-center gap-1.5 font-label text-[10px] uppercase tracking-widest font-black shadow-lg cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12.012 2C6.48 2 2.012 6.48 2.012 12c0 1.91.53 3.69 1.45 5.23L2 22l4.94-1.3c1.47.81 3.16 1.3 4.97 1.3 5.53 0 10-4.48 10-10S17.542 2 12.012 2zm6.61 14.5c-.27.75-1.57 1.4-2.14 1.47-.57.07-1.12.09-3.23-.78a10.02 10.02 0 01-4.22-3.71 8.35 8.35 0 01-1.63-3.66c0-.99.52-1.53.84-1.85.32-.32.69-.4 1.01-.4.32 0 .58.01.81.02.26.01.53-.1.74.4.27.65.92 2.22 1 2.38.08.16.14.35.03.56s-.19.32-.38.53c-.19.21-.39.38-.56.57-.18.2-.38.41-.16.8.22.37.95 1.57 2.04 2.54.91.81 1.63 1.05 2.04 1.25.41.22.61.16.83-.07.22-.24.93-.99 1.18-1.34.25-.35.5-.29.83-.16.33.13 2.1.99 2.46 1.17.36.18.61.27.69.42.09.15.09.87-.18 1.62z"/></svg>
                      Chat WhatsApp
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-[#041920] font-bold">{agent.name}</h3>
                  <p className="font-label text-[10px] text-[#755a24] uppercase tracking-widest">{agent.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Market Insights */}
      <section className="bg-slate-50 py-24 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex justify-between items-end gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-[#755a24]">
                Knowledge Is Power
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#041920] font-black tracking-tight">
                Dubai Real Estate Journal
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_ARTICLES.map((art) => (
              <article 
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group cursor-pointer"
              >
                <div className="h-56 overflow-hidden bg-slate-100">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-3">
                  <span className="inline-block font-label text-[10px] text-[#755a24] uppercase tracking-wider">
                    {art.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#041920] line-clamp-2 leading-snug group-hover:text-[#755a24] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="bg-[#1a2e35] py-24 px-6 relative overflow-hidden text-white border-b border-[#364a51]/30">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <span className="font-label text-xs uppercase tracking-[0.25em] text-[#ffdea7]">
            Client Stories
          </span>

          <div className="bg-white/5 backdrop-blur-md p-8 sm:p-16 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="flex justify-center gap-1 mb-6 text-[#ffdea7]">
              {Array.from({ length: TESTIMONIALS[activeTestimonialIdx].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="font-serif text-lg sm:text-2xl italic text-white/95 leading-relaxed mb-8">
              "{TESTIMONIALS[activeTestimonialIdx].quote}"
            </p>

            <div>
              <p className="font-label text-xs uppercase tracking-widest text-[#ffdea7] font-bold">
                {TESTIMONIALS[activeTestimonialIdx].author}
              </p>
              <p className="text-[10px] text-[#81969e] uppercase tracking-wider mt-1">
                {TESTIMONIALS[activeTestimonialIdx].role}
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 11. Newsletter CTA */}
      <section className="bg-[#755a24] py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-left space-y-2 text-white">
            <h2 className="font-serif text-2xl sm:text-3xl font-black">
              Stay ahead of Dubai's property dynamics.
            </h2>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Register to receive vetted layout proposals, offmarket updates, and quarterly appraiser reports directly.
            </p>
          </div>

          <div className="md:w-1/2 w-full">
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Private email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-4 py-3.5 text-xs font-sans"
                />
                <button
                  type="submit"
                  className="bg-[#041920] text-[#ffdea7] px-6 py-3.5 rounded-lg font-label text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-[#041920] transition-all shrink-0 cursor-pointer"
                >
                  Join Newsletter
                </button>
              </form>
            ) : (
              <div className="bg-white/10 p-4 border border-white/20 rounded-lg flex items-center gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-[#ffdea7] flex-shrink-0" />
                <p className="text-xs font-sans">
                  Exclusive dossier subscription certified for: <strong className="text-white">{newsletterEmail}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
