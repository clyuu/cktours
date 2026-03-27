import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationCard from './components/DestinationCard';
import DestinationDetail from './components/DestinationDetail';
import Experiences from './components/Experiences';
import Footer from './components/Footer';
import Transfers from './components/Transfers';
import Tours from './components/Tours';
import Events from './components/Events';
import Reviews from './components/Reviews';
import { DESTINATIONS } from './constants';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-lanka-sand">
      <Navbar />
      <Hero />
      
      {/* Intro Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 container mx-auto text-center">
        <span className="text-lanka-green font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block animate-fade-in">Why Sri Lanka?</span>
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 md:mb-8 max-w-4xl mx-auto leading-tight">
          Endless beaches, timeless ruins, welcoming people, oodles of elephants, rolling surf, cheap prices, fun trains, famous tea and flavourful food.
        </h2>
        <div className="w-16 md:w-24 h-1 bg-lanka-gold mx-auto rounded-full"></div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-8 md:py-10 pb-16 md:pb-24 px-4 md:px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div className="mb-4 md:mb-0">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">Top Destinations</h3>
            <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">Explore the most visited places in the island</p>
          </div>
          <a href="#" className="hidden md:block text-lanka-green font-bold hover:underline decoration-lanka-gold underline-offset-4">
            View All Places
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {DESTINATIONS.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="text-lanka-green font-bold hover:underline decoration-lanka-gold underline-offset-4">
            View All Places
          </a>
        </div>
      </section>

      <Experiences />

      {/* Video/Banner Section - Essence of Serendipity */}
      <section className="relative h-[52vh] sm:h-[58vh] md:h-[60vh] flex items-center justify-center bg-scroll bg-center bg-cover" style={{ backgroundImage: 'url(/Images/The%20Essence%20of%20Serendipity.jpg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 md:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-6xl font-bold mb-4 md:mb-6">The Essence of Serendipity</h2>
          <p className="text-sm sm:text-lg md:text-2xl text-white/90 mb-6 md:mb-8 font-light max-w-3xl mx-auto">
            Sri Lanka is one of the few places in the world where you can see the world's largest land mammal and the world's largest marine mammal in a single day.
          </p>
          <a href="/tours" className="inline-block bg-white text-lanka-green px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-bold hover:bg-lanka-gold hover:text-lanka-green transition-all duration-300 transform hover:scale-105">
            Plan Your Journey
          </a>
        </div>
      </section>

      {/* Blog/Stories Teaser */}
      <section className="py-24 px-6 container mx-auto">
         <div className="text-center mb-16">
            <span className="text-lanka-green font-bold tracking-widest uppercase text-sm">Travel Journal</span>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mt-2">Stories from the Island</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 h-80">
                <img 
                  src="/Images/Sri Lankan Street Food.JPG" 
                  alt="Sri Lankan Rice and Curry" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <span className="text-lanka-gold">Food & Drink</span>
                <span>•</span>
                <span>5 Min Read</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3 group-hover:text-lanka-green transition-colors">
                A Guide to Sri Lankan Street Food
              </h3>
              <p className="text-slate-600 leading-relaxed">
                From spicy Kottu Roti to sweet Hoppers, discover the explosion of flavors that defines Sri Lankan cuisine.
              </p>
            </div>
            
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 h-80">
                <img 
                  src="/Images/The Esala Perahera Festival.jpg" 
                  alt="Sri Lankan Culture and Festivals" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <span className="text-lanka-gold">Culture</span>
                <span>•</span>
                <span>7 Min Read</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3 group-hover:text-lanka-green transition-colors">
                The Esala Perahera Festival
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Witness the grandeur of Kandy's annual procession featuring traditional dancers, drummers, and decorated elephants.
              </p>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/transfers" element={<><Navbar /><Transfers /><Footer /></>} />
        <Route path="/tours" element={<><Navbar /><Tours /><Footer /></>} />
        <Route path="/events" element={<><Navbar /><Events /><Footer /></>} />
        <Route path="/reviews" element={<><Navbar /><Reviews /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;