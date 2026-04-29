/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useLocation } from 'react-router-dom';
import logo from './EERA_Logo.png';
import Gallery from './Gallery';
import { 
  Menu, 
  X, 
  Waves, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Globe, 
  Phone, 
  Mail, 
  ChevronDown,
  Navigation
} from 'lucide-react';

// --- Components ---

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0.85, scale: 0.9 }}
        animate={{ opacity: [0.85, 1, 1], scale: [0.9, 1.04, 1] }}
        transition={{ 
          duration: 1.2,
          times: [0, 0.55, 1],
          ease: "easeInOut" 
        }}
        className="flex flex-col items-center gap-8"
      >
        <img 
          src={logo} 
          alt="EERA Realty Logo" 
          className="h-32 md:h-48 w-auto object-contain brightness-0 invert" 
        />
        <div className="flex flex-col items-center gap-3">
          <span className="font-serif font-bold text-3xl md:text-4xl tracking-[0.2em] text-white">
            EERA <span className="text-gold">REALTY</span>
          </span>
          <div className="h-0.5 w-12 bg-gold/50"></div>
          <span className="label-caps text-white/40 text-[10px]">Loading Excellence</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Investment', href: '#investment' },
    { name: 'Vision', href: '#vision' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-nav' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={logo} 
            alt="EERA Realty Logo" 
            className={`h-16 md:h-20 w-auto object-contain transition-all ${isScrolled ? '' : 'brightness-0 invert'}`} 
            onError={(e) => {
              console.error("Logo failed to load", e);
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden items-center gap-2">
            <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-sm">
              <span className="text-gold font-serif font-bold text-xl">E</span>
            </div>
          </div>
          <span className={`font-serif font-bold text-2xl tracking-tight hidden sm:block ${isScrolled ? 'text-navy' : 'text-white'}`}>
            EERA <span className="text-gold">REALTY</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${isScrolled ? 'text-navy/70' : 'text-white/80'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2.5 bg-gold text-white text-sm font-semibold rounded-sm hover:bg-gold/90 transition-all shadow-lg shadow-gold/20">
            Inquire Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className={isScrolled ? 'text-navy' : 'text-white'} /> : <Menu className={isScrolled ? 'text-navy' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-navy/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-navy text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-navy text-white text-center font-semibold rounded-sm">
                Inquire Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AnimatedCounter = ({ value, label, prefix = "" }: { value: string, label: string, prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/\D/g, ''));
      if (start === end) return;

      let timer = setInterval(() => {
        start += Math.ceil(end / 40);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-8 bg-sand rounded-sm border border-navy/5">
      <div className="text-4xl font-serif font-bold text-navy mb-2">
        {prefix}{count}{value.includes('+') ? '+' : ''}
      </div>
      <div className="text-sm uppercase tracking-widest text-navy/60 font-medium">{label}</div>
    </div>
  );
};


const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-navy/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-gold transition-colors"
      >
        <span className="font-serif font-bold text-lg text-navy">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-navy/30'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-navy/70 leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

const HOME_LOADER_SEEN_KEY = 'eera-home-loader-seen';

export default function App() {
  const location = useLocation();
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.sessionStorage.getItem(HOME_LOADER_SEEN_KEY) !== 'true';
  });

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timer = setTimeout(() => {
      window.sessionStorage.setItem(HOME_LOADER_SEEN_KEY, 'true');
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || !location.hash) {
      return;
    }

    const targetSection = document.getElementById(location.hash.slice(1));

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, location.hash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen"
        >
          <Navbar />

          {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1920&q=80" 
            alt="Zambales Coastline" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-sm mb-8">
              <Waves size={14} className="text-gold" />
              <span className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Coastal Land Development in Zambales</span>
            </div>
            <h1 className="text-5xl md:text-8xl heading-serif text-white mb-8 leading-[0.95]">
              Developing Coastal <br /> <span className="italic text-gold italic font-light font-serif">Destinations</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed font-light font-sans max-w-xl">
              EERA Realty creates thoughtfully planned beachside communities and investment-ready properties along one of Luzon’s most promising coastal destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#projects" className="px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest text-xs rounded-sm flex items-center justify-center gap-3 hover:bg-gold/90 transition-all shadow-xl shadow-gold/20">
                Explore Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white hover:text-navy transition-all text-center">
                Partner With Us
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-right hidden lg:block"
          >
            <div className="heading-serif text-3xl italic text-gold mb-2 font-light">Est. 2024</div>
            <div className="label-caps text-white/40">Responsible Development</div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="label-caps text-gold">About EERA Realty</span>
              <h2 className="text-5xl heading-serif text-navy leading-tight">Building more than properties; <br/> we’re <span className="italic font-light">sculpting lifestyles</span>.</h2>
              <p className="text-navy/70 leading-relaxed text-lg font-light">
                EERA Realty is a startup real estate and land development company focused on beachside and coastal property opportunities in Zambales, Philippines. We specialize in identifying high-potential coastal land and transforming it into sustainable, planned communities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {[
                  'Strategic Beachfront Acquisition',
                  'Tourism-Oriented Planning',
                  'Environmental Stewardship',
                  'Community-First Infrastructure'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-gold shrink-0" />
                    <span className="text-navy font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-sand rounded-sm overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80" 
                  alt="Beachfront Development" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/10 -z-0 rounded-sm"></div>
              <div className="absolute -top-6 -left-6 px-10 py-12 bg-navy text-white z-20 hidden md:block">
                <div className="text-5xl font-serif font-bold text-gold">100%</div>
                <div className="text-xs uppercase tracking-widest mt-2">Coastal Focus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Zambales */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-caps text-gold mb-4 block">Market Insight</span>
            <h2 className="text-5xl heading-serif text-navy mb-4">Why Invest in Zambales?</h2>
            <p className="text-navy/60 font-light">One of Luzon's last bastions of pristine coastal beauty, now becoming the premier destination for regional tourism and retreats.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: <TrendingUp size={20} />, title: "Tourism Growth", desc: "Rapidly increasing visitor arrivals from central hubs." },
              { icon: <Globe size={20} />, title: "Accessibility", desc: "Seamless connection to Metro Manila via modern expressways." },
              { icon: <Waves size={20} />, title: "Natural Appeal", desc: "Pristine beaches with world-class surfing and diving." },
              { icon: <TrendingUp size={20} />, title: "Value Upside", desc: "Significant land appreciation potential in emerging zones." },
              { icon: <Users size={20} />, title: "Lifestyle", desc: "Growing demand for remote-work coastal retreats." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-navy/5 rounded-sm hover:border-gold/30 transition-all group"
              >
                <div className="text-gold mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-xs text-navy/60 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-gold font-bold text-xs uppercase tracking-widest mb-4 block">Portfolio</span>
              <h2 className="text-4xl heading-serif text-navy mb-4">Featured Developments</h2>
              <p className="text-navy/60">Strategically chosen locations that balance natural preservation with luxurious habitual comfort.</p>
            </div>
            <div className="flex gap-2 bg-navy/5 p-1 rounded-sm">
              {['All', 'Residential', 'Eco-Lifestyle', 'Commercial'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm ${filter === tab ? 'bg-gold text-white' : 'text-navy/40 hover:text-navy'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <Gallery filter={filter} />
        </div>
      </section>

      {/* Counter Section */}
      <section id="investment" className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <AnimatedCounter value="3+" label="Coastal Regions" />
          <AnimatedCounter value="100+" label="Pipeline Hectares" />
          <AnimatedCounter value="5" label="Projected Awards" />
          <AnimatedCounter value="200+" label="Target Buyers" />
        </div>
      </section>

      {/* Vision Statement */}
      <section id="vision" className="py-32 bg-white text-center relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-12 h-0.5 bg-gold mx-auto mb-12"></div>
          <h2 className="text-4xl md:text-6xl heading-serif text-navy leading-[1.1] italic font-light">
            “Our vision is to transform carefully selected coastal land into valuable, livable, and tourism-ready communities while preserving the natural appeal of Zambales.”
          </h2>
          <div className="mt-16 flex items-center justify-center gap-6 text-navy">
            <div className="h-[1px] w-12 bg-navy/10"></div>
            <span className="label-caps text-navy/40">The Vision Clause</span>
            <div className="h-[1px] w-12 bg-navy/10"></div>
          </div>
        </div>
      </section>

      {/* Development Approach */}
      <section className="py-24 bg-sand overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl heading-serif text-navy">The Development Lifecycle</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto pb-4">
          <div className="flex min-w-[800px] justify-between relative group">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-navy/10 z-0"></div>
            {[
              { step: '01', title: 'Site Selection', desc: 'Rigorous coastal data analysis.' },
              { step: '02', title: 'Feasibility', desc: 'Economic and environmental studies.' },
              { step: '03', title: 'Master Planning', desc: 'World-class architectural design.' },
              { step: '04', title: 'Infrastructure', desc: 'Building sustainable foundations.' },
              { step: '05', title: 'Partnership', desc: 'Vetting strategic investors.' }
            ].map((step, i) => (
              <div key={i} className="flex-1 px-4 relative z-10">
                <div className="w-16 h-16 bg-white border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6 transition-all group-hover:scale-110">
                  <span className="font-serif font-bold text-navy">{step.step}</span>
                </div>
                <h4 className="font-bold text-navy mb-2">{step.title}</h4>
                <p className="text-xs text-navy/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl heading-serif text-navy">Common Inquiries</h2>
          </div>
          <div className="space-y-4">
            <AccordionItem 
              question="Why invest in Zambales beachside properties?"
              answer="Zambales offers a unique combination of proximity to Manila and unspoiled natural beauty. With the expansion of the Subic expressway and growing infrastructure in Central Luzon, land values are projected to see significant appreciation over the next 5-10 years."
            />
            <AccordionItem 
              question="Are the projects already available for sale?"
              answer="Select projects like San Antonio Beach Estate are currently in the pre-launch phase, offering priority inquiry for early investors. Each project has a different timeline—refer to our project cards for specific statuses."
            />
            <AccordionItem 
              question="Do you accept development partners?"
              answer="Yes, we are actively seeking strategic partners for co-development and long-term equity investment. Please use the 'Investor Inquiry' option in our contact form."
            />
            <AccordionItem 
              question="What is the minimum land size available?"
              answer="Residential lot sizes vary by project, starting from 250 sqm up to larger estate parcels of 1,500 sqm+."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/3 bg-navy p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl heading-serif mb-8 text-gold">Let's build a coastal future together.</h3>
                <p className="text-white/60 mb-12">Whether you are an aspiring property owner or a visionary investor, we welcome the conversation.</p>
                
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-gold">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Email Us</div>
                      <div className="font-medium">info@eerarealty.com</div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-gold">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Call Us</div>
                      <div className="font-medium">+63 XXX XXX XXXX</div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm text-gold">
                      <Navigation size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Headquarters</div>
                      <div className="font-medium">Zambales, Philippines</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10 mt-12">
                <div className="flex gap-4">
                  {['FB', 'IG', 'LI'].map(s => (
                    <div key={s} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold hover:bg-gold hover:border-gold transition-all cursor-pointer">{s}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 p-12">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Full Name</label>
                  <input type="text" className="w-full border-b border-navy/10 py-3 focus:border-gold outline-none transition-all" placeholder="Juan Dela Cruz" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Email Address</label>
                  <input type="email" className="w-full border-b border-navy/10 py-3 focus:border-gold outline-none transition-all" placeholder="juan@gmail.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Phone Number</label>
                  <input type="tel" className="w-full border-b border-navy/10 py-3 focus:border-gold outline-none transition-all" placeholder="+63 9xx xxx xxxx" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Inquiry Type</label>
                  <select className="w-full border-b border-navy/10 py-3 focus:border-gold outline-none transition-all bg-transparent">
                    <option>Buyer Inquiry</option>
                    <option>Investor Inquiry</option>
                    <option>Partnership</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2 pt-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Your Message</label>
                  <textarea rows={4} className="w-full border border-navy/10 p-4 focus:border-gold outline-none transition-all bg-sand/20" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <div className="md:col-span-2 pt-6">
                  <button className="w-full py-5 bg-gold text-white font-bold uppercase tracking-widest hover:bg-navy transition-all shadow-xl shadow-gold/20">
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={logo} 
                  alt="EERA Realty Logo" 
                  className="h-16 w-auto object-contain brightness-0 invert" 
                />
                <span className="font-serif font-bold text-2xl tracking-tight">EERA <span className="text-gold">REALTY</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Pioneering responsible coastal development across the Zambales corridor. Excellence in land value and lifestyle creation.
              </p>
              <div className="text-xs text-white/30 font-medium">© 2026 EERA Realty Corp.</div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-gold text-xs uppercase tracking-widest mb-2">Company</h5>
              <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors">Our Story</a>
              <a href="#vision" className="text-sm text-white/50 hover:text-white transition-colors">The Vision</a>
              <a href="#projects" className="text-sm text-white/50 hover:text-white transition-colors">Portfolio</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Careers</a>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-gold text-xs uppercase tracking-widest mb-2">Investment</h5>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Partner Program</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Land Opportunities</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Market Report</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">ESG Commitments</a>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-gold text-xs uppercase tracking-widest mb-2">Legal</h5>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Broker Portal</a>
            </div>
          </div>
        </div>
      </footer>

    </motion.div>
    )}
  </AnimatePresence>
    </>
  );
}
