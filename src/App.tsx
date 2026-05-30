import React, { useState, useEffect } from 'react';
import { ViewTab, Property, Agent } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ListingsView from './components/ListingsView';
import ExtraViews from './components/ExtraViews';
import WordPressView from './components/WordPressView';
import BookViewingModal from './components/BookViewingModal';
import ValuationModal from './components/ValuationModal';
import AgentContactModal from './components/AgentContactModal';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import MortgageCalculatorView from './components/MortgageCalculatorView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation active screen tab state
  const [activeTab, setActiveTab] = useState<ViewTab>('home');

  // Modal State triggers
  const [bookViewingOpen, setBookViewingOpen] = useState(false);
  const [selectedBookProperty, setSelectedBookProperty] = useState<string | undefined>(undefined);
  
  const [valuationOpen, setValuationOpen] = useState(false);
  const [selectedContactAgent, setSelectedContactAgent] = useState<Agent | null>(null);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<Property | null>(null);

  // Hero search transfer state variables
  const [heroFilters, setHeroFilters] = useState<{ location: string; type: string } | undefined>(undefined);

  // Scroll back to top on tab swap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleBookViewing = (propertyName?: string) => {
    setSelectedBookProperty(propertyName);
    setBookViewingOpen(true);
  };

  const handleHeroSearch = (query: { location: string; type: string }) => {
    setHeroFilters(query);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] flex flex-col font-sans selection:bg-[#ffdea7] selection:text-[#041920] w-full max-w-[100vw] overflow-x-hidden">
      
      {/* Premium Top Navigation header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(newTab) => {
          setActiveTab(newTab);
          if (newTab !== 'buy') {
            setHeroFilters(undefined);
          }
        }}
        onBookViewingClick={() => handleBookViewing()}
        onSearch={(searchVal) => {
          setHeroFilters({
            location: searchVal,
            type: 'All Types'
          });
          setActiveTab('buy');
        }}
      />

      {/* Main Content Area with elegant fade animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <HomeView
                setActiveTab={setActiveTab}
                onBookViewing={handleBookViewing}
                onPropertyClick={(property) => setSelectedPropertyDetail(property)}
                onContactAgent={(agent) => setSelectedContactAgent(agent)}
                onValuationClick={() => setValuationOpen(true)}
                setHeroFilters={handleHeroSearch}
              />
            </motion.div>
          )}

          {(activeTab === 'buy' || activeTab === 'rent') && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ListingsView
                initialSearchValues={heroFilters}
                onPropertyClick={(property) => setSelectedPropertyDetail(property)}
                onContactAgent={(agent) => setSelectedContactAgent(agent)}
                onBookViewing={handleBookViewing}
              />
            </motion.div>
          )}

          {activeTab === 'off-plan' && (
            <motion.div
              key="off-plan-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="py-16 bg-[#fbf9f9]"
            >
              {/* Specialized full showcase context */}
              <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div className="text-center space-y-2">
                  <span className="font-label text-xs uppercase tracking-[0.25em] text-[#755a24]">
                    Future Landmarks
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#041920]">
                    Dubai Exclusive Off-Plan Ventures
                  </h1>
                  <p className="text-xs text-slate-500 font-sans max-w-md mx-auto leading-relaxed">
                    Access vetted specifications, payment terms, and private sales for upcoming architectural masterpieces layout primary developers.
                  </p>
                </div>

                {/* Big Showcase blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      id: 'op1',
                      title: 'Binghatti Skyrise, Business Bay',
                      subtitle: 'A Legacy in the Making',
                      priceText: 'AED 1.2M',
                      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvxOSXv0ldTE3wk8JhiftYfzuQUPdpQmbhLkmQDywPGTU0VeFhaR8SCKmfs2bY7znkbNsFKzr59rYIWcmBMl1K9trCJagArvVCsdyOu4AtHOJVcU1wSUoKTPmb8XtGokd9E4uz3mj7gAmv3DyfGgaiMH4INcAfG894mhXquco3DLWNVqVKaPrgvjeCDWdfcKxnrvF78P7hjLcd6L6LGX-OYUxyDRHsmPa96712ZzQJedZ0Cnf8FkxKcKIewedMgP1ZjHochuCgtwM-',
                      desc: 'Binghatti Skyrise is an architectural masterpiece featuring bold LED illumination strips, sky-high pool terraces, and luxury penthouse residences positioned dynamically in the commercial core of Business Bay.',
                      handover: 'Q4 2026',
                      paymentPlan: '70/30'
                    },
                    {
                      id: 'op2',
                      title: 'Oceanfront Residences, Dubai Islands',
                      subtitle: 'Coastal Elegance Redefined',
                      priceText: 'AED 2.8M',
                      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB63YJj4TKOtDuWMcHk8A2Xjndke946qOpDybTrqAK7xPiBIu5j33HOxjjNxOhcm4xue6iMCNY88FEj_1tJxBvPh1Et0UXaiikJpnwQrCnmRYYEsXvKmlHCTSmUnq2sZaKt9Cfn7qbGD9dZePfSvR0MqEHrjCukVO-9xcEHBz_32ywPMRS1hce7RXHxg4_hUknOTB6qoefnV5ixBvIqfg1sY8LDSS-q_jbcRlzViuL9ovneykPgN2SFUJjgcFp2RifNBaEveMciTX0l',
                      desc: 'Curated low-rise boutique residences showcasing warm sand tones, organic plaster textures, private beach access, and panoramic pool vistas overlooking the turquoise Arabian Gulf in the iconic Dubai Islands.',
                      handover: 'Q2 2027',
                      paymentPlan: '60/40'
                    },
                    {
                      id: 'op3',
                      title: 'The Apex Towers, DIFC',
                      subtitle: 'The Heart of Financial Hub',
                      priceText: 'AED 3.5M',
                      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByit-4Tt4Erwo79yXhid8IBZ-xcZRqcROCDZ7wwtKvfO5a0sy_Jcd2zRk-LQLLaNTcuf_caUCyOhXEfYuOw-lzarmW6UQnEDGEdGj6JNdewo0oSWnyGmESxHtm0Cw_8Rn1JI9eWPSC5YE2jydePTta0zjp5rSaDTJriZN5Kegg3chHdMD-cu7dZh6cc_HbsVmQHobq-MgVV93xPYutTByq84sJXDTxeit4hOv62uAM73kTsGlMvhmhGg1lD7FCwZ42Iv5bbhr1JKQR',
                      desc: 'The landmark of structural innovation. Seamless design combining glass core elements and steel frame beams. Located in the highly dynamic DIFC avenue with elite corporate access and high-floor duplexes.',
                      handover: 'Q1 2028',
                      paymentPlan: '50/50'
                    }
                  ].map((proj) => (
                    <article key={proj.id} className="bg-white rounded-2xl overflow-hidden border border-[#E8E4DE] shadow-sm flex flex-col justify-between">
                      <div className="relative h-60 overflow-hidden bg-slate-900">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        <span className="absolute top-4 left-4 bg-[#755a24] text-white text-[9px] font-label px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                          {proj.subtitle}
                        </span>
                      </div>
                      <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-serif text-xl font-bold text-[#041920]">{proj.title}</h3>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">{proj.desc}</p>
                        </div>
                        
                        <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-sans text-slate-600">
                          <div className="flex justify-between">
                            <span>Estimated Handover:</span>
                            <span className="font-bold text-slate-800">{proj.handover}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Financial Payment Plan:</span>
                            <span className="font-bold text-[#755a24]">{proj.paymentPlan}</span>
                          </div>
                          <div className="flex justify-between text-sm pt-1 border-t border-[#f5f3f3]">
                            <span className="font-bold text-[#041920]">Initial Acquisition:</span>
                            <span className="font-bold text-[#041920]">{proj.priceText}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleBookViewing(proj.title)}
                          className="w-full bg-[#041920] hover:bg-[#1a2e35] text-white py-3 rounded-lg font-label text-xs uppercase tracking-wider text-center block mt-3 transition-colors"
                        >
                          Request Brochure &amp; allocation
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'mortgage' && (
            <motion.div
              key="mortgage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <MortgageCalculatorView />
            </motion.div>
          )}

          {(activeTab === 'kyc' || activeTab === 'about' || activeTab === 'contact') && (
            <motion.div
              key="regulatory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ExtraViews tab={activeTab} onBookViewing={handleBookViewing} />
            </motion.div>
          )}

          {activeTab === 'wordpress' && (
            <motion.div
              key="wordpress-suite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <WordPressView />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Global Footer markup */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Portals overlay container list */}
      <AnimatePresence>
        {/* Modal 1: VIP Scheduled Private Showing view */}
        {bookViewingOpen && (
          <BookViewingModal
            initialPropertyName={selectedBookProperty}
            onClose={() => {
              setBookViewingOpen(false);
              setSelectedBookProperty(undefined);
            }}
          />
        )}

        {/* Modal 2: Free appraisers property evaluation estimator */}
        {valuationOpen && (
          <ValuationModal onClose={() => setValuationOpen(false)} />
        )}

        {/* Modal 3: Secure agent message mock chat panel */}
        {selectedContactAgent && (
          <AgentContactModal
            agent={selectedContactAgent}
            onClose={() => setSelectedContactAgent(null)}
          />
        )}

        {/* Modal 4: Detailed Property catalog information slides */}
        {selectedPropertyDetail && (
          <PropertyDetailsModal
            property={selectedPropertyDetail}
            onClose={() => setSelectedPropertyDetail(null)}
            onBookViewing={(name) => {
              setSelectedPropertyDetail(null);
              handleBookViewing(name);
            }}
            onContactAgent={(agentId) => {
              setSelectedPropertyDetail(null);
              const target = selectAgentById(agentId);
              setSelectedContactAgent(target);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Find Agent helpers
function selectAgentById(id: string): Agent {
  const list = [
    {
      id: 'marcus',
      name: 'Marcus Sterling',
      role: 'Prime Waterfront Specialist',
      image: '/src/assets/images/regenerated_image_1779460409727.png',
      phone: '+971 50 123 4567',
      email: 'marcus@amx.ae'
    },
    {
      id: 'sarah',
      name: 'Sarah Al-Mansouri',
      role: 'Emirates Hills Portfolio',
      image: '/src/assets/images/regenerated_image_1779460413162.png',
      phone: '+971 50 234 5678',
      email: 'sarah@amx.ae'
    },
    {
      id: 'julian',
      name: 'Julian Vane',
      role: 'Off-Plan Investment Strategist',
      image: '/src/assets/images/regenerated_image_1779460418715.png',
      phone: '+971 50 345 6789',
      email: 'julian@amx.ae'
    },
    {
      id: 'elena',
      name: 'Elena Petrova',
      role: 'Downtown & DIFC Rentals',
      image: '/src/assets/images/regenerated_image_1779460421519.jpg',
      phone: '+971 50 456 7890',
      email: 'elena@amx.ae'
    }
  ];
  return list.find((a) => a.id === id) || list[0];
}
