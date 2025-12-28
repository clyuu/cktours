import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationCard from './components/DestinationCard';
import DestinationDetail from './components/DestinationDetail';
import Experiences from './components/Experiences';
import Footer from './components/Footer';
import { DESTINATIONS } from './constants';

function HomePage() {
  return (
    <div className="min-h-screen bg-lanka-sand">
      <Navbar />
      <Hero />
      
      {/* Intro Section */}
      <section className="py-24 px-6 container mx-auto text-center">
        <span className="text-lanka-green font-bold tracking-[0.2em] uppercase text-sm mb-4 block animate-fade-in">Why Sri Lanka?</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-8 max-w-4xl mx-auto leading-tight">
          Endless beaches, timeless ruins, welcoming people, oodles of elephants, rolling surf, cheap prices, fun trains, famous tea and flavourful food.
        </h2>
        <div className="w-24 h-1 bg-lanka-gold mx-auto rounded-full"></div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-10 pb-24 px-6 container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="font-serif text-3xl font-bold text-slate-900">Top Destinations</h3>
            <p className="text-slate-600 mt-2">Explore the most visited places in the island</p>
          </div>
          <a href="#" className="hidden md:block text-lanka-green font-bold hover:underline decoration-lanka-gold underline-offset-4">
            View All Places
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Video/Banner Section - Using Stilt Fishermen Image */}
      <section className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544977432-882269a84596?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">The Essence of Serendipity</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Sri Lanka is one of the few places in the world where you can see the world's largest land mammal and the world's largest marine mammal in a single day.
          </p>
          <button className="bg-white text-lanka-green px-8 py-3 rounded-full font-bold hover:bg-lanka-gold hover:text-lanka-green transition-all duration-300 transform hover:scale-105">
            Plan Your Journey
          </button>
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
                  src="https://images.unsplash.com/photo-1625938145744-e38051524e2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lankan Rice and Curry" 
                  referrerPolicy="no-referrer"
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
                  src="https://images.unsplash.com/photo-1568461875185-1b0333334e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lankan Culture and Festivals" 
                  referrerPolicy="no-referrer"
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;