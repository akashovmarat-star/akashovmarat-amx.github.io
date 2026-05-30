import React, { useState, useEffect } from 'react';
import { Property, Agent, PropertyType, SearchQuery } from '../types';
import { PROPERTIES, AGENTS } from '../data';
import { Heart, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Map, SlidersHorizontal, Sliders, CheckSquare, Square as LucideSquare } from 'lucide-react';

interface ListingsViewProps {
  initialSearchValues?: { location: string; type: string };
  onPropertyClick: (property: Property) => void;
  onContactAgent: (agent: Agent) => void;
  onBookViewing: (propertyName: string) => void;
}

export default function ListingsView({
  initialSearchValues,
  onPropertyClick,
  onContactAgent,
  onBookViewing
}: ListingsViewProps) {
  // Navigation / Filter State
  const [filters, setFilters] = useState<SearchQuery>({
    location: initialSearchValues?.location || '',
    type: initialSearchValues?.type || 'All Types',
    minPrice: '',
    maxPrice: '',
    beds: '',
    amenities: []
  });

  const [appliedFilters, setAppliedFilters] = useState<SearchQuery>({ ...filters });
  const [sortBy, setSortBy] = useState('Newest First');
  const [mapView, setMapView] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync initial search from hero
  useEffect(() => {
    if (initialSearchValues) {
      setFilters((prev) => ({
        ...prev,
        location: initialSearchValues.location,
        type: initialSearchValues.type as PropertyType | 'All Types'
      }));
      setAppliedFilters((prev) => ({
        ...prev,
        location: initialSearchValues.location,
        type: initialSearchValues.type as PropertyType | 'All Types'
      }));
    }
  }, [initialSearchValues]);

  // Handle bedroom filter selection
  const handleBedSelect = (bedsNum: number | 'Studio' | '') => {
    let bedVal: number | '' = '';
    if (bedsNum === 'Studio') bedVal = 1; // map studio to 1 bed
    else if (typeof bedsNum === 'number') bedVal = bedsNum;
    setFilters({ ...filters, beds: bedVal });
  };

  // Handle amenities toggling
  const handleAmenityToggle = (amenity: string) => {
    const list = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: list });
  };

  // Filter computation
  const filteredListings = PROPERTIES.filter((p) => {
    // 1. Location match
    if (appliedFilters.location) {
      const locQuery = appliedFilters.location.toLowerCase();
      const inLoc = p.location.toLowerCase().includes(locQuery) || 
                    p.address.toLowerCase().includes(locQuery);
      if (!inLoc) return false;
    }

    // 2. Property type match
    if (appliedFilters.type && appliedFilters.type !== 'All Types') {
      if (p.type !== appliedFilters.type) return false;
    }

    // 3. Price range Match
    if (appliedFilters.minPrice !== '') {
      if (p.price < appliedFilters.minPrice) return false;
    }
    if (appliedFilters.maxPrice !== '') {
      if (p.price > appliedFilters.maxPrice) return false;
    }

    // 4. Bedroom counts match
    if (appliedFilters.beds !== '') {
      if (p.beds !== appliedFilters.beds) return false;
    }

    // 5. Amenities checked Match
    if (appliedFilters.amenities.length > 0) {
      const allMatch = appliedFilters.amenities.every((am) => p.amenities.includes(am));
      if (!allMatch) return false;
    }

    return true;
  });

  // Sorting
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'Price Low-High') return a.price - b.price;
    if (sortBy === 'Price High-Low') return b.price - a.price;
    // Default newest (id desc fallback)
    return parseInt(b.id) - parseInt(a.id);
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const applyActiveFilters = () => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 space-y-8">
      
      {/* Search Breadcrumb */}
      <section className="py-8 border-b border-slate-200">
        <nav className="mb-4">
          <ul className="flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-slate-400">
            <li><a href="#" className="hover:text-[#041920]">Home</a></li>
            <li><ChevronRight className="h-3 w-3 text-slate-300" /></li>
            <li className="text-[#041920] font-bold">Buy Listings</li>
          </ul>
        </nav>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#041920] font-black tracking-tight" id="listings-header-title">
          Properties for Sale in Dubai
        </h1>
      </section>

      {/* Main Container Layout */}
      <div className="flex flex-col lg:flex-row gap-8" id="listings-main-grid">
        
        {/* Filter Sidebar Column */}
        <aside className="w-full lg:w-[280px] shrink-0" id="filter-sidebar">
          <div className="sticky top-28 bg-[#f5f3f3] p-6 rounded-2xl border border-[#c2c7ca] space-y-5">
            
            <h3 className="font-serif text-lg font-bold text-[#041920] flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="material-symbols-outlined text-[20px]">tune</span>
              Filters Registry
            </h3>

            {/* Property Type selection dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-semibold">
                Property Category
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#755a24] text-slate-700 font-sans"
              >
                <option>All Types</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Townhouse</option>
              </select>
            </div>

            {/* Community name filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-semibold">
                Target Community
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Palm Jumeirah..."
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#755a24] text-slate-700 font-sans"
                />
              </div>
            </div>

            {/* Price ranges inputs */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-semibold">
                Price Range (AED)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value === '' ? '' : parseInt(e.target.value) })
                  }
                  className="w-full bg-white border border-[#c2c7ca] rounded-lg px-2.5 py-1.5 text-xs text-slate-700"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value === '' ? '' : parseInt(e.target.value) })
                  }
                  className="w-full bg-white border border-[#c2c7ca] rounded-lg px-2.5 py-1.5 text-xs text-slate-700"
                />
              </div>
            </div>

            {/* Bedrooms horizontal selections bar */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-semibold">
                Bedrooms Code
              </label>
              <div className="flex flex-wrap gap-1">
                {['', 'Studio', 2, 3, 5, 7].map((b, idx) => {
                  let active = false;
                  if (b === '' && filters.beds === '') active = true;
                  else if (b === 'Studio' && filters.beds === 1) active = true;
                  else if (typeof b === 'number' && filters.beds === b) active = true;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleBedSelect(b as any)}
                      className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer select-none border ${
                        active
                          ? 'bg-[#041920] text-white border-[#041920]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {b === '' ? 'Any' : b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verified amenities list checkboxes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-semibold">
                Core amenities
              </label>
              <div className="space-y-1.5 pt-1">
                {['Swimming Pool', 'Gymnasium', 'Sea View'].map((am) => {
                  const checked = filters.amenities.includes(am);
                  return (
                    <label key={am} className="flex items-center gap-2 text-xs text-slate-600 select-none cursor-pointer hover:text-slate-900 leading-snug">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleAmenityToggle(am)}
                        className="h-3.5 w-3.5 rounded border-[#c2c7ca] text-[#755a24] focus:ring-1 focus:ring-[#755a24]"
                      />
                      <span>{am}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Trigger Button list updates */}
            <button
              onClick={applyActiveFilters}
              className="w-full bg-[#041920] hover:bg-[#1a2e35] text-white py-3.5 rounded-xl font-label text-[10px] uppercase tracking-widest font-black transition-colors cursor-pointer select-none text-center block"
            >
              Apply Active Filters
            </button>

          </div>
        </aside>

        {/* Results Area section panel */}
        <section className="flex-1 space-y-6">
          
          {/* Top Sort view selections panel */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f5f3f3]/50 p-4 rounded-xl border border-slate-200 gap-4">
            <p className="text-xs text-slate-500 font-sans font-medium" id="results-count-text">
              Showing <strong className="text-slate-800">{sortedListings.length}</strong> luxurious matches of <strong className="text-slate-800">1,436 PROPERTIES</strong>
            </p>

            <div className="flex items-center gap-4 text-xs">
              {/* Map/List view toggler */}
              <button
                onClick={() => setMapView(!mapView)}
                className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-wider border border-slate-300 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors cursor-pointer select-none"
              >
                <Map className="h-4 w-4 text-[#755a24]" />
                {mapView ? 'Floorplan List' : 'Dynamic Dubai Map'}
              </button>

              {/* Sorting options */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#81969e]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[#041920] font-bold focus:ring-0 focus:outline-none cursor-pointer"
                >
                  <option>Newest First</option>
                  <option>Price Low-High</option>
                  <option>Price High-Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Condition: Dynamic Vector Map block */}
          {mapView ? (
            <div className="bg-[#1a2e35] text-white p-8 rounded-2xl border border-[#364a51] h-[500px] flex flex-col justify-between relative overflow-hidden shadow-inner font-sans animate-fade-in-up">
              
              {/* Decorative Dubai Map grid outlines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
                <div className="border border-white/10 h-full w-full grid grid-cols-12 grid-rows-12">
                  {Array.from({ length: 144 }).map((_, idx) => (
                    <div key={idx} className="border-r border-b border-white/5" />
                  ))}
                </div>
              </div>

              {/* Ocean layout & sand contours */}
              <div className="absolute top-1/3 left-0 right-0 h-[4px] bg-[#ffdea7]/25 transform rotate-2 pointer-events-none"></div>
              
              <div className="relative z-10 flex justify-between items-flex">
                <div>
                  <span className="text-[10px] uppercase font-label text-[#ffdea7] tracking-widest block mb-1">
                    DUBAI SPATIAL RADAR
                  </span>
                  <p className="font-serif text-2xl font-black text-white">Interactive Coastal Location Map</p>
                </div>
                <div className="bg-[#041920] px-3 py-1.5 rounded-lg border border-white/10 text-[10px]">
                  RERA GIS ID: GPS-990-DXB
                </div>
              </div>

              {/* Map Coordinates with interactive property pins */}
              <div className="relative flex-grow flex items-center justify-center">
                
                {/* Coastal Palm Jumeirah representation visual */}
                <div className="absolute w-44 h-44 rounded-full border border-[#ffdea7]/30 bg-radial from-[#ffdea7]/5 to-[#041920]/40 flex items-center justify-center animate-pulse">
                  <span className="text-[9px] uppercase font-label tracking-widest text-white/40">PALM JUMEIRAH</span>
                </div>

                {sortedListings.map((prop, index) => {
                  // Coordinate positions
                  const offsets = [
                    { t: '15%', l: '35%' },
                    { t: '55%', l: '65%' },
                    { t: '40%', l: '15%' },
                    { t: '75%', l: '45%' },
                    { t: '50%', l: '85%' },
                    { t: '25%', l: '70%' },
                  ];
                  const pos = offsets[index % offsets.length];

                  return (
                    <div 
                      key={prop.id}
                      onClick={() => onPropertyClick(prop)}
                      className="absolute group flex items-center gap-2 cursor-pointer transition-transform z-20 hover:z-50"
                      style={{ top: pos.t, left: pos.l }}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#755a24] text-white border-2 border-[#ffdea7] flex items-center justify-center shadow-lg relative group-hover:scale-110 transition-transform">
                        <MapPin className="h-3.5 w-3.5 text-white fill-current animate-bounce" />
                        
                        {/* Pulse effect */}
                        <span className="absolute -inset-1 rounded-full border border-[#ffdea7]/60 animate-ping opacity-45"></span>
                      </div>

                      {/* Floating tooltip box */}
                      <div className="bg-[#041920] text-xs p-2.5 rounded-xl border border-[#364a51] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-10 left-1/2 -translate-x-1/2 shadow-2xl pointer-events-none w-48 flex flex-col gap-2 scale-95 group-hover:scale-100 origin-bottom">
                        <div className="relative h-24 w-full rounded-lg overflow-hidden border border-white/10">
                          <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-bold font-serif text-sm truncate">{prop.title}</p>
                          <p className="text-[#ffdea7] text-[11px] font-sans font-bold">AED {prop.price.toLocaleString()}</p>
                          <div className="flex items-center gap-2 text-slate-400 text-[10px] pt-1">
                            <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {prop.beds}</span>
                            <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {prop.baths}</span>
                            <span className="flex items-center gap-1"><Square className="h-3 w-3" /> {prop.sqft}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative z-10 flex justify-between items-center text-[10px] text-slate-300 border-t border-white/10 pt-4">
                <p>Click any GPS pin to safely request RERA parcel coordinates dossier.</p>
                <p className="font-bold text-[#ffdea7]">Active matching items on map: {sortedListings.length}</p>
              </div>
            </div>
          ) : (
            /* Listings cards grid directory */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedListings.map((prop) => {
                const agent = AGENTS.find((a) => a.id === prop.agentId) || AGENTS[0];
                const isFav = favorites.includes(prop.id);

                return (
                  <article 
                    key={prop.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DE] shadow-sm relative hover:shadow-xl transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* Top image box */}
                    <div className="relative aspect-[4/3] overflow-hidden" onClick={() => onPropertyClick(prop)}>
                      <img 
                        src={prop.image} 
                        alt={prop.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" 
                      />
                      
                      {/* Badge overlay */}
                      {prop.badge && (
                        <div className="absolute top-4 left-4 bg-[#041920] text-white font-label text-[9px] px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                          {prop.badge}
                        </div>
                      )}

                      {/* Favorite button toggler */}
                      <button
                        onClick={(e) => toggleFavorite(prop.id, e)}
                        className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm shadow-md border pointer-events-auto transition-transform active:scale-90 ${
                          isFav 
                            ? 'bg-[#041920] text-[#ffdea7] border-[#041920]' 
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:text-red-500'
                        }`}
                        aria-label="Favorite property"
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {/* Asking price overlays */}
                      <div className="absolute bottom-4 left-4 bg-[#041920]/95 text-white px-3 py-1.5 rounded-lg border border-[#364a51]">
                        <span className="font-sans font-bold text-sm">AED {prop.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Metadata specs list */}
                    <div className="p-5 space-y-4">
                      
                      <div className="space-y-1">
                        <h3 
                          onClick={() => onPropertyClick(prop)}
                          className="font-serif text-[#041920] text-base font-black tracking-tight hover:text-[#755a24] cursor-pointer truncate"
                        >
                          {prop.title}
                        </h3>
                        <p className="text-slate-400 text-[11px] font-sans flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#755a24]" />
                          {prop.address}
                        </p>
                      </div>

                      {/* Numeric counters row */}
                      <div className="flex justify-between font-sans text-xs text-slate-500 py-2.5 border-y border-slate-100">
                        <span className="flex items-center gap-1"><Bed className="h-4 w-4 text-[#755a24]" /> {prop.beds} Beds</span>
                        <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-[#755a24]" /> {prop.baths} Baths</span>
                        <span className="flex items-center gap-1"><Square className="h-3.5 w-3.5 text-[#755a24]" /> {prop.sqft.toLocaleString()} Sqft</span>
                      </div>

                      {/* Agent port details */}
                      <div className="flex justify-between items-center pt-1">
                        <div className="flex items-center gap-2">
                          <img src={agent.image} alt={agent.name} className="w-8 h-8 rounded-full object-cover border border-[#ffdea7]" />
                          <span className="text-xs text-slate-700 font-medium truncate max-w-[90px]">{agent.name}</span>
                        </div>
                        
                        <button
                          onClick={() => onPropertyClick(prop)}
                          className="text-[#755a24] hover:text-[#041920] font-label text-[10px] uppercase tracking-wider font-bold"
                        >
                          View Details
                        </button>
                      </div>

                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Catalog directory empty fallback */}
          {sortedListings.length === 0 && (
            <div className="text-center py-20 bg-[#f5f3f3] rounded-2xl border border-[#c2c7ca] space-y-4 font-sans max-w-lg mx-auto">
              <p className="font-serif text-lg font-bold text-[#041920]">No Matching Portfolios Available</p>
              <p className="text-xs text-slate-500">
                Your filters applied are too specific for our active RERA listings. Clear filters to see full options.
              </p>
              <button
                onClick={() => {
                  setFilters({
                    location: '',
                    type: 'All Types',
                    minPrice: '',
                    maxPrice: '',
                    beds: '',
                    amenities: []
                  });
                  setAppliedFilters({
                    location: '',
                    type: 'All Types',
                    minPrice: '',
                    maxPrice: '',
                    beds: '',
                    amenities: []
                  });
                }}
                className="bg-[#041920] hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-label font-bold transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Interactive Catalog Pagination bar */}
          <nav className="flex justify-center items-center gap-2 pt-8">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#041920] text-white font-bold text-xs font-sans">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-xs hover:bg-slate-50 text-slate-600 font-sans">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-xs hover:bg-slate-50 text-slate-600 font-sans">3</button>
            <span className="px-1 text-slate-400 font-sans">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-xs hover:bg-slate-50 text-slate-600 font-sans">48</button>
            
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>

        </section>

      </div>
    </div>
  );
}
