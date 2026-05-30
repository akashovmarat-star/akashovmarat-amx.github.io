import React, { useState, useEffect, useRef } from 'react';
import { Agent } from '../types';
import { X, Send, Award, ShieldCheck, Mail, Phone, Smile } from 'lucide-react';

interface AgentContactModalProps {
  agent: Agent;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function AgentContactModal({ agent, onClose }: AgentContactModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting based on agent's specialty
  useEffect(() => {
    let customGreeting = `Hello! I am ${agent.name}, your premium partner at AMX.ae. How may I assist you with your real estate inquiries today?`;
    if (agent.id === 'marcus') {
      customGreeting = `Welcome. I am Marcus Sterling, Waterfront Specialist at AMX. ae. I have exclusive, off-market penthouses in Palm Jumeirah and Marina Gate starting at AED 12M. Are you looking to acquire or view details today?`;
    } else if (agent.id === 'sarah') {
      customGreeting = `Good day. I am Sarah Al-Mansouri, managing the Emirates Hills and luxury villa portfolios. I am currently curating a high-end mansion portfolio. May I offer private listings or customized valuations?`;
    } else if (agent.id === 'julian') {
      customGreeting = `Greetings. This is Julian Vane, Off-Plan Investment Specialist. We have early access allocation for Binghatti Skyrise and coastal Dubai Island projects. What is your preferred budget range or handover timeline?`;
    } else if (agent.id === 'elena') {
      customGreeting = `Hello there! I am Elena Petrova, specialized in premium Downtown and DIFC high-rise rentals. I can coordinate corporate-grade walkthroughs in Address Residences or Index Tower instantly. What are you looking to rent?`;
    }

    setMessages([
      {
        sender: 'agent',
        text: customGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [agent]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const userInquiry = input;
    setInput('');
    setIsTyping(true);

    // Simulated reply based on agent specialty
    setTimeout(() => {
      let agentReplyText = `Understood. I have registered your requirement with my office coordinator. May I have your email to securely dispatch the detailed brochure and payment options or connect layout viewing?`;
      const query = userInquiry.toLowerCase();

      if (query.includes('price') || query.includes('how much') || query.includes('cost')) {
        agentReplyText = `Of course. Pricing varies depending on floor level and customized finishing options. For elite listings, we can structure favorable 60/40 payment plans or register for interest immediately. Let me wire you the full financials.`;
      } else if (query.includes('view') || query.includes('visit') || query.includes('tour') || query.includes('book')) {
        agentReplyText = `I would be delighted to coordinate a private showing. We can host a VIP walkthrough tomorrow or coordinate transportation with our Maybach chauffeur team. Please confirm your preferred contact phone.`;
      } else if (agent.id === 'marcus' && (query.includes('palm') || query.includes('marina') || query.includes('water'))) {
        agentReplyText = `The Palm Jumeirah frond villas represent exceptional assets, capturing persistent capital gains. We currently possess a secure off-market listing with direct gulf access. I can wire you the floorplans anonymously page.`;
      } else if (agent.id === 'sarah' && (query.includes('hills') || query.includes('garden') || query.includes('mansion'))) {
        agentReplyText = `Emirates Hills is the peak of residential prestige in Dubai. Prices there are currently holding at AED 4,500/sqft due to finite land footprint. I am happy to invite you for a secure presentation.`;
      } else if (agent.id === 'julian' && (query.includes('plan') || query.includes('project') || query.includes('invest'))) {
        agentReplyText = `Our off-plan assignments show high capital growth potential before handover. Projects like Binghatti Skyrise have robust early stage discount structures. What is your timeline preference?`;
      }

      const agentMsg: ChatMessage = {
        sender: 'agent',
        text: agentReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="relative bg-[#f5f3f3] text-[#1b1c1c] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row h-[550px]" id="agent-chat-modal">
        
        {/* Left Panel: Agent Portfolio details */}
        <div className="w-full md:w-[240px] bg-[#041920] text-white p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#364a51] flex-shrink-0">
          <div className="space-y-4">
            <button 
              onClick={onClose} 
              className="text-white/60 hover:text-white md:hidden absolute top-4 right-4"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#ffdea7]">
              <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-medium tracking-tight text-white">{agent.name}</h3>
              <p className="font-label text-[10px] text-[#ffdea7] uppercase tracking-widest">{agent.role}</p>
            </div>

            <div className="bg-[#1a2e35] p-3 rounded-lg space-y-2 border border-[#364a51]">
              <div className="flex items-center gap-1.5 text-[10px] text-[#ffdea7] font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>RERA VERIFIED EXPERT</span>
              </div>
              <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
                Certified premium real estate advisor registered with Dubai Land Department.
              </p>
            </div>
          </div>

          <div className="hidden md:block space-y-2 pt-4 border-t border-[#364a51] text-xs font-sans text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#ffdea7]" />
              <span className="truncate">{agent.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#ffdea7]" />
              <span>{agent.phone}</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Simulated WhatsApp Chat Panel */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          
          {/* Chat Window Custom Header */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
              <div>
                <p className="text-xs font-semibold text-slate-800">Secure Live Connection</p>
                <p className="text-[10px] text-[#755a24] font-medium uppercase tracking-widest">Active Advisors Panel</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors hidden md:block"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Log Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#e4e2e2]/25 font-sans">
            <div className="text-center">
              <span className="bg-white/95 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">
                End-to-End Encrypted
              </span>
            </div>

            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex flex-col max-w-[80%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div 
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#041920] text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none shadow-sm border border-slate-100'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-xs italic">{agent.name} is typing</span>
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce gap-0.5"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form panel */}
          <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 items-center flex-shrink-0">
            <button type="button" className="text-slate-400 hover:text-slate-600 p-1.5" aria-label="Add emoji">
              <Smile className="h-5 w-5" />
            </button>
            <input
              type="text"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${agent.name}...`}
              className="flex-grow bg-white border border-slate-200 focus:border-[#755a24] rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#755a24] text-slate-800"
            />
            <button
              type="submit"
              className="bg-[#041920] hover:bg-[#1a2e35] text-white p-2.5 rounded-xl transition-all font-semibold disabled:opacity-50 flex items-center justify-center cursor-pointer"
              disabled={!input.trim()}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
